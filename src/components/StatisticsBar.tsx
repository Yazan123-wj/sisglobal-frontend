import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import type { StatItem } from '@/data/stats'
import { cn } from '@/lib/cn'

function parseStat(value: string) {
  const match = value.trim().match(/^([\d,]+)(.*)$/)
  if (!match) return { count: null as number | null, suffix: '', raw: value }
  const count = Number(match[1].replace(/,/g, ''))
  if (Number.isNaN(count)) return { count: null, suffix: '', raw: value }
  return { count, suffix: match[2], raw: value }
}

export default function StatisticsBar({
  items,
  label,
  className,
}: {
  items: StatItem[]
  label: string
  className?: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const parsed = items.map((item) => ({ ...item, ...parseStat(item.value) }))

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
  }, { scope: sectionRef, dependencies: [items.map((item) => `${item.value}|${item.label}`).join()] })

  return (
    <section
      ref={sectionRef}
      className={cn('metrics-section', className)}
      aria-label={label}
      data-count={items.length}
    >
      <div className="container metrics-grid" data-count={items.length}>
        {parsed.map((metric) => (
          <div key={metric.label}>
            <strong>
              {metric.count == null ? (
                <b>{metric.raw}</b>
              ) : (
                <>
                  <b className="metric-value" data-count={metric.count}>0</b>
                  {metric.suffix ? <i>{metric.suffix}</i> : null}
                </>
              )}
            </strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
