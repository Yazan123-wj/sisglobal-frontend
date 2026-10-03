import { useEffect, useRef, useState } from 'react'

import { useCountUp } from '@/hooks/useCountUp'

const metrics = [
  { value: 19, suffix: '+', label: 'Years in KSA & MENA' },
  { value: 500, suffix: '+', label: 'Enterprise clients' },
  { value: 3000, suffix: '+', label: 'Professionals managed' },
  { value: 8500, suffix: '+', label: 'Field jobs delivered' },
  { value: 8, suffix: '+', label: 'Countries' },
]

function MetricStat({ value, suffix, label, active, delay }: { value: number; suffix: string; label: string; active: boolean; delay: number }) {
  const count = useCountUp(value, active, 1400 + delay)

  return (
    <div>
      <strong>
        {count.toLocaleString('en-US')}
        <i>{suffix}</i>
      </strong>
      <span>{label}</span>
    </div>
  )
}

export default function MetricsBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="metrics-section" aria-label="SIS Global metrics">
      <div className="container metrics-grid">
        {metrics.map((metric, index) => (
          <MetricStat key={metric.label} {...metric} active={active} delay={index * 140} />
        ))}
      </div>
    </section>
  )
}
