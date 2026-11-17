'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const productionLines = [
  {
    title: 'High speed inline flat dripper production line',
    href: '/production-lines/high-speed-inline-flat-dripper-production-line',
    image: '/xinrong/inline-flat-dripper-production-line/image1.jpeg',
    width: 1265,
    height: 222,
  },
  {
    title: 'Inline pressure compensating dripper production line',
    href: '/production-lines/inline-pressure-compensating-dripper-production-line',
    image: '/xinrong/inline-pressure-compensating-dripper-production-line/image1.webp',
    width: 1254,
    height: 185,
  },
  {
    title: 'Inline cylindrical dripper production line',
    href: '/production-lines/inline-cylindrical-dripper-production-line',
    image: '/xinrong/inline-cylindrical-dripper-production-line/image1.webp',
    width: 3000,
    height: 443,
  },
  {
    title: 'Inline T-Tape dripper production line',
    href: '/production-lines/inline-t-tape-dripper-production-line',
    image: '/xinrong/inline-t-tape-dripper-production-line/finished-product.jpg',
    width: 1568,
    height: 527,
  },
]

export function ProductionShowcase() {
  const [active, setActive] = useState(0)
  const product = productionLines[active]

  return (
      <section
        className="xi-projects xi-wrap xi-section"
        id="showcase"
        aria-labelledby="showcase-heading"
      >
        <div className="xi-projects-copy">
          <h2 id="showcase-heading">
            Production
            <br />
            lines
          </h2>
          <div className="xi-project-list">
            {productionLines.map((line, index) => (
              <Link className="xi-project-row" href={line.href} key={line.href}
                onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
                <span>
                  <span className="xi-project-title">{line.title}</span>
                  <span className="xi-project-category">Production equipment</span>
                </span>
                <span className="xi-project-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
        <Link
          className="xi-project-image"
          href={product.href}
          aria-label={`Explore ${product.title}`}
        >
          <Image
            src={product.image}
            alt={`XINRONG ${product.title}`}
            width={product.width}
            height={product.height}
            unoptimized
            sizes="(max-width: 700px) 88vw, 34vw"
          />
        </Link>
      </section>
  )
}
