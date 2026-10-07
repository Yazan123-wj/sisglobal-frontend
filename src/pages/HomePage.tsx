import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import { vacancies } from '@/data/vacancies'
import { insightsByKind, type InsightImage } from '@/data/insights'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import GlobalPresenceSection from '@/components/GlobalPresenceSection'
import MetricsBar from '@/components/MetricsBar'

const clients = [
  { name: 'Aramco', mark: 'aramco' },
  { name: 'SABIC', mark: 'sabic' },
  { name: 'STC', mark: 'stc' },
  { name: 'SNB', mark: 'snb' },
  { name: 'MoH', mark: 'moh' },
  { name: 'MAADEN', mark: 'maaden' },
  { name: 'Alat', mark: 'alat' },
  { name: 'Microsoft', mark: 'microsoft' },
  { name: 'Cisco', mark: 'cisco' },
  { name: 'HP', mark: 'hp' },
  { name: 'Dell', mark: 'dell' },
  { name: 'Fortinet', mark: 'fortinet' },
]
const techPartners = [
  { name: 'Microsoft', mark: 'microsoft' },
  { name: 'HP', mark: 'hp' },
  { name: 'Cisco', mark: 'cisco' },
  { name: 'Dell', mark: 'dell' },
  { name: 'Apple', mark: 'apple' },
  { name: 'Lenovo', mark: 'lenovo' },
  { name: 'Nextivity', mark: 'nextivity' },
  { name: 'Fortinet', mark: 'fortinet' },
]

const homeIndustries = [
  { title: 'Telecommunications & Technology', copy: 'Rollout, operations and ICT support for live networks and digital estates.', image: caseTelecom },
  { title: 'Government & Public Sector', copy: 'Workforce, field operations and infrastructure for public programmes.', image: caseWorkforce },
  { title: 'Engineering & Infrastructure', copy: 'Field teams and technical operations across sites, power and facilities.', image: heroNetworkImage },
  { title: 'Healthcare', copy: 'People operations and workplace technology that keep services running.', image: caseWorkforce },
  { title: 'Financial & Professional Services', copy: 'Secure infrastructure, connectivity and support for enterprise estates.', image: caseIct },
  { title: 'Retail & Consumer', copy: 'Flexible workforce and technology support as operations scale.', image: caseIct },
]
const featuredOpenings = vacancies.slice(0, 3)
const articles = insightsByKind('article').slice(0, 3)
const stories = insightsByKind('story')
const featuredStory = stories[0]
const moreStories = stories.slice(1, 3)
const storyImages: Record<InsightImage, string> = {
  workforce: caseWorkforce,
  telecom: caseTelecom,
  ict: caseIct,
  network: heroNetworkImage,
}

type ServiceKey = 'hcm' | 'tso' | 'ict'

const services: Record<ServiceKey, { label: string; eyebrow: string; title: string; description: string; accent: string; details: string[] }> = {
  hcm: { label: 'Idarat HCM', eyebrow: 'Human Capital Management', title: 'People operations that move with your business.', description: 'From workforce mobilisation to payroll and compliant HR operations, Idarat HCM helps ambitious organisations build capacity with confidence.', accent: 'hcm', details: ['Workforce solutions', 'Payroll operations', 'HR managed services'] },
  tso: { label: 'Idarat TSO', eyebrow: 'Technical Services & Operations', title: 'Expert operations, delivered on the ground.', description: 'Idarat TSO brings specialist field talent, disciplined service delivery and regional execution to complex technical programmes.', accent: 'tso', details: ['Telecom rollouts', 'Managed services', 'Field operations'] },
  ict: { label: 'Identiti ICT', eyebrow: 'ICT Infrastructure', title: 'Infrastructure built for what is next.', description: 'Identiti ICT designs, deploys and supports secure technology foundations that keep enterprise operations resilient and ready to scale.', accent: 'ict', details: ['Technology infrastructure', 'Cybersecurity', 'Systems integration'] },
}

function Arrow() { return <span aria-hidden="true">↗</span> }

function BrandMark({ mark }: { mark: string }) {
  return (
    <svg className={`brand-logo brand-logo-${mark}`} viewBox="0 0 32 32" aria-hidden="true">
      {mark === 'aramco' && <circle cx="16" cy="16" r="12" />}
      {mark === 'sabic' && <path d="M16 4 28 16 16 28 4 16Z" />}
      {mark === 'stc' && <path d="M8 22c4-8 12-8 16 0M6 17c6-10 14-10 20 0M8 12c4-6 12-6 16 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />}
      {mark === 'snb' && <path d="M7 24V12l9-6 9 6v12H7Zm4-3h10v-8l-5-3.4L11 13v8Z" />}
      {mark === 'moh' && <path d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7V6Z" />}
      {mark === 'maaden' && <path d="M4 24 12 8l5 9 4-6 7 13H4Z" />}
      {mark === 'alat' && <path d="M16 5 27 11.5v9L16 27 5 20.5v-9L16 5Zm0 6.2L11 14.2v3.6L16 20.8 21 17.8v-3.6L16 11.2Z" />}
      {mark === 'microsoft' && <path d="M6 6h9v9H6zm11 0h9v9h-9zM6 17h9v9H6zm11 0h9v9h-9z" />}
      {mark === 'cisco' && <path d="M5 20h3l1-8h2l1 8h3l1-8h2l1 8h3l-2-12h-4l-1 6-1-6h-4l-1 6-1-6H7L5 20Z" />}
      {mark === 'hp' && <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />}
      {mark === 'hp' && <path d="M11 21V11h3.2c2.6 0 4.2 1.3 4.2 3.4S16.8 18 14.3 18H14v3h-3Zm3-5.6h.4c.9 0 1.5-.5 1.5-1.2S15.3 13 14.4 13H14v2.4Z" />}
      {mark === 'dell' && <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />}
      {mark === 'dell' && <path d="M10 16.8 16 10l6 6.8H10Z" />}
      {mark === 'fortinet' && <path d="M16 5 27 11v10L16 27 5 21V11L16 5Z" />}
      {mark === 'apple' && <path d="M21.4 12.2c-1.9 0-2.7 1-4.1 1-1.5 0-2.6-1-4.2-1-2.2 0-4.5 1.4-5.6 3.5-2.4 4.2-.6 10.4 1.7 13.8 1.1 1.6 2.4 3.5 4.2 3.4 1.6-.1 2.2-1.1 4.1-1.1s2.4 1.1 4.2 1c1.8-.1 3-1.7 4.1-3.4 1.3-1.9 1.8-3.7 1.8-3.8-.1 0-3.5-1.4-3.5-5.3 0-3.4 2.7-4.9 2.8-5-.1-.1-2.5-2.1-5.5-2.1Zm-4-3.2c.9-1.1 1.6-2.6 1.4-4.1-1.2.1-2.7.8-3.6 1.9-.8.9-1.6 2.4-1.4 3.8 1.3.1 2.7-.7 3.6-1.6Z" />}
      {mark === 'lenovo' && <path d="M6 10h20v12H6V10Zm3 3.2v5.6h2.1V16h2.4c1.8 0 2.9-1 2.9-2.4S15.4 11.2 13.6 11.2H9Zm2.1 1.8h1.5c.6 0 .9.3.9.7s-.3.7-.9.7H11.1v-1.4Zm7.4 3.8V13.2h2.1v1.1c.3-.8 1.1-1.3 2.1-1.3.3 0 .6 0 .8.1v1.9c-.2-.1-.5-.2-.8-.2-.8 0-1.4.6-1.4 1.6v1.8h-2.8Z" />}
      {mark === 'nextivity' && <path d="M7 8h6.4L18 16.2 21.2 8H25L19.1 24h-6.2L7 8Zm3.4 2.6 3.1 7.8h.1l3.2-7.8h-6.4Z" />}
    </svg>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeService, setActiveService] = useState<ServiceKey>('tso')
  const [formSent, setFormSent] = useState(false)
  const [clientsOpen, setClientsOpen] = useState(false)
  const active = services[activeService]

  useEffect(() => {
    const unit = searchParams.get('unit')
    if (unit === 'hcm' || unit === 'tso' || unit === 'ict') setActiveService(unit)
  }, [searchParams])
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const submitForm = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setFormSent(true) }

  useEffect(() => {
    if (!clientsOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setClientsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [clientsOpen])

  return (
    <main id="top">
      <section className={`hero ${active.accent}`} aria-labelledby="hero-title">
        <div className="hero-visual" style={{ backgroundImage: `url(${heroNetworkImage})` }} aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" /><div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="container hero-content"><div className="hero-copy"><p className="hero-kicker">{active.eyebrow}</p><h1 id="hero-title">{active.title}</h1><p>{active.description}</p><div className="hero-actions"><button className="button button-gold" type="button" onClick={() => goTo('contact')}>Request a proposal <Arrow /></button><button className="button button-ghost" type="button" onClick={() => goTo('services')}>Explore our services <Arrow /></button></div></div><aside className="hero-service-detail" aria-label="Selected service highlights"><span>Built to perform</span>{active.details.map((detail, index) => <p key={detail}><b>0{index + 1}</b>{detail}</p>)}</aside></div>
        <div className="container service-switcher" role="tablist" aria-label="SIS Global business units">{(Object.keys(services) as ServiceKey[]).map((key, index) => { const service = services[key]; const selected = key === activeService; return <button key={key} type="button" role="tab" aria-selected={selected} className={selected ? 'active' : ''} onClick={() => setActiveService(key)}><span>0{index + 1}</span><b>{service.label}</b><small>{service.eyebrow}</small></button> })}</div>
      </section>
      <section id="about" className="trust-section section"><div className="container">
        <div className="trust-strip">
          <div className="trust-copy">
            <h3>Trusted by<br />great brands</h3>
            <p>Energy, telecom, government and finance teams work with SIS Global when they need one accountable partner.</p>
            <button className="button button-navy" type="button" onClick={() => setClientsOpen(true)}>More clients</button>
          </div>
          <ul className="logo-row">
            {clients.slice(0, 8).map((client) => (
              <li key={client.name}>
                <BrandMark mark={client.mark} />
                <span>{client.name}</span>
              </li>
            ))}
          </ul>
        </div>
        {clientsOpen ? (
          <div className="clients-modal" role="presentation" onClick={() => setClientsOpen(false)}>
            <div className="clients-modal-card" role="dialog" aria-modal="true" aria-labelledby="clients-title" onClick={(event) => event.stopPropagation()}>
              <div className="clients-modal-head">
                <h2 id="clients-title">Clients</h2>
                <button className="text-link" type="button" onClick={() => setClientsOpen(false)}>Close</button>
              </div>
              <ul className="logo-row is-all">
                {clients.map((client) => (
                  <li key={client.name}>
                    <BrandMark mark={client.mark} />
                    <span>{client.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <div className="section-heading intro-heading"><p className="eyebrow">A connected partner</p><div><h2>One group. Three capabilities.<br /><em>Everywhere you operate.</em></h2><p>SIS Global combines human capital, technical operations and ICT infrastructure to simplify the operational challenges that hold businesses back.</p></div></div>
        <div id="services" className="service-cards">
          <Link className="service-card service-hcm" to="/what-we-do/hcm">
            <div className="card-top"><span>01</span><p>Idarat HCM</p><span className="corner-arrow"><Arrow /></span></div>
            <div className="service-card-content">
              <p className="card-eyebrow">Human Capital Management</p>
              <h3>Ready people, right where they are needed.</h3>
              <p>Recruitment, HR operations and workforce services designed for scale.</p>
              <span className="text-link">Explore HCM <Arrow /></span>
            </div>
          </Link>
          <Link className="service-card service-tso" to="/what-we-do/tso">
            <div className="card-top"><span>02</span><p>Idarat TSO</p><span className="corner-arrow"><Arrow /></span></div>
            <div className="service-card-content">
              <p className="card-eyebrow">Technical Services & Operations</p>
              <h3>Specialist execution, from plan to field.</h3>
              <p>Reliable rollout and managed operations across complex environments.</p>
              <span className="text-link">Explore TSO <Arrow /></span>
            </div>
          </Link>
          <Link className="service-card service-ict" to="/what-we-do/ict">
            <div className="card-top"><span>03</span><p>Identiti ICT</p><span className="corner-arrow"><Arrow /></span></div>
            <div className="service-card-content">
              <p className="card-eyebrow">ICT Infrastructure</p>
              <h3>Technology foundations for lasting progress.</h3>
              <p>Secure hardware, software and networks with end-to-end support.</p>
              <span className="text-link">Explore ICT <Arrow /></span>
            </div>
          </Link>
        </div></div></section>
      <MetricsBar />
      <section id="difference" className="difference-section section">
        <div className="container">
          <div className="difference-heading">
            <p className="eyebrow">What sets us apart</p>
            <div className="difference-lead">
              <h2>Three capabilities.<br />One accountable partner.</h2>
              <p>Less coordination. More momentum. SIS Global connects the people, services and infrastructure behind critical operations.</p>
            </div>
          </div>
          <div className="difference-grid">
            <article>
              <span>01</span>
              <h3>Regional knowledge at scale</h3>
              <p>Local depth across KSA and the wider region, backed by enterprise-ready governance.</p>
            </article>
            <article>
              <span>02</span>
              <h3>One partner, end to end</h3>
              <p>Connected capability across people, field operations and technology infrastructure.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Delivery built around outcomes</h3>
              <p>Flexible models and disciplined execution that keep your business moving forward.</p>
            </article>
          </div>
          <div id="industries" className="industry-band">
            <div className="industry-band-copy">
              <div>
                <p>Industries we serve</p>
                <span>People, field operations and technology across the sectors we already work in.</span>
              </div>
              <button type="button" onClick={() => navigate({ pathname: '/what-we-do', hash: 'industries' })}>
                Explore industries <Arrow />
              </button>
            </div>
            <div className="industry-card-grid">
              {homeIndustries.map((industry) => (
                <article key={industry.title} className="industry-card">
                  <div className="industry-card-media">
                    <img src={industry.image} alt="" />
                  </div>
                  <div className="industry-card-body">
                    <h3>{industry.title}</h3>
                    <p>{industry.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="cases" className="case-section section">
        <div className="container">
          <div className="cases-heading">
            <p className="eyebrow">Case studies</p>
            <div className="cases-lead">
              <h2>Delivering results<br />that matter.</h2>
              <div>
                <p>From national-scale rollouts to the operational detail that makes them work.</p>
                <Link className="text-link" to="/case-studies">View all case studies <Arrow /></Link>
              </div>
            </div>
          </div>
          <div className="case-grid">
            {featuredStory ? (
              <Link className="case-card is-featured" to={`/case-studies/${featuredStory.id}`}>
                <div className="case-art-wrap" data-curtain>
                  <img className="case-art" src={storyImages[featuredStory.image]} alt="" />
                  <span>Featured</span>
                </div>
                <div className="case-content">
                  <span>{featuredStory.topic}</span>
                  <h3>{featuredStory.title}</h3>
                  <p>{featuredStory.excerpt}</p>
                  <small>Read case study <Arrow /></small>
                </div>
              </Link>
            ) : null}
            {moreStories.map((story) => (
              <Link key={story.id} className="case-card" to={`/case-studies/${story.id}`}>
                <div className="case-art-wrap" data-curtain>
                  <img className="case-art" src={storyImages[story.image]} alt="" />
                </div>
                <div className="case-content">
                  <span>{story.topic}</span>
                  <h3>{story.title}</h3>
                  <p>{story.excerpt}</p>
                  <small>Read case study <Arrow /></small>
                </div>
              </Link>
            ))}
          </div>
          <div className="partner-strip">
            <p>Technology partners</p>
            <ul>
              {techPartners.map((partner) => (
                <li key={partner.name}>
                  <BrandMark mark={partner.mark} />
                  <span className="sr-only">{partner.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <GlobalPresenceSection />
      <section id="careers" className="careers-panel">
        <div className="container split-inner">
          <div className="split-intro">
            <p className="eyebrow light">Careers</p>
            <h2>Join a growing team<br />across the region.</h2>
            <p>Help us create the capability that keeps organisations moving.</p>
            <button className="button button-gold" type="button" onClick={() => navigate('/vacancies')}>View all openings <Arrow /></button>
          </div>
          <div className="split-body">
            <div className="split-list-head">
              <span>Open roles</span>
              <span>{featuredOpenings.length} positions</span>
            </div>
            <div className="opening-list">
              {featuredOpenings.map((job) => (
                <button key={job.id} type="button" onClick={() => navigate(`/vacancies/${job.id}`)}>
                  <span className="opening-copy">
                    <b>{job.title}</b>
                    <small>{job.unit} · {job.location}</small>
                  </span>
                  <span className="split-go" aria-hidden="true"><Arrow /></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="insights" className="insights-section">
        <div className="container">
          <div className="insights-heading">
            <p className="eyebrow">Insights</p>
            <div className="insights-lead">
              <h2>Perspectives on<br /><em>technology & operations.</em></h2>
              <div>
                <p>Ideas from the SIS Global team on the systems, talent and changes shaping the region.</p>
                <Link className="text-link" to="/insights">Read all insights <Arrow /></Link>
              </div>
            </div>
          </div>
          <div className="insights-board">
            <Link className="insight-feature" to={articles[0] ? `/insights/${articles[0].id}` : '/insights'}>
              <span className="insight-kicker">{articles[0]?.unit} · {articles[0]?.topic}</span>
              <h3>{articles[0]?.title}</h3>
              <span className="text-link">Read article <Arrow /></span>
            </Link>
            <div className="insight-stack">
              {articles.slice(1).map((article) => (
                <Link key={article.id} className="insight-card" to={`/insights/${article.id}`}>
                  <span className="insight-kicker">{article.unit} · {article.topic}</span>
                  <h3>{article.title}</h3>
                  <span className="text-link">Read article <Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact-section section"><div className="container contact-wrap"><div className="contact-copy"><p className="eyebrow light">Start a conversation</p><h2>Let’s make<br /><em>progress practical.</em></h2><p>Tell us what your operation needs next. The right SIS Global team will be in touch.</p><div className="contact-note"><span>Response commitment</span><b>Within one business day</b></div></div><div className="form-card">{formSent ? <div className="success-state"><span>✓</span><h3>Thanks for getting in touch.</h3><p>Your enquiry has been received. A SIS Global specialist will contact you shortly.</p><button className="button button-outline" type="button" onClick={() => setFormSent(false)}>Send another enquiry <Arrow /></button></div> : <form onSubmit={submitForm}><div className="form-heading"><h3>How can we help?</h3><p>Fields marked with * are required.</p></div><div className="form-grid"><label>Name *<input required name="name" placeholder="Your full name" /></label><label>Business email *<input required type="email" name="email" placeholder="name@company.com" /></label><label>Company *<input required name="company" placeholder="Your company" /></label><label>Area of interest *<select required name="interest" defaultValue=""><option value="" disabled>Select a service</option><option>Human Capital Management</option><option>Technical Services & Operations</option><option>ICT Infrastructure</option><option>Multiple services</option><option>Not sure yet</option></select></label><label className="wide">Optional message<textarea name="message" placeholder="A few details about your enquiry" rows={4} /></label></div><button className="button button-gold form-submit" type="submit">Send inquiry <Arrow /></button></form>}</div></div></section>
    </main>
  )
}
