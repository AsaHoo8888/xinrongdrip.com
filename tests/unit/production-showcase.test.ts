// @vitest-environment jsdom
import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { ProductionShowcase } from '../../src/components/Xinrong/ProductionShowcase'

afterEach(cleanup)

it('switches the preview and destination on hover and keyboard focus', () => {
  const { container } = render(React.createElement(ProductionShowcase))
  expect(screen.getByRole('heading').textContent).toBe('Productionlines')
  const rows = container.querySelectorAll<HTMLAnchorElement>('.xi-project-row')
  const images = ['inline-flat-dripper-production-line/image1.jpeg', 'inline-pressure-compensating-dripper-production-line/image1.webp', 'inline-cylindrical-dripper-production-line/image1.webp', 'inline-t-tape-dripper-production-line/finished-product.jpg']
  expect(rows).toHaveLength(4)
  rows.forEach((row, index) => {
    fireEvent.mouseEnter(row)
    expect(container.querySelector('.xi-project-image img')?.getAttribute('src')).toBe(`/xinrong/${images[index]}`)
    expect(container.querySelector('.xi-project-image')?.getAttribute('href')).toBe(row.getAttribute('href'))
  })
  fireEvent.focus(rows[0])
  expect(container.querySelector('.xi-project-image img')?.getAttribute('src')).toBe(`/xinrong/${images[0]}`)
})
