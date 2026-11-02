import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { contactForm } from '../forms/contactPreset'

if (!process.env.DATABASE_URL) throw new Error('Fill DATABASE_URL in the local .env first.')
const payload = await getPayload({ config })
try {
  const existing = await payload.find({
    collection: 'forms',
    where: { setupKey: { equals: 'general-contact' } },
    limit: 1,
  })
  const form =
    existing.docs[0] || (await payload.create({ collection: 'forms', data: contactForm }))
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
  })
  if (!page.docs.length) {
    await payload.create({
      collection: 'pages',
      context: { disableRevalidate: true },
      data: {
        title: '联系我们',
        slug: 'contact',
        _status: 'published',
        hero: { type: 'none' },
        layout: [{ blockType: 'formBlock', enableIntro: false, form: form.id }],
      },
    })
  }
  console.info('Contact preset ready. Existing form and page content were preserved.')
} finally {
  await payload.destroy()
}
