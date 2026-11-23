import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import BrandMark from '@/components/BrandMark'
import { gsap, useGSAP } from '@/lib/gsap'
import { hasLogoScale, logoScale, measureLogo } from '@/lib/logoScale'

export type LogoItem = { name: string; mark?: string; src?: string }

function scaleStyle(src: string) {
  const scale = logoScale(src)
  return scale ? ({ '--logo-scale': scale } as CSSProperties) : undefined
}

export default function LogoMarquee({ items }: { items: LogoItem[] }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const loop = [...items, ...items, ...items]

  // Each logo is measured once so the whole strip can be drawn at one visual size.
  const sources = useMemo(() => items.flatMap((item) => (item.src ? [item.src] : [])), [items])
  const [, refresh] = useState(0)
  const ready = sources.every(hasLogoScale)

  useEffect(() => {
    if (ready) return
    let live = true
    Promise.all(sources.map(measureLogo)).then(() => {
      if (live) refresh((count) => count + 1)
    })
    return () => { live = false }
  }, [ready, sources])

  useGSAP(() => {
    const trackEl = track.current
    if (!trackEl) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const copies = 3
    const loopWidth = () => trackEl.scrollWidth / copies
    // The strip moves at one steady speed, in pixels per frame.
    const speed = 0.55
    let x = 0

    const tick = () => {
      x -= speed
      const width = loopWidth()
      if (width <= 0) return
      if (x <= -width) x += width
      gsap.set(trackEl, { x })
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
    }
  }, { scope: root })

  return (
    <div className="logo-swiper" ref={root}>
      <ul className={ready ? 'logo-track is-ready' : 'logo-track'} ref={track} aria-hidden="true">
        {loop.map((item, index) => (
          <li key={`${item.name}-${index}`} title={item.name}>
            {item.src ? (
              <img src={item.src} alt="" style={scaleStyle(item.src)} />
            ) : item.mark ? (
              <BrandMark mark={item.mark} />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
