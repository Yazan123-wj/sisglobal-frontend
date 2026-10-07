import { Link, useNavigate } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import PageSubnav from '@/components/PageSubnav'
import { insightKindPath, insightKinds, insightsByKind } from '@/data/insights'
import type { Insight, InsightImage, InsightKind } from '@/data/insights'

const insightImages: Record<InsightImage, string> = {
  workforce: caseWorkforce,
  telecom: caseTelecom,
  ict: caseIct,
  network: heroNetworkImage,
}

const kindCopy: Record<Exclude<InsightKind, 'story'>, { title: string; lead: string }> = {
  article: {
    title: 'Articles from the SIS Global team.',
    lead: 'Perspectives on people, field operations and the technology that keeps organisations moving.',
  },
  news: {
    title: 'News and updates from SIS Global.',
    lead: 'Company announcements, certifications and service news from across the group.',
  },
}

const insightNav = [
  { id: 'insights', label: 'All Insights' },
  { id: 'insight-articles', label: 'Articles' },
  { id: 'insight-news', label: 'News' },
  { id: 'insight-stories', label: 'Success Stories' },
]

function InsightCard({ item, featured = false }: { item: Insight; featured?: boolean }) {
  return (
    <Link className={featured ? 'insight-tile is-featured' : 'insight-tile'} to={`/insights/${item.id}`}>
      <div className="insight-tile-media" data-curtain>
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

export default function InsightKindPage({ kind: kindId }: { kind: Exclude<InsightKind, 'story'> }) {
  const navigate = useNavigate()
  const kind = insightKinds.find((item) => item.id === kindId)
  const copy = kindCopy[kindId]
  const items = insightsByKind(kindId)
  const featured = items[0]
  const rest = items.slice(1)
  const activeId = kindId === 'article' ? 'insight-articles' : 'insight-news'

  return (
    <main className="insights-page">
      <section className="about-hero" aria-labelledby="insight-kind-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${heroNetworkImage})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">{kind?.label}</p>
            <h1 id="insight-kind-title">{copy.title}</h1>
            <p>{copy.lead}</p>
          </div>
          <dl className="about-hero-facts">
            <div>
              <dt>{kind?.label}</dt>
              <dd>{items.length}</dd>
            </div>
            <div>
              <dt>Units</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>{kindId === 'news' ? 'Updates' : 'Editorial'}</dd>
            </div>
          </dl>
        </div>
      </section>

      <PageSubnav
        items={insightNav}
        activeId={activeId}
        onSelect={(target) => {
          if (target === 'insights') {
            navigate('/insights')
            return
          }
          if (target === 'insight-articles') {
            navigate('/insights/articles')
            return
          }
          if (target === 'insight-news') {
            navigate('/insights/news')
            return
          }
          navigate(insightKindPath.story)
        }}
      />

      <section id={activeId} className="insight-section">
        <div className="container">
          <div className="about-intro">
            <h2>{kind?.label}</h2>
            <p>{kind?.intro}</p>
          </div>
          <div className="insight-tile-grid">
            {featured ? <InsightCard item={featured} featured /> : null}
            {rest.map((item) => <InsightCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

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
