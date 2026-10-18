import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Apply from './pages/Apply'
import Success from './pages/Success'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/jobs/:slug', element: <JobDetail /> },
  { path: '/jobs/:slug/apply', element: <Apply /> },
  { path: '/success', element: <Success /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
