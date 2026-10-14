import { useRef } from 'react'

import BrandMark from '@/components/BrandMark'
import { gsap, useGSAP } from '@/lib/gsap'

export default function LogoMarquee({ items }: { items: { name: string; mark: string }[] }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const loop = [...items, ...items, ...items]

  useGSAP(() => {
    const wrapEl = root.current
    const trackEl = track.current
    if (!wrapEl || !trackEl) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const copies = 3
    const loopWidth = () => trackEl.scrollWidth / copies
    let x = 0
    let speed = 0.55
    let target = 0.55

    const onMove = (event: MouseEvent) => {
      const rect = wrapEl.getBoundingClientRect()
      const t = gsap.utils.clamp(0, 1, (event.clientX - rect.left) / Math.max(rect.width, 1))
      target = gsap.utils.mapRange(0, 1, -1.85, 1.85, t)
    }
    const onLeave = () => { target = 0.55 }

    const tick = () => {
      speed += (target - speed) * 0.08
      x -= speed
      const width = loopWidth()
      if (width <= 0) return
      if (x <= -width) x += width
      if (x > 0) x -= width
      gsap.set(trackEl, { x })
    }

    wrapEl.addEventListener('mousemove', onMove)
    wrapEl.addEventListener('mouseleave', onLeave)
    gsap.ticker.add(tick)

    return () => {
      wrapEl.removeEventListener('mousemove', onMove)
      wrapEl.removeEventListener('mouseleave', onLeave)
      gsap.ticker.remove(tick)
    }
  }, { scope: root })

  return (
    <div className="logo-swiper" ref={root}>
      <ul className="logo-track" ref={track} aria-hidden="true">
        {loop.map((item, index) => (
          <li key={`${item.mark}-${index}`}>
            <BrandMark mark={item.mark} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
