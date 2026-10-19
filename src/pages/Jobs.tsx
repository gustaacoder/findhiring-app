import { FormEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '@/lib/api'
import { ArrowRightIcon, BriefcaseIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, SearchIcon } from '@/components/Icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import type { Job, PaginatedResponse } from '@/types/api'

function formatPublishedDate(value: string | null) {
  if (!value) return 'Publicada recentemente'
  return `Publicada em ${new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))}`
}

function JobCard({ job }: { job: Job }) {
  return (
    <article className="job-card">
      <div className="job-card__top">
        <span className="job-card__icon"><BriefcaseIcon /></span>
        <span className="job-card__status"><span /> Recebendo candidaturas</span>
      </div>
      <div className="job-card__content">
        <h2><Link to={`/jobs/${job.slug}`}>{job.title}</Link></h2>
        <p>{job.description_preview}</p>
      </div>
      <div className="job-card__footer">
        <span><ClockIcon /> {formatPublishedDate(job.published_at)}</span>
        <Link className="text-link" to={`/jobs/${job.slug}`}>Ver vaga <ArrowRightIcon /></Link>
      </div>
    </article>
  )
}

function JobsSkeleton() {
  return <div className="jobs-grid" aria-label="Carregando vagas abertas">{[1, 2, 3, 4, 5, 6].map((item) => <div className="job-card job-card--skeleton" key={item}><span /><span /><span /><span /></div>)}</div>
}

export default function Jobs() {
  useDocumentTitle('Vagas abertas | FindHiring')
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const requestedPage = Number(searchParams.get('page') ?? 1)
  const page = Number.isFinite(requestedPage) ? Math.max(requestedPage, 1) : 1
  const [searchInput, setSearchInput] = useState(search)

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['jobs', search, page],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Job>>('/jobs', { params: { search: search || undefined, page, per_page: 9 } })
      return response.data
    },
  })

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    const next = searchInput.trim()
    setSearchParams(next ? { search: next } : {})
  }

  const changePage = (nextPage: number) => {
    const params: Record<string, string> = { page: String(nextPage) }
    if (search) params.search = search
    setSearchParams(params)
  }

  return (
    <>
      <section className="page-hero section-shell">
        <div className="container page-hero__content">
          <span className="eyebrow">Construa o que vem a seguir</span>
          <h1>Oportunidades abertas</h1>
          <p>Encontre vagas em que sua experiência técnica possa fazer uma contribuição relevante.</p>
          <form className="job-search" onSubmit={submitSearch} role="search">
            <SearchIcon />
            <label className="sr-only" htmlFor="job-search">Buscar vagas abertas</label>
            <input id="job-search" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Busque por vaga ou palavra-chave" />
            <button className="button button--primary" type="submit">Buscar vagas</button>
          </form>
        </div>
      </section>

      <section className="jobs-section section-shell">
        <div className="container">
          <div className="results-heading">
            <div><span className="eyebrow eyebrow--quiet">Vagas atuais</span><h2>{search ? `Resultados para “${search}”` : 'Encontre sua próxima oportunidade'}</h2></div>
            {data?.meta && <span className="results-count">{data.meta.total} {data.meta.total === 1 ? 'vaga' : 'vagas'}</span>}
          </div>

          {isLoading ? <JobsSkeleton /> : error ? (
            <div className="state-panel state-panel--error"><span className="state-panel__icon">!</span><h2>Não foi possível carregar as vagas</h2><p>Verifique sua conexão e tente novamente.</p><button className="button button--primary" onClick={() => refetch()}>Tentar novamente</button></div>
          ) : data?.data.length ? (
            <>
              <div className={`jobs-grid ${isFetching ? 'is-refreshing' : ''}`}>{data.data.map((job) => <JobCard job={job} key={job.id} />)}</div>
              {data.meta.last_page > 1 && (
                <nav className="pagination" aria-label="Paginação dos resultados de vagas">
                  <button onClick={() => changePage(page - 1)} disabled={page <= 1}><ChevronLeftIcon /> Anterior</button>
                  <span>Página <strong>{page}</strong> de {data.meta.last_page}</span>
                  <button onClick={() => changePage(page + 1)} disabled={page >= data.meta.last_page}>Próxima <ChevronRightIcon /></button>
                </nav>
              )}
            </>
          ) : (
            <div className="state-panel"><span className="state-panel__icon"><SearchIcon /></span><h2>Nenhuma vaga encontrada</h2><p>{search ? 'Tente outra palavra-chave ou veja todas as oportunidades disponíveis.' : 'Não há vagas publicadas no momento. Volte em breve.'}</p>{search && <button className="button button--secondary" onClick={() => { setSearchInput(''); setSearchParams({}) }}>Ver todas as vagas</button>}</div>
          )}
        </div>
      </section>
    </>
  )
}
