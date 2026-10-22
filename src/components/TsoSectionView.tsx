import { useRef } from 'react'
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
import { tsoPhoto } from '@/data/tsoImages'
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

function PhotoMedia({ id }: { id: string }) {
  return (
    <figure className="tso-media" data-curtain>
      <img src={tsoPhoto(id)} alt="" />
    </figure>
  )
}

function Cards({
  items,
  withPhoto = false,
  title,
  lead,
  heading = 'h3',
}: {
  items: NonNullable<SectionBlock['items']>
  withPhoto?: boolean
  title?: string
  lead?: string[]
  heading?: 'h2' | 'h3'
}) {
  const scroller = useRef<HTMLUListElement>(null)
  const swipe = withPhoto && items.length > 1
  const Heading = heading

  const move = (direction: -1 | 1) => {
    const node = scroller.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('.tso-card')
    const step = (card?.offsetWidth ?? 320) + 16
    node.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <div className={swipe ? 'tso-swipe' : undefined}>
      {title || swipe ? (
        <div className="tso-swipe-head">
          {title ? <Heading>{title}</Heading> : <span />}
          {swipe ? (
            <div className="work-scroll-nav tso-swipe-nav">
              <button type="button" aria-label="Previous" onClick={() => move(-1)}><Arrow dir="left" /></button>
              <button type="button" aria-label="Next" onClick={() => move(1)}><Arrow dir="right" /></button>
            </div>
          ) : null}
        </div>
      ) : null}
      {lead?.length ? (
        <div className="tso-sub-lead">
          {lead.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      ) : null}
      <ul ref={scroller} className={swipe ? 'tso-cards is-swipe' : 'tso-cards'}>
        {items.map((item, index) => (
          <li key={item.title} className="tso-card">
            {withPhoto ? (
              <div className="tso-card-media" data-curtain>
                <img src={tsoPhoto(item.href?.replace('#', '') || item.title)} alt="" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
            ) : (
              <span className="tso-card-num">{String(index + 1).padStart(2, '0')}</span>
            )}
            <div className="tso-card-body">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              {item.href && item.cta ? (
                <Link className="text-link" to={{ hash: item.href.replace('#', '') }} preventScrollReset>
                  {item.cta} <Arrow />
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WhyBoxes({ items }: { items: NonNullable<SectionBlock['why']> }) {
  return (
    <ol className="tso-why">
      {items.map((item, index) => (
        <li key={item.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </li>
      ))}
    </ol>
  )
}

function BlockView({
  block,
  photoKey,
  withPhoto = true,
}: {
  block: TsoBlock
  photoKey: string
  withPhoto?: boolean
}) {
  if (block.type === 'prose') {
    if (!withPhoto) return <Prose paragraphs={block.paragraphs} />
    return (
      <div className="tso-lead">
        <PhotoMedia id={photoKey} />
        <Prose paragraphs={block.paragraphs} />
      </div>
    )
  }

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
        <WhyBoxes items={block.why} />
      </section>
    )
  }

  if (block.items) {
    const pictured = block.items.some((item) => item.href)
    return (
      <section id={block.id} className={block.id ? 'work-block tso-anchor' : 'work-block'}>
        <Cards
          title={block.title}
          heading="h2"
          lead={block.paragraphs}
          items={block.items}
          withPhoto={pictured}
        />
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
      <div className="tso-note">
        <h2>{block.title}</h2>
        {block.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  )
}

function CtaBand({ block }: { block: CtaBlock }) {
  return (
    <section className="hcm-callout tso-callout">
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
  let picturedList = false

  return (
    <section id={group.lead.id} className="work-block tso-service tso-anchor">
      <div className="tso-lead">
        <PhotoMedia id={group.lead.id || group.lead.title} />
        <header className="tso-service-head">
          <span>{String(group.index).padStart(2, '0')}</span>
          <div>
            <h2>{group.lead.title}</h2>
            {group.lead.paragraphs?.length ? <Prose paragraphs={group.lead.paragraphs} /> : null}
          </div>
        </header>
      </div>
      {parts.map((part) => {
        if (!isSection(part)) return null
        const showPhotos = Boolean(part.items) && !picturedList
        if (showPhotos) picturedList = true
        return (
          <div key={part.title} className="tso-sub">
            {part.items ? (
              <Cards
                title={part.title}
                lead={part.paragraphs}
                items={part.items}
                withPhoto={showPhotos}
              />
            ) : (
              <div className="tso-note">
                <h3>{part.title}</h3>
                {part.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            )}
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
    <div className="tso-offers">
      {blocks.map((block) => (
        <article key={block.title} className="tso-card">
          <div className="tso-card-media is-tall" data-curtain>
            <img src={tsoPhoto(block.title)} alt="" />
          </div>
          <div className="tso-card-body">
            <h2>{block.title}</h2>
            {block.paragraphs?.length ? <Prose paragraphs={block.paragraphs} /> : null}
            {block.chips ? (
              <div className="hcm-chips">
                {block.chips.map((chip) => <span key={chip}>{chip}</span>)}
              </div>
            ) : null}
            {block.link ? (
              <Link className="text-link" to={block.link.to}>
                {block.link.label} <Arrow />
              </Link>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}

function renderGroup(group: Group, index: number, photoKey: string, withPhoto = true) {
  if (group.kind === 'offers') return <Offers key={`offers-${index}`} blocks={group.blocks} />
  if (group.kind === 'service') return <ServiceView key={group.lead.id} group={group} />
  return <BlockView key={`${group.block.type}-${index}`} block={group.block} photoKey={photoKey} withPhoto={withPhoto} />
}

export default function TsoSectionView({
  section,
  topic,
}: {
  section: TsoSection
  topic?: string
}) {
  const groups = groupBlocks(section.blocks)
  const overviewId = section.id === 'overview' ? undefined : `${section.id}-overview`
  const split = overviewId ? groups.findIndex((group) => group.kind === 'service') : -1
  const intro = split >= 0 ? groups.slice(0, split) : groups
  const rest = split >= 0 ? groups.slice(split) : []
  const service = rest.find((group) => group.kind === 'service' && group.lead.id === topic)
  const showOverview = !overviewId || !topic || topic === overviewId || !service

  return (
    <div className={`hcm-section is-${section.id}`}>
      {showOverview
        ? intro.map((group, index) => renderGroup(group, index, section.id, false))
        : service
          ? renderGroup(service, 0, section.id)
          : null}
    </div>
  )
}
