export type HcmSectionId = 'overview' | 'search-selection' | 'hcm-services' | 'my-idarat'

export type HcmItem = {
  title: string
  copy: string
  scope?: string
}

export type HcmSection = {
  id: HcmSectionId
  nav: string
  eyebrow: string
  title: string
  lead: string
  body: string[]
  glance?: { value: string; label: string }[]
  why?: { title: string; copy: string }[]
  industries?: { title: string; copy: string; cta: string }
  close?: { title: string; copy: string; cta: string }
  groups?: { title: string; items: HcmItem[] }[]
  models?: { title: string; copy: string }[]
  modelsIntro?: string
  download?: string
}

export const hcmNav: { id: HcmSectionId; label: string }[] = [
  { id: 'overview', label: 'HCM Overview' },
  { id: 'search-selection', label: 'Search & Selection' },
  { id: 'hcm-services', label: 'HCM Services' },
  { id: 'my-idarat', label: 'MY Idarat' },
]

export const hcmPath: Record<HcmSectionId, string> = {
  overview: '/what-we-do/hcm',
  'search-selection': '/what-we-do/hcm/search-selection',
  'hcm-services': '/what-we-do/hcm/hcm-services',
  'my-idarat': '/what-we-do/hcm/my-idarat',
}

export const hcmSections: Record<HcmSectionId, HcmSection> = {
  overview: {
    id: 'overview',
    nav: 'HCM Overview',
    eyebrow: 'HCM Overview',
    title: 'Your Human Capital Partner',
    lead: 'Idarat HCM, the Human Capital Management arm of SIS Global, provides flexible, end-to-end HCM services designed to help organizations attract, manage, support and retain their workforce.',
    body: [
      'Since 2007, we have supported organizations with Human Capital Management solutions tailored to their workforce and operational requirements. From talent acquisition and employee administration to ongoing workforce management and offboarding, our flexible service model allows organizations to select the support they need and build an HCM solution aligned with their size, structure and business objectives.',
      'Combining regional expertise, scalable delivery and a deep understanding of workforce operations, Idarat HCM helps organizations simplify HR processes and focus on their core business.',
    ],
    glance: [
      { value: '70+', label: 'Clients Served' },
      { value: '1200+', label: 'Active Resources' },
      { value: '3000+', label: 'Resources Managed' },
      { value: '100K+', label: 'HR Operations Processed' },
      { value: '230K+', label: 'Helpdesk Tickets Resolved' },
      { value: '280K+', label: 'Payslips Issued' },
    ],
    why: [
      {
        title: 'End-to-End HCM Expertise',
        copy: 'Support across the employee lifecycle, from finding the right talent to managing ongoing workforce requirements.',
      },
      {
        title: 'Flexible & Scalable Service Models',
        copy: 'Choose individual HCM services or combine multiple capabilities into a solution that can evolve with your workforce and operational requirements.',
      },
      {
        title: 'Regional Understanding',
        copy: "Benefit from local and regional workforce expertise supported by SIS Global's international presence.",
      },
      {
        title: 'One Trusted Partner',
        copy: 'Bring multiple workforce requirements together under a single HCM partner, simplifying coordination and service delivery.',
      },
    ],
    industries: {
      title: 'Industries We Serve',
      copy: "Recruitment and HCM services tailored to your industry's workforce, operational and regulatory needs.",
      cta: 'Explore the Industries We Serve',
    },
    close: {
      title: 'Built Around Your Organization',
      copy: 'From building teams to outsourcing HR operations, we adapt our support to your business goals.',
      cta: 'Talk to Our HCM Team',
    },
  },
  'search-selection': {
    id: 'search-selection',
    nav: 'Search & Selection',
    eyebrow: 'Search & Selection',
    title: 'Find the Right Talent. Build Stronger Teams.',
    lead: 'Idarat HCM provides tailored recruitment and talent acquisition services designed to connect organizations with qualified professionals who meet their technical, operational and workforce requirements.',
    body: [
      'With extensive experience across Saudi Arabia and the Middle East, our recruitment specialists combine market knowledge, targeted talent sourcing and structured candidate evaluation to support organizations across a wide range of hiring requirements.',
    ],
    groups: [
      {
        title: 'Recruitment Solutions',
        items: [
          {
            title: 'Executive & Specialized Recruitment',
            copy: 'Identify experienced professionals for critical, senior and specialized positions through focused search and selection. Our approach can support executive and C-suite appointments as well as hard-to-fill roles requiring specific industry or functional expertise.',
          },
          {
            title: 'Technical & Professional Recruitment',
            copy: 'Access qualified technical and professional talent across specialized functions and industries. Our recruiters combine targeted sourcing with structured candidate evaluation to identify professionals with the technical capabilities and experience required for each role.',
          },
          {
            title: 'Volume & Mass Recruitment',
            copy: 'Scale recruitment for projects, expansions and large workforce requirements through a structured approach designed to manage higher hiring volumes efficiently while maintaining consistent screening and selection standards.',
          },
          {
            title: 'Local, Saudi National & International Recruitment',
            copy: "Source talent according to your workforce strategy through local, regional and international search capabilities. Our recruitment support can include targeted Saudi national recruitment aligned with organizations' localization and Saudization requirements, alongside overseas talent sourcing where required.",
          },
          {
            title: 'Project-Based & Contract Staffing',
            copy: 'Build flexible teams around project requirements, defined timelines or changing workforce demands without relying solely on permanent hiring.',
          },
          {
            title: 'Recruitment Process Outsourcing (RPO)',
            copy: 'Extend your internal recruitment capability by outsourcing part or all of the recruitment process to Idarat HCM from sourcing and screening to candidate coordination, selection support and onboarding.',
          },
        ],
      },
      {
        title: 'How We Find & Select Talent',
        items: [
          {
            title: 'Tailored Talent Sourcing',
            copy: 'Every search starts with understanding your requirements. We develop targeted sourcing strategies based on the role, required skills, industry, location and hiring objectives to identify relevant candidates across appropriate talent markets.',
          },
          {
            title: 'Screening & Evaluation',
            copy: 'Candidates are carefully screened through structured interviews, assessments and reference checks to evaluate their experience, capabilities and suitability for the role.',
          },
          {
            title: 'Specialized Recruitment Expertise',
            copy: 'Our recruiters combine talent acquisition expertise with an understanding of different industries and job functions, supporting more focused searches for specialized and hard-to-fill positions.',
          },
          {
            title: 'Local & International Reach',
            copy: "Our understanding of Saudi and Middle Eastern talent markets, supported by SIS Global's international presence, enables us to extend searches locally, regionally and internationally according to each organization's requirements.",
          },
          {
            title: 'Onboarding Support',
            copy: 'Our support can extend beyond candidate selection to help facilitate a smoother transition from successful hire to onboarding.',
          },
        ],
      },
    ],
    close: {
      title: 'Looking for the right talent?',
      copy: '',
      cta: 'Talk to our Search & Selection team.',
    },
  },
  'hcm-services': {
    id: 'hcm-services',
    nav: 'HCM Services',
    eyebrow: 'HCM Services',
    title: 'Simplify HR. Focus on Your Business.',
    lead: 'Idarat HCM provides flexible Human Capital Management and HR outsourcing services designed to support organizations throughout the employee lifecycle.',
    body: [
      'From employee administration and payroll to government relations, compliance and workforce offboarding, organizations can select the services they need or combine multiple capabilities into a tailored HCM solution aligned with their workforce and operational requirements.',
    ],
    groups: [
      {
        title: 'Our HCM Services',
        items: [
          {
            title: 'Employee Administration',
            copy: 'Manage essential employee administration throughout the workforce lifecycle, helping organizations maintain accurate records, consistent processes and efficient day-to-day HR operations.',
            scope: 'Employment contracts · Employee records & files · HR documentation · Personnel administration · Employee support & HR helpdesk',
          },
          {
            title: 'Payroll, Compensation & Benefits',
            copy: 'Support accurate and timely payroll, compensation and employee benefits administration while helping organizations manage key statutory and workforce requirements.',
            scope: 'Payroll processing · WPS administration · GOSI administration · Compensation administration · Medical insurance · Employee benefits administration',
          },
          {
            title: 'Government Relations, Compliance & Employee Mobility',
            copy: 'Support organizations in managing workforce-related government processes, regulatory requirements and employee mobility across Saudi Arabia, helping maintain compliant and efficient workforce operations.',
            scope: 'Qiwa · Mudad · Muqeem · MHRSD requirements · Saudization & Nitaqat monitoring · Visa processing · Iqama administration · Work permits · Renewals · Employee transfers · Regulatory documentation',
          },
          {
            title: 'Workforce Management',
            copy: 'Support the day-to-day management of your workforce through structured HR processes and workforce insights that help maintain efficient and consistent operations.',
            scope: 'Attendance & timesheets · Leave administration · Performance management support · Employee relations · Workforce reporting · HR analytics',
          },
          {
            title: 'Offboarding & Final Settlement',
            copy: 'Manage employees through a structured process that supports accurate settlements, required documentation and a consistent transition out of the organization.',
            scope: 'Employee exit administration · Final settlement processing · End-of-service calculations · Exit documentation · Exit formalities',
          },
        ],
      },
    ],
    modelsIntro: 'Every organization has different workforce requirements. Idarat HCM allows clients to select individual services, combine multiple HCM capabilities or outsource broader HR operations through a solution tailored to their needs.',
    models: [
      {
        title: 'Individual HCM Services',
        copy: 'Choose support for specific HR functions where additional expertise or capacity is required.',
      },
      {
        title: 'Integrated HCM Support',
        copy: 'Combine multiple services into a coordinated solution covering key stages of the employee lifecycle.',
      },
      {
        title: 'End-to-End HR Outsourcing',
        copy: 'Extending your HR capability through comprehensive support across ongoing workforce operations.',
      },
    ],
    close: {
      title: 'Looking to simplify your HR operations?',
      copy: '',
      cta: 'Talk to our HCM team.',
    },
  },
  'my-idarat': {
    id: 'my-idarat',
    nav: 'MY Idarat',
    eyebrow: 'My Idarat',
    title: 'Manage Your Workforce from One Platform',
    lead: 'My Idarat is SIS Global’s talent management platform and mobile app. It brings recruitment, employee self-service, and day-to-day workforce management together in one place.',
    body: [
      'Organizations can use My Idarat to source and recruit talent, manage employee information, support HR requests, and give employees easier access to essential services. By reducing manual work and bringing key processes together, the platform helps HR teams save time, control costs, and manage their workforce more efficiently.',
    ],
    download: 'Manage HR tasks wherever you are. Download the My Idarat app.',
  },
}

export function getHcmSection(id: string | null): HcmSection {
  if (id && id in hcmSections) return hcmSections[id as HcmSectionId]
  return hcmSections.overview
}
