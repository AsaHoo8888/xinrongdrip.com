import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  if (!process.env.DATABASE_URL) return Response.json({ error: 'The inquiry service is not configured yet.' }, { status: 503 })
  try {
    const payload = await getPayload({ config })
    const forms = await payload.find({ collection: 'forms', where: { setupKey: { equals: 'general-contact' } }, limit: 1, depth: 0, select: { setupKey: true }, overrideAccess: true })
    if (!forms.docs[0]) return Response.json({ error: 'Inquiry form is not configured yet.' }, { status: 503 })
    return Response.json({ id: forms.docs[0].id })
  } catch {
    return Response.json({ error: 'The inquiry service is temporarily unavailable. Please try again later.' }, { status: 503 })
  }
}
