import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import PageSubnav from '@/components/PageSubnav'
import { getCaseStudy, relatedCaseStudies } from '@/data/insights'
import type { InsightImage } from '@/data/insights'

const caseImages: Record<InsightImage, string> = {
  workforce: caseWorkforce,
  telecom: caseTelecom,
  ict: caseIct,
  network: heroNetworkImage,
}

function splitBody(body: string[]) {
  const [lead = '', ...rest] = body
  if (rest.length < 2) return { lead, before: rest, quote: '', after: [] as string[] }

  const quote = rest[Math.min(1, rest.length - 1)]
  const quoteAt = rest.indexOf(quote)
  return {
    lead,
    before: rest.slice(0, quoteAt),
    quote,
    after: rest.slice(quoteAt + 1),
  }
}

export default function CaseStudyDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const study = getCaseStudy(id)

  if (!study) return <Navigate to="/case-studies" replace />

  const related = relatedCaseStudies(study.id)
  const { lead, before, quote, after } = splitBody(study.body)

  return (
    <main className="insight-detail-page">
      <section className="about-hero" aria-labelledby="case-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${caseImages[study.image]})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">{study.unit} · {study.topic}</p>
            <h1 id="case-title">{study.title}</h1>
            <p>{study.excerpt}</p>
          </div>
          <dl className="about-hero-facts">
            <div>
              <dt>Unit</dt>
              <dd>{study.unit}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{study.topic}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>Case study</dd>
            </div>
          </dl>
        </div>
      </section>

      <PageSubnav
        items={[
          { id: 'all', label: 'All case studies' },
          { id: 'case-study', label: 'Overview' },
        ]}
        activeId="case-study"
        onSelect={(target) => {
          if (target === 'all') {
            navigate('/case-studies')
            return
          }
          document.getElementById('case-study')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      />

      <article id="case-study" className="insight-article">
        <div className="container insight-article-layout">
          <div className="insight-article-main">
            <p className="insight-article-kicker">Case study · {study.unit}</p>
            <p className="insight-lead">{lead}</p>

            <figure className="insight-figure">
              <div className="insight-figure-media" data-curtain>
                <img src={caseImages[study.image]} alt="" />
              </div>
              <figcaption>{study.unit} · {study.topic}</figcaption>
            </figure>

            {before.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {quote ? <blockquote className="insight-pull">{quote}</blockquote> : null}
            {after.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <aside className="insight-aside">
            <div className="insight-aside-card">
              <h2>At a glance</h2>
              <dl>
                <div>
                  <dt>Unit</dt>
                  <dd>{study.unit}</dd>
                </div>
                <div>
                  <dt>Sector</dt>
                  <dd>{study.topic}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Delivery</dd>
                </div>
              </dl>
            </div>
            <div className="insight-aside-card insight-aside-cta">
              <h2>Talk to the team</h2>
              <p>If this is relevant to a live programme, we can walk through how SIS Global would approach it.</p>
              <button className="text-link" type="button" onClick={() => navigate({ pathname: '/', hash: 'contact' })}>
                Contact Us <span aria-hidden="true">→</span>
              </button>
            </div>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section className="insight-section">
          <div className="container">
            <div className="about-intro">
              <h2>More case studies</h2>
              <p>Continue through the work.</p>
            </div>
            <div className="insight-tile-grid is-related">
              {related.map((item) => (
                <Link key={item.id} className="insight-tile" to={`/case-studies/${item.id}`}>
                  <div className="insight-tile-media" data-curtain>
                    <img src={caseImages[item.image]} alt="" />
                  </div>
                  <div className="insight-tile-body">
                    <p>{item.unit} · {item.topic}</p>
                    <h3>{item.title}</h3>
                    <small>Read case study</small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="about-cta">
        <div className="container">
          <h2>Discuss your project with SIS Global</h2>
          <button className="text-link" type="button" onClick={() => navigate({ pathname: '/', hash: 'contact' })}>
            Contact Us <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </main>
  )
}
