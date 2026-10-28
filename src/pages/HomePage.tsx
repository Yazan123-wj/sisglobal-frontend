import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import { insightsByKind, type InsightImage } from '@/data/insights'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import homeCareersImage from '@/assets/home-careers.jpg'
import homeInsightsImage from '@/assets/home-insights.jpg'
import Arrow from '@/components/Arrow'
import DifferenceSection from '@/components/DifferenceSection'
import GlobalPresenceSection from '@/components/GlobalPresenceSection'
import LogoMarquee from '@/components/LogoMarquee'
import MetricsBar from '@/components/MetricsBar'
import { clients } from '@/data/clients'
import { workIndustries } from '@/data/workContent'

const homeIndustrySlugs = [
  'telecommunications',
  'government',
  'energy-utilities',
  'healthcare',
  'financial-services',
  'retail-consumer',
] as const

const homeIndustries = homeIndustrySlugs
  .map((slug) => workIndustries.find((industry) => industry.slug === slug))
  .filter((industry): industry is (typeof workIndustries)[number] => Boolean(industry))

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

function PartnerStrip() {
  return (
    <div className="trusted-logos-block">
      <h2 className="logo-strip-label">Established Technology Partners</h2>
      <LogoMarquee items={techPartners} />
    </div>
  )
}

export default function HomePage() {
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
        <div className="container hero-content">
          <div className="hero-copy">
            <h1 id="hero-title">{active.title}</h1>
            <div className="hero-actions">
              <button className="button button-ghost" type="button" onClick={() => goTo('services')}>Explore our services <Arrow /></button>
            </div>
          </div>
        </div>
        <div className="container service-switcher" role="tablist" aria-label="SIS Global business units">{(Object.keys(services) as ServiceKey[]).map((key, index) => { const service = services[key]; const selected = key === activeService; return <button key={key} type="button" role="tab" aria-selected={selected} className={selected ? 'active' : ''} onClick={() => setActiveService(key)}><span>0{index + 1}</span><b>{service.label}</b><small>{service.eyebrow}</small></button> })}</div>
      </section>
      <section id="about" className="trust-section section"><div className="container">
        <div className="trusted-logos-block home-logo-strip">
          <h2 className="logo-strip-label">Trusted by Leading Organizations</h2>
          <LogoMarquee items={clients} />
        </div>
        <div className="about-do">
          <div className="about-do-heading">
            <h2>Who we are,<br /><em>and what we do.</em></h2>
            <div>
              <p className="about-do-lead">Headquartered in Riyadh. Trusted across the region.</p>
              <p>SIS Global turns complex business needs into practical solutions through three specialized businesses and one accountable partner.</p>
            </div>
          </div>
          <div id="services" className="service-cards">
            {([
              { key: 'hcm', to: '/what-we-do/hcm', label: 'Idarat HCM', title: 'Build Stronger Teams.', copy: 'Find the right talent and simplify HR operations with recruitment, payroll and workforce management built around your business.', image: caseWorkforce },
              { key: 'tso', to: '/what-we-do/tso', label: 'Idarat TSO', title: 'Keep Your Network Performing.', copy: 'Build, maintain and optimize your telecom networks with expert engineering, field services and coordinated logistics support.', image: caseTelecom },
              { key: 'ict', to: '/what-we-do/ict', label: 'Identiti ICT', title: 'Put Technology to Work.', copy: 'Connect, protect and automate your business with integrated ICT solutions and technology supply, from design to ongoing support.', image: caseIct },
            ] as const).map((item) => (
              <Link key={item.key} className={`service-card service-${item.key}`} to={item.to}>
                <img src={item.image} alt="" />
                <div className="service-card-copy">
                  <span className="service-card-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <span className="service-card-cta">Explore <Arrow /></span>
                  <p>{item.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </div></div></section>
      <MetricsBar />
      <section id="difference" className="difference-section section">
        <div className="container">
          <DifferenceSection />
          <div id="industries" className="industry-band">
            <div className="industry-band-copy">
              <p>Expertise across industries</p>
              <Link className="text-link" to="/what-we-do/industries">
                Explore Industries <Arrow />
              </Link>
            </div>
            <ul className="industry-name-list">
              {homeIndustries.map((industry) => (
                <li key={industry.title}>{industry.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section id="cases" className="case-section section">
        <div className="container">
          <div className="cases-heading">
            <p className="eyebrow">Success stories</p>
            <div className="cases-lead">
              <h2>Projects that<br /><em>deliver impact.</em></h2>
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
        heading={<>Where you can<br /><em>find us.</em></>}
        lead="Explore our locations and connect with the teams delivering SIS Global’s services across the region."
      />
      <section className="home-split" aria-label="Careers and insights">
        <Link id="careers" className="home-split-pane" to="/vacancies">
          <img className="home-split-photo" src={homeCareersImage} alt="" aria-hidden="true" />
          <div className="home-split-copy">
            <p className="eyebrow light">Work with us</p>
            <h2>Build what’s next<br /><em>with us.</em></h2>
            <p>Find your next opportunity. Explore our open vacancies.</p>
            <span className="button button-gold">Explore Vacancies <Arrow /></span>
          </div>
        </Link>
        <Link id="insights" className="home-split-pane" to="/insights">
          <img className="home-split-photo" src={homeInsightsImage} alt="" aria-hidden="true" />
          <div className="home-split-copy">
            <p className="eyebrow light">News & Insights</p>
            <h2>News &amp;<br /><em>Insights.</em></h2>
            <p>Articles, news and success stories in one place.</p>
            <span className="button button-gold">View All <Arrow /></span>
          </div>
        </Link>
      </section>
      <section id="contact" className="contact-section section"><div className="container contact-wrap"><div className="contact-copy"><p className="eyebrow light">Get in touch</p><h2>Let’s put your<br /><em>plans into action.</em></h2><p>Tell us what your business needs and the right specialist will get back to you.</p></div><div className="form-card">{formSent ? <div className="success-state"><span>✓</span><h3>Thanks for getting in touch.</h3><p>Your enquiry has been received. A SIS Global specialist will contact you shortly.</p><button className="button button-outline" type="button" onClick={() => setFormSent(false)}>Send another enquiry <Arrow /></button></div> : <form onSubmit={submitForm}><div className="form-heading"><h3>How can we help?</h3><p>Fields marked with * are required.</p></div><div className="form-grid"><label>Name *<input required name="name" placeholder="Your full name" /></label><label>Business email *<input required type="email" name="email" placeholder="name@company.com" /></label><label>Company *<input required name="company" placeholder="Your company" /></label><label>Area of interest *<select required name="interest" defaultValue=""><option value="" disabled>Select a service</option><option>Human Capital Management</option><option>Technical Services & Operations</option><option>ICT Infrastructure</option><option>Multiple services</option><option>Not sure yet</option></select></label><label className="wide">Message<textarea name="message" placeholder="A few details about your enquiry" rows={4} /></label></div><button className="button button-gold form-submit" type="submit">Send Enquiry <Arrow /></button></form>}</div></div></section>
    </main>
  )
}
