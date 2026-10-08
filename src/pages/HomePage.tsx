import { useEffect, useRef, useState } from 'react'
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
import { gsap, useGSAP } from '@/lib/gsap'

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

const partnerLoop = [...techPartners, ...techPartners, ...techPartners]

function PartnerStrip() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useGSAP(() => {
    const wrapEl = root.current
    const trackEl = track.current
    if (!wrapEl || !trackEl) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const copies = 3
    const loopWidth = () => trackEl.scrollWidth / copies
    let x = 0
    let speed = 0.55
    let target = 0.55

    const onMove = (event: MouseEvent) => {
      const rect = wrapEl.getBoundingClientRect()
      const t = gsap.utils.clamp(0, 1, (event.clientX - rect.left) / Math.max(rect.width, 1))
      target = gsap.utils.mapRange(0, 1, -1.85, 1.85, t)
    }
    const onLeave = () => { target = 0.55 }

    const tick = () => {
      speed += (target - speed) * 0.08
      x -= speed
      const width = loopWidth()
      if (width <= 0) return
      if (x <= -width) x += width
      if (x > 0) x -= width
      gsap.set(trackEl, { x })
    }

    wrapEl.addEventListener('mousemove', onMove)
    wrapEl.addEventListener('mouseleave', onLeave)
    gsap.ticker.add(tick)

    return () => {
      wrapEl.removeEventListener('mousemove', onMove)
      wrapEl.removeEventListener('mouseleave', onLeave)
      gsap.ticker.remove(tick)
    }
  }, { scope: root })

  return (
    <div className="partner-strip">
      <p>Established technology partners</p>
      <div className="partner-swiper" ref={root}>
        <ul className="partner-track" ref={track} aria-hidden="true">
          {partnerLoop.map((partner, index) => (
            <li key={`${partner.mark}-${index}`}>
              <BrandMark mark={partner.mark} />
              <span>{partner.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function BrandMark({ mark }: { mark: string }) {
  return (
    <svg className={`brand-logo brand-logo-${mark}`} viewBox={mark === 'apple' ? '0 0 24 24' : '0 0 32 32'} aria-hidden="true">
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
      {mark === 'apple' && <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.107-.987 3.957-.987 1.851 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.065-3.623-2.293-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.378-3.066c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />}
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
            <h3>Trusted by<br />leading organizations</h3>
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
        <div className="who-block">
          <div className="who-media">
            <img src={caseWorkforce} alt="" />
          </div>
          <div className="who-copy">
            <p className="eyebrow">Who we are</p>
            <h2>Built in Riyadh.<br /><em>Trusted across the region.</em></h2>
            <p>Since 2007, SIS Global has brought together expertise in human capital management, technical operations and enterprise technology to help organizations perform and grow. We turn complex business requirements into practical solutions through specialist teams, integrated services and one accountable partner.</p>
            <Link className="button button-navy" to="/about">Our Story <Arrow /></Link>
          </div>
        </div>
        <div className="section-heading intro-heading services-heading">
          <p className="eyebrow">What we do</p>
          <div>
            <h2>One group.<br /><em>Three capabilities.</em></h2>
          </div>
        </div>
        <div id="services" className="service-cards">
          <Link className="service-card service-hcm" to="/what-we-do/hcm">
            <div className="card-top"><span>01</span><p>Idarat HCM</p><span className="corner-arrow"><Arrow /></span></div>
            <div className="service-card-content">
              <p className="card-eyebrow">Human Capital Management</p>
              <h3>Build Stronger Teams.</h3>
              <p>Find the right talent and simplify HR operations with recruitment, payroll and workforce management services built around your business.</p>
              <span className="text-link">Explore HCM <Arrow /></span>
            </div>
          </Link>
          <Link className="service-card service-tso" to="/what-we-do/tso">
            <div className="card-top"><span>02</span><p>Idarat TSO</p><span className="corner-arrow"><Arrow /></span></div>
            <div className="service-card-content">
              <p className="card-eyebrow">Technical Services & Operations</p>
              <h3>Keep Your Network Performing.</h3>
              <p>Our engineers and field teams deliver telecom network rollout, maintenance and optimization, supported by coordinated logistics.</p>
              <span className="text-link">Explore TSO <Arrow /></span>
            </div>
          </Link>
          <Link className="service-card service-ict" to="/what-we-do/ict">
            <div className="card-top"><span>03</span><p>Identiti ICT</p><span className="corner-arrow"><Arrow /></span></div>
            <div className="service-card-content">
              <p className="card-eyebrow">ICT Infrastructure</p>
              <h3>Put Technology to Work.</h3>
              <p>Connect, protect and automate your business with integrated ICT solutions and enterprise technology supply, from design and deployment to ongoing support.</p>
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
              <h2>The Expertise You Need.<br />The Accountability You Expect.</h2>
            </div>
          </div>
          <div className="difference-grid">
            <article>
              <span>01</span>
              <h3>Quality & Operational Excellence</h3>
              <p>We combine experienced teams, standardized processes and ISO-certified management systems to deliver consistently, with quality and safety built into every stage.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Integrity & Accountability</h3>
              <p>We build lasting client relationships through transparent communication, clear ownership and dependable execution. We take responsibility for the commitments we make.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Commitment to Your Success</h3>
              <p>We align every engagement with your business priorities, bringing together the right expertise and services to solve operational challenges and create long-term value.</p>
            </article>
          </div>
          <div id="industries" className="industry-band">
            <div className="industry-band-copy">
              <div>
                <p>Expertise across industries</p>
                <span>Serving telecom, government, infrastructure, healthcare, financial services and retail.</span>
              </div>
              <Link className="text-link" to="/what-we-do#industries">
                Explore Industries <Arrow />
              </Link>
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
            <p className="eyebrow">Success stories</p>
            <div className="cases-lead">
              <h2>Projects that<br />deliver impact.</h2>
              <div>
                <p>Discover how we help operators, enterprises and public-sector organizations turn complex challenges into measurable results.</p>
                <Link className="text-link" to="/insights/stories">View Success Stories <Arrow /></Link>
              </div>
            </div>
          </div>
          <div className="case-grid">
            {featuredStory ? (
              <Link className="case-card is-featured" to={`/insights/${featuredStory.id}`}>
                <div className="case-art-wrap" data-curtain>
                  <img className="case-art" src={storyImages[featuredStory.image]} alt="" />
                  <span>Featured</span>
                </div>
                <div className="case-content">
                  <span>{featuredStory.topic}</span>
                  <h3>{featuredStory.title}</h3>
                  <p>{featuredStory.excerpt}</p>
                  <small>Read story <Arrow /></small>
                </div>
              </Link>
            ) : null}
            {moreStories.map((story) => (
              <Link key={story.id} className="case-card" to={`/insights/${story.id}`}>
                <div className="case-art-wrap" data-curtain>
                  <img className="case-art" src={storyImages[story.image]} alt="" />
                </div>
                <div className="case-content">
                  <span>{story.topic}</span>
                  <h3>{story.title}</h3>
                  <p>{story.excerpt}</p>
                  <small>Read story <Arrow /></small>
                </div>
              </Link>
            ))}
          </div>
          <PartnerStrip />
        </div>
      </section>
      <GlobalPresenceSection
        heading={<>Where you can<br />find us.</>}
        lead="Explore our global locations and connect with the teams delivering SIS Global’s services and solutions in every market we serve."
      />
      <section id="careers" className="careers-panel">
        <div className="container split-inner">
          <div className="split-intro">
            <p className="eyebrow light">Work with us</p>
            <h2>Build what’s next<br />with us.</h2>
            <p>Find your next opportunity. Explore our open vacancies.</p>
            <button className="button button-gold" type="button" onClick={() => navigate('/vacancies')}>Explore Vacancies <Arrow /></button>
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
            <p className="eyebrow">News & Insights</p>
            <div className="insights-lead">
              <h2>News &amp;<br /><em>Insights.</em></h2>
              <div>
                <Link className="text-link" to="/insights">View All <Arrow /></Link>
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
      <section id="contact" className="contact-section section"><div className="container contact-wrap"><div className="contact-copy"><p className="eyebrow light">Get in touch</p><h2>Let’s put your<br /><em>plans into action.</em></h2><p>Tell us what your business needs and the right specialist will get back to you.</p></div><div className="form-card">{formSent ? <div className="success-state"><span>✓</span><h3>Thanks for getting in touch.</h3><p>Your enquiry has been received. A SIS Global specialist will contact you shortly.</p><button className="button button-outline" type="button" onClick={() => setFormSent(false)}>Send another enquiry <Arrow /></button></div> : <form onSubmit={submitForm}><div className="form-heading"><h3>How can we help?</h3><p>Fields marked with * are required.</p></div><div className="form-grid"><label>Name *<input required name="name" placeholder="Your full name" /></label><label>Business email *<input required type="email" name="email" placeholder="name@company.com" /></label><label>Company *<input required name="company" placeholder="Your company" /></label><label>Area of interest *<select required name="interest" defaultValue=""><option value="" disabled>Select a service</option><option>Human Capital Management</option><option>Technical Services & Operations</option><option>ICT Infrastructure</option><option>Multiple services</option><option>Not sure yet</option></select></label><label className="wide">Message<textarea name="message" placeholder="A few details about your enquiry" rows={4} /></label></div><button className="button button-gold form-submit" type="submit">Send Enquiry <Arrow /></button></form>}</div></div></section>
    </main>
  )
}
