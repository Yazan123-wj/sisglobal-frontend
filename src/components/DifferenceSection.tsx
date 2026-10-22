import { useState } from 'react'

import differenceImage from '@/assets/case-workforce.jpg'

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
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="difference-stage">
      <div className="difference-head">
        <p className="eyebrow">What sets us apart</p>
        <h2>The Expertise You Need. <em>The Accountability You Expect.</em></h2>
      </div>
      <div className="difference-split">
        <figure className="difference-media" data-curtain>
          <img src={differenceImage} alt="" />
        </figure>
        <div className="difference-faq">
          {pillars.map((pillar, index) => {
            const expanded = open === index
            return (
              <article key={pillar.title} className={expanded ? 'is-open' : undefined}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <span className="difference-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="difference-faq-title">{pillar.title}</span>
                  <span className="difference-faq-plus" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </button>
                <div className="difference-faq-body">
                  <div>
                    <p>{pillar.copy}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
