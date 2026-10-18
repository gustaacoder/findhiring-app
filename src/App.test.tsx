import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, test, expect } from 'vitest'
import App from './App'

describe('App', () => {
  test('renders FindHiring', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>,
    )
    expect(screen.getByText(/FindHiring/i)).toBeInTheDocument()
  })
})
