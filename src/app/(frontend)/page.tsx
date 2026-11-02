import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ProductDrawing, ProductExplorer } from '@/components/Xinrong/ProductExplorer'

export const metadata: Metadata = {
  title: 'XINRONG | Drip Irrigation Equipment & Precision Molds',
  description:
    'Drip irrigation equipment, emitters, tape, injection molds and auxiliary equipment. Explore the XINRONG range and discuss your project.',
}

export default function Home() {
  return (
    <main className="xr-main xr-indust" id="top">
      <section className="xi-hero">
        <div className="xi-hero-heading xi-wrap">
          <h1>
            Precision made.
            <br />
            <span>Growth delivered.</span>
          </h1>
          <p>
            Drip irrigation equipment, components and molds. From the production line to the growing
            field — connected by XINRONG.
          </p>
        </div>
        <div className="xi-hero-stage">
          <div className="xi-hero-aside">
            <a className="xi-button xi-button-light" href="#products">
              Explore our products <span aria-hidden="true">↗</span>
            </a>
            <div className="xi-mission">
              <h2>Made for every drop.</h2>
              <ul>
                <li>Drip tape production</li>
                <li>Precision component tooling</li>
                <li>Crop irrigation</li>
              </ul>
            </div>
          </div>
          <figure className="xi-hero-image">
            <Image
              src="/xinrong/field.webp"
              alt="Drip irrigation tape delivering water along crop rows at sunrise"
              width={1920}
              height={1280}
              unoptimized
              preload
              sizes="(max-width: 700px) 94vw, 75vw"
            />
            <figcaption>FROM PRECISION PRODUCTION TO EVERY DROP IN THE FIELD</figcaption>
          </figure>
        </div>
      </section>

      <section className="xi-about xi-wrap xi-section" id="about">
        <div className="xi-about-visual">
          <ProductDrawing type="line" />
          <span>Drip tape production · Equipment concept</span>
          <div className="xi-visual-corner" aria-hidden="true">
            ↗
          </div>
        </div>
        <div className="xi-about-copy">
          <p className="xi-eyebrow">MEET XINRONG</p>
          <h2>
            From the production line.
            <br />
            To the growing field.
          </h2>
          <p>
            Bring your irrigation project together with a focused range of equipment, precision
            components and manufacturing tools.
          </p>
          <p>
            Our range connects the equipment used to produce drip tape with the emitters, tape and
            tooling behind irrigation systems.
          </p>
          <a className="xi-button" href="#contact">
            Discuss your requirements <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <ProductExplorer />

      <section className="xi-applications xi-wrap xi-section" id="applications">
        <div className="xi-section-top">
          <div>
            <p className="xi-eyebrow">YOUR APPLICATION</p>
            <h2>What will you make next?</h2>
          </div>
          <p>
            Start with your application.
            <br />
            We’ll start with the right details.
          </p>
        </div>
        <div className="xi-application-list">
          {[
            [
              '01',
              'Produce drip tape.',
              'Equipment and supporting systems for your drip tape manufacturing project.',
              'Tape diameter, wall thickness, emitter spacing and target output.',
              '#products',
            ],
            [
              '02',
              'Build irrigation systems.',
              'Drip emitters and tape for delivering water where crops need it.',
              'Flow rate, operating pressure, crop layout and water conditions.',
              '#products',
            ],
            [
              '03',
              'Shape the component.',
              'Injection molds defined around your irrigation component requirements.',
              'Part drawings, resin, cavity count and critical dimensions.',
              '#contact',
            ],
          ].map(([number, title, copy, details, href]) => (
            <a className="xi-application" href={href} key={number}>
              <span className="xi-application-number">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <p className="xi-application-details">{details}</p>
              <span className="xi-application-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="xi-field-band">
        <div className="xi-field-copy">
          <p className="xi-eyebrow">CONNECTED BY PURPOSE</p>
          <h2>
            One range.
            <br />
            Every stage.
          </h2>
          <p>
            Production equipment. Component tooling. Field irrigation. Find the starting point for
            your next project.
          </p>
          <a className="xi-button xi-button-light" href="#products">
            Find your product <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div
          className="xi-field-photo"
          role="img"
          aria-label="Irrigated crop rows in morning sunlight"
        />
      </section>

      <section
        className="xi-projects xi-wrap xi-section"
        id="showcase"
        aria-labelledby="showcase-heading"
      >
        <div className="xi-projects-copy">
          <h2 id="showcase-heading">
            Product
            <br />
            showcase
          </h2>
          <div className="xi-project-list">
            {[
              [
                'Pre-punched hose production line',
                'Production equipment',
                '/production-lines/external-pre-punched-hose-production-line',
              ],
              ['Precision drip emitters', 'Irrigation components', '/drip-emitters'],
              ['Drip tape for crop irrigation', 'Field irrigation', '/drip-tape'],
              ['Custom injection molds', 'Component tooling', '/contact'],
            ].map(([title, category, href]) => (
              <Link className="xi-project-row" href={href} key={title}>
                <span>
                  <span className="xi-project-title">{title}</span>
                  <span className="xi-project-category">{category}</span>
                </span>
                <span className="xi-project-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
        <Link
          className="xi-project-image"
          href="/production-lines/external-pre-punched-hose-production-line"
          aria-label="Explore the pre-punched hose production line"
        >
          <Image
            src="/xinrong/external-pre-punched-hose/production-line.png"
            alt="XINRONG pre-punched hose production line with winding units and control panels"
            width={788}
            height={448}
            unoptimized
            sizes="(max-width: 700px) 88vw, 34vw"
          />
        </Link>
      </section>

      <section className="xi-consult xi-wrap" id="contact" aria-labelledby="consult-heading">
        <div className="xi-consult-copy">
          <h2 id="consult-heading">
            Ready for your next
            <br />
            irrigation project?
          </h2>
          <Link className="xi-button xi-button-light" href="/contact">
            Request a consultation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="xi-consult-image">
          <Image
            src="/xinrong/external-pre-punched-hose/production-line.png"
            alt="XINRONG hose production equipment"
            width={788}
            height={448}
            unoptimized
          />
        </div>
      </section>

      <section className="xi-news xi-wrap xi-section" id="news" aria-labelledby="news-heading">
        <div className="xi-news-heading">
          <h2 id="news-heading">
            Insights and
            <br />
            innovations
          </h2>
          <Link className="xi-button" href="/posts">
            View all news <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {[
          {
            title: 'Planning a pre-punched hose production line',
            image: '/xinrong/external-pre-punched-hose/production-line.png',
            alt: 'Pre-punched hose production equipment',
            href: '/production-lines/external-pre-punched-hose-production-line',
          },
          {
            title: 'Explore emitters for your irrigation system',
            image: '/xinrong/emitters/12048927-1.jpg',
            alt: 'XINRONG drip irrigation emitters',
            href: '/drip-emitters',
          },
          {
            title: 'Find drip tape for your crop irrigation needs',
            image: '/xinrong/drip-tape/12046957-1.jpg',
            alt: 'XINRONG drip irrigation tape',
            href: '/drip-tape',
          },
        ].map(({ title, image, alt, href }) => (
          <article className="xi-news-card" key={href}>
            <Link href={href} className="xi-news-link">
              <div className="xi-news-image">
                <Image
                  src={image}
                  alt={alt}
                  width={788}
                  height={448}
                  unoptimized
                  sizes="(max-width: 700px) 88vw, 22vw"
                />
              </div>
              <div className="xi-news-copy">
                <h3>{title}</h3>
                <div className="xi-news-meta">
                  <span>Product guide · XINRONG</span>
                  <span className="xi-news-arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
