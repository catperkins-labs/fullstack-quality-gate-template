import { render, screen } from '@testing-library/react'
import Hello from './Hello'

describe('Hello', () => {
  it('renders greeting with name', () => {
    render(<Hello name="World" />)
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })

  it('renders greeting with custom name', () => {
    render(<Hello name="TypeScript" />)
    expect(screen.getByText('Hello, TypeScript!')).toBeInTheDocument()
  })
})
