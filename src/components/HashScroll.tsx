import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function HashScroll() {
  const location = useLocation()
  const path = useRef(location.pathname)

  useEffect(() => {
    const pathChanged = path.current !== location.pathname
    path.current = location.pathname
    const id = location.hash.replace('#', '')
    if (!id) {
      if (pathChanged) window.scrollTo({ top: 0, left: 0 })
      return
    }
    if (document.querySelector('.has-tso-inner-nav')) return
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  return null
}
