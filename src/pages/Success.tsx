import { Link, useLocation } from 'react-router-dom'
import { ArrowRightIcon, CheckIcon, DocumentIcon, MailIcon } from '@/components/Icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

type SuccessState = { jobTitle?: string; applicationId?: number }

export default function Success() {
  useDocumentTitle('Candidatura recebida | FindHiring')
  const { state } = useLocation()
  const details = state as SuccessState | null

  if (!details) {
    return <section className="standalone-state section-shell"><div className="container state-panel"><span className="state-panel__icon"><DocumentIcon /></span><span className="eyebrow eyebrow--quiet">Inicie sua candidatura</span><h1>Nenhuma candidatura foi enviada</h1><p>Conheça as vagas disponíveis e escolha a oportunidade que mais combina com sua experiência.</p><Link className="button button--primary" to="/jobs">Ver vagas abertas <ArrowRightIcon /></Link></div></section>
  }

  return (
    <section className="success-page section-shell">
      <div className="success-page__glow" />
      <div className="container success-card">
        <div className="success-card__icon"><CheckIcon /></div>
        <span className="eyebrow eyebrow--quiet">Candidatura recebida</span>
        <h1>Obrigado por se candidatar.</h1>
        <p className="success-card__lead">Sua candidatura{details.jobTitle ? <> para <strong>{details.jobTitle}</strong></> : ''} foi enviada com sucesso.</p>
        {details.applicationId && <span className="reference-number">Referência da candidatura #{details.applicationId}</span>}
        <div className="next-steps">
          <h2>O que acontece agora?</h2>
          <div><span><DocumentIcon /></span><p><strong>Análise técnica</strong>Seu currículo será analisado com base nos requisitos técnicos da vaga.</p></div>
          <div><span><MailIcon /></span><p><strong>Contato do recrutador</strong>Se sua experiência estiver alinhada à oportunidade, a equipe de recrutamento poderá entrar em contato.</p></div>
        </div>
        <div className="success-card__actions"><Link className="button button--primary button--large" to="/jobs">Explorar outras vagas <ArrowRightIcon /></Link><Link className="button button--secondary button--large" to="/">Voltar ao início</Link></div>
        <p className="success-card__note">O envio da candidatura não garante avanço no processo ou contratação. As decisões finais são sempre tomadas por recrutadores.</p>
      </div>
    </section>
  )
}
