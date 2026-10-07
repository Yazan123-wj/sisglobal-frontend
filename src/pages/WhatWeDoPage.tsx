import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import PageSubnav from '@/components/PageSubnav'
import { workOverview, workServices } from '@/data/workContent'
import type { ServiceKey, WorkAudience, WorkService } from '@/data/workContent'

type WorkTab = 'all' | ServiceKey

const workTabs = [
  { id: 'all', label: 'All' },
  { id: 'tso', label: 'TSO' },
  { id: 'hcm', label: 'HCM' },
  { id: 'ict', label: 'ICT' },
] as const

const images: Record<ServiceKey, string> = {
  hcm: caseWorkforce,
  tso: caseTelecom,
  ict: caseIct,
}

function isService(value: string | null): value is ServiceKey {
  return value === 'tso' || value === 'hcm' || value === 'ict'
}

const gallery = [caseWorkforce, caseTelecom, caseIct, heroNetworkImage]

function ScrollRow({
  id,
  title,
  count,
  cardSelector,
  children,
}: {
  id?: string
  title: string
  count: number
  cardSelector: string
  children: ReactNode
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const scrollable = count > 3

  const move = (direction: -1 | 1) => {
    const node = scroller.current
    if (!node) return
    const card = node.querySelector<HTMLElement>(cardSelector)
    const step = (card?.offsetWidth ?? node.clientWidth / 3) + 16
    node.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <section id={id} className="work-block">
      <div className="work-audience-head">
        <h2>{title}</h2>
        {scrollable ? (
          <div className="work-scroll-nav">
            <button type="button" aria-label="Previous" onClick={() => move(-1)}>←</button>
            <button type="button" aria-label="Next" onClick={() => move(1)}>→</button>
          </div>
        ) : null}
      </div>
      <div ref={scroller} className={scrollable ? 'work-scroll-row is-scroll' : 'work-scroll-row'}>
        {children}
      </div>
    </section>
  )
}

function AudienceRow({ audiences }: { audiences: WorkAudience[] }) {
  const scroller = useRef<HTMLDivElement>(null)
  const scrollable = audiences.length > 3

  const move = (direction: -1 | 1) => {
    const node = scroller.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('.work-photo-card')
    const step = (card?.offsetWidth ?? node.clientWidth / 3) + 16
    node.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <section className="work-block">
      <div className="work-audience-head">
        <h2>Who we serve</h2>
        {scrollable ? (
          <div className="work-scroll-nav">
            <button type="button" aria-label="Previous" onClick={() => move(-1)}>←</button>
            <button type="button" aria-label="Next" onClick={() => move(1)}>→</button>
          </div>
        ) : null}
      </div>
      <div ref={scroller} className={scrollable ? 'work-photo-grid is-scroll' : 'work-photo-grid'}>
        {audiences.map((audience, index) => (
          <article key={audience.title} className="work-photo-card">
            <div className="about-card-media" data-curtain >
              <img src={gallery[index % gallery.length]} alt="" />
              <span className="work-overview-index">0{index + 1}</span>
            </div>
            <div className="about-card-body">
              <h3>{audience.title}</h3>
              <p>{audience.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ServiceView({
  service,
  image,
  pillarId,
  onSelectPillar,
}: {
  service: WorkService
  image: string
  pillarId: string
  onSelectPillar: (id: string) => void
}) {
  const pillar = service.pillars.find((item) => item.id === pillarId) ?? service.pillars[0]
  const pillarIndex = service.pillars.findIndex((item) => item.id === pillar.id)

  return (
    <div className="work-service">
      <dl className="work-glance">
        {service.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>

      {service.intro.length > 1 ? (
        <section className="work-lead">
          <div className="work-lead-media" data-curtain >
            <img src={image} alt="" />
          </div>
          <div className="work-lead-copy">
            <p className="about-panel-label">{service.eyebrow}</p>
            {service.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ) : null}

      <section className="work-block">
        <h2>Why {service.label}?</h2>
        <div className="work-box-grid work-box-grid-4">
          {service.reasons.map((reason, index) => (
            <article key={reason.title} className="work-box">
              <span>0{index + 1}</span>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work-offer" className="work-block">
        <h2>What we offer</h2>
        <article className="work-pillar-panel">
          <div className="work-pillar-hero" data-curtain >
            <img src={gallery[pillarIndex % gallery.length]} alt="" />
            <div>
              <p className="about-panel-label">{pillar.label}</p>
              <h3>{pillar.title}</h3>
            </div>
          </div>
          <p className="work-pillar-intro">{pillar.intro}</p>
          {pillar.approach ? (
            <div className="work-process">
              <p className="about-panel-label">How we work</p>
              <div className="work-process-grid">
                {pillar.approach.map((step) => (
                  <article key={step.title} className="work-box">
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <p className="about-panel-label">Services</p>
            <div className="work-box-grid">
              {pillar.items.map((item, index) => (
                <article key={item.title} className="work-box">
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  {item.scope ? <p className="work-scope">{item.scope}</p> : null}
                </article>
              ))}
            </div>
          </div>
          {pillar.notes ? (
            <div className="work-box-grid">
              {pillar.notes.map((note) => (
                <article key={note} className="work-box">
                  <p>{note}</p>
                </article>
              ))}
            </div>
          ) : null}
        </article>
      </section>

      {service.extra ? (
        <section className="work-extra">
          <div className="work-extra-media" data-curtain >
            <img src={image} alt="" />
          </div>
          <div>
            <h3>{service.extra.title}</h3>
            {service.extra.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {service.extra.cta ? <p className="work-extra-cta">{service.extra.cta}</p> : null}
          </div>
        </section>
      ) : null}

      <AudienceRow audiences={service.audiences} />

      <ScrollRow id="industries" title="Industries we serve" count={service.industries.length} cardSelector=".work-box">
        {service.industries.map((industry, index) => (
          <article key={industry} className="work-box">
            <span>0{index + 1}</span>
            <h3>{industry}</h3>
          </article>
        ))}
      </ScrollRow>
    </div>
  )
}

export default function WhatWeDoPage() {
  const navigate = useNavigate()
  const { unit } = useParams()
  const [searchParams] = useSearchParams()
  const pathUnit = unit ?? null
  const queryUnit = searchParams.get('unit')
  const fromPath = isService(pathUnit) ? pathUnit : null
  const fromQuery = isService(queryUnit) ? queryUnit : null
  const active: WorkTab = fromPath ?? fromQuery ?? 'all'
  const selected = active === 'all' ? null : workServices[active]
  const [pillarId, setPillarId] = useState(selected?.pillars[0]?.id ?? '')

  useEffect(() => {
    setPillarId(selected?.pillars[0]?.id ?? '')
  }, [selected?.key])

  const select = (id: string) => {
    navigate(id === 'all' ? '/what-we-do' : `/what-we-do/${id}`)
    window.scrollTo({ top: 0 })
  }

  const selectPillar = (id: string) => {
    setPillarId(id)
    document.getElementById('work-offer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const contact = () => navigate({ pathname: '/', hash: 'contact' })

  return (
    <main className="work-page">
      <section className="about-hero" aria-labelledby="work-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${selected ? images[selected.key] : heroNetworkImage})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">{selected ? selected.label : 'What We Do'}</p>
            <h1 id="work-title">{selected ? selected.title : workOverview.title}</h1>
            <p>{selected ? selected.intro[0] : workOverview.copy}</p>
            {selected ? (
              <div className="work-hero-units">
                {selected.pillars.map((pillar) => (
                  <button key={pillar.id} type="button" onClick={() => selectPillar(pillar.id)}>
                    <b>{pillar.label}</b>
                  </button>
                ))}
              </div>
            ) : (
              <div className="work-hero-units">
                {workOverview.units.map((item) => (
                  <button key={item.key} type="button" onClick={() => select(item.key)}>
                    <b>{item.label}</b>
                    <small>{item.eyebrow}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
          <dl className="about-hero-facts">
            {(selected ? selected.metrics.slice(0, 3) : workOverview.facts).map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PageSubnav
        items={[...workTabs]}
        activeId={active}
        onSelect={select}
        extra={selected ? (
          <div className="page-subnav-pills" role="tablist" aria-label={`${selected.label} service lines`}>
            {selected.pillars.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === pillarId}
                className={item.id === pillarId ? 'is-active' : undefined}
                onClick={() => selectPillar(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      />

      <section id="work-content" className="work-content section">
        <div className="container">
          {selected ? (
            <ServiceView service={selected} image={images[selected.key]} pillarId={pillarId} onSelectPillar={setPillarId} />
          ) : (
            <div className="work-overview">
              <div className="about-intro">
                <h2>Our capabilities</h2>
                <p>People, field operations and technology — delivered as specialized units under one SIS Global group.</p>
              </div>
              <div className="work-overview-grid">
                {workOverview.units.map((item, index) => (
                  <button key={item.key} type="button" className="work-overview-card" onClick={() => select(item.key)}>
                    <div className="work-overview-media" data-curtain >
                      <img src={images[item.key]} alt="" />
                      <span className="work-overview-index">0{index + 1}</span>
                      <span className="work-overview-code">{item.key.toUpperCase()}</span>
                    </div>
                    <div className="work-overview-body">
                      <p>{item.eyebrow}</p>
                      <h2>{item.label}</h2>
                      <p>{item.copy}</p>
                      <ul>
                        {item.children.map((child) => <li key={child}>{child}</li>)}
                      </ul>
                    </div>
                    <span className="work-overview-go">Explore {item.label} <span aria-hidden="true">→</span></span>
                  </button>
                ))}
              </div>
              <section id="industries" className="work-overview-industries">
                <div>
                  <p className="about-panel-label">Industries we serve</p>
                  <h3>The environments we already work in.</h3>
                </div>
                <ul>
                  {workOverview.industries.map((industry, index) => (
                    <li key={industry}>
                      <span>0{index + 1}</span>
                      {industry}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      </section>
      <section className="about-cta">
        <div className="container">
          <h2>{selected ? selected.cta.title : 'Discuss your project with SIS Global'}</h2>
          {selected ? <p className="work-cta-copy">{selected.cta.copy}</p> : null}
          <button className="text-link" type="button" onClick={contact}>
            {selected ? selected.cta.label : 'Contact Us'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </main>
  )
}
