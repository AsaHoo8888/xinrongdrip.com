import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'XINRONG drip irrigation equipment, emitters, tape, injection molds and auxiliary equipment.',
  images: [
    {
      url: `${getServerSideURL()}/xinrong/field.webp`,
    },
  ],
  siteName: 'XINRONG',
  title: 'XINRONG',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
