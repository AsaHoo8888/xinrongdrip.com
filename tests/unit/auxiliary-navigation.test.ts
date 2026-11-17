// @vitest-environment jsdom
import React from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { ProductExplorer } from '../../src/components/Xinrong/ProductExplorer'

vi.mock('next/image', () => ({ default: () => null }))

afterEach(() => {
  cleanup()
  window.history.replaceState(null, '', '/')
})

it('selects auxiliary equipment on arrival and hash navigation', () => {
  window.history.replaceState(null, '', '/#auxiliary-equipment')
  render(React.createElement(ProductExplorer))
  const auxiliary = screen.getByRole('button', { name: 'Accessory Equipment' })
  expect(auxiliary.getAttribute('aria-pressed')).toBe('true')
  expect(screen.getByRole('link', { name: /Explore all 5 accessory equipment products/ }).getAttribute('href')).toBe('/accessory-equipment')
  expect(auxiliary.id).toBe('auxiliary-equipment')
  fireEvent.click(screen.getByRole('button', { name: 'Dripper Moulds' }))
  expect(auxiliary.getAttribute('aria-pressed')).toBe('false')
  act(() => window.dispatchEvent(new HashChangeEvent('hashchange')))
  expect(auxiliary.getAttribute('aria-pressed')).toBe('true')
})
