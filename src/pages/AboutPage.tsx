import { useNavigate } from 'react-router-dom'

import ceoPortrait from '@/assets/ceo-sammer-al-sabawi.jpg'
import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import Arrow from '@/components/Arrow'
import GlobalPresenceSection from '@/components/GlobalPresenceSection'
import LogoMarquee from '@/components/LogoMarquee'
import PageSubnav from '@/components/PageSubnav'
import StoryDial from '@/components/StoryDial'
import {
  aboutCeo,
  aboutCerts,
  aboutCta,
  aboutDifference,
  aboutGlance,
  aboutIntro,
  aboutMission,
  aboutOffices,
  aboutPresence,
  aboutStory,
  aboutValues,
  aboutVision,
} from '@/data/aboutPage'
import { clients } from '@/data/clients'

const aboutSections = [
  { id: 'about-who', label: 'About SIS Global' },
  { id: 'about-story', label: 'Our Story' },
  { id: 'about-mission', label: 'Vision & Mission' },
  { id: 'about-values', label: 'Our Values' },
  { id: 'about-difference', label: 'What Makes Us Different' },
  { id: 'about-ceo', label: 'CEO Message' },
  { id: 'about-certs', label: 'Certifications' },
  { id: 'about-presence', label: 'Global Presence' },
]

function officeTitle(office: (typeof aboutOffices)[number]) {
  if (office.city && office.place) return `${office.country} – ${office.city} (${office.place})`
  if (office.city) return `${office.country} – ${office.city}`
  return office.country
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export default function AboutPage() {
  const navigate = useNavigate()
  const contact = () => navigate({ pathname: '/', hash: 'contact' })

  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${heroNetworkImage})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">About Us</p>
            <h1 id="about-title">About SIS Global</h1>
            <p>{aboutIntro[0]}</p>
          </div>
        </div>
      </section>

      <PageSubnav items={aboutSections} />

      <section id="about-who" className="about-section section">
        <div className="container">
          <div className="hcm-prose about-prose">
            {aboutIntro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="work-block">
            <h2>SIS Global at a Glance</h2>
            <dl className="hcm-stats about-glance">
              {aboutGlance.map((metric) => (
                <div key={metric.label}>
                  <dd>{metric.value}</dd>
                  <dt>{metric.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="about-story" className="about-story-section">
        <div className="container">
          <StoryDial items={aboutStory} />
        </div>
      </section>

      <section id="about-mission" className="about-section section">
        <div className="container">
          <h2>Our Vision & Mission</h2>
          <div className="about-vm">
            <article>
              <h3>Our Vision</h3>
              <p>{aboutVision}</p>
            </article>
            <article>
              <h3>Our Mission</h3>
              <p>{aboutMission}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="about-values" className="about-section section is-paper">
        <div className="container">
          <h2>Our Values</h2>
          <div className="about-tiles">
            {aboutValues.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about-difference" className="about-section section">
        <div className="container">
          <h2>What Makes SIS Global Different</h2>
          <ol className="hcm-why">
            {aboutDifference.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="about-ceo" className="about-ceo" aria-labelledby="about-ceo-title">
        <div className="container about-ceo-grid">
          <div className="about-ceo-visual" data-curtain>
            <img src={ceoPortrait} alt={`${aboutCeo.name}, ${aboutCeo.role}`} />
          </div>
          <div className="about-ceo-copy">
            <p className="about-panel-label">{aboutCeo.label}</p>
            <h2 id="about-ceo-title">CEO Message</h2>
            <blockquote>
              {aboutCeo.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </blockquote>
            <cite>
              <strong>{aboutCeo.name}</strong>
              {aboutCeo.role}
            </cite>
          </div>
        </div>
      </section>

      <section id="about-certs" className="about-section section is-paper">
        <div className="container">
          <h2>Standards & Certifications</h2>
          <p className="about-lead">Our commitment to quality, safety, information security and business continuity is supported by internationally recognized management standards.</p>
          <div className="about-certs">
            {aboutCerts.map((item) => (
              <article key={item.code}>
                <h3>{item.code}</h3>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section section">
        <div className="container">
          <h2>Trusted by Leading Organizations</h2>
          <LogoMarquee items={clients} />
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <h2>{aboutCta.title}</h2>
          <p>{aboutCta.copy}</p>
          <button className="text-link" type="button" onClick={contact}>
            {aboutCta.action} <Arrow />
          </button>
        </div>
      </section>

      <GlobalPresenceSection
        sectionId="about-presence"
        heading={aboutPresence.heading}
        lead={aboutPresence.lead}
      />

      <section className="about-section section is-paper">
        <div className="container">
          <h2>{aboutPresence.officesTitle}</h2>
          <p className="about-lead">{aboutPresence.officesLead}</p>
          <div className="about-offices">
            {aboutOffices.map((office) => (
              <article key={office.country}>
                <h3>{officeTitle(office)}</h3>
                {office.lines?.map((line) => <p key={line}>{line}</p>)}
                {office.phone ? <a href={telHref(office.phone)}>{office.phone}</a> : null}
              </article>
            ))}
          </div>
          <p className="about-missing">
            {aboutPresence.missing}{' '}
            <button className="text-link" type="button" onClick={contact}>
              Contact Us <Arrow />
            </button>
          </p>
        </div>
      </section>
    </main>
  )
}
