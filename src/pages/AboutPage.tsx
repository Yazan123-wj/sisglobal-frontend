import { useNavigate } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import GlobalPresenceSection from '@/components/GlobalPresenceSection'
import PageSubnav from '@/components/PageSubnav'
import { globalLocations } from '@/data/locations'

const aboutSections = [
  { id: 'about-who', label: 'Who we are' },
  { id: 'about-mission', label: 'Mission and vision' },
  { id: 'about-presence', label: 'Global Presence' },
  { id: 'about-cta', label: 'Contact' },
]

const whoCards = [
  {
    title: 'Company profile',
    copy: 'A Saudi integrated business solutions company combining human capital, technical services and ICT delivery.',
    image: caseWorkforce,
  },
  {
    title: 'How we operate',
    copy: 'People, field operations and technology stay in one sequence, with a single team accountable for the result.',
    image: caseTelecom,
  },
  {
    title: 'People & expertise',
    copy: 'Specialist teams across Idarat HCM, Idarat TSO and Identiti ICT, working as one group.',
    image: caseIct,
  },
] as const

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${heroNetworkImage})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">About Us</p>
            <h1 id="about-title">A Saudi partner for people, operations and technology.</h1>
            <p>SIS Global is an integrated business solutions company, headquartered in Riyadh. We bring human capital, technical services and ICT together so organisations work with one accountable team.</p>
          </div>
          <dl className="about-hero-facts">
            <div>
              <dt>Headquarters</dt>
              <dd>Riyadh, KSA</dd>
            </div>
            <div>
              <dt>Established</dt>
              <dd>2006</dd>
            </div>
            <div>
              <dt>Presence</dt>
              <dd>{globalLocations.length} countries</dd>
            </div>
          </dl>
        </div>
      </section>

      <PageSubnav items={aboutSections} />

      <section id="about-who" className="about-section section">
        <div className="container">
          <div className="about-intro">
            <h2>Who we are</h2>
            <p>Company introduction, how we work, and the teams behind delivery in KSA and the wider region.</p>
          </div>
          <div className="about-card-grid">
            {whoCards.map((card, index) => (
              <article key={card.title} className="about-card">
                <div className="about-card-media" data-curtain >
                  <img src={card.image} alt="" />
                </div>
                <div className="about-card-body">
                  <span>0{index + 1}</span>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about-mission" className="about-section section about-mission">
        <div className="container">
          <div className="about-intro">
            <h2>Mission and vision</h2>
            <p>The purpose that guides how SIS Global works with clients and partners.</p>
          </div>
          <div className="about-mission-grid">
            <article className="about-panel">
              <span>Mission</span>
              <h3>Make complex operations simpler.</h3>
              <p>Connect human capital, technical operations and ICT infrastructure so organisations can move with one accountable partner.</p>
            </article>
            <article className="about-panel">
              <span>Vision</span>
              <h3>Be the regional partner operations can rely on.</h3>
              <p>Build lasting capability across the markets we serve — from headquarters in Riyadh to offices across the region.</p>
            </article>
          </div>
        </div>
      </section>

      <GlobalPresenceSection sectionId="about-presence" />

      <section id="about-cta" className="about-cta">
        <div className="container">
          <h2>Discuss your project with SIS Global</h2>
          <button className="text-link" type="button" onClick={() => navigate({ pathname: '/', hash: 'contact' })}>
            Contact Us <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </main>
  )
}
