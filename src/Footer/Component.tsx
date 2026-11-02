import Link from 'next/link'
export function Footer() {
  return (
    <footer className="xr-footer text-white pt-15 px-[6%] pb-[25px] max-[700px]:pt-10 max-[700px]:px-[6%] max-[700px]:pb-[25px]">
      <div className="xr-footer-top flex items-center justify-between gap-[30px] pb-[55px] max-[1000px]:flex-wrap max-[700px]:block max-[700px]:pb-[35px]">
        <Link href="/" className="xr-footer-name">
          XINRONG<span>®</span>
        </Link>
        <p>
          From precision production
          <br />
          to every drop in the field.
        </p>
        <Link href="/contact">Let’s talk about your project ↗</Link>
      </div>
      <div className="xr-footer-bottom flex justify-between gap-5 max-[700px]:flex-col max-[700px]:gap-3">
        <span>© {new Date().getFullYear()} XINRONG. All rights reserved.</span>
        <span>Drip irrigation · Machinery · Molds</span>
        <Link href="/#products">Explore products ↑</Link>
      </div>
    </footer>
  )
}
