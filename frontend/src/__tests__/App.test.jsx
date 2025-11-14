/// <reference types="vitest" />
import React from 'react'
import { render, screen } from '@testing-library/react'

function Dummy() {
  return <div>Hello World</div>
}

test('dummy renders', () => {
  render(<Dummy />)
  expect(screen.getByText('Hello World')).toBeInTheDocument()
})
