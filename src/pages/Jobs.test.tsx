import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { api } from '@/lib/api'
import Jobs from './Jobs'

vi.mock('@/lib/api', () => ({ api: { get: vi.fn() } }))

const mockedGet = vi.mocked(api.get)

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={client}><MemoryRouter><Jobs /></MemoryRouter></QueryClientProvider>)
}

describe('Jobs', () => {
  beforeEach(() => mockedGet.mockReset())

  test('renders open roles from the API', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [{ id: 1, title: 'Backend Laravel Developer', slug: 'backend-laravel-developer', description: 'Build reliable products.', description_preview: 'Build reliable products.', published_at: '2026-10-01T12:00:00Z' }],
        links: { first: null, last: null, prev: null, next: null },
        meta: { current_page: 1, from: 1, last_page: 1, path: '/api/v1/jobs', per_page: 9, to: 1, total: 1 },
      },
    })

    renderPage()

    expect(await screen.findByRole('heading', { name: 'Backend Laravel Developer' })).toBeInTheDocument()
    expect(screen.getByText('1 vaga')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver vaga' })).toHaveAttribute('href', '/jobs/backend-laravel-developer')
  })

  test('shows a useful empty state', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [],
        links: { first: null, last: null, prev: null, next: null },
        meta: { current_page: 1, from: null, last_page: 1, path: '/api/v1/jobs', per_page: 9, to: null, total: 0 },
      },
    })

    renderPage()

    expect(await screen.findByRole('heading', { name: 'Nenhuma vaga encontrada' })).toBeInTheDocument()
    expect(screen.getByText(/não há vagas publicadas/i)).toBeInTheDocument()
  })
})
