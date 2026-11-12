import { createContext, Fragment, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'

import iso14001 from '@/assets/certs/iso-14001.png'
import iso22301 from '@/assets/certs/iso-22301.png'
import iso27001 from '@/assets/certs/iso-27001.png'
import iso45001 from '@/assets/certs/iso-45001.png'
import iso9001 from '@/assets/certs/iso-9001.png'
import Arrow from '@/components/Arrow'
import CompanyProfileDownload from '@/components/CompanyProfileDownload'
import ContactLink from '@/components/ContactLink'
import { Steps, WhyFeature } from '@/components/HcmSectionView'
import IntroSplit from '@/components/IntroSplit'
import LogoMarquee from '@/components/LogoMarquee'
import type { LogoItem } from '@/components/LogoMarquee'
import StatisticsBar from '@/components/StatisticsBar'
import { SurfaceBand, createSurfaceTones } from '@/components/SurfaceBand'
import type { CompanyProfile } from '@/data/companyProfiles'
import { tsoClients } from '@/data/tsoClients'
import { tsoPhoto } from '@/data/tsoImages'
import type { TsoBlock } from '@/data/tsoPages'

type SectionBlock = Extract<TsoBlock, { type: 'section' }>
type CtaBlock = Extract<TsoBlock, { type: 'cta' }>
type GroupBlock = NonNullable<SectionBlock['groups']>[number]

export type WorkPageSection = {
  id: string
  nav: string
  eyebrow: string
  title: string
  lead: string
  blocks: TsoBlock[]
}

const ViewContext = createContext<{
  photo: (key: string) => string
  partners: LogoItem[]
  photoCards?: boolean
}>({
  photo: tsoPhoto,
  partners: tsoClients,
  photoCards: true,
})

function useView() {
  return useContext(ViewContext)
}

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

function isEcosystem(block: { title?: string }) {
  return block.title === 'Technology Ecosystem'
}

function isScope(block: { title?: string }) {
  return block.title === 'Typical Solution Scope'
}

function ScopeBlock({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <div className="tso-scope">
      <h2>{title}</h2>
      <Prose paragraphs={paragraphs} />
    </div>
  )
}

function uniqueItems(items: string[]) {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item)) return false
    seen.add(item)
    return true
  })
}

function ecosystemChips(block: SectionBlock) {
  return uniqueItems([
    ...(block.chips ?? []),
    ...(block.groups ?? []).flatMap((group) => group.points ?? []),
  ])
}

function isServicePart(block: TsoBlock) {
  if (block.type === 'cta') return !block.title
  return isSection(block) && !block.id && !block.steps && !block.why && !block.chips && !isEcosystem(block)
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

function CtaLink({ label, topic }: { label: string; topic?: string }) {
  return (
    <ContactLink className="button button-primary" intent="talk" topic={topic}>
      {label} <Arrow />
    </ContactLink>
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
  const { photo } = useView()
  return (
    <figure className="tso-media" data-curtain>
      <img src={photo(id)} alt="" />
    </figure>
  )
}

function PointList({ points }: { points: string[] }) {
  return <Cards items={points.map((title) => ({ title, copy: '' }))} />
}

function EcoChips({ items }: { items: string[] }) {
  return (
    <div className="tso-eco-chips">
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  )
}

function hasEcoGroups(block: SectionBlock) {
  return Boolean(block.groups?.some((group) => group.title && group.points?.length))
}

function EcoGroups({ groups }: { groups: GroupBlock[] }) {
  return (
    <div className="tso-eco">
      {groups.map((group, index) => (
        <div key={group.title || index} className="tso-eco-group">
          {group.title ? <h3>{group.title}</h3> : null}
          {group.points?.length ? <EcoChips items={group.points} /> : null}
        </div>
      ))}
    </div>
  )
}

function EcoBody({ block }: { block: SectionBlock }) {
  if (hasEcoGroups(block)) return <EcoGroups groups={block.groups!} />
  const chips = ecosystemChips(block)
  return chips.length ? <EcoChips items={chips} /> : null
}

function partnerTiles(groups: GroupBlock[]) {
  const points = groups.flatMap((group) => group.points ?? [])
  if (!points.length) return false
  const average = points.reduce((total, point) => total + point.length, 0) / points.length
  return average <= 28
}

function labeledPoint(point: string) {
  const index = point.indexOf(': ')
  if (index <= 0) return point
  return (
    <>
      <strong>{point.slice(0, index)}</strong>
      {point.slice(index)}
    </>
  )
}

function GroupList({ title, groups }: { title?: string; groups: GroupBlock[] }) {
  const featured = groups.some((group) => group.copy || group.paragraphs?.length)
  const titled = groups.some((group) => group.title)
  const asCards = featured || (titled && !partnerTiles(groups))

  if (!asCards) {
    return (
      <div className="tso-eco">
        {title ? <h2>{title}</h2> : null}
        {groups.map((group, index) => (
          <div key={group.title || index} className="tso-eco-group">
            {group.title ? <h3>{group.title}</h3> : null}
            {group.points?.length ? <EcoChips items={group.points} /> : null}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="tso-cards-wrap">
      {title ? (
        <div className="tso-swipe-head">
          <h2>{title}</h2>
        </div>
      ) : null}
      <ul className={`tso-cards${groups.length === 3 ? ' is-three' : ''}${groups.some((group) => group.image) ? ' is-product' : ''}`}>
        {groups.map((group, index) => (
          <li key={group.title} className={group.image ? 'tso-card is-product' : 'tso-card'}>
            {group.image ? (
              <div className="tso-card-media is-product">
                <img src={group.image} alt="" />
              </div>
            ) : (
              <span className="tso-card-num">{String(index + 1).padStart(2, '0')}</span>
            )}
            <div className="tso-card-body">
              {group.title ? <h3>{group.title}</h3> : null}
              {group.copy ? <p>{group.copy}</p> : null}
              {group.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {group.points?.length ? (
                <ul className="tso-card-points">
                  {group.points.map((point) => <li key={point}>{labeledPoint(point)}</li>)}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SectionExtras({ block }: { block: SectionBlock }) {
  return (
    <>
      {block.chips?.length && !block.paragraphs?.length && !isEcosystem(block) ? <EcoChips items={block.chips} /> : null}
      {block.points?.length ? <PointList points={block.points} /> : null}
      {block.groups?.length && !isEcosystem(block) ? <GroupList groups={block.groups} /> : null}
      {block.note && !block.link ? <p className="tso-section-note">{block.note}</p> : null}
      {block.link ? (
        <div className="tso-section-cta">
          {block.note ? <p>{block.note}</p> : null}
          <Link className="button button-primary" to={block.link.to}>
            {block.link.label} <Arrow />
          </Link>
        </div>
      ) : null}
    </>
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
  const { photo, photoCards = true } = useView()
  const scroller = useRef<HTMLUListElement>(null)
  const swipe = withPhoto && items.length > 1
  const ictGrid = grid && !photoCards
  const three = grid && (items.length === 3 || ictGrid)
  const five = grid && items.length === 5 && !ictGrid
  const Heading = heading

  const move = (direction: -1 | 1) => {
    const node = scroller.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('.tso-card')
    const step = (card?.offsetWidth ?? 320) + 16
    node.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <div className={swipe ? `tso-swipe${grid ? ' is-service-grid' : ''}${three ? ' is-three' : ''}${five ? ' is-five' : ''}` : 'tso-cards-wrap'}>
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
      <ul ref={scroller} className={swipe ? `tso-cards is-swipe${grid ? ' is-service-grid' : ''}${three ? ' is-three' : ''}${five ? ' is-five' : ''}` : 'tso-cards'}>
        {items.map((item, index) => {
          const path = item.href?.startsWith('/') ? item.href : undefined
          const hash = !path && item.href ? item.href.replace('#', '') : undefined
          const to = path ?? (hash ? { hash } : undefined)
          const media = withPhoto ? (
            <div className="tso-card-media" data-curtain>
              <img src={photo(path?.split('/').pop() || hash || item.title)} alt="" />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
          ) : (
            <span className="tso-card-num">{String(index + 1).padStart(2, '0')}</span>
          )
          const body = (
            <div className="tso-card-body">
              <h3>{item.title}</h3>
              {item.copy ? <p>{item.copy}</p> : null}
              {item.href && item.cta ? (
                <span className="text-link">{item.cta} <Arrow /></span>
              ) : null}
            </div>
          )
          return (
            <li key={item.title} className="tso-card">
              {to ? (
                <Link className="tso-card-link" to={to} preventScrollReset={!path}>
                  {media}
                  {body}
                </Link>
              ) : (
                <>
                  {media}
                  {body}
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function htmlId(block: TsoBlock) {
  if (block.type === 'section') return block.anchor ?? block.id
  if (block.type === 'partners') return block.anchor
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
  const { partners, photoCards = true } = useView()
  const anchor = htmlId(block)
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
      <section id={anchor} className={anchor ? 'work-block hcm-trust tso-anchor' : 'work-block hcm-trust'}>
        <h2 className="logo-strip-label">{block.title}</h2>
        <LogoMarquee items={partners} />
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
      <section id={anchor} className={anchor ? 'work-block tso-anchor' : 'work-block'}>
        {block.title ? <h2>{block.title}</h2> : null}
        {block.paragraphs?.length ? <Prose paragraphs={block.paragraphs} /> : null}
        <Steps items={block.steps} />
      </section>
    )
  }

  if (block.why) {
    return (
      <section id={anchor} className={anchor ? 'work-block tso-anchor' : 'work-block'}>
        <h2>{block.title}</h2>
        <WhyFeature
          items={block.why}
          light={
            photoKey !== 'hardware' &&
            (block.title.startsWith('Why Identiti ICT') || block.title.startsWith('Why Idarat HCM'))
          }
        />
      </section>
    )
  }

  if (block.items) {
    const pictured = block.items.some((item) => item.href)
    const swipe = pictured && block.items.length > 1
    const grid = pictured && !block.id
    return (
      <section id={anchor} className={anchor ? 'work-block tso-anchor' : 'work-block'}>
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
        <SectionExtras block={block} />
      </section>
    )
  }

  return (
    <section id={anchor} className={anchor ? 'work-block tso-anchor' : 'work-block'}>
      {block.title === 'How We Work' && block.paragraphs?.length ? (
        <WorkFaq title={block.title} paragraphs={block.paragraphs} heading="h2" />
      ) : isScope(block) && block.paragraphs?.length ? (
        <ScopeBlock title={block.title} paragraphs={block.paragraphs} />
      ) : block.title && (block.paragraphs?.length || block.points || block.groups || block.chips) ? (
        <IntroSplit title={block.title}>
          {block.paragraphs?.length ? <Prose paragraphs={block.paragraphs} /> : null}
          {isEcosystem(block) ? (
            <EcoBody block={block} />
          ) : block.chips?.length ? (
            <EcoChips items={block.chips} />
          ) : null}
        </IntroSplit>
      ) : (
        <div className="tso-note">
          {block.title ? <h2>{block.title}</h2> : null}
          {block.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      )}
      <SectionExtras block={block} />
    </section>
  )
}

function CtaBand({ block, stacked = false }: { block: CtaBlock; stacked?: boolean }) {
  if (block.title || block.copy || stacked) {
    return (
      <section className="tso-cta-final">
        {block.title || block.copy ? (
          <div className="tso-cta-copy">
            {block.title ? <h2>{block.title}</h2> : null}
            {block.copy ? <p>{block.copy}</p> : null}
          </div>
        ) : null}
        <CtaLink label={block.label} />
      </section>
    )
  }

  return (
    <section className="hcm-callout tso-callout">
      <CtaLink label={block.label} />
    </section>
  )
}

function isWhyFeature(_sectionId: string | undefined, title: string) {
  return title.startsWith('Why Idarat TSO') || title.startsWith('Why Identiti ICT') || title.startsWith('Why Idarat HCM')
}

function isNavyGroup(group: Group, sectionId?: string) {
  if (group.kind !== 'block') return false
  if (group.block.type === 'cta') return true
  if (isIctWhy(group) && sectionId !== 'hardware') return false
  return group.block.type === 'section' && isWhyFeature(sectionId, group.block.title)
}

function isWhyGroup(group: Group, sectionId?: string) {
  return group.kind === 'block' && group.block.type === 'section' && isWhyFeature(sectionId, group.block.title)
}

function isCtaGroup(group: Group | undefined) {
  return Boolean(group && group.kind === 'block' && group.block.type === 'cta')
}

function isPartnersGroup(group: Group | undefined) {
  return Boolean(group && group.kind === 'block' && group.block.type === 'partners')
}

function isIctWhy(group: Group | undefined) {
  return Boolean(
    group &&
    group.kind === 'block' &&
    group.block.type === 'section' &&
    group.block.title.startsWith('Why Identiti ICT'),
  )
}

function ServiceView({
  group,
  stackedCta = false,
}: {
  group: Extract<Group, { kind: 'service' }>
  stackedCta?: boolean
}) {
  const { photoCards = true } = useView()
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
          <SectionExtras block={group.lead} />
        </section>
      </SurfaceBand>
      {parts.map((part, index) => {
        if (!isSection(part)) return null
        return (
          <SurfaceBand key={`${group.lead.id}-${index}`} tone={surfaces.next()}>
            <div className="tso-sub">
              {part.items || part.points?.length ? (
                <Cards
                  title={part.title}
                  heading="h2"
                  lead={part.paragraphs}
                  items={part.items ?? part.points?.map((title) => ({ title, copy: '' })) ?? []}
                  withPhoto={photoCards && Boolean(part.items)}
                  grid={photoCards && Boolean(part.items)}
                />
              ) : part.title === 'How We Work' && part.paragraphs?.length ? (
                <WorkFaq title={part.title} paragraphs={part.paragraphs} heading="h2" />
              ) : isScope(part) && part.paragraphs?.length ? (
                <ScopeBlock title={part.title} paragraphs={part.paragraphs} />
              ) : isEcosystem(part) ? (
                <IntroSplit title={part.title}>
                  {part.paragraphs?.length ? <Prose paragraphs={part.paragraphs} /> : null}
                  <EcoBody block={part} />
                </IntroSplit>
              ) : part.groups?.length && !part.paragraphs?.length ? (
                <GroupList title={part.title} groups={part.groups} />
              ) : part.title && part.paragraphs?.length ? (
                <IntroSplit title={part.title}>
                  <Prose paragraphs={part.paragraphs} />
                </IntroSplit>
              ) : part.title && part.groups ? (
                <GroupList title={part.title} groups={part.groups} />
              ) : (
                <div className="tso-note">
                  {part.title ? <h3>{part.title}</h3> : null}
                  {part.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              )}
              <SectionExtras
                block={{
                  ...part,
                  points: part.items || part.points ? undefined : part.points,
                  groups: part.groups && !part.paragraphs?.length ? undefined : part.groups,
                }}
              />
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
              <CtaLink label="Talk to our team" topic={group.lead.id} />
            </section>
          ) : (
            <footer className="tso-close">
              {cta.copy ? <p>{cta.copy}</p> : null}
              <CtaLink label={cta.label} topic={group.lead.id} />
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
  const { photo } = useView()
  return (
    <div className="tso-offers">
      {blocks.map((block) => (
        <article key={block.title} className="tso-card">
          <div className="tso-card-media is-tall" data-curtain>
            <img src={photo(block.title)} alt="" />
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
              <Link className="button button-primary" to={block.link.to}>
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
  partners = tsoClients,
  photo = tsoPhoto,
  photoCards = true,
  profile,
}: {
  section: WorkPageSection
  topic?: string
  previewId?: string
  partners?: LogoItem[]
  photo?: (key: string) => string
  photoCards?: boolean
  profile?: CompanyProfile
}) {
  const groups = groupBlocks(section.blocks)
  const view = { partners, photo, photoCards }
  const body = (() => {
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
              if (isPartnersGroup(group) && isIctWhy(intro[index - 1])) return null
              if (isCtaGroup(group) && isWhyGroup(intro[index - 1], section.id) && !isIctWhy(intro[index - 1])) return null
              if (isCtaGroup(group) && profile) {
                return (
                  <Fragment key={`${group.kind}-${index}`}>
                    <CompanyProfileDownload profile={profile} />
                    <SurfaceBand tone="navy">
                      {renderGroup(group, index, section.id)}
                    </SurfaceBand>
                  </Fragment>
                )
              }
              if (group.kind === 'block' && group.block.type === 'stats') {
                return (
                  <StatisticsBar
                    key={`${group.kind}-${index}`}
                    items={group.block.items}
                    label={group.block.title}
                  />
                )
              }
              const closePartners = isIctWhy(group) && isPartnersGroup(intro[index + 1]) ? intro[index + 1] : null
              const closeCta = isWhyGroup(group, section.id) && !isIctWhy(group) && isCtaGroup(closePartners ? intro[index + 2] : intro[index + 1])
                ? (closePartners ? intro[index + 2] : intro[index + 1])
                : null
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
                  {closePartners ? renderGroup(closePartners, index + 1, section.id, false) : null}
                  {closeCta ? renderGroup(closeCta, index + 2, section.id, false) : null}
                </SurfaceBand>
              )
            })
          : service
            ? renderGroup(service, 0, section.id)
            : null}
      </div>
    )
  })()

  return <ViewContext.Provider value={view}>{body}</ViewContext.Provider>
}
