import { existsSync } from 'node:fs'
import { expect, it } from 'vitest'
import { accessories } from '../../src/app/(frontend)/accessory-equipment/products'

it('provides five distinct accessory products with matching local images and descriptions', () => {
  expect(accessories.map(({ name }) => name)).toEqual([
    'On-site Waste Pipe Pelletizing Machine',
    'Pipe Welding and Rewinding Machine',
    'Packing Machine',
    'Water Flow Testing Machine',
    'Mixing and Drying Machine',
  ])
  expect(new Set(accessories.map(({ slug }) => slug)).size).toBe(5)
  for (const product of accessories) {
    expect(existsSync(`public${product.image}`)).toBe(true)
    expect(product.image).toContain(`/${product.slug}.`)
    expect(product.description.length).toBeGreaterThan(30)
    expect(product.features.length).toBeGreaterThan(0)
  }
  expect(accessories[0].description).toContain('150 kg/h')
})
