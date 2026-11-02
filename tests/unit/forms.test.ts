import { describe, expect, it, vi, beforeEach } from 'vitest'
import {
  validateSubmission,
  submissionFingerprint,
  allowSubmission,
} from '../../src/forms/validation'
import { contactForm } from '../../src/forms/contactPreset'

describe('contact validation', () => {
  const fields = contactForm.fields!
  const valid = [
    { field: 'name', value: ' 张三 ' },
    { field: 'email', value: 'test@example.com' },
    { field: 'phone', value: '+86 010-12345678' },
    { field: 'message', value: '咨询设备' },
  ]
  it('accepts international phone strings and omits optional fields', () => {
    expect(validateSubmission(fields, valid)[0].value).toBe('张三')
    expect(validateSubmission(fields, valid)).toHaveLength(4)
  })
  it.each(['name', 'email', 'phone', 'message'])('rejects a missing required %s', (field) => {
    expect(() =>
      validateSubmission(
        fields,
        valid.filter((item) => item.field !== field),
      ),
    ).toThrow('必填')
  })
  it('rejects invalid email, overlong values, unknown and repeated fields', () => {
    expect(() =>
      validateSubmission(
        fields,
        valid.map((item) => (item.field === 'email' ? { ...item, value: 'a@b' } : item)),
      ),
    ).toThrow('邮箱')
    expect(() =>
      validateSubmission(fields, [...valid, { field: 'company', value: 'a'.repeat(255) }]),
    ).toThrow('过长')
    expect(() =>
      validateSubmission(fields, [...valid, { field: 'deliveryStatus', value: 'sent' }]),
    ).toThrow('未知')
    expect(() => validateSubmission(fields, [...valid, valid[0]])).toThrow('重复')
  })
  it('validates checkbox, numeric and select input against form definitions', () => {
    expect(() =>
      validateSubmission(
        [{ name: 'agree', blockType: 'checkbox', required: true }],
        [{ field: 'agree', value: false }],
      ),
    ).toThrow('必填')
    expect(() =>
      validateSubmission([{ name: 'n', blockType: 'number' }], [{ field: 'n', value: 'NaN' }]),
    ).toThrow('数字')
    expect(() =>
      validateSubmission(
        [{ name: 's', blockType: 'select', options: [{ value: 'a' }] }],
        [{ field: 's', value: 'b' }],
      ),
    ).toThrow('选项')
  })
  it('uses stable fingerprints irrespective of field order', () => {
    expect(submissionFingerprint(1, valid)).toBe(submissionFingerprint(1, [...valid].reverse()))
    expect(submissionFingerprint(1, valid)).not.toBe(submissionFingerprint(2, valid))
  })
  it('limits bursts and releases expired buckets', () => {
    for (let i = 0; i < 10; i++) expect(allowSubmission('test', 1000)).toBe(true)
    expect(allowSubmission('test', 1000)).toBe(false)
    expect(allowSubmission('test', 61_001)).toBe(true)
  })
})

vi.mock('../../src/utilities/smtp', () => ({ smtpConfigured: vi.fn(() => true) }))
import { deliverSubmission } from '../../src/forms/delivery'
import { smtpConfigured } from '../../src/utilities/smtp'
import type { Payload } from 'payload'

describe('durable email delivery', () => {
  const email = {
    from: 'sender@example.com',
    to: 'owner@example.com',
    subject: 'Test',
    html: 'Hello',
  }
  function mockPayload() {
    return {
      findByID: vi
        .fn()
        .mockResolvedValue({ id: 1, deliveryStatus: 'pending', form: 2, emailQueue: [email] }),
      db: { updateOne: vi.fn().mockResolvedValue({ id: 1, emailQueue: [email] }) },
      update: vi.fn().mockResolvedValue({ id: 1 }),
      sendEmail: vi.fn().mockResolvedValue({}),
      logger: { warn: vi.fn() },
    }
  }
  beforeEach(() => {
    vi.mocked(smtpConfigured).mockReturnValue(true)
  })
  it('keeps a saved submission pending when SMTP is missing or fails', async () => {
    const payload = mockPayload()
    vi.mocked(smtpConfigured).mockReturnValue(false)
    expect(await deliverSubmission(payload as unknown as Payload, 1)).toBe('pending')
    expect(payload.sendEmail).not.toHaveBeenCalled()
    vi.mocked(smtpConfigured).mockReturnValue(true)
    payload.sendEmail.mockRejectedValueOnce(new Error('SMTP down'))
    expect(await deliverSubmission(payload as unknown as Payload, 1)).toBe('pending')
    expect(payload.update).toHaveBeenLastCalledWith(
      expect.objectContaining({ data: { deliveryStatus: 'pending' } }),
    )
  })
  it('does not send when another worker has claimed the record', async () => {
    const payload = mockPayload()
    payload.db.updateOne.mockResolvedValue(null)
    await deliverSubmission(payload as unknown as Payload, 1)
    expect(payload.sendEmail).not.toHaveBeenCalled()
  })
  it('removes delivered messages from the durable queue and marks sent', async () => {
    const payload = mockPayload()
    expect(await deliverSubmission(payload as unknown as Payload, 1)).toBe('sent')
    expect(payload.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { emailQueue: [] } }),
    )
    expect(payload.update).toHaveBeenLastCalledWith(
      expect.objectContaining({ data: { deliveryStatus: 'sent' } }),
    )
  })
  it('uses the queue returned by the atomic claim, not a stale snapshot', async () => {
    const payload = mockPayload()
    payload.db.updateOne.mockResolvedValue({ id: 1, emailQueue: [] })
    expect(await deliverSubmission(payload as unknown as Payload, 1)).toBe('sent')
    expect(payload.sendEmail).not.toHaveBeenCalled()
  })
})
