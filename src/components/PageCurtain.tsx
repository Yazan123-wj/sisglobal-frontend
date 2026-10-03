import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

const origin = (index: number) => (index === 0 ? '50% 0%' : index === 1 ? '50% 50%' : '50% 100%')

export default function PageCurtain() {
  const location = useLocation()
  const navigate = useNavigate()
  const root = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  const covered = useRef(false)
  const path = useRef(location.pathname + location.search)

  path.current = location.pathname + location.search

  useEffect(() => {
    const node = root.current
    const bands = node?.querySelectorAll('i')
    if (!node || !bands?.length) return
    gsap.set(bands, { scaleY: 0 })
    gsap.set(node, { pointerEvents: 'none' })
  }, [])

  useEffect(() => {
    const node = root.current
    const bands = node?.querySelectorAll('i')
    if (!node || !bands?.length) return

    const close = () => new Promise<void>((resolve) => {
      if (prefersReducedMotion()) {
        resolve()
        return
      }
      covered.current = true
      gsap.timeline({ onComplete: resolve })
        .set(node, { pointerEvents: 'all' })
        .fromTo(bands, { scaleY: 0 }, {
          scaleY: 1,
          duration: 0.4,
          stagger: 0.07,
          ease: 'power3.inOut',
          transformOrigin: origin,
        })
    })

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (`${url.pathname}${url.search}` === path.current) return
      event.preventDefault()
      close().then(() => navigate(`${url.pathname}${url.search}${url.hash}`))
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [navigate])

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const node = root.current
    const bands = node?.querySelectorAll('i')
    if (!node || !bands?.length) return
    if (prefersReducedMotion()) {
      gsap.set(bands, { scaleY: 0 })
      return
    }
    if (!covered.current) gsap.set(bands, { scaleY: 1 })
    gsap.set(node, { pointerEvents: 'all' })
    gsap.to(bands, {
      scaleY: 0,
      duration: 0.48,
      stagger: 0.07,
      ease: 'power3.inOut',
      transformOrigin: origin,
      onComplete: () => {
        gsap.set(node, { pointerEvents: 'none' })
        covered.current = false
      },
    })
  }, [location.pathname, location.search])

  return (
    <div className="page-curtain" ref={root} aria-hidden="true">
      <i /><i /><i />
    </div>
  )
}
