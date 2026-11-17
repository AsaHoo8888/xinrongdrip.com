import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { InquiryForm } from '@/components/Xinrong/InquiryForm'
import '../production-line.css'

const productName = 'High Speed Inline Flat Dripper Irrigation Pipe Production Line'
const imagePath = '/xinrong/inline-flat-dripper-production-line'
const specifications = [
  ['Pipe diameter', 'Ø12 / 16 / 20 / 22 mm'],
  ['Pipe wall thickness', '0.15–0.6 mm'],
  ['Practical production speed', '350–400 m/min'],
  ['Dripper spacing', '100–1000 mm'],
  ['Dripper screening speed', '3000–5000 pcs/min'],
  ['Punching heads', '4 / 6 / 8'],
  ['Maximum punching speed', '4000 pcs/min'],
]
const gallery = [
  { image: 2, width: 1259, height: 944, caption: 'Automatic coiling equipment' },
  { image: 3, width: 1259, height: 944, caption: 'Processing equipment and control panel' },
  { image: 4, width: 1252, height: 939, caption: 'Pipe processing section' },
  { image: 5, width: 1252, height: 939, caption: 'Extrusion die detail' },
  { image: 6, width: 1259, height: 944, caption: 'Dripper feeding equipment' },
]

export const metadata: Metadata = {
  title: `${productName} | XINRONG`,
  description: 'PLC-controlled inline flat dripper irrigation pipe production line with a practical speed of 350–400 m/min, online hole inspection and automatic roll changing.',
  alternates: { canonical: '/production-lines/high-speed-inline-flat-dripper-production-line' },
}

export default function InlineFlatDripperProductionLinePage() {
  return (
    <main className="xr-main xr-indust xp-page">
      <section className="xi-wrap xp-hero" aria-labelledby="production-line-title">
        <div className="xp-hero-copy">
          <h1 id="production-line-title">{productName}</h1>
          <p>PLC-synchronized production at 350–400 m/min, with online inspection and automatic roll changing.</p>
          <a className="xi-button xi-button-light" href="#production-line-inquiry">Request a quotation <span aria-hidden="true">↗</span></a>
        </div>
        <figure className="xp-hero-image">
          <Image src={`${imagePath}/image1.jpeg`} alt="Complete high speed inline flat dripper irrigation pipe production line" width={1265} height={222} sizes="(max-width: 700px) 88vw, 44vw" preload unoptimized />
        </figure>
      </section>
      <div className="xp-body">
        <div className="xp-details">
          <section aria-labelledby="overview-title">
            <h2 id="overview-title">Production line overview</h2>
            <p>A complete production line for irrigation pipe with inline flat drippers. PLC control synchronizes the equipment for automated operation, with one-touch production start-up and one-touch positioning of the vacuum tank and dripper feeder.</p>
          </section>
          <section className="xp-technical" aria-labelledby="specifications-title">
            <figure>
              <Image src={`${imagePath}/finished-product.png`} alt="Flat drippers and finished irrigation pipe" width={590} height={202} sizes="(max-width: 700px) 88vw, 28vw" unoptimized />
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
              <li><strong>High-speed dripper screening:</strong> Single- or double-station screening supports 3000–5000 drippers per minute.</li>
              <li><strong>Flexible punching:</strong> Choose 4, 6 or 8 punching heads, with a maximum punching speed of 4000 holes per minute.</li>
              <li><strong>Online visual inspection:</strong> Monitor every punched hole and record inspection data.</li>
              <li><strong>Pipe quality detection:</strong> Monitor the pipe for breaks or damage during production.</li>
              <li><strong>Automatic fault response:</strong> When a hole or pipe problem is detected, the system raises an alarm and the automatic coiler changes the roll to reduce losses.</li>
            </ul>
          </section>
          <section className="xp-gallery" aria-labelledby="gallery-title">
            <h2 id="gallery-title">Production line gallery</h2>
            {gallery.map(({ image, width, height, caption }) => (
              <figure key={image}>
                <Image src={`${imagePath}/image${image}.jpeg`} alt={caption} width={width} height={height} sizes="(max-width: 700px) 88vw, 28vw" unoptimized />
                <figcaption><h3>{caption}</h3></figcaption>
              </figure>
            ))}
            <figure>
              <Image src={`${imagePath}/finished-product.png`} alt="Flat drippers and finished irrigation pipe" width={590} height={202} sizes="(max-width: 700px) 88vw, 28vw" unoptimized />
              <figcaption><h3>Flat drippers and finished irrigation pipe</h3></figcaption>
            </figure>
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
