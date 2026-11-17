import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { dripPipes, dripPipeImage } from './products'
import '../drippers/emitters.css'
import '../drip-tape/drip-tape.css'
import './driplines.css'

export const metadata: Metadata = {
  title: 'Driplines | XINRONG',
  description: 'Explore inline flat, pressure compensating, cylindrical and T-Tape dripper irrigation pipe, with specifications for agricultural irrigation.',
  alternates: { canonical: '/driplines' },
}

export default function DripIrrigationPipePage() {
  return (
    <main className="xr-main xr-indust xe-page xt-page xl-page">
      <section className="xi-wrap xe-heading">
        <Link className="xe-back" href="/#products">← All product categories</Link>
        <p className="xi-eyebrow">WATER-SAVING IRRIGATION</p>
        <h1>Driplines.<br />Built for your field.</h1>
        <p>Four inline dripper designs for different crops, terrain and irrigation layouts.<br />Find the right fit for your field.</p>
      </section>
      <section className="xi-wrap xe-grid" aria-label="Dripline products">
        {dripPipes.map((product, index) => (
          <Link className="xe-card" href={`/driplines/${product.slug}`} key={product.slug}>
            <div className="xe-card-image">
              <Image unoptimized src={dripPipeImage(product.sourceId)} alt={product.name} width={640} height={480} sizes="(max-width: 700px) 88vw, 44vw" preload={index === 0} />
            </div>
            <div className="xe-card-copy">
              <p className="xi-eyebrow">{product.tag}</p>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span className="xe-card-link">View product <span aria-hidden="true">↗</span></span>
            </div>
          </Link>
        ))}
      </section>
      <section className="xi-wrap xe-help">
        <div><h2>Let’s plan your irrigation.</h2><p>Tell us your crop layout, water supply, required flow rate and irrigation run length.</p></div>
        <Link className="xi-button xi-button-light" href="/contact">Discuss your requirements <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  )
}
