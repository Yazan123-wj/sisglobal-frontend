import { useRef } from 'react'
import { Link } from 'react-router-dom'

import iso14001 from '@/assets/certs/iso-14001.png'
import iso22301 from '@/assets/certs/iso-22301.png'
import iso27001 from '@/assets/certs/iso-27001.png'
import iso45001 from '@/assets/certs/iso-45001.png'
import iso9001 from '@/assets/certs/iso-9001.png'
import Arrow from '@/components/Arrow'
import { Steps, WhyFeature } from '@/components/HcmSectionView'
import IntroSplit from '@/components/IntroSplit'
import LogoMarquee from '@/components/LogoMarquee'
import StatisticsBar from '@/components/StatisticsBar'
import { SurfaceBand, createSurfaceTones } from '@/components/SurfaceBand'
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
    <Link className="button button-primary" to="/contact">
      {label} <Arrow />
    </Link>
  )
}

const workTitles = [
  'Site survey and readiness verification',
  'Installation to vendor specification',
  'Commissioning and configuration',
  'Integration and verification',
]

function polishStepCopy(copy: string) {
  const text = copy.replace(/^[\s.,;:]+/, '').trim()
  if (!text) return copy
  return text[0].toUpperCase() + text.slice(1)
}

function splitWork(paragraphs: string[]) {
  const lead: string[] = []
  const items: { title: string; copy: string }[] = []

  for (const paragraph of paragraphs) {
    const title = workTitles.find((item) => paragraph.toLowerCase().startsWith(item.toLowerCase()))
    if (title) items.push({ title, copy: polishStepCopy(paragraph.slice(title.length)) })
    else lead.push(paragraph)
  }

  return { lead, items }
}

function WorkFaq({ title, paragraphs, heading = 'h3' }: { title: string; paragraphs: string[]; heading?: 'h2' | 'h3' }) {
  const { lead, items } = splitWork(paragraphs)
  const Heading = heading

  return (
    <div className="tso-work">
      <Heading>{title}</Heading>
      {lead.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <Steps items={items} vertical />
    </div>
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
  grid = false,
}: {
  items: NonNullable<SectionBlock['items']>
  withPhoto?: boolean
  title?: string
  lead?: string[]
  heading?: 'h2' | 'h3'
  grid?: boolean
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
    <div className={swipe ? `tso-swipe${grid ? ' is-service-grid' : ''}` : 'tso-cards-wrap'}>
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
      <ul ref={scroller} className={swipe ? `tso-cards is-swipe${grid ? ' is-service-grid' : ''}` : 'tso-cards'}>
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
  introTitle,
}: {
  block: TsoBlock
  photoKey: string
  withPhoto?: boolean
  introTitle?: string
}) {
  if (block.type === 'prose') {
    if (!withPhoto) {
      return introTitle ? (
        <IntroSplit title={introTitle}>
          {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </IntroSplit>
      ) : (
        <Prose paragraphs={block.paragraphs} />
      )
    }
    return (
      <div className="tso-lead">
        <PhotoMedia id={photoKey} />
        <Prose paragraphs={block.paragraphs} />
      </div>
    )
  }

  if (block.type === 'stats') {
    return <StatisticsBar items={block.items} label={block.title} />
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
        <h2 className="logo-strip-label">{block.title}</h2>
        <LogoMarquee items={tsoClients} />
      </section>
    )
  }

  if (block.type === 'cta') {
    return (
      <CtaBand
        block={block}
        stacked={photoKey !== 'overview'}
      />
    )
  }

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
        {isWhyFeature(photoKey, block.title) ? <WhyFeature items={block.why} /> : <WhyBoxes items={block.why} />}
      </section>
    )
  }

  if (block.items) {
    const pictured = block.items.some((item) => item.href)
    const swipe = pictured && block.items.length > 1
    const grid = pictured && !block.id
    return (
      <section id={block.id} className={block.id ? 'work-block tso-anchor' : 'work-block'}>
        {!swipe && block.title ? (
          <IntroSplit title={block.title}>
            {block.paragraphs?.length ? <Prose paragraphs={block.paragraphs} /> : null}
          </IntroSplit>
        ) : null}
        <Cards
          title={swipe ? block.title : undefined}
          heading="h2"
          lead={swipe ? block.paragraphs : undefined}
          items={block.items}
          withPhoto={pictured}
          grid={grid}
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
      {block.title === 'How We Work' && block.paragraphs?.length ? (
        <WorkFaq title={block.title} paragraphs={block.paragraphs} heading="h2" />
      ) : block.title && block.paragraphs?.length ? (
        <IntroSplit title={block.title}>
          <Prose paragraphs={block.paragraphs} />
        </IntroSplit>
      ) : (
        <div className="tso-note">
          {block.title ? <h2>{block.title}</h2> : null}
          {block.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      )}
    </section>
  )
}

function CtaBand({ block, stacked = false }: { block: CtaBlock; stacked?: boolean }) {
  if (block.title || stacked) {
    return (
      <section className="tso-cta-final">
        <div className="tso-cta-copy">
          {block.title ? <h2>{block.title}</h2> : null}
          {block.copy ? <p>{block.copy}</p> : null}
        </div>
        <Link className="button button-primary" to="/contact">
          {block.label} <Arrow />
        </Link>
      </section>
    )
  }

  return (
    <section className="hcm-callout tso-callout">
      <div>
        {block.title ? <h2>{block.title}</h2> : null}
      </div>
      <ContactLink label={block.label} />
    </section>
  )
}

function isWhyFeature(_sectionId: string | undefined, title: string) {
  return title.startsWith('Why Idarat TSO')
}

function isNavyGroup(group: Group, sectionId?: string) {
  if (group.kind !== 'block') return false
  if (group.block.type === 'cta') return true
  return group.block.type === 'section' && isWhyFeature(sectionId, group.block.title)
}

function isWhyGroup(group: Group, sectionId?: string) {
  return group.kind === 'block' && group.block.type === 'section' && isWhyFeature(sectionId, group.block.title)
}

function isCtaGroup(group: Group) {
  return group.kind === 'block' && group.block.type === 'cta'
}

function ServiceView({
  group,
  stackedCta = false,
}: {
  group: Extract<Group, { kind: 'service' }>
  stackedCta?: boolean
}) {
  const cta = group.parts.find((part): part is CtaBlock => part.type === 'cta')
  const parts = group.parts.filter((part) => part.type !== 'cta')
  const surfaces = createSurfaceTones()

  return (
    <>
      <SurfaceBand tone={surfaces.next()}>
        <section id={group.lead.id} className="work-block tso-service tso-anchor">
          <IntroSplit title={group.lead.title}>
            {group.lead.paragraphs?.length ? <Prose paragraphs={group.lead.paragraphs} /> : null}
          </IntroSplit>
        </section>
      </SurfaceBand>
      {parts.map((part) => {
        if (!isSection(part)) return null
        return (
          <SurfaceBand key={part.title} tone={surfaces.next()}>
            <div className="tso-sub">
              {part.items ? (
                <Cards
                  title={part.title}
                  lead={part.paragraphs}
                  items={part.items}
                  withPhoto
                  grid
                />
              ) : part.title === 'How We Work' && part.paragraphs?.length ? (
                <WorkFaq title={part.title} paragraphs={part.paragraphs} heading="h2" />
              ) : part.title && part.paragraphs?.length ? (
                <IntroSplit title={part.title}>
                  <Prose paragraphs={part.paragraphs} />
                </IntroSplit>
              ) : (
                <div className="tso-note">
                  {part.title ? <h3>{part.title}</h3> : null}
                  {part.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              )}
            </div>
          </SurfaceBand>
        )
      })}
      {cta ? (
        <SurfaceBand tone="navy">
          {stackedCta ? (
            <section className="tso-cta-final">
              <div className="tso-cta-copy">
                {cta.title ? <h2>{cta.title}</h2> : null}
                {cta.copy ? <p>{cta.copy}</p> : null}
              </div>
              <Link className="button button-primary" to="/contact">
                Talk to our team <Arrow />
              </Link>
            </section>
          ) : (
            <footer className="tso-close">
              {cta.copy ? <p>{cta.copy}</p> : null}
              <ContactLink label={cta.label} />
            </footer>
          )}
        </SurfaceBand>
      ) : null}
    </>
  )
}

function ServicePreview({ block }: { block: SectionBlock }) {
  return (
    <SurfaceBand tone="mist">
      <section className="work-block tso-service-preview">
        <IntroSplit title={block.title}>
          {block.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </IntroSplit>
        {block.chips?.length || block.link ? (
          <div className="tso-preview-index">
            {block.chips?.length ? (
              <ul className="tso-preview-services">
                {block.chips.map((chip, index) => (
                  <li key={chip}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{chip}</strong>
                  </li>
                ))}
              </ul>
            ) : null}
            {block.link ? (
              <Link className="button button-primary" to={block.link.to}>
                {block.link.label} <Arrow />
              </Link>
            ) : null}
          </div>
        ) : null}
      </section>
    </SurfaceBand>
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

function renderGroup(group: Group, index: number, photoKey: string, withPhoto = true, introTitle?: string) {
  if (group.kind === 'offers') return <Offers key={`offers-${index}`} blocks={group.blocks} />
  if (group.kind === 'service') {
    return <ServiceView key={group.lead.id} group={group} stackedCta />
  }
  return (
    <BlockView
      key={`${group.block.type}-${index}`}
      block={group.block}
      photoKey={photoKey}
      withPhoto={withPhoto}
      introTitle={introTitle}
    />
  )
}

export default function TsoSectionView({
  section,
  topic,
  previewId,
}: {
  section: TsoSection
  topic?: string
  previewId?: string
}) {
  const groups = groupBlocks(section.blocks)
  if (section.id === 'overview' && previewId) {
    const offers = groups.find((group) => group.kind === 'offers')
    const preview = offers?.kind === 'offers'
      ? offers.blocks.find((block) => block.link?.to.endsWith(`/${previewId}`))
      : undefined
    if (preview) {
      return (
        <div className={`hcm-section is-${section.id}`}>
          <ServicePreview block={preview} />
        </div>
      )
    }
  }
  const overviewId = section.id === 'overview' ? undefined : `${section.id}-overview`
  const split = overviewId ? groups.findIndex((group) => group.kind === 'service') : -1
  const intro = split >= 0 ? groups.slice(0, split) : groups
  const rest = split >= 0 ? groups.slice(split) : []
  const service = rest.find((group) => group.kind === 'service' && group.lead.id === topic)
  const showOverview = !overviewId || !topic || topic === overviewId || !service
  const surfaces = createSurfaceTones()

  return (
    <div className={`hcm-section is-${section.id}`}>
      {showOverview
        ? intro.map((group, index) => {
            if (group.kind === 'offers') return null
            if (isCtaGroup(group) && isWhyGroup(intro[index - 1], section.id)) return null
            if (group.kind === 'block' && group.block.type === 'stats') {
              return (
                <StatisticsBar
                  key={`${group.kind}-${index}`}
                  items={group.block.items}
                  label={group.block.title}
                />
              )
            }
            const closeCta = isWhyGroup(group, section.id) && isCtaGroup(intro[index + 1]) ? intro[index + 1] : null
            return (
              <SurfaceBand key={`${group.kind}-${index}`} tone={surfaces.next(isNavyGroup(group, section.id))}>
                {renderGroup(
                  group,
                  index,
                  section.id,
                  false,
                  index === 0 && group.kind === 'block' && group.block.type === 'prose'
                    ? (section.id === 'overview' ? section.title : (section.eyebrow || section.nav))
                    : undefined,
                )}
                {closeCta ? renderGroup(closeCta, index + 1, section.id, false) : null}
              </SurfaceBand>
            )
          })
        : service
          ? renderGroup(service, 0, section.id)
          : null}
    </div>
  )
}
