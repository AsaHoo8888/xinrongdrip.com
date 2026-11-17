'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const products = [
  {
    name: 'Drippers',
    title: 'Emitters for drip irrigation',
    description:
      'Water-delivery components for drip irrigation systems. Compare the emitter design with your tape or tubing and the conditions in which it will operate.',
    selection: [
      ['Hydraulic requirements', 'Required flow rate and operating pressure'],
      ['Component fit', 'Emitter dimensions and tape or tubing compatibility'],
      ['Water conditions', 'Water quality and filtration requirements'],
    ],
    type: 'emitters',
  },
  {
    name: 'Dripper Moulds',
    title: 'Dripper Moulds',
    description:
      'Flat and cylindrical dripper moulds with standard 256, 448, 576 and 640-cavity configurations, plus custom tooling for your production requirements.',
    selection: [
      ['Part definition', '2D or 3D drawing, dimensions and intended resin'],
      ['Tooling requirements', 'Cavity count and molding machine interface'],
      ['Acceptance criteria', 'Critical dimensions and sample requirements'],
    ],
    type: 'mold',
  },
  {
    name: 'Driplines',
    title: 'Inline dripper irrigation pipe',
    description:
      'Compare flat, pressure compensating, cylindrical and T-Tape dripper designs for your crop, terrain and installation conditions.',
    selection: [
      ['Pipe dimensions', 'Nominal diameter and wall thickness'],
      ['Water delivery', 'Dripper spacing, flow rate and operating pressure'],
      ['Installation', 'Terrain, run length and surface or subsurface laying'],
    ],
    type: 'pipe',
  },
  {
    name: 'Accessory Equipment',
    title: 'Accessory equipment for your production line',
    description:
      'Equipment for waste pipe recycling, welding and rewinding, packing, water flow testing, mixing and drying.',
    selection: [
      ['Process requirements', 'Required function and production-line information'],
      ['Equipment interfaces', 'Connection points, dimensions and layout'],
      ['Available utilities', 'Power supply and other installation requirements'],
    ],
    type: 'auxiliary',
  },
]

export function ProductDrawing({ type }: { type: string }) {
  return (
    <svg
      className="xr-product-drawing w-full max-h-[370px] max-[700px]:h-60"
      viewBox="0 0 760 410"
      role="img"
      aria-label={`${type === 'line' ? 'Drip tape production equipment' : type} concept illustration`}
    >
      <defs>
        <pattern id="vents" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 3h5" stroke="#8698a6" strokeWidth="2" />
        </pattern>
      </defs>
      {type === 'line' ? (
        <g>
          <ellipse cx="385" cy="348" rx="335" ry="16" fill="#dce3e7" />
          <path d="M60 247l109-31 484 25-95 40z" fill="#b6c3cc" />
          <path d="M60 247v65l498 30v-61z" fill="#e0e5e9" />
          <path d="M558 281l95-40v67l-95 34" fill="#8b9eae" />
          <path d="M84 309v34h17v-33M514 338v27h17v-26M625 319v26h16v-31" fill="#253c4c" />
          <path d="M122 176l73-24 168 11-66 26z" fill="#eef2f5" />
          <path d="M122 176v106l175 12V189z" fill="#4865ac" />
          <path d="M297 189l66-26v108l-66 23" fill="#294781" />
          <path d="M142 198l134 9v49l-134-9z" fill="url(#vents)" />
          <path d="M188 151v-44l26-10 41 3v48" fill="#b3bec6" />
          <path d="M174 94l32 32 31 2 28-30z" fill="#c9d3da" />
          <ellipse cx="220" cy="94" rx="46" ry="12" fill="#eff2f4" />
          <path d="M362 223l130 8v37l-130-9z" fill="#738896" />
          <path
            d="M377 223v-31h9v32m23 2v-32h9v33m23 1v-31h9v32m23 1v-31h9v32"
            stroke="#d1dbe0"
            strokeWidth="7"
          />
          <path d="M494 191l69-23 74 5-66 24z" fill="#f4f6f7" />
          <path d="M494 191v97l77 5v-96z" fill="#e5e9ec" />
          <path d="M571 197l66-24v96l-66 24" fill="#bbc8d1" />
          <path d="M510 204l45 3v48l-45-3z" fill="#183645" />
          <path d="M516 211l32 2v23l-32-2z" fill="#88aeb0" />
          <circle cx="519" cy="246" r="3" fill="#62bb3a" />
          <circle cx="534" cy="247" r="3" fill="#e7ac35" />
          <path d="M652 204l35-12v118l-35 15z" fill="#405b70" />
          <ellipse cx="671" cy="213" rx="29" ry="61" fill="#1d313e" />
          <ellipse cx="671" cy="213" rx="20" ry="48" fill="#6a7d8a" />
          <ellipse cx="671" cy="213" rx="8" ry="18" fill="#c7d2d9" />
          <path d="M363 240l290-15" stroke="#202d34" strokeWidth="3" />
        </g>
      ) : type === 'tape' ? (
        <g fill="none" stroke="#202d34">
          <ellipse cx="370" cy="225" rx="150" ry="93" strokeWidth="55" />
          <ellipse cx="370" cy="203" rx="150" ry="93" strokeWidth="28" />
          <ellipse cx="370" cy="203" rx="120" ry="72" stroke="#57636b" strokeWidth="2" />
          <path d="M505 247q60 37 170 32" strokeWidth="35" />
          <path d="M510 238q60 37 165 32" stroke="#648db6" strokeWidth="2" />
          <ellipse cx="370" cy="203" rx="54" ry="34" stroke="#648db6" strokeWidth="3" />
        </g>
      ) : type === 'emitters' ? (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${145 + i * 180} ${155 + i * 24}) rotate(-18)`}>
              <rect width="135" height="93" rx="16" fill="#233e3d" />
              <rect x="12" y="12" width="111" height="69" rx="8" fill="#304e4a" />
              <path
                d="M25 23h80v10H30v10h75v10H30v10h75"
                stroke="#88a797"
                strokeWidth="4"
                fill="none"
              />
              <circle cx="117" cy="71" r="7" fill="#152a2a" />
            </g>
          ))}
        </g>
      ) : type === 'mold' ? (
        <g>
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${145 + i * 270} ${150 - i * 25})`}>
              <path d="M0 0l73-40 180 22-73 40z" fill="#dae1e5" />
              <path d="M0 0v132l180 23V22z" fill="#a5b4bf" />
              <path d="M180 22l73-40v132l-73 41z" fill="#647f91" />
              {[0, 1, 2].map((j) => (
                <g key={j}>
                  <rect x={25 + j * 46} y="44" width="23" height="59" rx="9" fill="#344f5e" />
                  <circle cx={37 + j * 46} cy="59" r="6" fill="#d3dde2" />
                </g>
              ))}
            </g>
          ))}
        </g>
      ) : (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${110 + i * 185} ${155 - i * 25})`}>
              <path d="M0 40l48-24 103 9-47 25z" fill="#e1e7eb" />
              <path d="M0 40v124l104 13V50z" fill="#4364a8" />
              <path d="M104 50l47-25v125l-47 27z" fill="#2b467b" />
              <path d="M24 27V-7l70-2v40" fill="#aabecb" />
              <ellipse cx="59" cy="-10" rx="36" ry="12" fill="#e2e8eb" />
              <rect x="20" y="75" width="43" height="32" fill="#233e4c" />
              <circle cx="35" cy="126" r="5" fill="#7bc549" />
            </g>
          ))}
        </g>
      )}
    </svg>
  )
}

export function ProductExplorer() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const selectAuxiliary = () => {
      if (window.location.hash === '#auxiliary-equipment') {
        setActive(products.findIndex((product) => product.type === 'auxiliary'))
      }
    }
    selectAuxiliary()
    window.addEventListener('hashchange', selectAuxiliary)
    return () => window.removeEventListener('hashchange', selectAuxiliary)
  }, [])
  const product = products[active]
  return (
    <section className="xr-products" id="products">
      <div className="xr-wrap py-[90px] px-[6%] max-w-400 m-auto max-[1000px]:pt-[65px] max-[1000px]:pb-[65px] max-[700px]:py-[55px] max-[700px]:px-[6%]">
        <div className="xr-section-heading flex items-start justify-between gap-[30px] mb-10 max-[700px]:block max-[700px]:mb-[27px]">
          <h2>Find your product.</h2>
          <p>
            Compare the application and selection details
            <br />
            across our {products.length} product categories.
          </p>
        </div>
        <div
          className="xr-product-tabs grid grid-cols-4 gap-[5px] max-[700px]:flex max-[700px]:overflow-x-auto max-[700px]:pb-[5px]"
          role="group"
          aria-label="Product categories"
        >
          {products.map((p, i) => (
            <button className="scroll-mt-28" id={p.type === 'auxiliary' ? 'auxiliary-equipment' : undefined} key={p.name} aria-pressed={active === i} onClick={() => setActive(i)}>
              {p.name}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div
          className="xr-product-panel bg-white grid grid-cols-[1.5fr_1fr] min-h-[405px] mt-[6px] max-[1000px]:grid-cols-[1.2fr_1fr] max-[700px]:grid-cols-[1fr]"
          aria-live="polite"
        >
          <div className="xr-product-visual flex flex-col items-center justify-center overflow-hidden max-[700px]:min-h-[250px]">
            {product.type === 'auxiliary' ? (
              <Image unoptimized src="/xinrong/accessory-equipment/on-site-waste-pipe-pelletizing-machine.png" alt="On-site Waste Pipe Pelletizing Machine" width={1200} height={900} className="w-full max-h-[370px] object-contain" sizes="(max-width: 700px) 88vw, 50vw" />
            ) : product.type === 'mold' ? (
              <Image unoptimized src="/xinrong/dripper-moulds/flat-dripper-mould.png" alt="Flat Dripper Mould" width={1200} height={1000} className="w-full max-h-[370px] object-contain" sizes="(max-width: 700px) 88vw, 50vw" />
            ) : product.type === 'emitters' ? (
              <Image unoptimized src="/xinrong/emitters/emitter-category-wide.png" alt="Cylindrical, flat and pressure compensating drip emitters" width={1200} height={800} className="w-full max-h-[370px] object-contain" sizes="(max-width: 700px) 88vw, 50vw" />
            ) : product.type === 'pipe' ? (
              <Image unoptimized src="/xinrong/drip-irrigation-pipe/pipe-category-transparent.png" alt="Cylindrical, T-Tape, pressure compensating and flat dripper irrigation pipe" width={1200} height={800} className="w-full max-h-[370px] object-contain" sizes="(max-width: 700px) 88vw, 50vw" />
            ) : (
              <><ProductDrawing type={product.type} /><span>Category illustration · Not a specific model</span></>
            )}
          </div>
          <div className="xr-product-copy py-[42px] px-[38px] max-[1000px]:py-[30px] max-[1000px]:px-6 max-[700px]:pt-[30px] max-[700px]:px-6 max-[700px]:pb-[35px]">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            {product.type === 'auxiliary' && (
              <Link className="xr-text-link text-xr-blue inline-flex gap-4 items-center mt-5" href="/accessory-equipment">
                Explore all 5 accessory equipment products <span aria-hidden="true">↗</span>
              </Link>
            )}
            {product.type === 'mold' && (
              <Link className="xr-text-link text-xr-blue inline-flex gap-4 items-center mt-5" href="/dripper-moulds">
                Explore dripper moulds <span aria-hidden="true">↗</span>
              </Link>
            )}
            {product.type === 'line' && (
              <Link
                className="xr-text-link text-xr-blue inline-flex gap-4 items-center mt-5"
                href="/production-lines"
              >
                Explore all production lines <span aria-hidden="true">↗</span>
              </Link>
            )}
            {product.type === 'emitters' && (
              <Link
                className="xr-text-link text-xr-blue inline-flex gap-4 items-center mt-5"
                href="/drippers"
              >
                Explore all drippers <span aria-hidden="true">↗</span>
              </Link>
            )}
            {product.type === 'pipe' && (
              <Link className="xr-text-link text-xr-blue inline-flex gap-4 items-center mt-5" href="/driplines">
                Explore all 4 driplines <span aria-hidden="true">↗</span>
              </Link>
            )}
            {product.type === 'tape' && (
              <Link
                className="xr-text-link text-xr-blue inline-flex gap-4 items-center mt-5"
                href="/drip-tape"
              >
                Explore all 4 drip tape products <span aria-hidden="true">↗</span>
              </Link>
            )}
            <div className="mt-6">
              <h4 className="text-base font-semibold text-xr-ink">{product.type === 'line' ? 'Details for production line selection' : 'Details for product selection'}</h4>
              <p className="mt-2 text-base leading-relaxed text-xr-muted">
                Share these details when requesting specifications.
              </p>
              <dl className="mt-4 space-y-4">
                {product.selection.map(([label, detail]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] gap-4 max-[1000px]:grid-cols-1 max-[1000px]:gap-1"
                  >
                    <dt className="text-sm font-semibold text-xr-ink">{label}</dt>
                    <dd className="text-base leading-relaxed text-xr-muted">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a
              href={`#contact`}
              className="xr-text-link text-xr-blue inline-flex gap-10 items-center mt-[25px]"
            >
              {product.type === 'line' ? 'Request production line specifications' : 'Request product specifications'} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
