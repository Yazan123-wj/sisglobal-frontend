import { Link, useNavigate } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import PageSubnav from '@/components/PageSubnav'
import { insightsByKind } from '@/data/insights'
import type { Insight, InsightImage } from '@/data/insights'

const caseImages: Record<InsightImage, string> = {
  workforce: caseWorkforce,
  telecom: caseTelecom,
  ict: caseIct,
  network: heroNetworkImage,
}

const sections = [
  { id: 'case-list', label: 'All case studies' },
  { id: 'case-cta', label: 'Contact' },
]

function CaseCard({ item, featured = false }: { item: Insight; featured?: boolean }) {
  return (
    <Link className={featured ? 'insight-tile is-featured' : 'insight-tile'} to={`/case-studies/${item.id}`}>
      <div className="insight-tile-media" data-curtain>
        <img src={caseImages[item.image]} alt="" />
        {featured ? <span>Featured</span> : null}
      </div>
      <div className="insight-tile-body">
        <p>{item.unit} · {item.topic}</p>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <small>Read case study</small>
      </div>
    </Link>
  )
}

export default function CaseStudiesPage() {
  const navigate = useNavigate()
  const studies = insightsByKind('story')
  const featured = studies[0]
  const rest = studies.slice(1)

  return (
    <main className="insights-page">
      <section className="about-hero" aria-labelledby="cases-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${heroNetworkImage})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">Case studies</p>
            <h1 id="cases-title">How SIS Global delivers on live programmes.</h1>
            <p>Field operations, workforce programmes and ICT estates — written from the work, not from a pitch deck.</p>
          </div>
          <dl className="about-hero-facts">
            <div>
              <dt>Studies</dt>
              <dd>{studies.length}</dd>
            </div>
            <div>
              <dt>Units</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Delivery</dd>
            </div>
          </dl>
        </div>
      </section>

      <PageSubnav items={sections} />

      <section id="case-list" className="insight-section">
        <div className="container">
          <div className="about-intro">
            <h2>Selected work</h2>
            <p>Each study follows a live programme across people, field operations or technology.</p>
          </div>
          <div className="insight-tile-grid">
            {featured ? <CaseCard item={featured} featured /> : null}
            {rest.map((item) => <CaseCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      <section id="case-cta" className="about-cta">
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
