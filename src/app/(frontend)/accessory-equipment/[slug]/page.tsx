import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { InquiryForm } from '@/components/Xinrong/InquiryForm'
import { accessories } from '../products'
import '../../production-lines/production-line.css'
import '../../drippers/emitters.css'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return accessories.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = accessories.find((item) => item.slug === slug)
  if (!product) notFound()
  return {
    title: `${product.name} | XINRONG`,
    description: product.description,
    alternates: { canonical: `/accessory-equipment/${product.slug}` },
  }
}

export default async function AccessoryEquipmentDetailPage({ params }: Props) {
  const { slug } = await params
  const product = accessories.find((item) => item.slug === slug)
  if (!product) notFound()
  return (
    <main className="xr-main xr-indust xp-page xe-detail">
      <nav className="xi-wrap xe-breadcrumb" aria-label="Breadcrumb"><Link href="/#products">Products</Link><span aria-hidden="true">/</span><Link href="/accessory-equipment">Accessory Equipment</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
      <section className="xi-wrap xp-hero" aria-labelledby="equipment-title">
        <div className="xp-hero-copy">
          <p className="xi-eyebrow">{product.tag}</p>
          <h1 id="equipment-title">{product.name}</h1>
          <p>{product.description}</p>
          <a className="xi-button xi-button-light" href="#equipment-inquiry">Request a quotation <span aria-hidden="true">↗</span></a>
        </div>
        <figure className="xp-hero-image"><Image unoptimized src={product.image} alt={product.name} width={800} height={600} sizes="(max-width: 700px) 88vw, 44vw" preload /></figure>
      </section>
      <div className="xp-body">
        <div className="xp-details">
          <section><h2>Product features</h2><ul className="xp-advantages">{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
          <Link className="xi-button" href="/accessory-equipment">Explore all accessory equipment <span aria-hidden="true">↗</span></Link>
        </div>
        <aside className="xp-inquiry" id="equipment-inquiry" aria-labelledby="inquiry-title">
          <h2 id="inquiry-title">Find the right equipment<br />for your production line</h2>
          <p className="xp-inquiry-product">{product.name}</p>
          <InquiryForm productName={product.name} />
          <Link className="xp-contact-link" href="/contact">More ways to discuss your project ↗</Link>
        </aside>
      </div>
    </main>
  )
}
