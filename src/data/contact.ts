import { hcmNav, hcmPath } from '@/data/hcmPages'
import { ictInnerNav, ictNav, ictOverviewNav, type IctSectionId } from '@/data/ictPages'
import { tsoInnerNav, tsoNav, type TsoSectionId } from '@/data/tsoPages'

export const CONTACT_MESSAGE = 'I’d like to discuss how SIS Global can support our business needs.'

export const contactInterests = [
  'Idarat HCM',
  'Idarat TSO',
  'Identiti ICT',
  'Multiple services',
  'Not sure yet',
] as const

export type ContactInterest = (typeof contactInterests)[number]
export type ContactCta = 'talk' | 'proposal'

const overviewMessages: Record<ContactCta, string> = {
  talk: 'I’d like to discuss your technical services and how you can support our requirements.',
  proposal: 'I’d like to request a proposal for your technical services.',
}

function namedMessages(name: string): Record<ContactCta, string> {
  return {
    talk: `I’d like to speak with your team about ${name}.`,
    proposal: `I’d like to request a proposal for ${name}.`,
  }
}

export function isContactInterest(value: string): value is ContactInterest {
  return (contactInterests as readonly string[]).includes(value)
}

export function isContactCta(value: string | null): value is ContactCta {
  return value === 'talk' || value === 'proposal'
}

export function interestFromPath(pathname: string): ContactInterest | '' {
  if (pathname.startsWith('/what-we-do/hcm')) return 'Idarat HCM'
  if (pathname.startsWith('/what-we-do/tso')) return 'Idarat TSO'
  if (pathname.startsWith('/what-we-do/ict')) return 'Identiti ICT'
  return ''
}

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

function isOverviewPath(path: string) {
  return path === '/what-we-do/hcm' || path === '/what-we-do/tso' || path === '/what-we-do/ict'
}

function innerTopic(topic?: string | null) {
  if (!topic || topic.endsWith('-overview')) return undefined
  return topic
}

function serviceNameFrom(pathname: string, topic?: string | null): string | 'overview' | undefined {
  const path = normalizePath(pathname)
  if (isOverviewPath(path)) return 'overview'

  for (const item of hcmNav) {
    if (hcmPath[item.id] === path) return item.id === 'overview' ? 'overview' : item.label
  }

  if (path.startsWith('/what-we-do/tso/')) {
    const id = path.slice('/what-we-do/tso/'.length) as TsoSectionId
    const inner = innerTopic(topic)
    if (inner) {
      const match = tsoInnerNav[id]?.find((item) => item.id === inner)
      if (match) return match.label
    }
    return tsoNav.find((item) => item.id === id)?.label
  }

  if (path.startsWith('/what-we-do/ict/')) {
    const [id, innerId] = path.slice('/what-we-do/ict/'.length).split('/') as [IctSectionId, string | undefined]
    const inner = innerTopic(innerId || topic)
    if (inner) {
      const match = ictInnerNav[id]?.find((item) => item.id === inner)
      if (match) return match.label
    }
    return ictNav.find((item) => item.id === id)?.label
      ?? ictOverviewNav.find((item) => item.id === id)?.label
  }
}

export function messageFromPath(pathname: string, cta: ContactCta, topic?: string | null) {
  const name = serviceNameFrom(pathname, topic)
  if (!name) return undefined
  return name === 'overview' ? overviewMessages[cta] : namedMessages(name)[cta]
}

export function messageFromContact(params: URLSearchParams) {
  const cta = params.get('cta')
  if (!isContactCta(cta)) return CONTACT_MESSAGE
  return messageFromPath(params.get('from') ?? '', cta, params.get('topic')) ?? CONTACT_MESSAGE
}

export function contactTo(pathname = '', cta?: ContactCta, topic?: string) {
  const params = new URLSearchParams()
  const path = normalizePath(pathname)
  const interest = interestFromPath(path)
  if (interest) params.set('interest', interest)
  if (cta) {
    params.set('cta', cta)
    params.set('from', path)
    const inner = innerTopic(topic)
    if (inner && !isOverviewPath(path)) params.set('topic', inner)
  }
  const query = params.toString()
  return query ? `/contact?${query}` : '/contact'
}
