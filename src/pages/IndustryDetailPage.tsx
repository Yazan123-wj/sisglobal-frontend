import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import Arrow from '@/components/Arrow'
import PageSubnav from '@/components/PageSubnav'
import { brandLogos } from '@/data/brand'
import { industryImages } from '@/data/industryImages'
import { getIndustryPage, type IndustryItem, type IndustrySupport } from '@/data/industryPages'
import { getIndustry, workIndustries } from '@/data/workContent'

const sections = [
  { id: 'industry-overview', label: 'Overview' },
  { id: 'industry-challenges', label: 'Challenges' },
  { id: 'industry-support', label: 'How we help' },
  { id: 'industry-faq', label: 'FAQ' },
]

type UnitKey = 'tso' | 'hcm' | 'ict'

function unitFromTitle(title: string): UnitKey | null {
  if (/TSO|Technical Services/i.test(title)) return 'tso'
  if (/HCM|Human Capital/i.test(title)) return 'hcm'
  if (/ICT|Information & Communication/i.test(title)) return 'ict'
  return null
}

function unitLabel(title: string) {
  const unit = unitFromTitle(title)
  if (unit === 'tso') return 'Idarat TSO'
  if (unit === 'hcm') return 'Idarat HCM'
  if (unit === 'ict') return 'Identiti ICT'
  return title
}

function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="industry-faq">
      {faqs.map((item, index) => {
        const expanded = open === index
        return (
          <article key={item.q} className={expanded ? 'is-open' : undefined}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span>{item.q}</span>
              <svg className="industry-faq-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.5 6.25 8 10.75l4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {expanded ? <p>{item.a}</p> : null}
          </article>
        )
      })}
    </div>
  )
}

function ItemLinks({ links }: { links: IndustryItem['links'] }) {
  if (!links.length) return null
  return (
    <div className="industry-chips">
      {links.map((link) => (
        <Link key={`${link.to}-${link.label}`} className="industry-chip" to={link.to}>
          {link.label}
        </Link>
      ))}
    </div>
  )
}

function SupportPanel({ group, paper = false }: { group: IndustrySupport; paper?: boolean }) {
  const unit = unitFromTitle(group.title)
  const logo = unit ? brandLogos[unit] : null

  return (
    <section className={paper ? 'industry-support-panel is-paper' : 'industry-support-panel'}>
      <header className="industry-support-head">
        <h3>{group.title}</h3>
        {logo ? <img src={logo.src} alt="" /> : null}
      </header>
      <div className="industry-support-grid">
        {group.items.map((item, index) => (
          <article key={item.title} className="industry-support-item">
            <h4>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.title}
            </h4>
            <p>{item.copy}</p>
            <ItemLinks links={item.links} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default function IndustryDetailPage() {
  const { slug } = useParams()
  const listing = slug ? getIndustry(slug) : undefined
  const page = slug ? getIndustryPage(slug) : undefined

  if (!listing || !page) return <Navigate to="/what-we-do/industries" replace />

  const related = page.related
    .map((id) => workIndustries.find((item) => item.slug === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <main className="work-page industry-page">
      <section className="about-hero" aria-labelledby="industry-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${industryImages[listing.slug]})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="industry-crumb">
              <Link to="/what-we-do/industries">Industries</Link>
              <span aria-hidden="true">/</span>
              {listing.title}
            </p>
            <h1 id="industry-title">{listing.title}</h1>
            <p>{page.intro[0]}</p>
            <ul className="industry-hero-units">
              {page.support.map((group) => (
                <li key={group.title}>{unitLabel(group.title)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageSubnav className="page-subnav-work" items={sections} />

      <section id="industry-overview" className="industry-block section">
        <div className="container">
          <div className="industry-overview">
            <div>
              <p className="about-panel-label">Overview</p>
              <p className="industry-overview-aside">{listing.copy}</p>
            </div>
            <p className="industry-overview-lead">{page.intro[1]}</p>
          </div>
        </div>
      </section>

      <section id="industry-challenges" className="industry-block is-paper section">
        <div className="container">
          <div className="industry-section-head">
            <p className="about-panel-label">Challenges</p>
            <h2>{page.challengesTitle}</h2>
          </div>
          {page.challengeGroups.map((group) => (
            <div key={group.heading ?? 'challenges'} className="industry-group">
              {group.heading ? <h3 className="industry-group-heading">{group.heading}</h3> : null}
              <div className="industry-challenge-grid">
                {group.items.map((item, index) => (
                  <article key={item.title} className="industry-challenge">
                    <h3>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {item.title}
                    </h3>
                    <p>{item.copy}</p>
                    <ItemLinks links={item.links} />
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="industry-support" className="industry-block section">
        <div className="container">
          <div className="industry-section-head">
            <p className="about-panel-label">How we help</p>
            <h2>{page.supportTitle}</h2>
          </div>
          {page.support.map((group, index) => (
            <SupportPanel key={group.title} group={group} paper={index === 1} />
          ))}
          {page.notes?.map((note) => (
            <article key={note.title} className="industry-note">
              <h3>{note.title}</h3>
              <p>{note.copy}</p>
              <ItemLinks links={note.links} />
            </article>
          ))}
        </div>
      </section>

      <section id="industry-faq" className="industry-block is-paper section">
        <div className="container">
          <div className="industry-faq-head">
            <h2>FAQ</h2>
          </div>
          <FaqList faqs={page.faqs} />
          {related.length ? (
            <div className="industry-related">
              <p className="about-panel-label">Related industries</p>
              <div className="industry-related-grid">
                {related.map((item) => (
                  <Link key={item.slug} className="industry-related-card" to={`/what-we-do/industries/${item.slug}`}>
                    <div className="about-card-media" data-curtain>
                      <img src={industryImages[item.slug]} alt="" />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <span className="text-link">{item.cta} <Arrow dir="right" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="about-cta industries-cta">
        <div className="container">
          <h2>{page.cta}</h2>
          <Link className="button button-primary" to="/contact">
            Contact Us <Arrow dir="right" />
          </Link>
        </div>
      </section>
    </main>
  )
}
