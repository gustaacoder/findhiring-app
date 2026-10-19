import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import SiteLayout from './components/SiteLayout'
import './styles.css'

const Jobs = lazy(() => import('./pages/Jobs'))
const JobDetail = lazy(() => import('./pages/JobDetail'))
const Apply = lazy(() => import('./pages/Apply'))
const Success = lazy(() => import('./pages/Success'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteLoader() {
  return <div className="route-loader" role="status"><span /><span>Carregando página…</span></div>
}

function load(element: React.ReactNode) {
  return <Suspense fallback={<RouteLoader />}>{element}</Suspense>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
})

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/jobs', element: load(<Jobs />) },
      { path: '/jobs/:slug', element: load(<JobDetail />) },
      { path: '/jobs/:slug/apply', element: load(<Apply />) },
      { path: '/success', element: load(<Success />) },
      { path: '*', element: load(<NotFound />) },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
