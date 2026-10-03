export type VacancyUnit = 'Idarat HCM' | 'Idarat TSO' | 'Identiti ICT'

export type Vacancy = {
  id: string
  title: string
  unit: VacancyUnit
  location: string
  city: string
  type: 'Full-time'
  posted: string
  summary: string
  overview: string
  responsibilities: string[]
  requirements: string[]
}

export const vacancies: Vacancy[] = [
  {
    id: 'field-engineer',
    title: 'Field Engineer',
    unit: 'Idarat TSO',
    location: 'Riyadh, KSA',
    city: 'Riyadh',
    type: 'Full-time',
    posted: 'September 2026',
    summary: 'Deliver on-site technical execution across telecom and infrastructure programmes in Saudi Arabia.',
    overview: 'Idarat TSO is looking for a Field Engineer to support rollout and managed operations from our Riyadh headquarters. You will work with project leads and site teams to keep delivery disciplined, safe and on schedule.',
    responsibilities: [
      'Execute installation, inspection and commissioning work on assigned sites',
      'Coordinate with field crews, vendors and client representatives',
      'Report progress, risks and site conditions to the operations lead',
      'Follow SIS Global safety and quality procedures on every assignment',
    ],
    requirements: [
      'Experience in telecom, utilities or technical field operations',
      'Willingness to work on active sites across KSA',
      'Clear written and verbal reporting in English; Arabic is an advantage',
      'A valid driving licence and readiness to travel between sites',
    ],
  },
  {
    id: 'hr-operations-specialist',
    title: 'HR Operations Specialist',
    unit: 'Idarat HCM',
    location: 'Amman, Jordan',
    city: 'Amman',
    type: 'Full-time',
    posted: 'September 2026',
    summary: 'Run day-to-day people operations for workforce programmes delivered from Jordan.',
    overview: 'Idarat HCM needs an HR Operations Specialist in Amman to support mobilisation, employee records and compliant HR administration for regional assignments.',
    responsibilities: [
      'Maintain employee files, contracts and onboarding checklists',
      'Coordinate payroll inputs with the HCM operations team',
      'Support managers with queries on attendance, leave and documentation',
      'Help keep processes consistent across the programmes you support',
    ],
    requirements: [
      'Experience in HR operations, payroll support or workforce administration',
      'Comfortable with HRIS tools and accurate data entry',
      'Arabic and English at a professional working level',
      'A careful approach to confidentiality and compliance',
    ],
  },
  {
    id: 'sales-engineer',
    title: 'Sales Engineer',
    unit: 'Identiti ICT',
    location: 'Dubai, UAE',
    city: 'Dubai',
    type: 'Full-time',
    posted: 'August 2026',
    summary: 'Shape ICT proposals and technical conversations with enterprise and public-sector teams in the UAE.',
    overview: 'Identiti ICT is hiring a Sales Engineer in Dubai to translate infrastructure requirements into clear proposals — from networks and hardware to cybersecurity and integration.',
    responsibilities: [
      'Qualify technical requirements with account managers and clients',
      'Prepare solution outlines, bills of material and proposal inputs',
      'Support presentations and clarification meetings',
      'Hand over won work cleanly to delivery teams',
    ],
    requirements: [
      'Background in ICT sales engineering, pre-sales or systems integration',
      'Working knowledge of enterprise infrastructure and cybersecurity',
      'Clear communication with commercial and technical stakeholders',
      'Based in the UAE, or able to relocate to Dubai',
    ],
  },
  {
    id: 'payroll-specialist',
    title: 'Payroll Specialist',
    unit: 'Idarat HCM',
    location: 'Riyadh, KSA',
    city: 'Riyadh',
    type: 'Full-time',
    posted: 'August 2026',
    summary: 'Process accurate, on-time payroll for large workforces supported from Riyadh.',
    overview: 'Join the Idarat HCM payroll team at headquarters. You will process cycles, resolve exceptions and keep statutory submissions in good order.',
    responsibilities: [
      'Run payroll cycles and validate inputs before submission',
      'Resolve exceptions with HR operations and finance',
      'Maintain records required for audits and statutory reporting',
      'Help improve checklists so each cycle is quieter than the last',
    ],
    requirements: [
      'Hands-on payroll experience in KSA or the wider region',
      'Familiarity with GOSI, tax and labour documentation as applicable',
      'High numerical accuracy and comfort with payroll systems',
      'Arabic and English for working with records and stakeholders',
    ],
  },
  {
    id: 'telecom-site-technician',
    title: 'Telecom Site Technician',
    unit: 'Idarat TSO',
    location: 'Dubai, UAE',
    city: 'Dubai',
    type: 'Full-time',
    posted: 'July 2026',
    summary: 'Install, inspect and maintain telecom equipment on live sites across the UAE.',
    overview: 'Idarat TSO is seeking a Telecom Site Technician to support field activity — towers, indoor systems and related equipment — with a focus on safe, documented work.',
    responsibilities: [
      'Carry out installation, maintenance and inspection tasks on assigned sites',
      'Complete site reports, photo records and close-out notes',
      'Escalate faults and access issues promptly',
      'Work to the method statements and permit requirements for each site',
    ],
    requirements: [
      'Practical experience on telecom or wireless infrastructure',
      'Comfort working at height and on active sites where required',
      'A safety-first approach and willingness to follow site rules',
      'A valid driving licence',
    ],
  },
  {
    id: 'systems-engineer',
    title: 'Systems Engineer',
    unit: 'Identiti ICT',
    location: 'Riyadh, KSA',
    city: 'Riyadh',
    type: 'Full-time',
    posted: 'July 2026',
    summary: 'Design and support secure ICT foundations for enterprise environments in KSA.',
    overview: 'Identiti ICT needs a Systems Engineer in Riyadh to help design, deploy and support infrastructure — servers, networks and the integrations that keep operations running.',
    responsibilities: [
      'Contribute to designs, build plans and handover documentation',
      'Deploy and support infrastructure in line with agreed standards',
      'Work with vendors and internal teams during implementation',
      'Provide structured troubleshooting during and after go-live',
    ],
    requirements: [
      'Experience in systems, networks or infrastructure engineering',
      'Familiarity with enterprise hardware, identity and security basics',
      'Clear documentation habits',
      'Ability to work with delivery timelines in KSA',
    ],
  },
  {
    id: 'workforce-coordinator',
    title: 'Workforce Coordinator',
    unit: 'Idarat HCM',
    location: 'Cairo, Egypt',
    city: 'Cairo',
    type: 'Full-time',
    posted: 'June 2026',
    summary: 'Coordinate mobilisation and assignment logistics for people deployed from Egypt.',
    overview: 'Idarat HCM is hiring a Workforce Coordinator in Cairo to keep mobilisation moving — from candidate readiness to travel, documentation and on-assignment support.',
    responsibilities: [
      'Track mobilisation checklists for assigned programmes',
      'Coordinate documents, travel and start dates with operations',
      'Be a first point of contact for routine assignment queries',
      'Keep status reporting current for the HCM lead',
    ],
    requirements: [
      'Experience in workforce coordination, staffing operations or HR support',
      'Strong organisation and follow-through',
      'Arabic and English',
      'Comfort working across time zones with regional teams',
    ],
  },
  {
    id: 'field-supervisor',
    title: 'Field Supervisor',
    unit: 'Idarat TSO',
    location: 'Riyadh, KSA',
    city: 'Riyadh',
    type: 'Full-time',
    posted: 'June 2026',
    summary: 'Lead site crews and keep technical programmes moving to plan.',
    overview: 'Idarat TSO is looking for a Field Supervisor in Riyadh to lead crews, hold the quality line and keep programmes moving across multiple sites.',
    responsibilities: [
      'Plan daily site activity and brief crews before work starts',
      'Check work against method statements and client requirements',
      'Manage access, permits and on-site coordination',
      'Report progress and issues to the operations manager',
    ],
    requirements: [
      'Supervisory experience in telecom, construction or technical services',
      'A practical grasp of site safety and quality control',
      'Calm communication with crews, clients and office teams',
      'Readiness to travel between sites in KSA',
    ],
  },
]

export const vacancyLocations = [...new Set(vacancies.map((vacancy) => vacancy.location))]

export function getVacancy(id: string) {
  return vacancies.find((vacancy) => vacancy.id === id)
}
