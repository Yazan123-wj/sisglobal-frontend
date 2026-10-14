import { Link } from 'react-router-dom'

import Arrow from '@/components/Arrow'
import LogoMarquee from '@/components/LogoMarquee'
import { clients } from '@/data/clients'
import type { HcmItem, HcmSection } from '@/data/hcmPages'

function chips(scope: string) {
  return scope.split(' · ')
}

function Stack({ items }: { items: HcmItem[] }) {
  return (
    <ol className="hcm-stack">
      {items.map((item, index) => (
        <li key={item.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
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
  return (
    <div className={`hcm-section is-${section.id}`}>
      {section.body.length ? (
        <section className="hcm-prose">
          {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ) : null}

      {section.glance ? (
        <section className="work-block">
          <h2>HCM at a Glance</h2>
          <dl className="hcm-stats">
            {section.glance.map((metric) => (
              <div key={metric.label}>
                <dd>{metric.value}</dd>
                <dt>{metric.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {section.why ? (
        <section className="work-block">
          <h2>Why Idarat HCM?</h2>
          <ol className="hcm-why">
            {section.why.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {section.id === 'overview' ? (
        <section className="work-block hcm-trust">
          <h2>Trusted by Leading Organizations</h2>
          <LogoMarquee items={clients} />
        </section>
      ) : null}

      {section.industries ? (
        <section className="hcm-callout">
          <div>
            <h2>{section.industries.title}</h2>
            <p>{section.industries.copy}</p>
          </div>
          <Link className="text-link" to="/what-we-do/industries">
            {section.industries.cta} <Arrow />
          </Link>
        </section>
      ) : null}

      {section.groups?.map((group) => (
        <section key={group.title} className="work-block">
          <h2>{group.title}</h2>
          {group.title.startsWith('How We') ? <Steps items={group.items} /> : <Stack items={group.items} />}
        </section>
      ))}

      {section.models ? (
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
      ) : null}

      {section.download ? (
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
      ) : null}
    </div>
  )
}
