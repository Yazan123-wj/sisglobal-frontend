import { Link, useLocation, useNavigate } from 'react-router-dom'

import { brandForPath } from '@/data/brand'

export default function SiteFooter() {
  const location = useLocation()
  const navigate = useNavigate()
  const brand = brandForPath(location.pathname)

  const go = (id: string) => {
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: id })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Link to="/" className="footer-brand" aria-label={`${brand.alt} home`}>
            <img src={brand.src} alt={brand.alt} />
          </Link>
          <p>A Saudi integrated business solutions company combining human capital, technical services, ICT and technology-enabled delivery.</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-label">Explore</p>
            <Link to="/about">About</Link>
            <Link to="/what-we-do">Solutions</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/insights">Insights</Link>
            <button type="button" onClick={() => go('industries')}>Industries</button>
            <Link to="/about#about-presence">Global Presence</Link>
            <Link to="/vacancies">Careers</Link>
          </div>
          <div>
            <p className="footer-label">Business Areas</p>
            <Link to="/what-we-do/hcm">Idarat HCM</Link>
            <Link to="/what-we-do/tso">Idarat TSO</Link>
            <Link to="/what-we-do/ict">Identiti ICT</Link>
            <Link to="/what-we-do">Idarat BPO</Link>
          </div>
          <div>
            <p className="footer-label">Contact</p>
            <a href="mailto:info@sisglobal.com">info@sisglobal.com</a>
            <a href="https://www.linkedin.com/company/sis-global-hq" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.facebook.com/saudiintelligentsolutions" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </div>
      <div className="container legal">
        <span>© 2026 SIS Global. All rights reserved.</span>
      </div>
    </footer>
  )
}
