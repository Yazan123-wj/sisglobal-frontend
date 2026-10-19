import { Link } from 'react-router-dom'

import iso14001 from '@/assets/certs/iso-14001.png'
import iso22301 from '@/assets/certs/iso-22301.png'
import iso27001 from '@/assets/certs/iso-27001.png'
import iso45001 from '@/assets/certs/iso-45001.png'
import iso9001 from '@/assets/certs/iso-9001.png'
import Arrow from '@/components/Arrow'
import { Steps } from '@/components/HcmSectionView'
import LogoMarquee from '@/components/LogoMarquee'
import { tsoClients } from '@/data/tsoClients'
import type { TsoBlock, TsoSection } from '@/data/tsoPages'

type SectionBlock = Extract<TsoBlock, { type: 'section' }>
type CtaBlock = Extract<TsoBlock, { type: 'cta' }>

type Group =
  | { kind: 'block'; block: TsoBlock }
  | { kind: 'offers'; blocks: SectionBlock[] }
  | { kind: 'service'; index: number; lead: SectionBlock; parts: TsoBlock[] }

const certs = [
  { code: 'ISO 45001', label: 'Occupational Health & Safety', logo: iso45001 },
  { code: 'ISO 14001', label: 'Environmental Management', logo: iso14001 },
  { code: 'ISO 9001', label: 'Quality Management', logo: iso9001 },
  { code: 'ISO 27001', label: 'Information Security Management', logo: iso27001 },
  { code: 'ISO 22301', label: 'Business Continuity Management', logo: iso22301 },
]

function isSection(block: TsoBlock): block is SectionBlock {
  return block.type === 'section'
}

function isOffer(block: TsoBlock) {
  return block.type === 'section' && Boolean(block.chips && block.link)
}

function isServicePart(block: TsoBlock) {
  if (block.type === 'cta') return !block.title
  return isSection(block) && !block.id && !block.steps && !block.why && !block.chips
}

function groupBlocks(blocks: TsoBlock[]): Group[] {
  const groups: Group[] = []
  let index = 0
  let serviceNo = 0

  while (index < blocks.length) {
    const block = blocks[index]
    if (isOffer(block)) {
      const offers: SectionBlock[] = []
      while (index < blocks.length && isOffer(blocks[index])) {
        offers.push(blocks[index] as SectionBlock)
        index += 1
      }
      groups.push({ kind: 'offers', blocks: offers })
      continue
    }
    if (isSection(block) && block.id) {
      serviceNo += 1
      const parts: TsoBlock[] = []
      index += 1
      while (index < blocks.length && isServicePart(blocks[index])) {
        parts.push(blocks[index])
        index += 1
      }
      groups.push({ kind: 'service', index: serviceNo, lead: block, parts })
      continue
    }
    groups.push({ kind: 'block', block })
    index += 1
  }

  return groups
}

function ContactLink({ label }: { label: string }) {
  return (
    <Link className="text-link" to="/#contact">
      {label} <Arrow />
    </Link>
  )
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="hcm-prose">
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  )
}

function Rows({ items, featured = false }: { items: NonNullable<SectionBlock['items']>; featured?: boolean }) {
  return (
    <ol className={featured ? 'hcm-why' : 'hcm-stack'}>
      {items.map((item, index) => (
        <li key={item.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Directory({ items }: { items: NonNullable<SectionBlock['items']> }) {
  return (
    <ul className="tso-directory">
      {items.map((item) => (
        <li key={item.title}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
          {item.href && item.cta ? (
            <a className="text-link" href={item.href}>
              {item.cta} <Arrow />
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function BlockView({ block }: { block: TsoBlock }) {
  if (block.type === 'prose') return <Prose paragraphs={block.paragraphs} />

  if (block.type === 'stats') {
    return (
      <section className="work-block">
        <h2>{block.title}</h2>
        <dl className="hcm-stats">
          {block.items.map((item) => (
            <div key={item.label}>
              <dd>{item.value}</dd>
              <dt>{item.label}</dt>
            </div>
          ))}
        </dl>
      </section>
    )
  }

  if (block.type === 'certs') {
    return (
      <section className="work-block">
        <h2>{block.title}</h2>
        <div className="about-certs">
          {certs.map((item) => (
            <article key={item.code}>
              <img src={item.logo} alt="" />
              <h3>{item.code}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (block.type === 'partners') {
    return (
      <section className="work-block hcm-trust">
        <h2>{block.title}</h2>
        <h3 className="tso-kicker">Trusted by Leading Organizations</h3>
        <LogoMarquee items={tsoClients} />
      </section>
    )
  }

  if (block.type === 'cta') return <CtaBand block={block} />

  if (block.steps) {
    return (
      <section className="work-block">
        <h2>{block.title}</h2>
        <Steps items={block.steps} />
      </section>
    )
  }

  if (block.why) {
    return (
      <section className="work-block">
        <h2>{block.title}</h2>
        <Rows items={block.why} featured />
      </section>
    )
  }

  if (block.items) {
    const linked = block.items.some((item) => item.href)
    return (
      <section id={block.id} className={block.id ? 'work-block tso-anchor' : 'work-block'}>
        <h2>{block.title}</h2>
        {block.paragraphs?.length ? <Prose paragraphs={block.paragraphs} /> : null}
        {linked ? <Directory items={block.items} /> : <Rows items={block.items} />}
        {block.link ? (
          <Link className="text-link" to={block.link.to}>
            {block.link.label} <Arrow />
          </Link>
        ) : null}
      </section>
    )
  }

  return (
    <section id={block.id} className={block.id ? 'work-block tso-anchor' : 'work-block'}>
      <div className="tso-split">
        <h2>{block.title}</h2>
        {block.paragraphs?.length ? <Prose paragraphs={block.paragraphs} /> : null}
      </div>
    </section>
  )
}

function CtaBand({ block }: { block: CtaBlock }) {
  return (
    <section className="hcm-callout">
      <div>
        {block.title ? <h2>{block.title}</h2> : null}
        {block.copy ? <p>{block.copy}</p> : null}
      </div>
      <ContactLink label={block.label} />
    </section>
  )
}

function ServiceView({ group }: { group: Extract<Group, { kind: 'service' }> }) {
  const cta = group.parts.find((part): part is CtaBlock => part.type === 'cta')
  const parts = group.parts.filter((part) => part.type !== 'cta')

  return (
    <section id={group.lead.id} className="work-block tso-service tso-anchor">
      <header className="tso-service-head">
        <span>{String(group.index).padStart(2, '0')}</span>
        <div>
          <h2>{group.lead.title}</h2>
          {group.lead.paragraphs?.length ? <Prose paragraphs={group.lead.paragraphs} /> : null}
        </div>
      </header>
      {parts.map((part) => {
        if (!isSection(part)) return null
        return (
          <div key={part.title} className="tso-sub">
            <h3>{part.title}</h3>
            {part.paragraphs?.length ? (
              <div className={part.items ? 'tso-sub-lead' : 'hcm-prose'}>
                {part.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ) : null}
            {part.items ? <Rows items={part.items} /> : null}
          </div>
        )
      })}
      {cta ? (
        <footer className="tso-close">
          {cta.copy ? <p>{cta.copy}</p> : null}
          <ContactLink label={cta.label} />
        </footer>
      ) : null}
    </section>
  )
}

function Offers({ blocks }: { blocks: SectionBlock[] }) {
  return (
    <div className="tso-lines">
      {blocks.map((block) => (
        <article key={block.title} className="tso-line">
          <div>
            <h2>{block.title}</h2>
            {block.link ? (
              <Link className="text-link" to={block.link.to}>
                {block.link.label} <Arrow />
              </Link>
            ) : null}
          </div>
          <div>
            {block.paragraphs?.length ? <Prose paragraphs={block.paragraphs} /> : null}
            {block.chips ? (
              <div className="hcm-chips">
                {block.chips.map((chip) => <span key={chip}>{chip}</span>)}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}

export default function TsoSectionView({ section }: { section: TsoSection }) {
  const groups = groupBlocks(section.blocks)
  return (
    <div className={`hcm-section is-${section.id}`}>
      {groups.map((group, index) => {
        if (group.kind === 'offers') return <Offers key={`offers-${index}`} blocks={group.blocks} />
        if (group.kind === 'service') return <ServiceView key={group.lead.id} group={group} />
        return <BlockView key={`${group.block.type}-${index}`} block={group.block} />
      })}
    </div>
  )
}
