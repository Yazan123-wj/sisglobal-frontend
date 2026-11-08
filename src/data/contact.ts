export const CONTACT_MESSAGE = 'hello i need help in something'

export const contactInterests = [
  'Idarat HCM',
  'Idarat TSO',
  'Identiti ICT',
  'Multiple services',
  'Not sure yet',
] as const

export type ContactInterest = (typeof contactInterests)[number]
export type ContactCta = 'talk' | 'proposal'

const hcmMessages: Record<string, Record<ContactCta, string>> = {
  '/what-we-do/hcm': {
    talk: 'I’d like to discuss your technical services and how you can support our requirements.',
    proposal: 'I’d like to request a proposal for your technical services.',
  },
  '/what-we-do/hcm/search-selection': {
    talk: 'I’d like to speak with your team about Search & Selection.',
    proposal: 'I’d like to request a proposal for Search & Selection.',
  },
  '/what-we-do/hcm/hcm-services': {
    talk: 'I’d like to speak with your team about HCM Services.',
    proposal: 'I’d like to request a proposal for HCM Services.',
  },
  '/what-we-do/hcm/my-idarat': {
    talk: 'I’d like to speak with your team about MY Idarat.',
    proposal: 'I’d like to request a proposal for MY Idarat.',
  },
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

export function messageFromPath(pathname: string, cta: ContactCta) {
  return hcmMessages[normalizePath(pathname)]?.[cta]
}

export function messageFromContact(params: URLSearchParams) {
  const from = params.get('from') ?? ''
  const cta = params.get('cta')
  if (isContactCta(cta)) {
    const mapped = messageFromPath(from, cta)
    if (mapped) return mapped
  }
  return CONTACT_MESSAGE
}

export function contactTo(pathname = '', cta?: ContactCta) {
  const params = new URLSearchParams()
  const interest = interestFromPath(pathname)
  if (interest) params.set('interest', interest)
  if (cta) {
    params.set('cta', cta)
    params.set('from', normalizePath(pathname))
  }
  const query = params.toString()
  return query ? `/contact?${query}` : '/contact'
}
