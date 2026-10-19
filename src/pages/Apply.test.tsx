import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { expect, test, vi } from 'vitest'
import { api } from '@/lib/api'
import Apply from './Apply'

vi.mock('@/lib/api', () => ({ api: { get: vi.fn(), post: vi.fn() } }))

test('validates required application fields before submission', async () => {
  vi.mocked(api.get).mockResolvedValue({
    data: {
      data: {
        id: 1,
        title: 'Backend Laravel Developer',
        slug: 'backend-laravel-developer',
        description: 'Build reliable products.',
        description_preview: 'Build reliable products.',
        published_at: null,
        requirements: { required: [], preferred: [] },
      },
    },
  })
  const user = userEvent.setup()
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })

  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/jobs/backend-laravel-developer/apply']}>
        <Routes><Route path="/jobs/:slug/apply" element={<Apply />} /></Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )

  expect(await screen.findByRole('heading', { name: /candidate-se para backend laravel developer/i })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /enviar candidatura/i }))

  expect(await screen.findByText('Informe seu nome completo.')).toBeInTheDocument()
  expect(screen.getByText('Informe um endereço de e-mail válido.')).toBeInTheDocument()
  expect(screen.getByText('Selecione um arquivo de currículo.')).toBeInTheDocument()
  expect(api.post).not.toHaveBeenCalled()
})
