import hcmLogo from '@/assets/idarat-hcm-logo.png'
import tsoLogo from '@/assets/idarat-tso-logo.png'
import ictLogo from '@/assets/identiti-ict-logo.png'
import sisLogo from '@/assets/sis-global-logo.webp'

export const brandLogos = {
  sis: { src: sisLogo, alt: 'SIS Global' },
  hcm: { src: hcmLogo, alt: 'Idarat HCM' },
  tso: { src: tsoLogo, alt: 'Idarat TSO' },
  ict: { src: ictLogo, alt: 'Identiti ICT' },
} as const

export function brandForPath(pathname: string) {
  if (pathname.startsWith('/what-we-do/hcm')) return brandLogos.hcm
  if (pathname.startsWith('/what-we-do/tso')) return brandLogos.tso
  if (pathname.startsWith('/what-we-do/ict')) return brandLogos.ict
  return brandLogos.sis
}
