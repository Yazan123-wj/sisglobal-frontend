import { Link, useNavigate } from 'react-router-dom'

import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import Arrow from '@/components/Arrow'
import { industryImages } from '@/data/industryImages'
import { insightsByKind, type InsightImage } from '@/data/insights'
import { globalLocations } from '@/data/locations'
import { workIndustries } from '@/data/workContent'

const storyImages: Record<InsightImage, string> = {
  workforce: caseWorkforce,
  telecom: caseTelecom,
  ict: caseIct,
  network: heroNetworkImage,
}

const stories = insightsByKind('story')

export default function IndustriesPage() {
  const navigate = useNavigate()

  return (
    <main className="work-page">
      <section className="about-hero" aria-labelledby="industries-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${heroNetworkImage})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">What We Do</p>
            <h1 id="industries-title">Industries We Serve</h1>
            <p>Every sector runs on people, networks and technology — but no two sectors use them the same way. SIS Global combines human capital management, telecom technical services and ICT solutions into support shaped around the regulations, operations and pressures of your industry.</p>
          </div>
          <dl className="about-hero-facts">
            <div>
              <dt>Industries</dt>
              <dd>{workIndustries.length}</dd>
            </div>
            <div>
              <dt>Capabilities</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Countries</dt>
              <dd>{globalLocations.length}+</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="work-content section">
        <div className="container">
          <p className="industries-lead">Whether you run a mobile network, a hospital, a university or a national program, our three specialist businesses work together so you can deal with one partner instead of many.</p>
          <div className="about-card-grid">
            {workIndustries.map((industry) => (
              <Link key={industry.slug} className="about-card" to={`/what-we-do/industries/${industry.slug}`}>
                <div className="about-card-media" data-curtain>
                  <img src={industryImages[industry.slug]} alt="" />
                </div>
                <div className="about-card-body">
                  <h3>{industry.title}</h3>
                  <p>{industry.copy}</p>
                  <span className="text-link">
                    {industry.cta} <Arrow dir="right" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="industries-projects section">
        <div className="container">
          <div className="cases-heading">
            <div className="cases-lead">
              <h2>Real Projects Across<br />Every Sector</h2>
              <Link className="text-link" to="/insights/stories">
                View All Success Stories <Arrow />
              </Link>
            </div>
          </div>
          <div className="industries-project-grid">
            {stories.map((story) => (
              <Link key={story.id} className="case-card" to={`/insights/${story.id}`}>
                <div className="case-art-wrap" data-curtain>
                  <img className="case-art" src={storyImages[story.image]} alt="" />
                </div>
                <div className="case-content">
                  <span>{story.topic}</span>
                  <h3>{story.title}</h3>
                  <p>{story.excerpt}</p>
                  <small>Read story <Arrow /></small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta industries-cta">
        <div className="container">
          <h2>Don’t see your industry?</h2>
          <p>Tell us what you need and the right specialist will get back to you.</p>
          <button className="text-link" type="button" onClick={() => navigate({ pathname: '/', hash: 'contact' })}>
            Send Enquiry <Arrow dir="right" />
          </button>
        </div>
      </section>
    </main>
  )
}
