import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { dripPipes, dripPipeImage } from '../../src/app/(frontend)/driplines/products'

describe('driplines catalog', () => {
  it('has four unique products with two existing images each', () => {
    expect(dripPipes).toHaveLength(4)
    expect(new Set(dripPipes.map(({ slug }) => slug)).size).toBe(4)
    for (const product of dripPipes) {
      for (let index = 1; index <= product.images; index++) {
        expect(existsSync(`public${dripPipeImage(product.sourceId, index)}`)).toBe(true)
      }
    }
  })

  it('preserves diameter-specific wall thickness and T-Tape spacing', () => {
    expect(dripPipes[0].specifications).toContainEqual(['Wall thickness — 22 mm pipe', '0.18–0.4 mm'])
    expect(dripPipes[1].specifications).toContainEqual(['Wall thickness — 22 mm pipe', '0.4–1.2 mm'])
    expect(dripPipes[3].specifications).toContainEqual(['Dripper spacing', '100–300 mm'])
  })
})
