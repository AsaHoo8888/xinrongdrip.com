export const dripTapes = [
  {
    slug: 'strip-drip-tape',
    name: 'Strip Drip Tape',
    sourceId: '12046961',
    tag: 'Flexible tape · Field crops',
    description: 'Lightweight, flexible drip tape with an integrated emitter strip. An optimized flow path supports water and fertilizer delivery across large-scale crop plantings.',
    features: [
      'An integrated strip design and optimized flow path help resist clogging.',
      'A thin, flexible structure lays flat for efficient field installation.',
      'Emitter spacing and flow rate can be selected for different soils and irrigation needs.',
      'Bulk customization supports large agricultural irrigation projects.',
    ],
    specifications: [['Design', 'Integrated emitter strip'], ['Emitter spacing', 'Customized to requirements'], ['Flow rate', 'Customized to requirements'], ['Crops', 'Cotton, corn, melons and vegetables']],
    application: 'For large-scale field crops and vegetable production. Share your soil conditions, row layout, required flow rate and roll requirements when specifying the tape.',
    images: 2,
  },
  {
    slug: 'cylindrical-emitter-drip-tubing',
    name: 'Cylindrical Emitter Drip Tubing',
    sourceId: '12041902',
    tag: 'Durable tubing · Orchards',
    description: 'Thick-wall drip tubing with integrated cylindrical emitters for long-term irrigation. Available with standard or pressure compensating emitters to suit the terrain.',
    features: [
      'Integrated cylindrical emitters simplify installation and provide a smooth internal profile.',
      'Wide inlet filter windows and turbulent flow paths help reduce clogging.',
      'Flushing structures support self-cleaning operation.',
      'Pressure compensating versions use a silicone diaphragm to regulate discharge across changing pressures.',
    ],
    specifications: [['Tubing diameter', '12 / 16 / 20 mm'], ['Wall thickness', '0.5–1.5 mm, optional'], ['Emitter spacing', '300 / 400 / 500 mm'], ['Emitter options', 'Standard or pressure compensating']],
    application: 'For orchards, landscaping, field crops and greenhouses requiring durable irrigation tubing. Select the pressure compensating version for uneven terrain or long runs, and confirm burial conditions for subsurface installation.',
    images: 2,
  },
  {
    slug: 'pressure-compensating-drip-tape',
    name: 'Pressure Compensating Drip Tape',
    sourceId: '12046957',
    tag: 'Uneven terrain · Uniform discharge',
    description: 'Integrated pressure compensating flat emitters regulate discharge within the operating pressure range, supporting uniform irrigation on hillsides and longer runs.',
    features: [
      'Single-pass extrusion integrates the emitters without manual installation.',
      'A labyrinth flow path and silicone diaphragm compensate for pressure changes.',
      'Extended filtered inlets help resist clogging.',
      'An anti-siphon mechanism helps prevent sediment from entering at shutdown, supporting subsurface irrigation.',
      'PE construction resists corrosion for lasting irrigation use.',
    ],
    specifications: [['Tubing diameter', '12 / 16 / 18 / 20 mm'], ['Wall thickness', '0.4–1.2 mm'], ['Emitter spacing', '400–1000 mm'], ['Nominal flow rate', '1.0–3.0 L/h'], ['Working pressure', '50–350 kPa'], ['Laying length', '150–500 m, depending on configuration']],
    application: 'For greenhouses, orchards, vineyards and nurseries, especially with uneven terrain, unstable system pressure or long irrigation runs. Suitable for subsurface field irrigation when the selected configuration and installation conditions are confirmed.',
    images: 2,
  },
  {
    slug: 'inline-flat-emitter-drip-tape',
    name: 'Inline Flat Emitter Drip Tape',
    sourceId: '12046909',
    tag: 'Integrated emitters · Broad crop use',
    description: 'Drip tape with integrated flat emitters for uniform water delivery. A compact design and PE construction suit broad-acre crops, greenhouses and nurseries.',
    features: [
      'Single-pass extrusion integrates the emitters without manual assembly.',
      'Wide, long turbulent flow paths provide self-flushing action and clog resistance.',
      'Low emitter manufacturing variation supports uniform discharge.',
      'Multiple flow rates, wall thicknesses and spacings accommodate different irrigation layouts.',
      'UV- and corrosion-resistant construction supports agricultural use and mechanical laying.',
    ],
    specifications: [['Tape diameter', '8 / 10 / 12 / 16 / 20 mm'], ['Wall thickness', '0.12–0.4 mm'], ['Emitter spacing', '50–300 mm'], ['Nominal flow rate', '1.0–3.0 L/h'], ['Working pressure', '50–350 kPa'], ['Laying length', '40–125 m, depending on configuration']],
    application: 'For vegetables, fruit, flowers, medicinal crops, greenhouses and field crops. Match the emitter flow rate, spacing and run length to the crop layout and water supply.',
    images: 2,
  },
]

export function dripTapeImage(sourceId: string, index = 1) {
  return `/xinrong/drip-tape/${sourceId}-${index}.jpg`
}
