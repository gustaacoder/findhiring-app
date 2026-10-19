import { Link } from 'react-router-dom'
import { ArrowRightIcon, CheckIcon, CompassIcon, DocumentIcon, ShieldIcon, SparkIcon } from './components/Icons'
import { useDocumentTitle } from './hooks/useDocumentTitle'

const principles = [
  {
    icon: <CompassIcon />,
    title: 'Oportunidades claras',
    description: 'Explore vagas com responsabilidades e requisitos técnicos apresentados de forma objetiva.',
  },
  {
    icon: <DocumentIcon />,
    title: 'Candidatura simples',
    description: 'Envie seus dados e currículo por meio de um processo direto e acessível.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Decisões humanas',
    description: 'A tecnologia apoia a análise inicial. Toda decisão de contratação continua com o recrutador.',
  },
]

const steps = [
  ['01', 'Escolha uma vaga', 'Conheça as posições abertas e encontre a oportunidade que combina com sua experiência.'],
  ['02', 'Envie seu currículo', 'Informe seus dados de contato e envie um currículo em PDF ou DOCX com segurança.'],
  ['03', 'Análise do recrutador', 'Sua candidatura é organizada para uma avaliação técnica transparente e humana.'],
]

export default function App() {
  useDocumentTitle('FindHiring | Encontre oportunidades que valorizam suas habilidades')

  return (
    <>
      <section className="hero section-shell">
        <div className="hero__glow hero__glow--one" />
        <div className="hero__glow hero__glow--two" />
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow"><SparkIcon /> Contratações melhores começam aqui</span>
            <h1>Encontre oportunidades que valorizam o que você <span>realmente sabe fazer.</span></h1>
            <p className="hero__lead">
              A FindHiring conecta candidatos a oportunidades relevantes por meio de um processo claro e uma triagem técnica responsável, conduzida por pessoas.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary button--large" to="/jobs">
                Ver vagas abertas <ArrowRightIcon />
              </Link>
              <a className="button button--secondary button--large" href="#how-it-works">Como funciona</a>
            </div>
            <div className="hero__assurance">
              <span><CheckIcon /> Não precisa criar uma conta</span>
              <span><CheckIcon /> Aceitamos PDF e DOCX</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Uma jornada de candidatura estruturada e transparente">
            <div className="hero-visual__orb" />
            <div className="review-card">
              <div className="review-card__top">
                <div className="review-card__brand"><span>F</span> Jornada da candidatura</div>
                <span className="status-chip">Em análise</span>
              </div>
              <div className="review-card__profile">
                <div className="review-card__avatar">JD</div>
                <div>
                  <strong>Sua experiência apresentada com clareza</strong>
                  <span>Competências e evidências sempre conectadas</span>
                </div>
              </div>
              <div className="review-card__progress">
                <div className="progress-row"><span>Candidatura recebida</span><strong>Concluído</strong></div>
                <div className="progress-track"><span style={{ width: '100%' }} /></div>
                <div className="progress-row"><span>Triagem técnica</span><strong>Estruturada</strong></div>
                <div className="progress-track"><span style={{ width: '72%' }} /></div>
              </div>
              <div className="review-card__note">
                <ShieldIcon />
                <p><strong>O recrutador mantém o controle.</strong><br />A IA ajuda a organizar evidências técnicas e nunca toma a decisão final de contratação.</p>
              </div>
            </div>
            <div className="floating-card floating-card--top"><SparkIcon /><span><strong>Competências primeiro</strong>Análise baseada em evidências</span></div>
            <div className="floating-card floating-card--bottom"><CheckIcon /><span><strong>Candidatura pronta</strong>Simples e segura</span></div>
          </div>
        </div>
      </section>

      <section className="principles section-shell">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow eyebrow--quiet">Uma experiência melhor para candidatos</span>
            <h2>Clareza em cada etapa</h2>
            <p>Da descoberta à análise, cada parte do processo foi pensada para ser útil, respeitosa e fácil de entender.</p>
          </div>
          <div className="principle-grid">
            {principles.map((principle) => (
              <article className="principle-card" key={principle.title}>
                <div className="icon-tile">{principle.icon}</div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process section-shell" id="how-it-works">
        <div className="container process__grid">
          <div className="process__intro">
            <span className="eyebrow eyebrow--quiet">Como funciona</span>
            <h2>Um caminho simples do interesse à candidatura.</h2>
            <p>Sem cadastros demorados. Encontre uma vaga, entenda os requisitos e envie as informações que o recrutador precisa.</p>
            <Link className="text-link" to="/jobs">Ver posições disponíveis <ArrowRightIcon /></Link>
          </div>
          <div className="process__steps">
            {steps.map(([number, title, description]) => (
              <article className="process-step" key={number}>
                <span className="process-step__number">{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta section-shell">
        <div className="container">
          <div className="cta__panel">
            <div><span className="eyebrow">Seu próximo capítulo</span><h2>Pronto para encontrar a oportunidade certa?</h2><p>Conheça as vagas atuais e candidate-se em poucos minutos.</p></div>
            <Link className="button button--light button--large" to="/jobs">Explorar vagas <ArrowRightIcon /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
