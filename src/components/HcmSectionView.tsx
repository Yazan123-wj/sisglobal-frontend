import { Link } from 'react-router-dom'

import caseWorkforce from '@/assets/case-workforce.jpg'
import homeCareers from '@/assets/home-careers.jpg'
import industryFinance from '@/assets/industry-finance.jpg'
import industryGovernment from '@/assets/industry-government.jpg'
import industryProfessional from '@/assets/industry-professional.jpg'
import Arrow from '@/components/Arrow'
import IntroSplit from '@/components/IntroSplit'
import LogoMarquee from '@/components/LogoMarquee'
import StatisticsBar from '@/components/StatisticsBar'
import { SurfaceBand, createSurfaceTones } from '@/components/SurfaceBand'
import { hcmClients } from '@/data/hcmClients'
import type { HcmItem, HcmSection } from '@/data/hcmPages'

const hcmServicePhotos: Record<string, string> = {
  'Employee Administration': caseWorkforce,
  'Payroll, Compensation & Benefits': industryFinance,
  'Government Relations, Compliance & Employee Mobility': industryGovernment,
  'Workforce Management': industryProfessional,
  'Offboarding & Final Settlement': homeCareers,
}

function chips(scope: string) {
  return scope.split(' · ')
}

function ServiceCards({ items }: { items: HcmItem[] }) {
  return (
    <div className="tso-swipe is-service-grid">
      <ul className="tso-cards is-swipe is-service-grid">
        {items.map((item, index) => (
          <li key={item.title} className="tso-card">
            <div className="tso-card-media" data-curtain>
              <img src={hcmServicePhotos[item.title] ?? caseWorkforce} alt="" />
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

const whyMarks = [
  'M4 11 12 4l8 7M7 10.5V20h10v-9.5',
  'M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z',
  'M5 18V11h3v7H5zM10.5 18V7h3v11h-3zM16 18V4h3v14h-3z',
  'M4 7h16M6 12h12M8 17h8',
]

export function WhyFeature({
  items,
  light = false,
}: {
  items: { title: string; copy: string }[]
  light?: boolean
}) {
  return (
    <ol className={light ? 'tso-why-feature is-light' : 'tso-why-feature'}>
      {items.map((item, index) => (
        <li key={item.title}>
          <span className="tso-why-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d={whyMarks[index] ?? whyMarks[0]}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </li>
      ))}
    </ol>
  )
}

export function Steps({
  items,
  vertical = false,
}: {
  items: { title: string; copy: string }[]
  vertical?: boolean
}) {
  return (
    <ol className={vertical ? 'hcm-steps is-vertical' : 'hcm-steps'}>
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
          <IntroSplit title={section.title}>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </IntroSplit>
        </SurfaceBand>
      ) : null}

      {section.glance ? (
        <StatisticsBar items={section.glance} label="HCM at a Glance" />
      ) : null}

      {section.why ? (
        <SurfaceBand tone={surfaces.next()}>
          <section className="work-block">
            <h2>Why Idarat HCM?</h2>
            <WhyFeature items={section.why} light />
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
        <SurfaceBand tone={surfaces.next()}>
          <section className="hcm-callout">
            <div>
              <h2>{section.industries.title}</h2>
              <p>{section.industries.copy}</p>
            </div>
            <Link className="button button-primary" to="/what-we-do/industries">
              {section.industries.cta} <Arrow />
            </Link>
          </section>
        </SurfaceBand>
      ) : null}

      {section.groups?.map((group) => (
        <SurfaceBand key={group.title} tone={surfaces.next()}>
          <section className="work-block">
            {section.id === 'hcm-services' && group.title === 'Our HCM Services' ? (
              <IntroSplit title={group.title}>
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </IntroSplit>
            ) : (
              <h2>{group.title}</h2>
            )}
            {section.id === 'hcm-services' && group.title === 'Our HCM Services' ? (
              <ServiceCards items={group.items} />
            ) : group.title.startsWith('How We') ? (
              <Steps items={group.items} />
            ) : (
              <Stack items={group.items} />
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
