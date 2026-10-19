import { Link } from 'react-router-dom'
import { ArrowRightIcon, CompassIcon } from '@/components/Icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Página não encontrada | FindHiring')
  return <section className="standalone-state section-shell"><div className="container state-panel"><span className="state-panel__icon"><CompassIcon /></span><span className="eyebrow eyebrow--quiet">Erro 404</span><h1>Esta página não foi encontrada</h1><p>O endereço pode estar incorreto ou a página pode ter sido movida.</p><Link className="button button--primary" to="/">Ir para o início <ArrowRightIcon /></Link></div></section>
}
