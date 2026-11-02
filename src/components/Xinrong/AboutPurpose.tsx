'use client'

import { useState } from 'react'

const purposes = [
  [
    'Our mission',
    'Connect precision production with practical irrigation. We bring equipment, components and tooling into one focused range, helping you define the requirements for each stage of your project.',
  ],
  [
    'Our vision',
    'A clear connection between the production line and the growing field. Equipment choices, component design and irrigation requirements should work together from the start.',
  ],
  [
    'Our goal',
    'Start every conversation with the right details. Understand the application, define the specifications and identify the equipment, components or molds your project needs.',
  ],
]

export function AboutPurpose() {
  const [active, setActive] = useState(0)
  return (
    <div className="xa-purpose">
      <div className="xa-tabs" role="tablist" aria-label="Our purpose">
        {purposes.map(([title], index) => (
          <button
            key={title}
            id={`purpose-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`purpose-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = index
              if (event.key === 'ArrowRight') next = (index + 1) % purposes.length
              else if (event.key === 'ArrowLeft')
                next = (index + purposes.length - 1) % purposes.length
              else if (event.key === 'Home') next = 0
              else if (event.key === 'End') next = purposes.length - 1
              else return
              event.preventDefault()
              setActive(next)
              document.getElementById(`purpose-tab-${next}`)?.focus()
            }}
          >
            {title}
          </button>
        ))}
      </div>
      {purposes.map(([title, copy], index) => (
        <div
          key={title}
          id={`purpose-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`purpose-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
        >
          <p>{copy}</p>
        </div>
      ))}
    </div>
  )
}
