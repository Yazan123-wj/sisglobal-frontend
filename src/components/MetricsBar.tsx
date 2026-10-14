import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

const metrics = [
  { value: 8, suffix: '+', label: 'Countries of Operation' },
  { value: 19, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Enterprise Clients' },
  { value: 3000, suffix: '+', label: 'Professionals Managed' },
  { value: 8500, suffix: '+', label: 'Field Jobs Delivered' },
]

export default function MetricsBar() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP((_, contextSafe) => {
    const root = sectionRef.current
    if (!root) return
    const nodes = gsap.utils.toArray<HTMLElement>('.metric-value', root)

    const write = (node: HTMLElement, value: number) => {
      node.textContent = Math.round(value).toLocaleString('en-US')
    }

    if (prefersReducedMotion()) {
      nodes.forEach((node) => write(node, Number(node.dataset.count)))
      return
    }

    if (!contextSafe) return

    let tweens: ReturnType<typeof gsap.to>[] = []
    const play = contextSafe(() => {
      tweens.forEach((tween) => tween.kill())
      tweens = nodes.map((node, index) => {
        const state = { val: 0 }
        write(node, 0)
        return gsap.to(state, {
          val: Number(node.dataset.count),
          duration: 1.45,
          delay: index * 0.1,
          ease: 'power2.out',
          onUpdate: () => write(node, state.val),
        })
      })
    })

    let visible = false
    const check = () => {
      const rect = root.getBoundingClientRect()
      const vh = window.innerHeight
      const inView = rect.top < vh * 0.82 && rect.bottom > vh * 0.18
      if (inView) {
        if (!visible) {
          visible = true
          play()
        }
      } else {
        visible = false
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()

    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="metrics-section" aria-label="SIS at a Glance">
      <div className="container metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <strong>
              <b className="metric-value" data-count={metric.value}>0</b>
              <i>{metric.suffix}</i>
            </strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
