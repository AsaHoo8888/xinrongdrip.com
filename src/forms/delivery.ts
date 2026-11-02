import type { BeforeEmail, FormattedEmail } from '@payloadcms/plugin-form-builder/types'
import type { CollectionAfterChangeHook, Payload } from 'payload'
import { smtpConfigured } from '@/utilities/smtp'

export const queueEmails: BeforeEmail = async (emails, args) => {
  // The plugin invokes this with afterChange arguments despite its beforeChange type declaration.
  const { doc, req } = args as unknown as Parameters<CollectionAfterChangeHook>[0]
  await req.payload.update({
    collection: 'form-submissions',
    id: doc.id,
    req,
    overrideAccess: true,
    data: { emailQueue: emails, deliveryStatus: emails.length ? 'pending' : 'not-requested' },
  })
  return []
}

export async function deliverSubmission(payload: Payload, id: number) {
  const record = await payload.findByID({
    collection: 'form-submissions',
    id,
    depth: 1,
    overrideAccess: true,
  })
  if (!smtpConfigured()) return record.deliveryStatus
  if (!Array.isArray(record.emailQueue)) return record.deliveryStatus
  if (
    typeof record.form === 'object' &&
    record.form.setupKey === 'general-contact' &&
    !process.env.CONTACT_NOTIFY_TO
  ) {
    return record.deliveryStatus
  }

  const claimed = await payload.db.updateOne({
    collection: 'form-submissions',
    where: {
      and: [
        { id: { equals: id } },
        {
          or: [
            { deliveryStatus: { equals: 'pending' } },
            {
              and: [
                { deliveryStatus: { equals: 'sending' } },
                {
                  emailLastAttemptAt: {
                    less_than: new Date(Date.now() - 10 * 60_000).toISOString(),
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    data: { deliveryStatus: 'sending', emailLastAttemptAt: new Date().toISOString() },
    options: { atomic: true },
  })
  if (!claimed) return record.deliveryStatus

  let remaining = (claimed.emailQueue || []) as unknown as FormattedEmail[]
  try {
    while (remaining.length) {
      const email = { ...remaining[0] }
      if (typeof record.form === 'object' && record.form.setupKey === 'general-contact') {
        email.to = process.env.CONTACT_NOTIFY_TO!
        email.from = process.env.SMTP_FROM_ADDRESS!
      }
      await payload.sendEmail(email)
      remaining = remaining.slice(1)
      await payload.update({
        collection: 'form-submissions',
        id,
        overrideAccess: true,
        data: { emailQueue: remaining },
      })
    }
    await payload.update({
      collection: 'form-submissions',
      id,
      overrideAccess: true,
      data: { deliveryStatus: 'sent' },
    })
    return 'sent'
  } catch {
    await payload.update({
      collection: 'form-submissions',
      id,
      overrideAccess: true,
      data: { deliveryStatus: 'pending' },
    })
    payload.logger.warn({
      msg: 'Submission notification pending; retry from the admin record.',
      submissionID: id,
    })
    return 'pending'
  }
}
