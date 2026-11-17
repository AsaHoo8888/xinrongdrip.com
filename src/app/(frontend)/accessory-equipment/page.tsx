import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { accessories } from './products'
import '../drippers/emitters.css'

export const metadata: Metadata = {
  title: 'Accessory Equipment | XINRONG',
  description: 'Equipment for waste pipe recycling, welding and rewinding, packing, flow testing, mixing and drying.',
  alternates: { canonical: '/accessory-equipment' },
}

export default function AccessoryEquipmentPage() {
  return (
    <main className="xr-main xr-indust xe-page">
      <section className="xi-wrap xe-heading">
        <Link className="xe-back" href="/#products">← All product categories</Link>
        <p className="xi-eyebrow">PRODUCTION SUPPORT</p>
        <h1>Accessory <br />equipment.</h1>
        <p>Support your production process with equipment for recycling, rewinding, <br />packing, flow testing, mixing and drying.</p>
      </section>
      <section className="xi-wrap xe-grid" aria-label="Accessory equipment products">
        {accessories.map((product, index) => (
          <Link className="xe-card" href={`/accessory-equipment/${product.slug}`} key={product.slug}>
            <div className="xe-card-image">
              <Image unoptimized src={product.image} alt={product.name} width={640} height={480} sizes="(max-width: 700px) 88vw, (max-width: 1000px) 44vw, 29vw" preload={index === 0} />
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
        <div><h2>Complete your production process.</h2><p>Tell us the required function and how the equipment will connect to your production line.</p></div>
        <Link className="xi-button xi-button-light" href="/contact">Discuss your requirements <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  )
}
