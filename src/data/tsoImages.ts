import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import caseWorkforce from '@/assets/case-workforce.jpg'
import industryConstruction from '@/assets/industry-construction.jpg'
import industryEnergy from '@/assets/industry-energy.jpg'
import industryOilGas from '@/assets/industry-oil-gas.jpg'
import industryProfessional from '@/assets/industry-professional.jpg'
import industryTransport from '@/assets/industry-transport.jpg'
import heroNetwork from '@/assets/sis-global-network-hero.png'

const pool = [
  caseTelecom,
  industryEnergy,
  industryConstruction,
  industryOilGas,
  industryTransport,
  caseIct,
  industryProfessional,
  caseWorkforce,
  heroNetwork,
]

const byKey: Record<string, string> = {
  overview: caseTelecom,
  rollout: caseTelecom,
  'managed-services': industryOilGas,
  'design-optimization': heroNetwork,
  'logistics-support': industryTransport,
  ran: caseTelecom,
  transmission: caseIct,
  installation: industryConstruction,
  integration: caseIct,
  ibs: industryProfessional,
  swap: caseTelecom,
  power: industryEnergy,
  noc: caseIct,
  field: industryOilGas,
  preventive: industryEnergy,
  civil: industryConstruction,
  'power-energy': industryEnergy,
  spares: industryTransport,
  resources: caseWorkforce,
  rf: caseTelecom,
  'transmission-planning': caseIct,
  capacity: heroNetwork,
  surveys: industryProfessional,
  drive: caseTelecom,
  optimization: heroNetwork,
  'ibs-design': industryProfessional,
  fleet: industryTransport,
  inventory: industryTransport,
  warehousing: industryConstruction,
  packing: industryConstruction,
  inspection: industryOilGas,
  delivery: industryTransport,
  reverse: industryTransport,
  'Rollout Overview': caseTelecom,
  'Managed Services Overview': industryOilGas,
  'Design & Optimization': heroNetwork,
  'Logistics & Support Services': industryTransport,
  'Environment, Health & Safety (EHS)': caseWorkforce,
}

function hashKey(key: string) {
  let hash = 0
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return hash
}

export function tsoPhoto(key: string) {
  return byKey[key] ?? pool[hashKey(key) % pool.length]
}
