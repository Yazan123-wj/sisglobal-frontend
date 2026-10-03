import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function HashScroll() {
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (!id) {
      window.scrollTo({ top: 0, left: 0 })
      return
    }
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  return null
}
