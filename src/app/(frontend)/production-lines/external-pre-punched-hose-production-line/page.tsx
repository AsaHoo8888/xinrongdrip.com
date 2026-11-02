import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { InquiryForm } from '@/components/Xinrong/InquiryForm'
import './production-line.css'

const productionLineName = 'External Pre-punched Hose Production Line'
const imagePath = '/xinrong/external-pre-punched-hose'
const specifications = [
  ['Hose size', '3.5″–6″'],
  ['Line speed', '5–6 m/min'],
  ['Hole pitch', '100–1500 mm, adjustable'],
  ['Working air pressure', '0.5 MPa'],
  ['Rated voltage', '220 V'],
  ['Installed power', '5 kW'],
  ['Dimensions (L × W × H)', '5.5 × 1.7 × 2 m'],
]

export const metadata: Metadata = {
  title: `${productionLineName} | XINRONG`,
  description:
    'Explore an external pre-punched irrigation hose production line with laser welding, adjustable 100–1500 mm hole spacing and a production speed of 5–6 m/min.',
  alternates: { canonical: '/production-lines/external-pre-punched-hose-production-line' },
}

export default function ExternalPrePunchedHosePage() {
  return (
    <main className="xr-main xr-indust xp-page">
      <section className="xi-wrap xp-hero" aria-labelledby="production-line-title">
        <div className="xp-hero-copy">
          <h1 id="production-line-title">External Pre-punched<br />Hose Production Line</h1>
          <p>
            Laser welding. Adjustable hole spacing. Continuous production.<br />
            Efficient, reliable equipment for agricultural irrigation hoses.
          </p>
          <a className="xi-button xi-button-light" href="#production-line-inquiry">
            Request a quotation <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className="xp-hero-image">
          <Image
            src={`${imagePath}/production-line.png`}
            alt="Complete external pre-punched hose production line with unwinding and winding units"
            width={788}
            height={448}
            sizes="(max-width: 700px) 88vw, 44vw"
            preload
            unoptimized
          />
        </figure>
      </section>

      <div className="xp-body">
        <div className="xp-details">
          <section aria-labelledby="overview-title">
            <h2 id="overview-title">Production line overview</h2>
            <p>
              Built for water-saving agriculture, this line continuously processes externally fitted,
              pre-punched irrigation hoses. Laser welding and adjustable hole spacing accommodate a
              wide range of hose production needs.
            </p>
            <p>
              The compact 5.5 × 1.7 × 2 m footprint fits a variety of factory layouts. Supporting
              3.5″–6″ hose sizes at 5–6 m/min, the line combines stable operation with automated
              processing for efficient batch production.
            </p>
          </section>

          <section className="xp-technical" aria-labelledby="specifications-title">
            <figure>
              <Image
                src={`${imagePath}/production-detail.jpg`}
                alt="Production line on the factory floor showing the hose unwinding unit and processing equipment"
                width={600}
                height={341}
                sizes="(max-width: 700px) 88vw, 28vw"
                unoptimized
              />
            </figure>
            <div>
              <h2 id="specifications-title">Technical specifications</h2>
              <dl className="xp-specifications">
                {specifications.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
              <h3>Solutions &amp; service</h3>
              <ul className="xp-service-list">
                <li>Requirements &amp; specifications</li>
                <li>Equipment configuration</li>
                <li>Installation &amp; technical support</li>
              </ul>
            </div>
          </section>

          <section aria-labelledby="advantages-title">
            <h2 id="advantages-title">Production advantages</h2>
            <ul className="xp-advantages">
              <li><strong>Reliable laser welding:</strong> Integrated welding helps prevent loose
                connections and displaced emitters for stable, leak-free water delivery.</li>
              <li><strong>Flexible hole spacing:</strong> Adjust the pitch from 100 to 1500 mm to suit
                different crop rows and irrigation layouts.</li>
              <li><strong>Efficient automation:</strong> Reduce manual handling, material costs and
                maintenance for consistent batch production.</li>
            </ul>
          </section>

          <section className="xp-performance" aria-labelledby="figures-title">
            <h2 id="figures-title">Key <br />figures</h2>
            <dl>
              <div><dt>Line speed (m/min)</dt><dd>5–6</dd></div>
              <div><dt>Max. hole pitch (mm)</dt><dd>1500</dd></div>
              <div><dt>Installed power</dt><dd>5 kW</dd></div>
            </dl>
          </section>

          <section aria-labelledby="engineering-title">
            <h2 id="engineering-title">Engineered for reliable production</h2>
            <p>
              An external fitting structure and integrated laser welding support stable, continuous
              processing. Adjustable hole spacing accommodates different crop rows and planting
              layouts, helping manufacturers meet varied irrigation requirements.
            </p>
          </section>

          <section className="xp-gallery" aria-labelledby="gallery-title">
            <h2 id="gallery-title">Production line gallery</h2>
            <figure>
              <Image
                src={`${imagePath}/equipment-detail.jpg`}
                alt="Close-up of the production line winding mechanism, hose rollers and control panel"
                width={600}
                height={341}
                sizes="(max-width: 700px) 88vw, 28vw"
                unoptimized
              />
              <figcaption>
                <h3>External pre-punched hose production line</h3>
                <p>Precision built. Flexible production.</p>
              </figcaption>
            </figure>
          </section>
          <Link className="xi-button" href="/#products">
            Explore equipment & components <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <aside className="xp-inquiry" id="production-line-inquiry" aria-labelledby="inquiry-title">
          <h2 id="inquiry-title">Get a tailored solution<br />and quotation</h2>
          <p className="xp-inquiry-product">{productionLineName}</p>
          <InquiryForm productName={productionLineName} />
          <Link className="xp-contact-link" href="/contact">More ways to discuss your project ↗</Link>
        </aside>
      </div>
    </main>
  )
}
