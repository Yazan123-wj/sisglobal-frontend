import caseIct from '@/assets/case-ict.jpg'
import caseTelecom from '@/assets/case-telecom.jpg'
import industryConstruction from '@/assets/industry-construction.jpg'
import industryEducation from '@/assets/industry-education.jpg'
import industryEnergy from '@/assets/industry-energy.jpg'
import industryFinance from '@/assets/industry-finance.jpg'
import industryGovernment from '@/assets/industry-government.jpg'
import industryHealthcare from '@/assets/industry-healthcare.jpg'
import industryHospitality from '@/assets/industry-hospitality.jpg'
import industryOilGas from '@/assets/industry-oil-gas.jpg'
import industryProfessional from '@/assets/industry-professional.jpg'
import industryRetail from '@/assets/industry-retail.jpg'
import industryTransport from '@/assets/industry-transport.jpg'

export const industryImages: Record<string, string> = {
  telecommunications: caseTelecom,
  government: industryGovernment,
  'energy-utilities': industryEnergy,
  'oil-gas-manufacturing': industryOilGas,
  'data-centers': caseIct,
  healthcare: industryHealthcare,
  education: industryEducation,
  'financial-services': industryFinance,
  'transportation-logistics': industryTransport,
  'construction-real-estate': industryConstruction,
  'hospitality-tourism': industryHospitality,
  'professional-services': industryProfessional,
  'retail-consumer': industryRetail,
}
