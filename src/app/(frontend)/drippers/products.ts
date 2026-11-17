export const emitters = [
  {
    slug: 'flat-dripper',
    name: 'Flat Dripper',
    sourceId: 'flat-dripper',
    tag: 'Versatile · Field irrigation',
    description: 'A versatile flat dripper with mature technology for smooth, consistent water flow and economical large-scale field irrigation.',
    features: [
      'High-precision manufacturing achieves a flow variation coefficient of 3–5%.',
      'Mature technology and broad compatibility help reduce irrigation costs.',
      'Extended service life and reinforced anti-clogging structures can be customized to your requirements.',
    ],
    specifications: [['Water flow rate (L/h)', '0.8, 1.1, 1.4, 1.6, 2.0, 2.7, 3.0, 4.0'], ['Flow measurement pressure', '0.1 MPa'], ['Flow variation coefficient', '3–5%'], ['Customization', 'Available according to your requirements']],
    application: 'For large-scale field irrigation requiring consistent water delivery, versatility and cost efficiency.',
    images: 3,
  },
  {
    slug: 'pressure-compensating-emitter',
    name: 'Pressure Compensating (PC) Dripper',
    sourceId: 'pc-dripper',
    tag: 'Uneven terrain · Long runs',
    description: 'An extra-long filtered inlet, labyrinth flow path and high-quality silicone diaphragm provide consistent pressure compensation, uniform water output and a long service life.',
    features: [
      'A labyrinth flow path and high-quality silicone diaphragm ensure consistent pressure compensation and uniform water output.',
      'An extra-long filtered inlet provides excellent clog resistance.',
      'An anti-siphon mechanism prevents back-suction of sediment and debris when the system shuts down, supporting subsurface irrigation.',
    ],
    specifications: [['Water flow rate (L/h)', '0.8, 1.0, 1.5, 2.0'], ['Flow measurement pressure', '0.1 MPa'], ['Installation', 'Surface or subsurface irrigation'], ['Customization', 'Available according to your requirements']],
    application: 'For undulating terrain, very long irrigation runs and applications requiring high uniformity in water and fertilizer distribution.',
    images: 3,
  },
  {
    slug: 'cylindrical-emitter',
    name: 'Cylindrical Dripper',
    sourceId: 'cylindrical-dripper',
    tag: 'Landscaping · Nurseries',
    description: 'An enlarged filtration area, optimized inlet and wide, long turbulent-flow channel flush out impurities, resist clogging and reduce maintenance costs.',
    features: [
      'An enlarged filtration area and optimized water inlet help resist clogging.',
      'A wide, long turbulent-flow channel flushes out impurities and reduces maintenance costs.',
      'Effective self-flushing supports use with poor water quality and frequent flushing.',
    ],
    specifications: [['Water flow rate (L/h)', '1.5, 2.0, 3.0, 4.0'], ['Flow measurement pressure', '0.1 MPa'], ['Terrain', 'Flat ground and gentle slopes'], ['Customization', 'Available according to your requirements']],
    application: 'For landscapes and nurseries on flat or gently sloping terrain where water quality is poor and frequent flushing is required.',
    images: 3,
  },

]

export function emitterImage(sourceId: string, index = 1) {
  return `/xinrong/emitters/${sourceId}-${index}.jpg`
}
