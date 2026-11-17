import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import '../drippers/emitters.css'

export const metadata: Metadata = {
  title: 'Irrigation Production Lines | XINRONG',
  description: 'Explore complete production lines for inline flat dripper pipe, pressure compensating dripper pipe, cylindrical dripper pipe and T-Tape.',
  alternates: { canonical: '/production-lines' },
}

const productionLines = [
  {
    slug: 'high-speed-inline-flat-dripper-production-line',
    name: 'High Speed Inline Flat Dripper Irrigation Pipe Production Line',
    description: 'PLC-controlled production at 350–400 m/min, with online visual inspection and automatic roll changing.',
    image: '/xinrong/inline-flat-dripper-production-line/image1.jpeg',
    width: 1265,
    height: 222,
  },
  {
    slug: 'inline-pressure-compensating-dripper-production-line',
    name: 'Inline Pressure Compensating Dripper Irrigation Pipe Production Line',
    description: 'PLC-synchronized production at 80–140 m/min, with online hole inspection and automatic roll changing.',
    image: '/xinrong/inline-pressure-compensating-dripper-production-line/image1.webp',
    width: 1254,
    height: 185,
  },
  {
    slug: 'inline-cylindrical-dripper-production-line',
    name: 'Inline Cylindrical Dripper Irrigation Pipe Production Line',
    description: 'PLC-synchronized production at 80–140 m/min, with online hole inspection and automatic roll changing.',
    image: '/xinrong/inline-cylindrical-dripper-production-line/image1.webp',
    width: 3000,
    height: 443,
  },
  {
    slug: 'inline-t-tape-dripper-production-line',
    name: 'Inline T-Tape Dripper Irrigation Pipe Production Line',
    description: 'PLC-synchronized production at 250–300 m/min, with internal labyrinth strip cooling, online inspection and automatic roll changing.',
    image: '',
    width: 0,
    height: 0,
  },
]

export default function ProductionLinesPage() {
  return (
    <main className="xr-main xr-indust xe-page">
      <section className="xi-wrap xe-heading">
        <Link className="xe-back" href="/#products">← All product categories</Link>
        <p className="xi-eyebrow">IRRIGATION PRODUCTION EQUIPMENT</p>
        <h1>Complete production lines.</h1>
        <p>Explore equipment for inline flat dripper pipe, pressure compensating dripper pipe, cylindrical dripper pipe and T-Tape production.</p>
      </section>
      <section className="xi-wrap xe-grid" aria-label="Production lines">
        {productionLines.map((product, index) => (
          <Link className="xe-card" href={`/production-lines/${product.slug}`} key={product.slug}>
            <div className="xe-card-image">
              {product.image && <Image src={product.image} alt={product.name} width={product.width} height={product.height} sizes="(max-width: 700px) 88vw, 44vw" preload={index === 0} unoptimized />}
            </div>
            <div className="xe-card-copy">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span className="xe-card-link">View production line <span aria-hidden="true">↗</span></span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
