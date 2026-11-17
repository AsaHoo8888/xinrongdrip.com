import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  return [
    internetExplorerRedirect,
    {
      source: '/dripper-injection-molding-mould',
      destination: '/dripper-moulds',
      permanent: true,
    },
    {
      source: '/drip-irrigation-pipe/:path*',
      destination: '/driplines/:path*',
      permanent: true,
    },
    {
      source: '/drip-emitters/:path*',
      destination: '/drippers/:path*',
      permanent: true,
    },
    {
      source: '/products/external-pre-punched-hose-production-line',
      destination: '/production-lines',
      permanent: true,
    },
  ]
}
