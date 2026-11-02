import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AboutPurpose } from '@/components/Xinrong/AboutPurpose'
import { ProductDrawing } from '@/components/Xinrong/ProductExplorer'
import './about.css'

export const metadata: Metadata = {
  title: 'About XINRONG | Precision Production & Drip Irrigation',
  description:
    'Discover XINRONG’s range of drip irrigation equipment, components and precision molds, from the production line to the growing field.',
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
              src="/xinrong/field.webp"
              alt="Drip irrigation tape watering crop rows in a sunlit field"
              width={1920}
              height={1280}
              preload
              unoptimized
              sizes="(max-width: 700px) 88vw, 42vw"
            />
            <figcaption>
              From the production line.
              <br />
              To the growing field.
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
