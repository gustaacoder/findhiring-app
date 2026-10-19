import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Brand from './Brand'
import { ArrowRightIcon, MenuIcon, XIcon } from './Icons'

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          <Brand />
          <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Navegação principal">
            <NavLink to="/" end>Início</NavLink>
            <NavLink to="/jobs">Vagas abertas</NavLink>
            <a href="/#how-it-works">Como funciona</a>
            <Link className="button button--primary site-nav__cta" to="/jobs">Encontrar uma vaga <ArrowRightIcon /></Link>
          </nav>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={menuOpen}>
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      <main className="site-main"><Outlet /></main>
      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__about"><Brand /><p>Tecnologia que ajuda recrutadores a analisar evidências técnicas mantendo as pessoas no centro de cada decisão.</p></div>
          <div><h2>Explore</h2><Link to="/jobs">Vagas abertas</Link><a href="/#how-it-works">Como funciona</a></div>
          <div><h2>Cuidado com candidatos</h2><span>Requisitos claros</span><span>Análise humana</span><span>Triagem responsável</span></div>
          <div><h2>Nossa abordagem</h2><span>Privacidade em primeiro lugar</span><span>Baseada em evidências</span><span>Centrada no candidato</span></div>
        </div>
        <div className="container site-footer__bottom"><span>© {new Date().getFullYear()} FindHiring. Todos os direitos reservados.</span><span>Triagem assistida por IA. Contratação conduzida por pessoas.</span></div>
      </footer>
    </div>
  )
}
