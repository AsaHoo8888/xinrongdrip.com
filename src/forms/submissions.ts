import {
  APIError,
  type CollectionConfig,
  type CollectionBeforeValidateHook,
  type PayloadRequest,
} from 'payload'
import { authenticated } from '@/access/authenticated'
import { allowSubmission, submissionFingerprint, validateSubmission } from './validation'
import { deliverSubmission } from './delivery'

const validate: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (operation !== 'create' || !data) return data
  const formID = typeof data.form === 'object' ? data.form.id : data.form
  const form = await req.payload.findByID({
    collection: 'forms',
    id: formID,
    overrideAccess: true,
    req,
  })
  try {
    data.submissionData = validateSubmission(form.fields || [], data.submissionData)
    data.deliveryStatus = form.emails?.length ? 'pending' : 'not-requested'
  } catch (error) {
    throw new APIError((error as Error).message, 400)
  }
  return data
}

async function readBody(req: PayloadRequest) {
  if (!req.body) throw new APIError('请求内容为空。', 400)
  const reader = req.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > 64 * 1024) {
      await reader.cancel()
      throw new APIError('提交内容过大。', 413)
    }
    chunks.push(value)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new APIError('请求格式不正确。', 400)
  }
}

export const submissionOverrides: Partial<CollectionConfig> = {
  access: {
    create: authenticated,
    read: authenticated,
    update: () => false,
    delete: authenticated,
  },
  admin: { defaultColumns: ['form', 'deliveryStatus', 'createdAt'] },
  hooks: { beforeValidate: [validate] },
  endpoints: [
    {
      path: '/submit',
      method: 'post',
      handler: async (req) => {
        const origin = req.headers.get('origin')
        if (
          origin &&
          origin !== new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').origin
        ) {
          throw new APIError('请求来源不正确。', 403)
        }
        // Only trust forwarded addresses when a configured reverse proxy replaces incoming headers.
        const client =
          process.env.TRUST_PROXY === 'true'
            ? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            : 'shared'
        if (!allowSubmission(client || 'shared'))
          throw new APIError('提交过于频繁，请稍后再试。', 429)
        const body = await readBody(req)
        if (!body || !Number.isSafeInteger(Number(body.form)) || Number(body.form) < 1)
          throw new APIError('表单不存在。', 400)
        const formID = Number(body.form)
        const form = await req.payload.findByID({
          collection: 'forms',
          id: formID,
          depth: 0,
          overrideAccess: false,
          req,
        })
        let submissionData
        try {
          submissionData = validateSubmission(form.fields || [], body.submissionData)
        } catch (error) {
          throw new APIError((error as Error).message, 400)
        }
        const fingerprint = submissionFingerprint(formID, submissionData)
        const duplicateCutoff = new Date(Date.now() - 5 * 60_000).toISOString()
        const recent = await req.payload.find({
          collection: 'form-submissions',
          overrideAccess: true,
          limit: 1,
          depth: 0,
          where: {
            and: [
              { submissionFingerprint: { equals: fingerprint } },
              { createdAt: { greater_than: duplicateCutoff } },
            ],
          },
        })
        if (recent.docs.length) throw new APIError('留言已保存，请勿重复提交。', 409)
        const submissionKey = fingerprint
        // Release only expired keys; the unique index rejects concurrent identical submissions.
        await req.payload.db.updateOne({
          collection: 'form-submissions',
          where: {
            and: [
              { submissionKey: { equals: submissionKey } },
              { createdAt: { less_than_equal: duplicateCutoff } },
            ],
          },
          data: { submissionKey: null },
          options: { atomic: true },
        })
        let record
        try {
          record = await req.payload.create({
            collection: 'form-submissions',
            overrideAccess: true,
            data: {
              form: formID,
              submissionData,
              submissionFingerprint: fingerprint,
              submissionKey,
            },
          })
        } catch (error) {
          const existing = await req.payload.find({
            collection: 'form-submissions',
            overrideAccess: true,
            limit: 1,
            where: {
              submissionKey: { equals: submissionKey },
            },
          })
          if (existing.docs.length) throw new APIError('留言已保存，请勿重复提交。', 409)
          throw error
        }
        let deliveryStatus = record.deliveryStatus
        try {
          deliveryStatus = await deliverSubmission(req.payload, record.id)
        } catch {
          req.payload.logger.warn({
            msg: 'Submission saved; notification remains pending.',
            submissionID: record.id,
          })
        }
        return Response.json({ saved: true, deliveryStatus }, { status: 201 })
      },
    },
    {
      path: '/:id/retry-email',
      method: 'post',
      handler: async (req) => {
        if (!req.user || req.user.collection !== req.payload.config.admin.user)
          throw new APIError('请先登录后台。', 401)
        const id = Number(req.routeParams?.id)
        if (!Number.isSafeInteger(id) || id < 1) throw new APIError('记录不存在。', 400)
        const deliveryStatus = await deliverSubmission(req.payload, id)
        return Response.json({ deliveryStatus })
      },
    },
  ],
}
