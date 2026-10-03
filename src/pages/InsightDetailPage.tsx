import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import PageSubnav from '@/components/PageSubnav'
import { getInsight, insightKinds, relatedInsights } from '@/data/insights'
import type { InsightImage } from '@/data/insights'

const insightImages: Record<InsightImage, string> = {
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

export default function InsightDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const insight = getInsight(id)

  if (!insight) return <Navigate to="/insights" replace />

  const related = relatedInsights(insight)
  const kind = insightKinds.find((item) => item.id === insight.kind)
  const { lead, before, quote, after } = splitBody(insight.body)

  return (
    <main className="insight-detail-page">
      <section className="about-hero" aria-labelledby="insight-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${insightImages[insight.image]})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">{insight.unit} · {insight.topic}</p>
            <h1 id="insight-title">{insight.title}</h1>
            <p>{insight.excerpt}</p>
          </div>
          <dl className="about-hero-facts">
            <div>
              <dt>Published</dt>
              <dd>{insight.date}</dd>
            </div>
            <div>
              <dt>Read</dt>
              <dd>{insight.read}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{kind?.label}</dd>
            </div>
          </dl>
        </div>
      </section>

      <PageSubnav
        items={[
          { id: 'insights', label: 'All Insights' },
          { id: 'insight-articles', label: 'Articles' },
          { id: 'insight-news', label: 'News' },
          { id: 'insight-stories', label: 'Success Stories' },
        ]}
        activeId="insights"
        onSelect={(target) => {
          if (target === 'insights') {
            navigate('/insights')
            return
          }
          navigate({ pathname: '/insights', hash: target })
        }}
      />

      <article id="insights" className="insight-article">
        <div className="container insight-article-layout">
          <div className="insight-article-main">
            <p className="insight-article-kicker">{kind?.label} · {insight.unit}</p>
            <p className="insight-lead">{lead}</p>

            <figure className="insight-figure">
              <div className="insight-figure-media" data-curtain >
                <img src={insightImages[insight.image]} alt="" />
              </div>
              <figcaption>{insight.unit} · {insight.topic}</figcaption>
            </figure>

            {before.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {quote ? <blockquote className="insight-pull">{quote}</blockquote> : null}
            {after.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <aside className="insight-aside">
            <div className="insight-aside-card">
              <h2>In this piece</h2>
              <dl>
                <div>
                  <dt>Published</dt>
                  <dd>{insight.date}</dd>
                </div>
                <div>
                  <dt>Reading time</dt>
                  <dd>{insight.read}</dd>
                </div>
                <div>
                  <dt>Unit</dt>
                  <dd>{insight.unit}</dd>
                </div>
                <div>
                  <dt>Topic</dt>
                  <dd>{insight.topic}</dd>
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
              <h2>More {kind?.label.toLowerCase()}</h2>
              <p>Continue reading from the same desk.</p>
            </div>
            <div className="insight-tile-grid is-related">
              {related.map((item) => (
                <Link key={item.id} className="insight-tile" to={`/insights/${item.id}`}>
                  <div className="insight-tile-media" data-curtain >
                    <img src={insightImages[item.image]} alt="" />
                  </div>
                  <div className="insight-tile-body">
                    <p>{item.unit} · {item.topic}</p>
                    <h3>{item.title}</h3>
                    <small>{item.date} · {item.read}</small>
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
