import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { api } from '@/lib/api'
import { ArrowLeftIcon, ArrowRightIcon, BriefcaseIcon, CheckIcon, ClockIcon, ShieldIcon, SparkIcon } from '@/components/Icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import type { ItemResponse, JobDetail as JobDetailType, Requirement } from '@/types/api'

function RequirementList({ items, preferred = false }: { items: Requirement[]; preferred?: boolean }) {
  if (!items.length) return <p className="requirements-empty">Nenhuma qualificação {preferred ? 'desejável' : 'obrigatória'} adicional foi informada.</p>
  return (
    <div className="requirement-list">
      {items.map((requirement) => (
        <article className="requirement" key={requirement.name}>
          <span className={`requirement__check ${preferred ? 'requirement__check--preferred' : ''}`}><CheckIcon /></span>
          <div><h3>{requirement.name}</h3><p>{requirement.description}</p></div>
        </article>
      ))}
    </div>
  )
}

export default function JobDetail() {
  const { slug = '' } = useParams()
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', slug],
    queryFn: async () => (await api.get<ItemResponse<JobDetailType>>(`/jobs/${slug}`)).data.data,
    enabled: Boolean(slug),
    retry: false,
  })
  useDocumentTitle(job ? `${job.title} | FindHiring` : 'Detalhes da vaga | FindHiring')

  if (isLoading) return <div className="detail-loading"><div className="container"><div className="detail-loading__line" /><div className="detail-loading__title" /><div className="detail-loading__grid"><span /><span /></div></div></div>

  if (error || !job) return <section className="standalone-state section-shell"><div className="container state-panel state-panel--error"><span className="state-panel__icon">!</span><h1>Esta vaga não está mais disponível</h1><p>Ela pode ter sido encerrada ou removida. Conheça as oportunidades disponíveis no momento.</p><Link className="button button--primary" to="/jobs">Ver vagas abertas</Link></div></section>

  return (
    <>
      <section className="detail-hero section-shell">
        <div className="container">
          <Link className="back-link" to="/jobs"><ArrowLeftIcon /> Voltar para vagas abertas</Link>
          <div className="detail-hero__main">
            <div className="detail-hero__icon"><BriefcaseIcon /></div>
            <div><span className="job-card__status"><span /> Recebendo candidaturas</span><h1>{job.title}</h1><div className="detail-meta"><span><ClockIcon /> Publicada recentemente</span><span><SparkIcon /> Triagem técnica</span></div></div>
          </div>
        </div>
      </section>

      <section className="detail-content section-shell">
        <div className="container detail-layout">
          <div className="detail-body">
            <section className="content-section"><span className="section-kicker">Sobre a vaga</span><h2>Faça a diferença com sua experiência</h2><div className="job-description">{job.description}</div></section>
            <section className="content-section"><span className="section-kicker">O que buscamos</span><h2>Qualificações obrigatórias</h2><p className="section-intro">Estas qualificações são essenciais para os requisitos técnicos da vaga.</p><RequirementList items={job.requirements.required} /></section>
            <section className="content-section"><span className="section-kicker">Diferenciais</span><h2>Qualificações desejáveis</h2><p className="section-intro">Estas competências podem fortalecer sua candidatura, mas não são obrigatórias.</p><RequirementList items={job.requirements.preferred} preferred /></section>
            <section className="responsible-note"><ShieldIcon /><div><h2>Triagem responsável</h2><p>Seu currículo é analisado com base nos requisitos técnicos publicados. A IA pode ajudar a organizar evidências, mas os recrutadores continuam responsáveis por todas as decisões de contratação.</p></div></section>
          </div>

          <aside className="apply-card">
            <span className="apply-card__badge">Candidaturas abertas</span>
            <h2>Interessado nesta vaga?</h2>
            <p>Conte um pouco sobre você e envie seu currículo. A candidatura leva apenas alguns minutos.</p>
            <Link className="button button--primary button--wide button--large" to={`/jobs/${job.slug}/apply`}>Candidatar-se agora <ArrowRightIcon /></Link>
            <div className="apply-card__details"><span><CheckIcon /> Não precisa criar uma conta</span><span><CheckIcon /> Currículo em PDF ou DOCX</span><span><CheckIcon /> Decisão final feita por pessoas</span></div>
          </aside>
        </div>
      </section>
    </>
  )
}
