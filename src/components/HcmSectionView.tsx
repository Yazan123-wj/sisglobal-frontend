import { useRef } from 'react'
import { Link } from 'react-router-dom'

import caseWorkforce from '@/assets/case-workforce.jpg'
import industryEducation from '@/assets/industry-education.jpg'
import industryFinance from '@/assets/industry-finance.jpg'
import industryGovernment from '@/assets/industry-government.jpg'
import industryProfessional from '@/assets/industry-professional.jpg'
import Arrow from '@/components/Arrow'
import LogoMarquee from '@/components/LogoMarquee'
import StatisticsBar from '@/components/StatisticsBar'
import { SurfaceBand, createSurfaceTones } from '@/components/SurfaceBand'
import { hcmClients } from '@/data/hcmClients'
import type { HcmItem, HcmSection } from '@/data/hcmPages'

const servicePhotos: Record<string, string> = {
  'Employee Administration': industryProfessional,
  'Payroll, Compensation & Benefits': industryFinance,
  'Government Relations, Compliance & Employee Mobility': industryGovernment,
  'Workforce Management': caseWorkforce,
  'Offboarding & Final Settlement': industryEducation,
}

function chips(scope: string) {
  return scope.split(' · ')
}

function ServiceCards({ title, lead, items }: { title: string; lead?: string[]; items: HcmItem[] }) {
  const scroller = useRef<HTMLUListElement>(null)
  const swipe = items.length > 1

  const move = (direction: -1 | 1) => {
    const node = scroller.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('.tso-card')
    const step = (card?.offsetWidth ?? 320) + 16
    node.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <div className={swipe ? 'tso-swipe' : undefined}>
      <div className="tso-swipe-head">
        <h2>{title}</h2>
        {swipe ? (
          <div className="work-scroll-nav tso-swipe-nav">
            <button type="button" aria-label="Previous" onClick={() => move(-1)}><Arrow dir="left" /></button>
            <button type="button" aria-label="Next" onClick={() => move(1)}><Arrow dir="right" /></button>
          </div>
        ) : null}
      </div>
      {lead?.length ? (
        <div className="tso-sub-lead">
          {lead.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      ) : null}
      <ul ref={scroller} className={swipe ? 'tso-cards is-swipe' : 'tso-cards'}>
        {items.map((item, index) => (
          <li key={item.title} className="tso-card">
            <div className="tso-card-media" data-curtain>
              <img src={servicePhotos[item.title] ?? industryProfessional} alt="" />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="tso-card-body">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Stack({ items }: { items: HcmItem[] }) {
  const grid = items.length === 6

  return (
    <ol className={grid ? 'tso-why' : 'hcm-stack'}>
      {items.map((item, index) => (
        <li key={item.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          {grid ? (
            <>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </>
          ) : (
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              {item.scope ? (
                <div className="hcm-scope">
                  <b>Service Scope:</b>
                  <div className="hcm-chips">
                    {chips(item.scope).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

export function Steps({ items }: { items: { title: string; copy: string }[] }) {
  return (
    <ol className="hcm-steps">
      {items.map((item, index) => (
        <li key={item.title}>
          <div className="hcm-step-rail">
            <span>{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </li>
      ))}
    </ol>
  )
}

export default function HcmSectionView({ section, image }: { section: HcmSection; image?: string }) {
  const surfaces = createSurfaceTones()

  return (
    <div className={`hcm-section is-${section.id}`}>
      {section.body.length && section.id !== 'hcm-services' ? (
        <SurfaceBand tone={surfaces.next()}>
          <section className="hcm-prose">
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        </SurfaceBand>
      ) : null}

      {section.glance ? (
        <StatisticsBar items={section.glance} label="HCM at a Glance" />
      ) : null}

      {section.why ? (
        <SurfaceBand tone={surfaces.next()}>
          <section className="work-block">
            <h2>Why Idarat HCM?</h2>
            <ol className="tso-why">
              {section.why.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </li>
              ))}
            </ol>
          </section>
        </SurfaceBand>
      ) : null}

      {section.id === 'overview' ? (
        <SurfaceBand tone={surfaces.next()}>
          <section className="work-block hcm-trust">
            <h2 className="logo-strip-label">Trusted by Leading Organizations</h2>
            <LogoMarquee items={hcmClients} />
          </section>
        </SurfaceBand>
      ) : null}

      {section.industries ? (
        <SurfaceBand tone="navy">
          <section className="hcm-callout">
            <div>
              <h2>{section.industries.title}</h2>
              <p>{section.industries.copy}</p>
            </div>
            <Link className="text-link" to="/what-we-do/industries">
              {section.industries.cta} <Arrow />
            </Link>
          </section>
        </SurfaceBand>
      ) : null}

      {section.groups?.map((group) => (
        <SurfaceBand key={group.title} tone={surfaces.next()}>
          <section className="work-block">
            {group.title === 'Our HCM Services' ? (
              <ServiceCards title={group.title} lead={section.body} items={group.items} />
            ) : (
              <>
                <h2>{group.title}</h2>
                {group.title.startsWith('How We') ? <Steps items={group.items} /> : <Stack items={group.items} />}
              </>
            )}
          </section>
        </SurfaceBand>
      ))}

      {section.models ? (
        <SurfaceBand tone={surfaces.next()}>
          <section className="work-block">
            <h2>Flexible HCM, Built Around Your Business</h2>
            {section.modelsIntro ? <p className="hcm-models-intro">{section.modelsIntro}</p> : null}
            <div className="hcm-models">
              {section.models.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>
        </SurfaceBand>
      ) : null}

      {section.download ? (
        <SurfaceBand tone="navy">
          <section className="hcm-app">
            {image ? (
              <div className="hcm-app-visual" data-curtain>
                <img src={image} alt="" />
              </div>
            ) : null}
            <div className="hcm-app-copy">
              <p>{section.download}</p>
              <div className="store-badges">
                <span className="store-badge is-apple">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.107-.987 3.957-.987 1.851 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.065-3.623-2.293-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.378-3.066c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" /></svg>
                  <span>
                    <small>Download on the</small>
                    App Store
                  </span>
                </span>
                <span className="store-badge is-google">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M3 20.5V3.5L14.5 12 3 20.5Z" /><path fill="#34A853" d="M3 20.5 14.5 12l4.2 3.1L5.8 22.2 3 20.5Z" /><path fill="#FBBC04" d="M21.5 12c0-.7-.2-1.2-.5-1.6L14.5 12l4.2 3.1c.8-.7 1.8-1.7 2.8-3.1Z" /><path fill="#EA4335" d="M3 3.5 14.5 12 18.7 8.9 5.8 1.8 3 3.5Z" /></svg>
                  <span>
                    <small>Get it on</small>
                    Google Play
                  </span>
                </span>
              </div>
            </div>
          </section>
        </SurfaceBand>
      ) : null}
    </div>
  )
}
