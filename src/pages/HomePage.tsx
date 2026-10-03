import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import { vacancies } from '@/data/vacancies'
import { insightsByKind } from '@/data/insights'
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
const techPartners = ['Microsoft', 'HP', 'Cisco', 'Dell', 'Apple', 'Lenovo', 'Nextivity', 'Fortinet']
const featuredOpenings = vacancies.slice(0, 3)
const articles = insightsByKind('article').slice(0, 3)

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
    </svg>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeService, setActiveService] = useState<ServiceKey>('tso')
  const [formSent, setFormSent] = useState(false)
  const active = services[activeService]

  useEffect(() => {
    const unit = searchParams.get('unit')
    if (unit === 'hcm' || unit === 'tso' || unit === 'ict') setActiveService(unit)
  }, [searchParams])
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const submitForm = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setFormSent(true) }

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
            <button className="button button-navy" type="button" onClick={() => goTo('contact')}>More clients</button>
          </div>
          <ul className="logo-row">
            {clients.map((client) => (
              <li key={client.name}>
                <BrandMark mark={client.mark} />
                <span>{client.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="section-heading intro-heading"><p className="eyebrow"><span>02</span> A connected partner</p><div><h2>One group. Three capabilities.<br /><em>Everywhere you operate.</em></h2><p>SIS Global combines human capital, technical operations and ICT infrastructure to simplify the operational challenges that hold businesses back.</p></div></div>
        <div id="services" className="service-cards">
          <article className="service-card service-hcm"><div className="card-top"><span>01</span><p>Idarat HCM</p><span className="corner-arrow"><Arrow /></span></div><div className="service-card-content"><p className="card-eyebrow">Human Capital Management</p><h3>Ready people, right where they are needed.</h3><p>Recruitment, HR operations and workforce services designed for scale.</p><button type="button" onClick={() => navigate('/what-we-do/hcm')}>Explore HCM <Arrow /></button></div></article>
          <article className="service-card service-tso"><div className="card-top"><span>02</span><p>Idarat TSO</p><span className="corner-arrow"><Arrow /></span></div><div className="service-card-content"><p className="card-eyebrow">Technical Services & Operations</p><h3>Specialist execution, from plan to field.</h3><p>Reliable rollout and managed operations across complex environments.</p><button type="button" onClick={() => navigate('/what-we-do/tso')}>Explore TSO <Arrow /></button></div></article>
          <article className="service-card service-ict"><div className="card-top"><span>03</span><p>Identiti ICT</p><span className="corner-arrow"><Arrow /></span></div><div className="service-card-content"><p className="card-eyebrow">ICT Infrastructure</p><h3>Technology foundations for lasting progress.</h3><p>Secure hardware, software and networks with end-to-end support.</p><button type="button" onClick={() => navigate('/what-we-do/ict')}>Explore ICT <Arrow /></button></div></article>
        </div></div></section>
      <MetricsBar />
      <section id="difference" className="difference-section section">
        <div className="container">
          <div className="difference-heading">
            <p className="eyebrow"><span>03</span> What sets us apart</p>
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
              <p>Industries we serve</p>
              <button type="button" onClick={() => goTo('presence')}>Explore industries <Arrow /></button>
            </div>
            <ul className="industry-pills">
              {['Telecommunications', 'Government', 'Healthcare', 'Financial Services', 'Technology', 'Infrastructure', 'Retail'].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section id="cases" className="case-section section">
        <div className="container">
          <div className="cases-heading">
            <p className="eyebrow"><span>04</span> Case studies</p>
            <div className="cases-lead">
              <h2>Delivering results<br />that matter.</h2>
              <div>
                <p>From national-scale rollouts to the operational detail that makes them work.</p>
                <button className="text-link" type="button" onClick={() => goTo('contact')}>View all case studies <Arrow /></button>
              </div>
            </div>
          </div>
          <div className="case-grid">
            <article className="case-card">
              <div className="case-art-wrap" data-curtain ><img className="case-art" src={caseTelecom} alt="" /></div>
              <div className="case-content">
                <span>Telecommunications</span>
                <h3>5G rollout across 200+ sites in Saudi Arabia</h3>
                <p>Accelerated deployment with zero safety incidents across every project phase.</p>
                <button type="button">Read case study <Arrow /></button>
              </div>
            </article>
            <article className="case-card">
              <div className="case-art-wrap" data-curtain ><img className="case-art" src={caseWorkforce} alt="" /></div>
              <div className="case-content">
                <span>Government</span>
                <h3>Managed workforce for a major government entity</h3>
                <p>500+ professionals mobilised to support essential services.</p>
                <button type="button">Read case study <Arrow /></button>
              </div>
            </article>
            <article className="case-card">
              <div className="case-art-wrap" data-curtain ><img className="case-art" src={caseIct} alt="" /></div>
              <div className="case-content">
                <span>Financial services</span>
                <h3>ICT infrastructure refresh for a Riyadh bank</h3>
                <p>Secure, resilient infrastructure delivered inside a 90-day window.</p>
                <button type="button">Read case study <Arrow /></button>
              </div>
            </article>
          </div>
          <div className="partner-strip">
            <p>Technology partners</p>
            <ul>
              {techPartners.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <GlobalPresenceSection />
      <section id="careers" className="careers-panel">
        <div className="container split-inner">
          <div className="split-intro">
            <p className="eyebrow light"><span>06</span> Careers</p>
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
            <p className="eyebrow"><span>07</span> Insights</p>
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
      <section id="contact" className="contact-section section"><div className="container contact-wrap"><div className="contact-copy"><p className="eyebrow light"><span>08</span> Start a conversation</p><h2>Let’s make<br /><em>progress practical.</em></h2><p>Tell us what your operation needs next. The right SIS Global team will be in touch.</p><div className="contact-note"><span>Response commitment</span><b>Within one business day</b></div></div><div className="form-card">{formSent ? <div className="success-state"><span>✓</span><h3>Thanks for getting in touch.</h3><p>Your enquiry has been received. A SIS Global specialist will contact you shortly.</p><button className="button button-outline" type="button" onClick={() => setFormSent(false)}>Send another enquiry <Arrow /></button></div> : <form onSubmit={submitForm}><div className="form-heading"><h3>How can we help?</h3><p>Fields marked with * are required.</p></div><div className="form-grid"><label>Name *<input required name="name" placeholder="Your full name" /></label><label>Business email *<input required type="email" name="email" placeholder="name@company.com" /></label><label>Company *<input required name="company" placeholder="Your company" /></label><label>Area of interest *<select required name="interest" defaultValue=""><option value="" disabled>Select a service</option><option>Human Capital Management</option><option>Technical Services & Operations</option><option>ICT Infrastructure</option><option>Multiple services</option><option>Not sure yet</option></select></label><label className="wide">Optional message<textarea name="message" placeholder="A few details about your enquiry" rows={4} /></label></div><button className="button button-gold form-submit" type="submit">Send inquiry <Arrow /></button></form>}</div></div></section>
    </main>
  )
}
