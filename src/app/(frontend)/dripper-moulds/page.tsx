import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import '../drippers/emitters.css'
import '../drip-tape/drip-tape.css'
import './moulds.css'

export const metadata: Metadata = {
  title: 'Dripper Moulds | XINRONG',
  description: 'Flat and cylindrical dripper injection moulds, with standard 256, 448, 576 and 640-cavity configurations and custom tooling development.',
  alternates: { canonical: '/dripper-moulds' },
}

export default function DripperMouldsPage() {
  return (
    <main className="xr-main xr-indust xe-page xt-page xm-page">
      <section className="xi-wrap xe-heading">
        <Link className="xe-back" href="/#products">← All product categories</Link>
        <p className="xi-eyebrow">PRECISION INJECTION TOOLING</p>
        <h1>Dripper Moulds</h1>
        <p>Specialized tools for the mass production of flat, cylindrical and pressure-compensating drippers for drip irrigation systems.</p>
      </section>
      <section className="xi-wrap xe-grid" aria-label="Dripper mould products">
        {[
          ['Flat Dripper Mould', 'flat-dripper-mould.png'],
          ['Cylindrical Dripper Mould', 'cylindrical-dripper-mould.png'],
        ].map(([name, image], index) => (
          <article className="xe-card" key={name}>
            <div className="xe-card-image">
              <Image unoptimized src={`/xinrong/dripper-moulds/${image}`} alt={name} width={1200} height={1000} sizes="(max-width: 700px) 88vw, 44vw" preload={index === 0} />
            </div>
            <div className="xe-card-copy"><h2>{name}</h2></div>
          </article>
        ))}
      </section>
      <section className="xi-wrap xm-section" aria-labelledby="mould-overview">
        <p className="xi-eyebrow">STANDARD AND CUSTOM MOULDS</p>
        <h2 id="mould-overview">From your drawing to the finished product.</h2>
        <p>We provide specialized injection moulds for drippers, supported by comprehensive processing and inspection facilities. Advanced manufacturing equipment and mature production processes ensure high precision for every component and a high pass rate for every batch, earning recognition from clients domestically and internationally.</p>
        <p>Standard multi-cavity moulds are available in 256, 448, 576 and 640-cavity configurations. We also develop custom, non-standard moulds tailored to specific structural, dimensional and production capacity requirements.</p>
      </section>
      <section className="xi-wrap xm-section" aria-labelledby="mould-features">
        <p className="xi-eyebrow">MOULD FEATURES</p>
        <h2 id="mould-features">Precision across every cavity.</h2>
        <p>We offer a one-stop solution, from technical drawings to the finished product. Manufactured from high-quality mould steel and precision-machined by CNC, our moulds feature stable heat treatment and optimized runner designs for high precision, extended service life, smooth demoulding and excellent product consistency.</p>
        <dl className="xm-specifications">
          {[
            ['Service life', 'Guaranteed for at least 10 million injection cycles'],
            ['Moulding cycle time', 'Approximately 4.7 seconds'],
            ['Machining precision', '±0.01 mm'],
            ['Surface roughness', 'Ra 0.1'],
            ['Dripper manufacturing deviation (Cu)', '< 1%'],
            ['Flow rate variation coefficient', '< 4%'],
            ['Repeat positioning accuracy', 'Up to 0.003 mm'],
            ['Dripper flow rates', '0.6–8 L/H'],
            ['Flow uniformity', '≤ 5%'],
          ].map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </section>
      <section className="xi-wrap xm-section" aria-labelledby="mould-equipment">
        <p className="xi-eyebrow">MANUFACTURING AND QUALITY CONTROL</p>
        <h2 id="mould-equipment">Processing and inspection equipment.</h2>
        <p>We use advanced, Japanese-imported manufacturing equipment, including Sodick wire-cut EDM machines, mirror-finish EDM machines and high-speed machining centers. High-end inspection and testing instruments, including coordinate measuring machines (CMMs) and optical comparators, support precise inspection and delivery quality.</p>
      </section>
      <section className="xi-wrap xe-help">
        <div><h2>Let’s define your mould.</h2><p>Share your dripper drawing, dimensions, cavity count and production requirements.</p></div>
        <Link className="xi-button xi-button-light" href="/contact">Discuss your requirements <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  )
}
