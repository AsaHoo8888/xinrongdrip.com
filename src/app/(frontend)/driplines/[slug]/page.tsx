import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { InquiryForm } from '@/components/Xinrong/InquiryForm'
import { dripPipes, dripPipeImage } from '../products'
import '../../production-lines/production-line.css'
import '../../drippers/emitters.css'
import '../driplines.css'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return dripPipes.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = dripPipes.find((item) => item.slug === slug)
  if (!product) notFound()
  return {
    title: `${product.name} | XINRONG`,
    description: product.description,
    alternates: { canonical: `/driplines/${product.slug}` },
  }
}

export default async function DripIrrigationPipePage({ params }: Props) {
  const { slug } = await params
  const product = dripPipes.find((item) => item.slug === slug)
  if (!product) notFound()
  return (
    <main className="xr-main xr-indust xp-page xe-detail xl-page">
      <nav className="xi-wrap xe-breadcrumb" aria-label="Breadcrumb"><Link href="/#products">Products</Link><span aria-hidden="true">/</span><Link href="/driplines">Driplines</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
      <section className="xi-wrap xp-hero" aria-labelledby="pipe-title">
        <div className="xp-hero-copy">
          <p className="xi-eyebrow">{product.tag}</p>
          <h1 id="pipe-title">{product.name}</h1>
          <p>{product.description}</p>
          <a className="xi-button xi-button-light" href="#pipe-inquiry">Request a quotation <span aria-hidden="true">↗</span></a>
        </div>
        <figure className="xp-hero-image"><Image unoptimized src={dripPipeImage(product.sourceId)} alt={product.name} width={800} height={600} sizes="(max-width: 700px) 88vw, 44vw" preload /></figure>
      </section>
      <div className="xp-body">
        <div className="xp-details">
          <section><h2>Designed for your irrigation conditions</h2><p>{product.application}</p></section>
          <section><h2>Product features</h2><ul className="xp-advantages">{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
          <section><h2>Application &amp; specifications</h2><dl className="xp-specifications xe-specifications">{product.specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="xe-spec-note">Flow rates are measured at 0.1 MPa working pressure. Pipe can be customized to your requirements. Confirm the selected configuration and installation conditions before ordering.</p></section>
          {product.images > 1 && <section><h2>Product details</h2><div className="xe-gallery">{Array.from({ length: product.images - 1 }, (_, i) => <Image unoptimized key={i} src={dripPipeImage(product.sourceId, i + 2)} alt={`${product.name} — detail ${i + 1}`} width={800} height={600} sizes="(max-width: 900px) 88vw, 45vw" />)}</div></section>}
          <Link className="xi-button" href="/driplines">Explore all driplines <span aria-hidden="true">↗</span></Link>
        </div>
        <aside className="xp-inquiry" id="pipe-inquiry" aria-labelledby="inquiry-title">
          <h2 id="inquiry-title">Find the right irrigation pipe<br />for your project</h2>
          <p className="xp-inquiry-product">{product.name}</p>
          <InquiryForm productName={product.name} />
          <Link className="xp-contact-link" href="/contact">More ways to discuss your project ↗</Link>
        </aside>
      </div>
    </main>
  )
}
