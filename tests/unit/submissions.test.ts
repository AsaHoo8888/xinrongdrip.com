import { describe, expect, it, vi } from 'vitest'
import type { AccessArgs, PayloadRequest } from 'payload'
import { submissionOverrides } from '../../src/forms/submissions'

vi.mock('../../src/forms/delivery', () => ({
  deliverSubmission: vi.fn().mockResolvedValue('pending'),
}))
import { deliverSubmission } from '../../src/forms/delivery'

const endpoints = submissionOverrides.endpoints || []
const submit = endpoints.find((endpoint) => endpoint.path === '/submit')!.handler
const retry = endpoints.find((endpoint) => endpoint.path === '/:id/retry-email')!.handler
const input = { form: 1, submissionData: [{ field: 'email', value: 'visitor@example.com' }] }

function request(body: unknown) {
  const webRequest = new Request('http://localhost:3000/api/form-submissions/submit', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { origin: 'http://localhost:3000' },
  })
  const payload = {
    config: { admin: { user: 'users' } },
    findByID: vi
      .fn()
      .mockResolvedValue({ fields: [{ name: 'email', blockType: 'email', required: true }] }),
    find: vi.fn().mockResolvedValue({ docs: [] }),
    create: vi.fn().mockResolvedValue({ id: 1, deliveryStatus: 'pending' }),
    db: { updateOne: vi.fn().mockResolvedValue(null) },
    logger: { warn: vi.fn() },
  }
  const req = {
    body: webRequest.body,
    headers: webRequest.headers,
    payload,
  } as unknown as PayloadRequest
  return { req, payload }
}

describe('public submission boundary', () => {
  it('keeps saved records successful when email delivery is pending', async () => {
    const { req, payload } = request(input)
    const response = await submit(req)
    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({ saved: true, deliveryStatus: 'pending' })
    expect(payload.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ form: 1 }) }),
    )
  })
  it('rejects server-side invalid input without saving or sending', async () => {
    const { req, payload } = request({ form: 1, submissionData: [] })
    await expect(submit(req)).rejects.toThrow('必填')
    expect(payload.create).not.toHaveBeenCalled()
  })
  it('does not save or resend a recently identical submission', async () => {
    const { req, payload } = request(input)
    payload.find.mockResolvedValue({ docs: [{ id: 1 }] })
    await expect(submit(req)).rejects.toThrow('请勿重复提交')
    expect(payload.create).not.toHaveBeenCalled()
  })
  it('keeps the saved response if delivery infrastructure unexpectedly throws', async () => {
    const { req } = request(input)
    vi.mocked(deliverSubmission).mockRejectedValueOnce(new Error('mail status write failed'))
    const response = await submit(req)
    expect(response.status).toBe(201)
    expect((await response.json()).saved).toBe(true)
  })
  it('rejects untrusted cross-origin requests', async () => {
    const { req, payload } = request(input)
    req.headers.set('origin', 'https://other.example')
    await expect(submit(req)).rejects.toThrow('来源')
    expect(payload.create).not.toHaveBeenCalled()
  })
  it('prevents unauthenticated email retries', async () => {
    const { req } = request(input)
    await expect(retry(req)).rejects.toThrow('登录')
  })
  it('protects the raw submission collection from public writes and reads', async () => {
    const { req } = request(input)
    const args = { req, slug: 'form-submissions' } as AccessArgs
    expect(await submissionOverrides.access!.read!(args)).toBe(false)
    expect(await submissionOverrides.access!.create!(args)).toBe(false)
    expect(await submissionOverrides.access!.update!(args)).toBe(false)
  })
})
