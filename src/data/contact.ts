export const CONTACT_MESSAGE = 'hello i need help in something'

export const contactInterests = [
  'Idarat HCM',
  'Idarat TSO',
  'Identiti ICT',
  'Multiple services',
  'Not sure yet',
] as const

export type ContactInterest = (typeof contactInterests)[number]

export function isContactInterest(value: string): value is ContactInterest {
  return (contactInterests as readonly string[]).includes(value)
}

export function interestFromPath(pathname: string): ContactInterest | '' {
  if (pathname.startsWith('/what-we-do/hcm')) return 'Idarat HCM'
  if (pathname.startsWith('/what-we-do/tso')) return 'Idarat TSO'
  if (pathname.startsWith('/what-we-do/ict')) return 'Identiti ICT'
  return ''
}

export function contactTo(pathname = '') {
  const interest = interestFromPath(pathname)
  if (!interest) return '/contact'
  return `/contact?interest=${encodeURIComponent(interest)}`
}
