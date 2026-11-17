import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AboutPurpose } from '@/components/Xinrong/AboutPurpose'
import { ProductDrawing } from '@/components/Xinrong/ProductExplorer'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './about.css'

const factoryImage = {
  url: '/xinrong/xinrong-factory-exterior.webp',
  width: 2400,
  height: 1114,
  alt: 'XINRONG factory exterior showing the production buildings and main entrance',
}

export const metadata: Metadata = {
  title: 'About XINRONG | Precision Production & Drip Irrigation',
  description:
    'Discover XINRONG’s range of drip irrigation equipment, components and precision molds, from the production line to the growing field.',
  alternates: { canonical: '/about' },
  openGraph: mergeOpenGraph({
    title: 'About XINRONG | Precision Production & Drip Irrigation',
    description:
      'Discover XINRONG’s range of drip irrigation equipment, components and precision molds, from the production line to the growing field.',
    url: '/about',
    images: [factoryImage],
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'About XINRONG | Precision Production & Drip Irrigation',
    description:
      'Discover XINRONG’s range of drip irrigation equipment, components and precision molds, from the production line to the growing field.',
    images: [{ url: factoryImage.url, alt: factoryImage.alt }],
  },
}

export default function About() {
  return (
    <main className="xr-main xr-indust xa-page">
      <section className="xa-hero">
        <div className="xi-wrap xa-hero-grid">
          <div className="xa-title">
            <p className="xi-eyebrow">ABOUT XINRONG</p>
            <h1>
              Precision production.
              <br />
              Purposeful growth.
            </h1>
            <Link className="xi-button" href="#our-range">
              Discover our range <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <figure className="xa-image">
            <Image
              src={factoryImage.url}
              alt={factoryImage.alt}
              width={factoryImage.width}
              height={factoryImage.height}
              preload
              quality={75}
              sizes="(max-width: 700px) 780px, 1600px"
            />
            <figcaption>
              XINRONG factory.
              <br />
              Production starts here.
            </figcaption>
          </figure>
          <AboutPurpose />
        </div>
      </section>
      <section className="xi-wrap xi-section xa-range" id="our-range">
        <div>
          <p className="xi-eyebrow">ONE CONNECTED RANGE</p>
          <h2>
            Built around
            <br />
            the way you work.
          </h2>
        </div>
        <div>
          <p>
            XINRONG brings together drip irrigation equipment, emitters, drip tape, injection molds
            and auxiliary equipment. Our range connects the tools used in production with the
            components used in the field.
          </p>
          <p>
            Whether you are planning a production line, selecting irrigation components or defining
            a custom mold, your application is the starting point.
          </p>
          <Link className="xi-button" href="/#products">
            Explore our products <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="xi-wrap xa-expertise" aria-labelledby="expertise-title">
        <div className="xa-drawing">
          <ProductDrawing type="line" />
          <p>Drip tape production · Equipment concept</p>
        </div>
        <div className="xa-expertise-copy">
          <h2 id="expertise-title">
            The details make
            <br />
            the difference.
          </h2>
          <p>
            Good specifications begin with a clear understanding of the job. Bring the product
            requirements, installation conditions and operating needs into the same conversation.
          </p>
          <ul>
            <li>Equipment defined around your production requirements</li>
            <li>Components selected for your irrigation application</li>
            <li>Tooling specified from your part drawings and material</li>
          </ul>
        </div>
      </section>
      <section className="xi-wrap xi-section xa-certificates" aria-labelledby="certificates-title">
        <p className="xi-eyebrow">CERTIFICATES & PATENTS</p>
        <h2 id="certificates-title">Credentials, documented.</h2>
        <div className="xa-certificate-grid">
          {[
            {
              title: 'ISO 9001:2015 Certificate',
              description: 'Quality management system · Expired 23 May 2025',
              number: '22ACM16296Q',
              name: 'iso-9001-quality-management',
              format: 'pdf',
              width: 1060,
              height: 1500,
              alt: 'ACM ISO 9001:2015 quality management certificate for XINRONG, dated 24 May 2022 with expiry on 23 May 2025',
            },
            {
              title: 'CE Attestation of Conformity',
              description: 'Plastic pipe extrusion machine · UDEM',
              number: 'M.2026.206.C137691',
              name: 'ce-attestation',
              format: 'pdf',
              width: 1062,
              height: 1500,
              alt: 'UDEM attestation of conformity for XINRONG plastic pipe extrusion machines',
            },
            {
              title: 'High-Tech Enterprise Certificate',
              description: 'Issued 19 December 2025 · Three-year term',
              number: 'GR202532007287',
              name: 'high-tech-enterprise',
              format: 'pdf',
              width: 1100,
              height: 777,
              alt: 'High-tech enterprise certificate for Jiangsu Xinrongplas Machinery Co., Ltd.',
            },
            {
              title: 'Vacuum Tank Caster Device',
              description: 'Invention patent · Granted 10 May 2024',
              number: 'ZL 2019 1 0285867.9',
              name: 'vacuum-tank-caster-patent',
              format: 'pdf',
              width: 1061,
              height: 1500,
              alt: 'Chinese invention patent certificate for a vacuum tank caster moving device',
            },
            {
              title: 'Pipe Winding Equipment',
              description: 'Invention patent · Granted 3 November 2017',
              number: 'ZL 2016 1 0246909.4',
              name: 'pipe-winding-equipment-patent',
              format: 'jpg',
              width: 1055,
              height: 1500,
              alt: 'Chinese invention patent certificate for equipment used to wind glass-fiber pipes',
            },
          ].map((certificate) => (
            <a
              className="xa-certificate"
              href={`/xinrong/certificates/${certificate.name}.${certificate.format}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${certificate.title} (opens in a new tab)`}
              key={certificate.name}
            >
              <div className="xa-certificate-image">
                <Image
                  src={`/xinrong/certificates/${certificate.name}.webp`}
                  alt={certificate.alt}
                  width={certificate.width}
                  height={certificate.height}
                  unoptimized
                />
              </div>
              <h3>{certificate.title}</h3>
              <p>{certificate.description}</p>
              <p className="xa-certificate-number">{certificate.number}</p>
              <span className="xa-certificate-link">
                View certificate <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="xi-wrap xi-section xa-process" aria-labelledby="process-title">
        <h2 id="process-title">From an idea to a clear brief.</h2>
        <div>
          {[
            [
              'Share your application',
              'Tell us what you want to produce, irrigate or mold, and how it will be used.',
            ],
            [
              'Define the requirements',
              'Bring together dimensions, output, material, water conditions or part drawings.',
            ],
            [
              'Discuss the next step',
              'Use those details to begin a focused conversation about your project.',
            ],
          ].map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="xi-wrap xa-cta">
        <div>
          <h2>
            Let’s put your project
            <br />
            in motion.
          </h2>
          <p>Equipment, components or a custom mold. Start with what you need.</p>
        </div>
        <Link className="xi-button xi-button-light" href="/contact">
          Talk to XINRONG <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  )
}
