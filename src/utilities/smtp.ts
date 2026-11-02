import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import type { EmailAdapter } from 'payload'

export const smtpConfigured = () =>
  Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_TLS_MODE &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD &&
    process.env.SMTP_FROM_ADDRESS,
  )

export async function createSMTPAdapter(): Promise<EmailAdapter> {
  if (!smtpConfigured()) {
    return () => ({
      name: 'smtp-pending',
      defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'unconfigured@example.invalid',
      defaultFromName: process.env.SMTP_FROM_NAME || 'Website',
      sendEmail: async () => {
        throw new Error('SMTP is not configured')
      },
    })
  }

  const mode = process.env.SMTP_TLS_MODE
  const port = Number(process.env.SMTP_PORT)
  if (
    !['implicit', 'starttls'].includes(mode || '') ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  ) {
    throw new Error('Invalid SMTP port or TLS mode; use implicit or starttls')
  }

  return nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM_ADDRESS!,
    defaultFromName: process.env.SMTP_FROM_NAME || 'Website',
    skipVerify: true,
    transportOptions: {
      host: process.env.SMTP_HOST,
      port,
      secure: mode === 'implicit',
      requireTLS: mode === 'starttls',
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 30_000,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    },
  })
}
