export const dripPipes = [
  {
    slug: 'inline-flat-dripper-irrigation-pipe',
    name: 'Inline Flat Dripper Irrigation Pipe',
    sourceId: 'flat',
    tag: 'Integrated flat drippers · Field crops',
    description: 'An integrated pipe with flat drippers embedded during extrusion for compact construction and uniform, stable water output.',
    features: [
      'Resists aging, tensile stress, acids and alkalis.',
      'Simple installation supports mechanized laying to reduce labor costs.',
      'Integrated construction supports large-scale, water-efficient irrigation.',
    ],
    specifications: [['Nominal diameter', '16 / 22 mm'], ['Wall thickness — 16 mm pipe', '0.15–0.4 mm'], ['Wall thickness — 22 mm pipe', '0.18–0.4 mm'], ['Dripper spacing', '100–1000 mm'], ['Water flow rate (L/h)', '0.8 / 1.1 / 1.4 / 1.6 / 2.0 / 2.7 / 3.0 / 4.0']],
    application: 'For large-scale field crops, vegetable greenhouses and plant nurseries requiring uniform water delivery and efficient installation.',
    images: 2,
  },
  {
    slug: 'inline-pressure-compensating-irrigation-pipe',
    name: 'Inline Pressure Compensating (PC) Irrigation Pipe',
    sourceId: 'pc',
    tag: 'Pressure compensation · Subsurface irrigation',
    description: 'Integrated pressure-compensating drippers automatically regulate flow for uniform water distribution on uneven terrain and over long distances.',
    features: [
      'Automatic flow regulation helps prevent water shortages at the far end and erosion near the source.',
      'High corrosion and clog resistance support a long service life, with flow rate deviation of ≤7% across a wide range of operating pressures and complex topographies.',
      'An anti-siphon function supports subsurface installation and direct water and nutrient delivery to the root zone.',
      'Buried installation reduces mechanical damage, eliminates annual retrieval and reinstallation, and facilitates mechanized harvesting.',
    ],
    specifications: [['Nominal diameter', '16 / 22 mm'], ['Wall thickness — 16 mm pipe', '0.4–1.0 mm'], ['Wall thickness — 22 mm pipe', '0.4–1.2 mm'], ['Dripper spacing', '100–1000 mm'], ['Water flow rate (L/h)', '0.9 / 1.6 / 2.0'], ['Flow rate deviation', '≤7%']],
    application: 'For precision irrigation over long distances and significant elevation changes, including subsurface systems designed to save water, fertilizer and labor.',
    images: 2,
  },
  {
    slug: 'inline-cylindrical-dripper-irrigation-pipe',
    name: 'Inline Cylindrical Dripper Irrigation Pipe',
    sourceId: 'cylindrical',
    tag: 'Thick-wall pipe · Long-term irrigation',
    description: 'Durable irrigation pipe with integrated cylindrical drippers, available in standard or pressure-compensating versions for long-term irrigation.',
    features: [
      'Turbulent-flow channels and dual water inlets and outlets provide clog resistance and consistent flow.',
      'A thick, pressure-resistant pipe wall withstands external mechanical stress and supports deep burial.',
      'Pressure-compensating models support uniform irrigation on complex terrain and long furrow runs.',
    ],
    specifications: [['Nominal diameter', '16 / 22 mm'], ['Wall thickness', '0.6–1.2 mm'], ['Dripper spacing', '100–1000 mm'], ['Water flow rate (L/h)', '1.5 / 2.0 / 3.0 / 4.0'], ['Dripper options', 'Standard or pressure compensating']],
    application: 'For long-term irrigation in hillside orchards, commercial tree plantations and landscape greenery, including deep-burial applications.',
    images: 2,
  },
  {
    slug: 'inline-t-tape-dripper-irrigation-pipe',
    name: 'Inline T-Tape Dripper Irrigation Pipe',
    sourceId: 't-tape',
    tag: 'Embedded strip · Large-scale cultivation',
    description: 'Thin, flexible irrigation tape with an embedded dripper strip and upgraded flow channels for high impurity throughput and strong clog resistance.',
    features: [
      'Optimized flow channels improve anti-clogging performance compared with ordinary drip tapes and adapt to varied water quality.',
      'Flexible tape lays flat without wrinkling for efficient large-scale installation.',
      'High production efficiency supports cost-effective irrigation, with spacing and flow options for different soils and water requirements.',
    ],
    specifications: [['Nominal diameter', '16 / 22 mm'], ['Wall thickness', '0.15–0.4 mm'], ['Dripper spacing', '100–300 mm'], ['Water flow rate (L/h)', '1.0 / 1.1 / 1.4 / 1.6 / 2.0 / 2.2 / 2.5 / 2.7']],
    application: 'For large-scale cultivation of cotton, corn, fruits and vegetables with different soil conditions and irrigation needs.',
    images: 2,
  },
]

export function dripPipeImage(sourceId: string, index = 1) {
  const extension = (sourceId === 'flat' && index === 1) || (sourceId === 'cylindrical' && index === 2) || (sourceId === 't-tape' && index === 2) ? 'jpg' : 'png'
  return `/xinrong/drip-irrigation-pipe/${sourceId}-${index}.${extension}`
}
