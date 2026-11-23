import { useLocation } from 'react-router-dom'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

function ensureCurtain(node: HTMLElement) {
  let curtain = node.querySelector(':scope > .image-curtain') as HTMLElement | null
  if (!curtain) {
    curtain = document.createElement('div')
    curtain.className = 'image-curtain'
    curtain.setAttribute('aria-hidden', 'true')
    node.appendChild(curtain)
  }
  curtain.replaceChildren()
  return curtain
}

export default function SiteMotion() {
  const location = useLocation()

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.utils.toArray<HTMLElement>('[data-curtain]').forEach((node) => {
      const curtain = ensureCurtain(node)
      gsap.set(curtain, { yPercent: 0 })
      gsap.to(curtain, {
        yPercent: 101,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 84%',
          once: true,
        },
      })
    })

    ScrollTrigger.refresh()
  }, { dependencies: [location.pathname] })

  return null
}
