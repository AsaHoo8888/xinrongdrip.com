import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { InquiryForm } from '@/components/Xinrong/InquiryForm'
import '../production-line.css'

const productName = 'Inline Pressure Compensating Dripper Irrigation Pipe Production Line'
const imagePath = '/xinrong/inline-pressure-compensating-dripper-production-line'
const specifications = [
  ['Pipe diameter', 'Ø16 / 20 / 22 mm'],
  ['Pipe wall thickness', '0.4–1.0 mm'],
  ['Practical production speed', '80–140 m/min'],
  ['Dripper spacing', '100–1000 mm'],
  ['Dripper screening speed', '800–1500 pcs/min'],
  ['Punching speed', 'More than 1000 pcs/min'],
]
const gallery = [
  { image: 2, width: 1265, height: 844, caption: 'Automatic coiling equipment' },
  { image: 3, width: 1269, height: 850, caption: 'Punching and inspection equipment' },
  { image: 4, width: 1600, height: 1200, caption: 'Pipe processing section' },
  { image: 5, width: 1600, height: 1200, caption: 'Extrusion die detail' },
  { image: 6, width: 1269, height: 850, caption: 'Dripper feeding equipment' },
]

export const metadata: Metadata = {
  title: `${productName} | XINRONG`,
  description: 'PLC-controlled inline pressure compensating dripper irrigation pipe production line with a practical speed of 80–140 m/min, online hole inspection and automatic roll changing.',
  alternates: { canonical: '/production-lines/inline-pressure-compensating-dripper-production-line' },
}

export default function InlinePressureCompensatingDripperProductionLinePage() {
  return (
    <main className="xr-main xr-indust xp-page">
      <section className="xi-wrap xp-hero" aria-labelledby="production-line-title">
        <div className="xp-hero-copy">
          <h1 id="production-line-title">{productName}</h1>
          <p>PLC-synchronized production at 80–140 m/min, with online inspection and automatic roll changing.</p>
          <a className="xi-button xi-button-light" href="#production-line-inquiry">Request a quotation <span aria-hidden="true">↗</span></a>
        </div>
        <figure className="xp-hero-image">
          <Image src={`${imagePath}/image1.webp`} alt="Complete inline pressure compensating dripper irrigation pipe production line" width={1254} height={185} sizes="(max-width: 700px) 88vw, 44vw" preload unoptimized />
        </figure>
      </section>
      <div className="xp-body">
        <div className="xp-details">
          <section aria-labelledby="overview-title">
            <h2 id="overview-title">Production line overview</h2>
            <p>A complete production line for irrigation pipe with inline pressure compensating drippers. PLC control synchronizes the equipment for automated operation, with one-touch production start-up and one-touch positioning of the vacuum tank and dripper feeder.</p>
          </section>
          <section className="xp-technical" aria-labelledby="specifications-title">
            <figure>
              <Image src={`${imagePath}/finished-product.png`} alt="Pressure compensating drippers and finished irrigation pipe" width={1923} height={818} sizes="(max-width: 700px) 88vw, 28vw" unoptimized />
            </figure>
            <div>
              <h2 id="specifications-title">Technical specifications</h2>
              <dl className="xp-specifications">
                {specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
            </div>
          </section>
          <section aria-labelledby="features-title">
            <h2 id="features-title">Main machine features</h2>
            <ul className="xp-advantages">
              <li><strong>Synchronized automation:</strong> PLC control coordinates the complete line, with one-touch production start-up and positioning of the vacuum tank and dripper feeder.</li>
              <li><strong>High-speed dripper screening:</strong> Advanced dripper screening supports 800–1500 drippers per minute.</li>
              <li><strong>High-speed punching:</strong> An advanced punching device supports more than 1000 holes per minute.</li>
              <li><strong>Online visual inspection:</strong> Monitor every punched hole and record inspection data.</li>
              <li><strong>Pipe quality detection:</strong> Monitor the pipe for breaks or damage during production.</li>
              <li><strong>Automatic fault response:</strong> When a hole or pipe problem is detected, the system raises an alarm and the automatic coiler changes the roll to reduce losses.</li>
            </ul>
          </section>
          <section className="xp-gallery" aria-labelledby="gallery-title">
            <h2 id="gallery-title">Production line gallery</h2>
            {gallery.map(({ image, width, height, caption }) => (
              <figure key={image}>
                <Image src={`${imagePath}/image${image}.webp`} alt={caption} width={width} height={height} sizes="(max-width: 700px) 88vw, 28vw" unoptimized />
                <figcaption><h3>{caption}</h3></figcaption>
              </figure>
            ))}
          </section>
          <Link className="xi-button" href="/production-lines">Explore production lines <span aria-hidden="true">↗</span></Link>
        </div>
        <aside className="xp-inquiry" id="production-line-inquiry" aria-labelledby="inquiry-title">
          <h2 id="inquiry-title">Get a tailored solution<br />and quotation</h2>
          <p className="xp-inquiry-product">{productName}</p>
          <InquiryForm productName={productName} />
          <Link className="xp-contact-link" href="/contact">More ways to discuss your project ↗</Link>
        </aside>
      </div>
    </main>
  )
}
