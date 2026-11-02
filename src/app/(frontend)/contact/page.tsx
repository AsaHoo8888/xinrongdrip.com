import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { InquiryForm } from '@/components/Xinrong/InquiryForm'
import './contact.css'

export const metadata: Metadata = {
  title: 'Contact | XINRONG',
  description:
    'Discuss drip irrigation equipment, emitters, tape and precision molds with XINRONG.',
}

export default function Contact() {
  return (
    <main className="xr-main xr-indust xc-page">
      <section className="xi-wrap xc-heading">
        <h1>Contact</h1>
        <p>Have a question or a project in mind? Let’s talk.</p>
      </section>
      <section className="xi-wrap xc-form-section" aria-labelledby="contact-title">
        <div className="xc-intro">
          <h2 id="contact-title">Get in touch</h2>
          <p>
            From production equipment to irrigation components, tell us where you want to start.
          </p>
          <h3>Help us understand your project</h3>
          <p>
            Share your application, specifications and target output. For custom tooling, let us
            know if you have part drawings available.
          </p>
          <Image
            src="/xinrong/field.webp"
            alt="Drip irrigation delivering water to growing crops"
            width={1920}
            height={1280}
            unoptimized
            sizes="(max-width: 700px) 80vw, 35vw"
          />
        </div>
        <div className="xc-form">
          <InquiryForm />
        </div>
      </section>
      <section className="xi-wrap xi-section xc-topics" aria-labelledby="topics-title">
        <h2 id="topics-title">Start with what you need.</h2>
        <div className="xc-topic-grid">
          {[
            [
              'Production equipment',
              'Tape design, required output, factory layout and available utilities.',
              '/#products',
            ],
            [
              'Irrigation components',
              'Emitter flow rate, tape dimensions, crop layout and water conditions.',
              '/#products',
            ],
            [
              'Precision molds',
              'Part drawings, resin, cavity count and critical component dimensions.',
              '/#products',
            ],
          ].map(([title, description, href]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link className="xi-button" href={href}>
                Explore products <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
