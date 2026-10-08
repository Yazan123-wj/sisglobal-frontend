import { useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import Arrow from '@/components/Arrow'
import { brandForPath } from '@/data/brand'

const links = [
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Insights', to: '/insights' },
]

const services = [
  { label: 'All', to: '/what-we-do', note: 'HCM, TSO and ICT', end: true },
  { label: 'Idarat HCM', to: '/what-we-do/hcm', note: 'Human capital' },
  { label: 'Idarat TSO', to: '/what-we-do/tso', note: 'Technical operations' },
  { label: 'Identiti ICT', to: '/what-we-do/ict', note: 'ICT infrastructure' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const hideWork = useRef(0)
  const location = useLocation()
  const navigate = useNavigate()

  const closeMenus = () => {
    window.clearTimeout(hideWork.current)
    setMenuOpen(false)
    setWorkOpen(false)
  }

  const openWork = () => {
    window.clearTimeout(hideWork.current)
    setWorkOpen(true)
  }

  const scheduleHideWork = () => {
    window.clearTimeout(hideWork.current)
    hideWork.current = window.setTimeout(() => setWorkOpen(false), 180)
  }

  const go = (to: string) => {
    closeMenus()
    if (to.startsWith('/#')) {
      const id = to.slice(2)
      if (location.pathname !== '/') {
        navigate({ pathname: '/', hash: id })
        return
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    navigate(to)
  }

  const brand = brandForPath(location.pathname)
  const workCurrent = location.pathname.startsWith('/what-we-do')
  const careerCurrent = location.pathname.startsWith('/vacancies')

  return (
    <header className="site-header">
      <Link
        to="/"
        className="brand"
        aria-label={`${brand.alt} home`}
        onClick={() => {
          closeMenus()
          if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <img className="brand-logo-img" src={brand.src} alt={brand.alt} />
      </Link>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-nav">
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
        <span className="menu-lines" aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="main-nav" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
        <NavLink to="/about" className={({ isActive }) => isActive ? 'is-current' : undefined} onClick={closeMenus}>
          About Us
        </NavLink>
        <div
          className={workOpen ? 'nav-item is-open' : 'nav-item'}
          onMouseEnter={openWork}
          onMouseLeave={scheduleHideWork}
        >
          <button
            type="button"
            className={workCurrent ? 'nav-trigger is-current' : 'nav-trigger'}
            aria-expanded={workOpen}
            aria-haspopup="true"
            onClick={() => {
              window.clearTimeout(hideWork.current)
              setWorkOpen((open) => !open)
            }}
          >
            What We Do <span className="nav-caret" aria-hidden="true" />
          </button>
          <div className="nav-dropdown">
            <div className="nav-dropdown-panel">
              {services.map((service) => (
                <NavLink
                  key={service.to}
                  to={service.to}
                  end={service.end}
                  className={({ isActive }) => (isActive ? 'is-current' : undefined)}
                  onClick={closeMenus}
                >
                  <strong>{service.label}</strong>
                  <span>{service.note}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'is-current' : undefined)}
            onClick={closeMenus}
          >
            {link.label}
          </NavLink>
        ))}
        <NavLink to="/vacancies" className={careerCurrent ? 'is-current' : undefined} onClick={closeMenus}>
          Career
        </NavLink>
        <button className="nav-cta" type="button" onClick={() => go('/#contact')}>
          Contact Us <Arrow />
        </button>
      </nav>
    </header>
  )
}
