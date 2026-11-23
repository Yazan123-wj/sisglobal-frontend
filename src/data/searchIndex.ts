import { hcmNav, hcmPath, hcmSections } from '@/data/hcmPages'
import { ictInnerLinks, ictInnerNav, ictNav, ictOverviewNav, ictProductNav, ictSections } from '@/data/ictPages'
import { tsoInnerNav, tsoNav, tsoSections, type TsoBlock } from '@/data/tsoPages'
import { workServices } from '@/data/workContent'

export type SearchEntry = {
  title: string
  /** Business unit the page belongs to. */
  unit: string
  /** Where the page sits, shown under its title. */
  context: string
  to: string
  /** Headings, capabilities and product names inside the page that should also find it. */
  terms: string[]
}

export type SearchResult = SearchEntry & {
  /** The term that matched when the title itself did not. */
  hit?: string
}

const TERM_MAX = 90

function blockTerms(block: TsoBlock): string[] {
  if (block.type !== 'section') return []
  return [
    block.title,
    ...(block.items ?? []).map((item) => item.title),
    ...(block.groups ?? []).flatMap((group) => [group.title, ...(group.points ?? [])]),
    ...(block.points ?? []),
    ...(block.chips ?? []),
  ]
}

/** A block that continues the inner page opened by the last lead section (mirrors TsoSectionView). */
function continuesInner(block: TsoBlock) {
  if (block.type === 'cta') return !block.title
  return block.type === 'section'
    && !block.id && !block.steps && !block.why && !block.chips
    && block.title !== 'Technology Ecosystem'
}

/**
 * Splits a page's blocks the way it is rendered: `own` stays on the page itself,
 * `inner[id]` belongs to the inner page opened by the lead section with that id.
 */
function splitBlocks(blocks: TsoBlock[]) {
  const own: TsoBlock[] = []
  const inner: Record<string, TsoBlock[]> = {}
  let current: TsoBlock[] | undefined
  for (const block of blocks) {
    if (block.type === 'section' && block.id) {
      current = inner[block.id] = []
    } else if (current && continuesInner(block)) {
      current.push(block)
    } else {
      current = undefined
      own.push(block)
    }
  }
  return { own, inner }
}

function leadTitle(blocks: TsoBlock[], id: string) {
  const lead = blocks.find((block) => block.type === 'section' && block.id === id)
  return lead?.type === 'section' ? lead.title : undefined
}

/**
 * Terms for a page with inner pages: its headline and its own sections. Skips the "Why …" and
 * approach sections (generic headings) and the cards that only link on to the inner pages.
 */
function pageTerms(title: string, own: TsoBlock[]): string[] {
  return [
    title,
    ...own.flatMap((block) => (
      block.type === 'section' && !block.why && !block.steps
        ? blockTerms({ ...block, items: block.items?.filter((item) => !item.href) })
        : []
    )),
  ]
}

function entry(title: string, unit: string, context: string, to: string, terms: (string | undefined)[]): SearchEntry {
  const seen = new Set([title])
  return {
    title,
    unit,
    context,
    to,
    terms: terms.filter((term): term is string => {
      if (!term || term.length > TERM_MAX || seen.has(term)) return false
      seen.add(term)
      return true
    }),
  }
}

function buildEntries(): SearchEntry[] {
  const entries: SearchEntry[] = []

  const hcm = workServices.hcm
  for (const { id, label } of hcmNav) {
    const section = hcmSections[id]
    if (id === 'overview') {
      entries.push(entry(hcm.label, hcm.label, hcm.eyebrow, hcmPath.overview, [label, section.title]))
      continue
    }
    entries.push(entry(label, hcm.label, hcm.label, hcmPath[id], [
      section.title,
      ...(section.groups ?? []).flatMap((group) => [
        group.title,
        ...group.items.flatMap((item) => [item.title, ...(item.scope?.split(' · ') ?? [])]),
      ]),
      ...(section.models ?? []).map((model) => model.title),
    ]))
  }

  const tso = workServices.tso
  for (const { id, label } of tsoNav) {
    const section = tsoSections[id]
    if (id === 'overview') {
      entries.push(entry(tso.label, tso.label, tso.eyebrow, '/what-we-do/tso', [label, section.title]))
      continue
    }
    const to = `/what-we-do/tso/${id}`
    const parts = splitBlocks(section.blocks)
    entries.push(entry(label, tso.label, tso.label, to, pageTerms(section.title, parts.own)))
    for (const inner of tsoInnerNav[id] ?? []) {
      if (inner.id.endsWith('-overview')) continue
      entries.push(entry(
        leadTitle(section.blocks, inner.id) ?? inner.label,
        tso.label,
        `${tso.label} · ${label}`,
        `${to}#${inner.id}`,
        [inner.label, ...(parts.inner[inner.id] ?? []).flatMap(blockTerms)],
      ))
    }
  }

  const ict = workServices.ict
  const familyLabel = (id: string) => ictOverviewNav.find((item) => item.id === id)?.label ?? ''
  for (const { id, label } of ictOverviewNav) {
    const section = ictSections[id]
    if (id === 'overview') {
      entries.push(entry(ict.label, ict.label, ict.eyebrow, '/what-we-do/ict', [label, section.title]))
      continue
    }
    entries.push(entry(label, ict.label, ict.label, `/what-we-do/ict/${id}`, [section.title]))
  }
  for (const { id, label } of ictNav) {
    if (id === 'overview') continue
    const section = ictSections[id]
    const family = familyLabel(ictProductNav.some((item) => item.id === id) ? 'products-supply' : 'solutions-services')
    const to = `/what-we-do/ict/${id}`
    const parts = splitBlocks(section.blocks)
    entries.push(entry(label, ict.label, `${ict.label} · ${family}`, to, pageTerms(section.title, parts.own)))
    for (const inner of ictInnerLinks(id)) {
      entries.push(entry(inner.label, ict.label, `${ict.label} · ${label}`, `${to}/${inner.id}`, [
        ictInnerNav[id]?.find((item) => item.id === inner.id)?.label,
        ...(parts.inner[inner.id] ?? []).flatMap(blockTerms),
      ]))
    }
  }

  return entries
}

/** Lowercases and reduces text to plain words; "&" and "and" are both dropped. */
function words(text: string, joiner: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-'’.]/g, joiner)
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\band\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Indexed text carries hyphenated words both joined and split,
 * so "wifi", "wi-fi" and "wi fi" all find "Wi-Fi".
 */
function normalize(text: string) {
  const joined = words(text, '')
  const split = words(text, ' ')
  return joined === split ? joined : `${joined} ${split}`
}

export function searchTokens(query: string) {
  return words(query, '').split(' ').filter(Boolean)
}

/**
 * Typed words shorter than this only count at the start of a word, so "ict" does not match
 * "predictive". Longer ones may sit inside a word, so "security" still finds "Cybersecurity".
 */
export const SEARCH_WORD_START_UNDER = 4

function hasToken(text: string, token: string) {
  return token.length < SEARCH_WORD_START_UNDER ? ` ${text}`.includes(` ${token}`) : text.includes(token)
}

function rank(text: string, phrase: string, tokens: string[]) {
  if (!tokens.every((token) => hasToken(text, token))) return 0
  if (` ${text}`.includes(` ${phrase}`)) return 4
  if (text.includes(phrase)) return 3
  const parts = text.split(' ')
  if (tokens.every((token) => parts.some((part) => part.startsWith(token)))) return 2
  return 1
}

type Indexed = { entry: SearchEntry; title: string; terms: string[] }

let index: Indexed[] | undefined

function getIndex() {
  index ??= buildEntries().map((item) => ({
    entry: item,
    title: normalize(item.title),
    terms: item.terms.map(normalize),
  }))
  return index
}

export const SEARCH_MIN_LENGTH = 2

export function searchSolutions(query: string, limit = 8): SearchResult[] {
  const tokens = searchTokens(query)
  const phrase = tokens.join(' ')
  if (phrase.length < SEARCH_MIN_LENGTH) return []

  const matches: { result: SearchResult; score: number; order: number }[] = []
  getIndex().forEach((item, order) => {
    const titleRank = rank(item.title, phrase, tokens)
    if (titleRank) {
      matches.push({ result: item.entry, score: 10 + titleRank, order })
      return
    }
    let best = 0
    let hit: string | undefined
    item.terms.forEach((term, termIndex) => {
      const termRank = rank(term, phrase, tokens)
      if (termRank > best) {
        best = termRank
        hit = item.entry.terms[termIndex]
      }
    })
    if (best) matches.push({ result: { ...item.entry, hit }, score: best, order })
  })

  return matches
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map((match) => match.result)
}
