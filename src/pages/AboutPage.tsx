import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import DottedWorldMap from '@/components/DottedWorldMap'
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
    title: 'Mission & vision',
    copy: 'One accountable partner for the people, operations and infrastructure behind critical work.',
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
  const [activeId, setActiveId] = useState(globalLocations.find((location) => location.headquarters)?.id ?? globalLocations[0].id)
  const active = globalLocations.find((location) => location.id === activeId) ?? globalLocations[0]

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
            <p>Company introduction, story, mission and team — built around delivery in KSA and the wider region.</p>
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

      <section id="about-presence" className="about-section section">
        <div className="container">
          <div className="about-intro">
            <h2>Global Presence</h2>
            <p>Map and directory of SIS Global regions and office locations.</p>
          </div>
          <div className="about-presence-grid">
            <div className="about-map-panel">
              <p className="about-panel-label">Presence map</p>
              <DottedWorldMap activeId={activeId} onActivate={setActiveId} />
              <p className="about-map-caption">{active.country}{active.city ? ` · ${active.city}` : ''} · {active.year}</p>
            </div>
            <article className="about-side-panel">
              <p className="about-panel-label">Countries & offices</p>
              <ul className="about-office-list">
                {globalLocations.map((location) => (
                  <li key={location.id}>
                    <button type="button" className={location.id === activeId ? 'is-active' : undefined} onClick={() => setActiveId(location.id)}>
                      <span className="about-office-name">
                        <b>{location.country}</b>
                        {location.headquarters ? <em>HQ</em> : null}
                      </span>
                      <small>{location.year}</small>
                    </button>
                  </li>
                ))}
              </ul>
            </article>
            <article className="about-side-panel">
              <p className="about-panel-label">Regional contacts</p>
              <div className="about-contact-block">
                <p>Headquarters</p>
                <b>Riyadh, Saudi Arabia</b>
                <a href="mailto:info@sisglobal.com">info@sisglobal.com</a>
              </div>
            </article>
          </div>
        </div>
      </section>

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
