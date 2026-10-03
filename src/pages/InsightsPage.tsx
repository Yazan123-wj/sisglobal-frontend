import { Link, useNavigate } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import PageSubnav from '@/components/PageSubnav'
import { insightKinds, insightsByKind } from '@/data/insights'
import type { Insight, InsightImage } from '@/data/insights'

const insightImages: Record<InsightImage, string> = {
  workforce: caseWorkforce,
  telecom: caseTelecom,
  ict: caseIct,
  network: heroNetworkImage,
}

const insightSections = [
  { id: 'insight-articles', label: 'Articles' },
  { id: 'insight-news', label: 'News' },
  { id: 'insight-stories', label: 'Success Stories' },
  { id: 'insight-cta', label: 'Contact' },
]

function InsightCard({ item, featured = false }: { item: Insight; featured?: boolean }) {
  return (
    <Link className={featured ? 'insight-tile is-featured' : 'insight-tile'} to={`/insights/${item.id}`}>
      <div className="insight-tile-media" data-curtain >
        <img src={insightImages[item.image]} alt="" />
        {featured ? <span>Featured</span> : null}
      </div>
      <div className="insight-tile-body">
        <p>{item.unit} · {item.topic}</p>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <small>{item.date} · {item.read}</small>
      </div>
    </Link>
  )
}

export default function InsightsPage() {
  const navigate = useNavigate()

  return (
    <main className="insights-page">
      <section className="about-hero" aria-labelledby="insights-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${heroNetworkImage})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">Insights</p>
            <h1 id="insights-title">Articles, news and success stories in one place.</h1>
            <p>Perspectives from the SIS Global team on people, field operations and the technology that keeps organisations moving.</p>
          </div>
          <dl className="about-hero-facts">
            <div>
              <dt>Articles</dt>
              <dd>{insightsByKind('article').length}</dd>
            </div>
            <div>
              <dt>News</dt>
              <dd>{insightsByKind('news').length}</dd>
            </div>
            <div>
              <dt>Stories</dt>
              <dd>{insightsByKind('story').length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <PageSubnav items={insightSections} />

      {insightKinds.map((kind) => {
        const items = insightsByKind(kind.id)
        const featured = items[0]
        const rest = items.slice(1, 3)
        return (
          <section key={kind.id} id={`insight-${kind.id === 'article' ? 'articles' : kind.id === 'news' ? 'news' : 'stories'}`} className="insight-section">
            <div className="container">
              <div className="about-intro">
                <h2>{kind.label}</h2>
                <p>{kind.intro}</p>
              </div>
              <div className="insight-tile-grid">
                {featured ? <InsightCard item={featured} featured /> : null}
                {rest.map((item) => <InsightCard key={item.id} item={item} />)}
              </div>
            </div>
          </section>
        )
      })}

      <section id="insight-cta" className="about-cta">
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
