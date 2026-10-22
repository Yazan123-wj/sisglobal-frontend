import { useEffect, useRef } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import Arrow from '@/components/Arrow'
import HcmSectionView, { Steps } from '@/components/HcmSectionView'
import PageSubnav, { PageSubnavPills } from '@/components/PageSubnav'
import TsoSectionView from '@/components/TsoSectionView'
import { getHcmSection, hcmNav } from '@/data/hcmPages'
import { getTsoSection, tsoInnerNav, tsoNav } from '@/data/tsoPages'
import { workServices } from '@/data/workContent'
import type { ServiceKey, WorkAudience, WorkService } from '@/data/workContent'

const images: Record<ServiceKey, string> = {
  hcm: caseWorkforce,
  tso: caseTelecom,
  ict: caseIct,
}

function isService(value: string | null | undefined): value is ServiceKey {
  return value === 'tso' || value === 'hcm' || value === 'ict'
}

const gallery = [caseWorkforce, caseTelecom, caseIct, heroNetworkImage]

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
            <button type="button" aria-label="Previous" onClick={() => move(-1)}><Arrow dir="left" /></button>
            <button type="button" aria-label="Next" onClick={() => move(1)}><Arrow dir="right" /></button>
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
}: {
  service: WorkService
  image: string
  pillarId: string
}) {
  const isOverview = pillarId === 'overview'
  const pillar = service.pillars.find((item) => item.id === pillarId)

  if (!isOverview && pillar) {
    return (
      <div className="work-service">
        {pillar.approach ? (
          <section className="work-block" style={{ marginTop: 0 }}>
            <p className="about-panel-label">How we work</p>
            <Steps items={pillar.approach} />
          </section>
        ) : null}
        {pillar.items.length ? (
          <section className="work-block" style={pillar.approach ? undefined : { marginTop: 0 }}>
            <p className="about-panel-label">Services</p>
            <ol className="hcm-stack">
              {pillar.items.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                    {item.scope ? <p className="work-scope">{item.scope}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
        {pillar.notes ? (
          <section className="work-block">
            <div className="hcm-models">
              {pillar.notes.map((note, index) => (
                <article key={note}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{note}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    )
  }

  return (
    <div className="work-service">
      <dl className="hcm-stats">
        {service.metrics.map((metric) => (
          <div key={metric.label}>
            <dd>{metric.value}</dd>
            <dt>{metric.label}</dt>
          </div>
        ))}
      </dl>

      {service.intro.length > 1 ? (
        <section className="hcm-prose" style={{ marginTop: 48 }}>
          {service.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ) : null}

      <section className="work-block">
        <h2>Why {service.label}?</h2>
        <ol className="hcm-why">
          {service.reasons.map((reason, index) => (
            <li key={reason.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="work-offer" className="work-block">
        <h2>What we offer</h2>
        <ol className="hcm-stack">
          {service.pillars.map((item, index) => (
            <li key={item.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>
                  <Link className="hcm-offer-link" to={`/what-we-do/${service.key}/${item.id}`}>
                    {item.label}
                  </Link>
                </h3>
                <p>{item.title}</p>
              </div>
            </li>
          ))}
        </ol>
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

      <section className="work-block">
        <h2>Industries we serve</h2>
        <ul className="work-industries">
          {service.industries.map((industry) => (
            <li key={industry}>{industry}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default function WhatWeDoPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { unit, section } = useParams()
  const [searchParams] = useSearchParams()
  const fromPath = isService(unit) ? unit : null

  if (!fromPath) return <Navigate to="/what-we-do/hcm" replace />

  const pillarQuery = searchParams.get('pillar')
  if (pillarQuery && !section) {
    return <Navigate to={`/what-we-do/${fromPath}/${pillarQuery}`} replace />
  }

  const selected = workServices[fromPath]
  const isHcm = fromPath === 'hcm'
  const isTso = fromPath === 'tso'
  const hcmMatch = hcmNav.some((item) => item.id === section)
  const tsoMatch = tsoNav.some((item) => item.id === section)
  if (isHcm && section && !hcmMatch) return <Navigate to="/what-we-do/hcm" replace />
  if (isTso && section && !tsoMatch) return <Navigate to="/what-we-do/tso" replace />

  const hcmSection = isHcm ? getHcmSection(section ?? 'overview') : null
  const tsoSection = isTso ? getTsoSection(section ?? 'overview') : null
  const pillar = selected.pillars.find((item) => item.id === section)
  if (!isHcm && !isTso && section && !pillar) return <Navigate to={`/what-we-do/${fromPath}`} replace />

  const pillarId = pillar?.id ?? 'overview'
  const sectionNav = [
    { id: 'overview', label: `${selected.label.replace('Idarat ', '').replace('Identiti ', '')} Overview` },
    ...selected.pillars.map((item) => ({ id: item.id, label: item.label })),
  ]

  const contact = () => navigate({ pathname: '/', hash: 'contact' })
  const heroTitle = tsoSection?.title ?? hcmSection?.title ?? (pillar ? pillar.title : selected.title)
  const heroLead = tsoSection?.lead ?? hcmSection?.lead ?? (pillar ? pillar.intro : selected.intro[0])
  const heroEyebrow = tsoSection?.eyebrow ?? hcmSection?.eyebrow ?? (pillar ? pillar.label : selected.label)
  const subnavItems = isHcm ? hcmNav : isTso ? tsoNav : sectionNav
  const subnavActive = isHcm ? (hcmSection?.id ?? 'overview') : isTso ? (tsoSection?.id ?? 'overview') : pillarId
  const innerNav = isTso && tsoSection ? tsoInnerNav[tsoSection.id] : undefined
  const hashId = location.hash.replace('#', '')
  const activeInner = innerNav?.some((item) => item.id === hashId) ? hashId : innerNav?.[0]?.id
  const firstInner = useRef(true)

  useEffect(() => {
    firstInner.current = true
  }, [tsoSection?.id])

  useEffect(() => {
    if (!activeInner) return
    if (firstInner.current) {
      firstInner.current = false
      return
    }
    document.getElementById('work-content')?.scrollIntoView({ block: 'start' })
  }, [activeInner])

  return (
    <main className={innerNav ? 'work-page has-tso-inner-nav' : 'work-page'}>
      <section className="about-hero" aria-labelledby="work-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${images[selected.key]})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">{heroEyebrow}</p>
            <h1 id="work-title">{heroTitle}</h1>
            <p>{heroLead}</p>
          </div>
        </div>
      </section>

      <PageSubnav
        className="page-subnav-work"
        label={`${selected.label} service lines`}
        items={subnavItems}
        activeId={subnavActive}
        onSelect={(id) => navigate(id === 'overview' ? `/what-we-do/${fromPath}` : `/what-we-do/${fromPath}/${id}`)}
        extra={innerNav && activeInner ? (
          <PageSubnavPills
            items={innerNav}
            label={`${tsoSection?.nav} sections`}
            activeId={activeInner}
            onSelect={(id) => {
              navigate({
                pathname: location.pathname,
                search: location.search,
                hash: id.endsWith('-overview') ? '' : id,
              }, { replace: true, preventScrollReset: true })
            }}
          />
        ) : null}
      />

      <section id="work-content" className="work-content section">
        <div className="container">
          {tsoSection ? (
            <TsoSectionView section={tsoSection} topic={activeInner} />
          ) : hcmSection ? (
            <HcmSectionView section={hcmSection} image={images.hcm} />
          ) : (
            <ServiceView service={selected} image={images[selected.key]} pillarId={pillarId} />
          )}
        </div>
      </section>
      {tsoSection ? null : hcmSection?.close ? (
        <section className="about-cta">
          <div className="container">
            <h2>{hcmSection.close.title}</h2>
            {hcmSection.close.copy ? <p className="work-cta-copy">{hcmSection.close.copy}</p> : null}
            <button className="text-link" type="button" onClick={contact}>
              {hcmSection.close.cta} <Arrow dir="right" />
            </button>
          </div>
        </section>
      ) : !hcmSection ? (
        <section className="about-cta">
          <div className="container">
            <h2>{selected.cta.title}</h2>
            <p className="work-cta-copy">{selected.cta.copy}</p>
            <button className="text-link" type="button" onClick={contact}>
              {selected.cta.label} <Arrow dir="right" />
            </button>
          </div>
        </section>
      ) : null}
    </main>
  )
}
