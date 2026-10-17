import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

const pillars = [
  {
    title: 'Quality & Operational Excellence',
    copy: 'Experienced teams, standardized processes and ISO-certified management systems, with quality and safety built into every stage.',
  },
  {
    title: 'Integrity & Accountability',
    copy: 'Transparent communication, clear ownership and dependable execution. We stand behind every commitment we make.',
  },
  {
    title: 'Commitment to Your Success',
    copy: 'We align our expertise and services with your business priorities to solve operational challenges and create lasting value.',
  },
] as const

export default function DifferenceSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root || prefersReducedMotion()) return

      root.querySelectorAll<HTMLElement>('[data-diff-num]').forEach((num) => {
        gsap.fromTo(
          num,
          { y: 48 },
          {
            y: -48,
            ease: 'none',
            scrollTrigger: {
              trigger: num.closest('li'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
            },
          },
        )
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="difference-stage">
      <div className="difference-sticky">
        <p className="eyebrow">What sets us apart</p>
        <h2>
          The Expertise You Need.
          <br />
          <em>The Accountability You Expect.</em>
        </h2>
      </div>
      <ol className="difference-rows">
        {pillars.map((pillar, index) => (
          <li key={pillar.title}>
            <span className="difference-num" data-diff-num>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
