import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { emitters, emitterImage } from './products'
import './emitters.css'

export const metadata: Metadata = {
  title: 'Water-Saving Drip Emitters | XINRONG',
  description: 'Explore six drip emitter designs, from pressure compensating and cylindrical emitters to flat and custom high-flow options.',
  alternates: { canonical: '/drip-emitters' },
}

export default function DripEmittersPage() {
  return (
    <main className="xr-main xr-indust xe-page">
      <section className="xi-wrap xe-heading">
        <Link className="xe-back" href="/#products">← All product categories</Link>
        <p className="xi-eyebrow">WATER-SAVING COMPONENTS</p>
        <h1>Water-saving<br />drip emitters.</h1>
        <p>Six emitter designs for different water conditions, terrain and crop cycles.<br />Find the right fit for your drip tape or tubing.</p>
      </section>
      <section className="xi-wrap xe-grid" aria-label="Drip emitter products">
        {emitters.map((product, index) => (
          <Link className="xe-card" href={`/drip-emitters/${product.slug}`} key={product.slug}>
            <div className="xe-card-image">
              <Image unoptimized src={emitterImage(product.sourceId)} alt={product.name} width={640} height={480} sizes="(max-width: 700px) 88vw, (max-width: 1000px) 44vw, 29vw" preload={index === 0} />
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
        <div><h2>Let’s find your emitter.</h2><p>Tell us your water conditions, required flow rate and tape or tubing dimensions.</p></div>
        <Link className="xi-button xi-button-light" href="/contact">Discuss your requirements <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  )
}
