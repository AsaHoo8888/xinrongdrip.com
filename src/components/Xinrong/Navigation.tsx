'use client'
import Link from 'next/link'
import { useState } from 'react'

export function Navigation() {
  const [open, setOpen] = useState(false)
  return (
    <header className="xr-header bg-white h-25 py-0 px-[5%] flex items-center justify-between sticky top-0 z-[40] max-[1000px]:h-[85px] max-[700px]:h-[75px] max-[700px]:py-0 max-[700px]:px-[6%]">
      <Link href="/" aria-label="XINRONG home" className="xr-logo">
        <img src="/xinrong/logo.png" alt="XINRONG 江苏欣荣" width="332" height="118" />
      </Link>
      <button
        className="xr-menu hidden max-[700px]:block max-[700px]:p-3"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="main-navigation"
      >
        {open ? 'Close ✕' : 'Menu ☰'}
      </button>
      <nav
        id="main-navigation"
        className={`xr-nav flex items-center gap-[28px] max-[1100px]:gap-[16px] max-[700px]:hidden max-[700px]:absolute max-[700px]:top-[75px] max-[700px]:left-0 max-[700px]:right-0 max-[700px]:pt-5 max-[700px]:px-[6%] max-[700px]:pb-[30px] max-[700px]:flex-col max-[700px]:gap-0 ${open ? 'is-open' : ''}`}
        aria-label="Main navigation"
      >
        {[
          ['Products', '/#products'],
          ['Production Lines', '/production-lines/external-pre-punched-hose-production-line'],
          ['Drip Emitters', '/drip-emitters'],
          ['Drip Tape', '/drip-tape'],
          ['Applications', '/#applications'],
          ['About XINRONG', '/about'],
        ].map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="xr-nav-contact bg-xr-blue text-white ml-3 py-[15px] px-[23px]"
          onClick={() => setOpen(false)}
        >
          Get in touch <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  )
}
