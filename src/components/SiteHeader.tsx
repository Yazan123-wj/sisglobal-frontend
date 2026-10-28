import { useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import Arrow from '@/components/Arrow'
import { brandForPath } from '@/data/brand'

const workLinks = [
  { label: 'Idarat HCM', to: '/what-we-do/hcm', note: 'Human capital' },
  { label: 'Idarat TSO', to: '/what-we-do/tso', note: 'Technical operations' },
  { label: 'Identiti ICT', to: '/what-we-do/ict', note: 'ICT infrastructure' },
  { label: 'Industries', to: '/what-we-do/industries', note: 'Sectors we serve' },
]

function workLinkCurrent(to: string, pathname: string) {
  return pathname === to || pathname.startsWith(`${to}/`)
}

const insightLinks = [
  { label: 'Articles', to: '/insights/articles', note: 'Featured writing' },
  { label: 'News', to: '/insights/news', note: 'Company updates' },
  { label: 'Success Stories', to: '/insights/stories', note: 'Project outcomes' },
]

type OpenMenu = 'work' | 'insights' | null

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const hideMenu = useRef(0)
  const location = useLocation()
  const navigate = useNavigate()

  const closeMenus = () => {
    window.clearTimeout(hideMenu.current)
    setMenuOpen(false)
    setOpenMenu(null)
  }

  const showMenu = (menu: OpenMenu) => {
    window.clearTimeout(hideMenu.current)
    setOpenMenu(menu)
  }

  const scheduleHideMenu = () => {
    window.clearTimeout(hideMenu.current)
    hideMenu.current = window.setTimeout(() => setOpenMenu(null), 180)
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
  const insightsCurrent = location.pathname.startsWith('/insights')
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
          className={openMenu === 'work' ? 'nav-item is-open' : 'nav-item'}
          onMouseEnter={() => showMenu('work')}
          onMouseLeave={scheduleHideMenu}
        >
          <button
            type="button"
            className={workCurrent ? 'nav-trigger is-current' : 'nav-trigger'}
            aria-expanded={openMenu === 'work'}
            aria-haspopup="true"
            onClick={() => {
              window.clearTimeout(hideMenu.current)
              setOpenMenu((menu) => (menu === 'work' ? null : 'work'))
            }}
          >
            What We Do <span className="nav-caret" aria-hidden="true" />
          </button>
          <div className="nav-dropdown">
            <div className="nav-dropdown-panel">
              {workLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={() => (workLinkCurrent(item.to, location.pathname) ? 'is-current' : undefined)}
                  onClick={closeMenus}
                >
                  <strong>{item.label}</strong>
                  <span>{item.note}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div
          className={openMenu === 'insights' ? 'nav-item is-open' : 'nav-item'}
          onMouseEnter={() => showMenu('insights')}
          onMouseLeave={scheduleHideMenu}
        >
          <button
            type="button"
            className={insightsCurrent ? 'nav-trigger is-current' : 'nav-trigger'}
            aria-expanded={openMenu === 'insights'}
            aria-haspopup="true"
            onClick={() => {
              window.clearTimeout(hideMenu.current)
              setOpenMenu((menu) => (menu === 'insights' ? null : 'insights'))
            }}
          >
            Insights <span className="nav-caret" aria-hidden="true" />
          </button>
          <div className="nav-dropdown">
            <div className="nav-dropdown-panel">
              {insightLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'is-current' : undefined)}
                  onClick={closeMenus}
                >
                  <strong>{item.label}</strong>
                  <span>{item.note}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <NavLink to="/vacancies" className={careerCurrent ? 'is-current' : undefined} onClick={closeMenus}>
          Career
        </NavLink>
        <button className="button button-primary" type="button" onClick={() => go('/#contact')}>
          Contact Us <Arrow />
        </button>
      </nav>
    </header>
  )
}
