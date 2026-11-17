import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { InquiryForm } from '@/components/Xinrong/InquiryForm'
import '../production-line.css'

const productName = 'Inline T-Tape Dripper Irrigation Pipe Production Line'
const imagePath = '/xinrong/inline-t-tape-dripper-production-line'
const specifications = [
  ['Pipe diameter', 'Ø16 / 20 / 22 mm'],
  ['Pipe wall thickness', '0.15–0.25 mm'],
  ['Practical production speed', '250–300 m/min'],
  ['Dripper spacing', 'Customized'],
]


export const metadata: Metadata = {
  title: `${productName} | XINRONG`,
  description: 'PLC-controlled inline T-Tape dripper irrigation pipe production line with a practical speed of 250–300 m/min, online hole inspection and automatic roll changing.',
  alternates: { canonical: '/production-lines/inline-t-tape-dripper-production-line' },
}

export default function InlineTTapeDripperProductionLinePage() {
  return (
    <main className="xr-main xr-indust xp-page">
      <section className="xi-wrap xp-hero" aria-labelledby="production-line-title">
        <div className="xp-hero-copy">
          <h1 id="production-line-title">{productName}</h1>
          <p>PLC-synchronized production at 250–300 m/min, with online inspection and automatic roll changing.</p>
          <a className="xi-button xi-button-light" href="#production-line-inquiry">Request a quotation <span aria-hidden="true">↗</span></a>
        </div>
        <div className="xp-hero-image" aria-hidden="true" />
      </section>
      <div className="xp-body">
        <div className="xp-details">
          <section aria-labelledby="overview-title">
            <h2 id="overview-title">Production line overview</h2>
            <p>A complete production line for irrigation pipe with a continuous labyrinth strip. PLC control synchronizes the equipment for automated operation, with one-touch production start-up.</p>
          </section>
          <section className="xp-technical" aria-labelledby="specifications-title">
            <figure>
              <Image src={`${imagePath}/finished-product.jpg`} alt="Continuous labyrinth strip and finished T-Tape irrigation pipe" width={1568} height={527} sizes="(max-width: 700px) 88vw, 28vw" unoptimized />
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
              <li><strong>Synchronized automation:</strong> The complete line adopts a PLC control system for synchronized, automated operation.</li>
              <li><strong>One-touch start-up:</strong> Start automatic production with one touch.</li>
              <li><strong>Internal cooling:</strong> An advanced internal cooling system ensures continuous, stable production of the labyrinth strip at high speed.</li>
              <li><strong>High-speed punching:</strong> An advanced punching device supports more than 2700 holes per minute.</li>
              <li><strong>Online visual inspection:</strong> Monitor every punched hole and record inspection data.</li>
              <li><strong>Pipe quality detection:</strong> Monitor the pipe for breaks or damage during production.</li>
              <li><strong>Automatic fault response:</strong> When a hole or pipe problem is detected, the system raises an alarm and the automatic coiler changes the roll to reduce losses.</li>
              <li><strong>No separate dripper production:</strong> No need to purchase drippers or invest in an injection molding machine and molds to produce them.</li>
            </ul>
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
