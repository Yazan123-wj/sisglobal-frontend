import apc from '@/assets/brand-logos/apc.png'
import azure from '@/assets/brand-logos/azure.svg'
import docusign from '@/assets/brand-logos/docusign.svg'
import epson from '@/assets/brand-logos/epson.svg'
import huawei from '@/assets/brand-logos/huawei.png'
import veeam from '@/assets/brand-logos/veeam.svg'
import vmware from '@/assets/brand-logos/vmware.svg'

const numbered = import.meta.glob('@/assets/tech-partners/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function partner(n: number) {
  const suffix = `/${String(n).padStart(2, '0')}.png`
  return Object.entries(numbered).find(([path]) => path.endsWith(suffix))?.[1] ?? ''
}

const aliases: Record<string, string> = {
  samsung: partner(1),
  hpe: partner(2),
  apple: partner(3),
  nextivity: partner(4),
  'nextivity cel-fi': partner(4),
  'cel-fi': partner(4),
  fortinet: partner(5),
  asus: partner(6),
  dell: partner(7),
  'dell technologies': partner(7),
  lenovo: partner(8),
  f5: partner(9),
  hp: partner(10),
  'palo alto networks': partner(11),
  paloalto: partner(11),
  kaspersky: partner(12),
  logitech: partner(13),
  microsoft: partner(14),
  lg: partner(15),
  'trend micro': partner(16),
  adobe: partner(17),
  hikvision: partner(18),
  wd: partner(19),
  'western digital': partner(19),
  aruba: partner(20),
  'aruba networks': partner(20),
  'hpe aruba networking': partner(20),
  autodesk: partner(21),
  zebra: partner(22),
  'zebra technologies': partner(22),
  h3c: partner(23),
  cisco: partner(24),
  huawei,
  epson,
  docusign,
  veeam,
  vmware,
  'vmware by broadcom': vmware,
  azure,
  'microsoft azure': azure,
  apc,
}

function logoKey(name: string) {
  return name.toLowerCase().replace(/®/g, '').replace(/\s+/g, ' ').trim()
}

export function brandLogo(name: string) {
  const key = logoKey(name)
  if (!key || key.startsWith('other approved') || key.startsWith('approved ')) return undefined
  return aliases[key]
}
