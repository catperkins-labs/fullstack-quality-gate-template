import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the Hello component', () => {
    render(<App />)
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })
})
