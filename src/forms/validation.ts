import { createHash } from 'node:crypto'

type FieldDefinition = {
  name?: string
  blockType: string
  required?: boolean | null
  options?: { value: string }[] | null
}

export function validateSubmission(fields: FieldDefinition[], input: unknown) {
  if (!Array.isArray(input) || input.length > 50) throw new Error('提交字段格式不正确。')
  const definitions = fields.filter((field) => field.name && field.blockType !== 'message')
  const values = new Map<string, string>()
  for (const entry of input) {
    if (!entry || typeof entry.field !== 'string' || values.has(entry.field)) {
      throw new Error('提交包含重复或无效字段。')
    }
    const definition = definitions.find((field) => field.name === entry.field)
    if (!definition || !['string', 'number', 'boolean'].includes(typeof entry.value)) {
      throw new Error('提交包含未知字段或无效值。')
    }
    const value = String(entry.value).trim()
    const maxLength = definition.blockType === 'textarea' ? 5000 : 254
    if (value.length > maxLength) throw new Error(`${definition.name} 内容过长。`)
    if (value && definition.blockType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error('邮箱格式不正确。')
    }
    if (value && definition.blockType === 'number' && !Number.isFinite(Number(value))) {
      throw new Error('数字字段格式不正确。')
    }
    if (value && definition.blockType === 'checkbox' && !['true', 'false'].includes(value)) {
      throw new Error('复选框值不正确。')
    }
    if (
      value &&
      definition.blockType === 'select' &&
      !definition.options?.some((option) => option.value === value)
    ) {
      throw new Error('选项值不正确。')
    }
    values.set(entry.field, value)
  }
  for (const field of definitions) {
    const value = values.get(field.name!)
    if (field.required && (!value || (field.blockType === 'checkbox' && value !== 'true'))) {
      throw new Error(`${field.name} 为必填项。`)
    }
  }
  return definitions
    .filter((field) => values.has(field.name!))
    .map((field) => ({
      field: field.name!,
      value: values.get(field.name!)!,
    }))
}

export const submissionFingerprint = (
  form: number | string,
  data: { field: string; value: string }[],
) =>
  createHash('sha256')
    .update(JSON.stringify([form, [...data].sort((a, b) => a.field.localeCompare(b.field))]))
    .digest('hex')

// shortcut: process-local basic rate limits; use a shared limiter before running multiple instances.
const buckets = new Map<string, { count: number; expires: number }>()
export function allowSubmission(key: string, now = Date.now()) {
  for (const [id, bucket] of buckets) if (bucket.expires <= now) buckets.delete(id)
  const bucket = buckets.get(key) || { count: 0, expires: now + 60_000 }
  bucket.count += 1
  buckets.set(key, bucket)
  return bucket.count <= 10
}
