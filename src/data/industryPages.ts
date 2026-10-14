export type IndustryLink = {
  label: string
  to: string
}

export type IndustryItem = {
  title: string
  copy: string
  links: IndustryLink[]
}

export type IndustryGroup = {
  heading?: string
  items: IndustryItem[]
}

export type IndustrySupport = {
  title: string
  items: IndustryItem[]
}

export type IndustryPageContent = {
  slug: string
  intro: string[]
  challengesTitle: string
  challengeGroups: IndustryGroup[]
  supportTitle: string
  support: IndustrySupport[]
  notes?: IndustryItem[]
  faqs: { q: string; a: string }[]
  related: string[]
  cta: string
}

const tso = (pillar: string, label: string): IndustryLink => ({ label, to: `/what-we-do/tso/${pillar}` })
const hcm = (pillar: string, label: string): IndustryLink => ({ label, to: `/what-we-do/hcm/${pillar}` })
const ict = (pillar: string, label: string): IndustryLink => ({ label, to: `/what-we-do/ict/${pillar}` })
const tsoPage = (label: string): IndustryLink => ({ label, to: '/what-we-do/tso' })

const intros: Record<string, string[]> = {
  telecommunications: [
    '5G expansion, legacy swaps and rising customer expectations put operators and network vendors under constant pressure. Sites must go live on schedule, acceptance must pass the first time, and mixed-vendor networks must stay available, often with too few skilled engineers to go around.',
    'That’s where SIS Global comes in. Our Idarat TSO team has planned, built, optimized and maintained networks across Ericsson, Nokia, Huawei and ZTE environments, with more than 8,500 field jobs delivered. Idarat HCM adds the engineers you need when you need them, and Identiti ICT covers the enterprise technology around the network. One partner across the full network lifecycle.',
  ],
  government: [
    'Government entities are under pressure to digitize services, protect national data, secure critical facilities and deliver Vision 2030 programs on time. At the same time, they must meet strict procurement, security and localization requirements, often while coordinating many suppliers across one project.',
    'SIS Global helps ministries, authorities and public agencies bring infrastructure, technology and people together through one accountable partner. From command centers and smart city platforms to Saudization-aligned staffing, we support public-sector programs from design through operation.',
  ],
  'energy-utilities': [
    'Energy and utility operators manage large, dispersed assets in demanding operating conditions. Heat shortens battery life, dust degrades equipment, and every outage affects homes, businesses and public services. Meanwhile, connected sensors and control systems are opening new cyber risks, and the energy transition is adding solar and hybrid systems to the mix.',
    'SIS Global helps utilities and energy companies deploy and maintain reliable power infrastructure, connect and secure their operational technology, and staff field operations with certified technical teams.',
  ],
  'oil-gas-manufacturing': [
    'Oil and gas facilities, petrochemical plants and manufacturing sites run around the clock in demanding environments. Shutdowns and expansions need qualified workers at short notice, production depends on equipment staying online, and as plants digitize, industrial control systems need protection from cyber threats.',
    'SIS Global supports industrial operators and manufacturers with scalable manpower, connected and secure operations, and site security, all delivered to strict safety standards.',
  ],
  'data-centers': [
    'Cloud adoption, AI workloads and data residency requirements are driving rapid data center growth across the region. Operators and technology companies must add capacity fast, keep power and cooling reliable in extreme heat, and protect every layer against cyber threats, often with a limited pool of specialist engineers.',
    'SIS Global brings together data center infrastructure, power systems, cybersecurity and technical talent so technology organizations can scale with confidence.',
  ],
  healthcare: [
    'Hospitals and clinics depend on technology at every step of patient care, from electronic records and mobile devices to monitoring equipment and nursing communication. Weak signals inside thick-walled buildings, unsecured patient data, uncontrolled access to sensitive areas and staff shortages can affect care quality and staff productivity.',
    'SIS Global helps healthcare providers build reliable, secure digital infrastructure and attract and manage the clinical and non-clinical workforce they need.',
  ],
  education: [
    'Schools and universities now run on digital learning platforms, online exams, connected devices and hybrid classes. When Wi-Fi drops in a lecture hall, mobile signal is weak in a basement lab or a display fails before class, lessons are disrupted. Campuses also need to keep students safe, manage large device fleets and hire qualified staff on tight budgets.',
    'SIS Global helps education providers build connected, secure and well-equipped campuses and support the HR operations behind faculty and staff.',
  ],
  'financial-services': [
    'Financial institutions handle highly sensitive data under strict regulation. Customers expect 24/7 digital banking, regulators expect strong controls, and cyber threats continue to grow. At the same time, banks are automating operations, modernizing branches and competing hard for scarce digital talent.',
    'SIS Global helps financial services organizations protect their systems, keep services running and simplify the workforce operations behind them.',
  ],
  'transportation-logistics': [
    'Saudi Arabia’s ambition to become a global logistics hub is driving new airports, ports, rail lines and warehouses. Operators must track thousands of shipments, monitor busy terminals, secure vehicle entry points and coordinate operations in real time while finding enough skilled people to run around-the-clock shifts.',
    'SIS Global helps transportation and logistics operators connect their sites, see what is happening across them and staff operations at scale.',
  ],
  'construction-real-estate': [
    'Giga projects, new cities and mixed-use developments are reshaping the region’s skyline. Developers and contractors must deliver buildings that are connected, secure and energy-efficient from day one, and property owners must run them at lower cost. Yet low-current systems are often split across many subcontractors, signal fails inside new concrete structures, and skilled project labor is hard to secure.',
    'SIS Global brings building technology, in-building coverage and project manpower together so properties are handed over ready to perform.',
  ],
  'hospitality-tourism': [
    'Tourism is one of the fastest-growing sectors in the region, with new hotels, resorts, venues and destinations opening every year. Guests notice Wi-Fi and mobile signal from the moment they arrive, along with how smoothly they check in and how safe they feel. Operators must deliver that experience consistently while staffing up for peak seasons and major events.',
    'SIS Global helps hotels, resorts and venues connect guests, secure their properties and build the teams that bring hospitality to life.',
  ],
  'professional-services': [
    'Consultancies, engineering practices, advisory firms and other professional businesses grow through specialist people. As teams and offices expand, recruitment, payroll, government processes and IT start consuming management time that should go to clients. International firms entering Saudi Arabia face an extra layer: local hiring rules, Saudization targets and unfamiliar government platforms.',
    'SIS Global takes these functions off your plate, from finding the right talent and running HR administration to equipping a secure, connected workplace.',
  ],
  'retail-consumer': [
    'Retailers and consumer brands compete on experience. Shoppers expect fast checkouts, accurate stock, strong mobile signal for digital payments and engaging in-store content. Behind the scenes, multi-branch operators need reliable connectivity across every location, tight loss prevention and the ability to scale staff up for Ramadan, Eid and sale seasons.',
    'SIS Global helps retailers equip, connect and secure their stores and staff them with the right people at the right time.',
  ],
}

export const industryPages: Record<string, Omit<IndustryPageContent, 'intro'>> = {
  telecommunications: {
    slug: 'telecommunications',
    challengesTitle: 'The Challenges Telecom Teams Face — and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Rollout schedules that keep slipping.', copy: 'Most delays trace back to site readiness, installation quality or stalled acceptance. Our field teams follow one disciplined sequence: survey, install, integrate and accept to keep multi-site programs on schedule.', links: [tso('rollout', 'Network Rollout → TSO › Rollout')] },
        { title: 'Coverage and capacity complaints.', copy: 'Growing data traffic exposes weak cells and congested sectors. We combine drive testing, benchmarking and parameter tuning to find the real constraint and fix it.', links: [tso('design-optimization', 'TSO › Design & Optimization › Network Optimization')] },
        { title: 'Mixed-vendor networks that are hard to maintain.', copy: 'Our engineers work fluently across major vendors, so you can consolidate maintenance under one managed contract instead of several.', links: [tso('managed-services', 'TSO › Managed Services › Field Maintenance')] },
        { title: 'Not enough skilled engineers when you need them.', copy: 'We source, certify and deploy RF, transmission, power and NOC specialists — from one expert to full project teams.', links: [tso('managed-services', 'TSO › Managed Services › Managed Technical Resources')] },
      ],
    }],
    supportTitle: 'How SIS Supports Telecom Operators and Vendors',
    support: [
      {
        title: '1. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'Rollout & deployment', copy: '2G–5G RAN, microwave and fiber transmission, installation & commissioning, integration and acceptance.', links: [tso('rollout', 'TSO › Rollout › RAN Deployment'), tso('rollout', 'TSO › Rollout › Transmission Deployment')] },
          { title: 'Network swap & modernization', copy: 'equipment swaps, technology migration and reconfiguration in live networks.', links: [tso('rollout', 'TSO › Rollout › Network Swap')] },
          { title: 'Design & optimization', copy: 'RF planning, transmission design, capacity planning, site surveys and drive testing.', links: [tso('design-optimization', 'TSO › Design & Optimization › RF Planning'), tso('design-optimization', 'TSO › Design & Optimization › Drive Testing')] },
          { title: 'Managed services', copy: 'NOC operations, preventive and corrective maintenance, power management and spare parts.', links: [tso('managed-services', 'TSO › Managed Services › NOC Operations'), tso('managed-services', 'TSO › Managed Services › Power & Energy')] },
          { title: 'Logistics', copy: 'warehousing, inventory, delivery and RMA handling.', links: [tso('logistics-support', 'TSO › Logistics & Support')] },
        ],
      },
      {
        title: '2. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Technical & volume recruitment', copy: 'engineers, technicians and Saudi national talent for new programs.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Project-based staffing and HR outsourcing', copy: 'contracts, payroll, GOSI, iqamas and work permits for field workforces.', links: [hcm('hcm-services', 'HCM › HCM Services')] },
        ],
      },
      {
        title: '3. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'In-building coverage', copy: 'Nextivity CEL-FI and active DAS for enterprise customers.', links: [ict('networking', 'ICT › Connectivity › Indoor Cellular')] },
          { title: 'Network and IT supply', copy: 'networking, servers, power and supporting infrastructure from leading brands.', links: [ict('infrastructure', 'ICT › Hardware, Devices & Infrastructure')] },
        ],
      },
    ],
    faqs: [
      { q: 'Do you work with all major network vendors?', a: 'Yes. Our engineers work across Ericsson, Nokia, Huawei and ZTE equipment, including mixed-vendor networks.' },
      { q: 'Can you provide engineers for a short campaign?', a: 'Yes, from a specialist crew for a two-week drive test to a full managed operations team.' },
      { q: 'Do you support Saudization requirements?', a: 'Yes. Our HCM team sources Saudi national talent alongside international specialists.' },
    ],
    related: ['data-centers', 'energy-utilities'],
    cta: 'Talk to Our Telecom Team',
  },

  government: {
    slug: 'government',
    challengesTitle: 'The Challenges Public-Sector Teams Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Disconnected systems slow down decisions.', copy: 'Video, sensors, alarms and agency data often sit in separate platforms. We integrate them into a unified command and control environment that gives teams one operational picture.', links: [ict('cybersecurity', 'ICT › Intelligent Operations & Automation › Command & Control')] },
        { title: 'Growing cyber risk to citizen data and services.', copy: 'We design layered cybersecurity, from architecture and identity management to security monitoring to protect critical systems and sensitive information.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Cybersecurity Architecture')] },
        { title: 'Critical facilities that need tighter security.', copy: 'Ministries, courts and public buildings need controlled access and constant awareness. We integrate CCTV, AI video analytics, access control and vehicle barriers under one management platform.', links: [ict('cybersecurity', 'ICT › Physical Security')] },
        { title: 'Localization targets and complex workforce rules.', copy: 'Our HCM team sources Saudi national talent and manages the government processes behind every hire.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
      ],
    }],
    supportTitle: 'How SIS Supports Government Entities',
    support: [
      {
        title: '1. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Smart city infrastructure', copy: 'connected infrastructure, IoT platforms and digital twins.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Smart City Infrastructure'), ict('cybersecurity', 'ICT › Smart Cities & Buildings › Digital Twins')] },
          { title: 'Control rooms and video walls', copy: 'visualization and AV for operations, emergency and briefing centers.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Video Walls')] },
          { title: 'Data centers, backup and continuity', copy: 'compute, storage and disaster recovery.', links: [ict('infrastructure', 'ICT › Data Centers & Cybersecurity › Backup & Recovery')] },
          { title: 'Identity & access management', copy: 'user and privileged access control.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Identity & Access')] },
          { title: 'Process automation', copy: 'digital requests, approvals and dashboards, including Microsoft Power Platform.', links: [ict('cybersecurity', 'ICT › Intelligent Operations & Automation › Process Automation')] },
          { title: 'Technology supply', copy: 'devices, software and licensing through verified vendor channels.', links: [ict('infrastructure', 'ICT › Software, Cloud & Licensing')] },
        ],
      },
      {
        title: '2. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Recruitment and RPO', copy: 'executive, specialist and volume hiring.', links: [hcm('search-selection', 'HCM › Search & Selection › RPO')] },
          { title: 'Compliance and government relations', copy: 'Qiwa, Mudad, Muqeem, Nitaqat, visas and iqamas.', links: [hcm('hcm-services', 'HCM › HCM Services › Government Relations')] },
          { title: 'Payroll and employee administration', copy: 'payroll, WPS and GOSI.', links: [hcm('hcm-services', 'HCM › HCM Services › Payroll')] },
        ],
      },
      {
        title: '3. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'In-building coverage', copy: 'indoor mobile coverage for buildings, basements and car parks.', links: [tso('rollout', 'TSO › Rollout › In-Building Coverage')] },
          { title: 'Managed technical resources', copy: 'certified technical staff for critical facilities.', links: [tso('managed-services', 'TSO › Managed Services › Managed Technical Resources')] },
        ],
      },
    ],
    faqs: [
      { q: 'Can you deliver an integrated security and command center project?', a: 'Yes. We design, integrate and support CCTV, access control, video walls and command platforms as one solution.' },
      { q: 'Do you help with Saudization and Nitaqat?', a: 'Yes. We source Saudi national talent and monitor Nitaqat status as part of our HCM services.' },
      { q: 'Can services be introduced in phases?', a: 'Yes. Start with one facility, one internal workflow or one workforce requirement, then add systems and locations once ownership and interfaces are agreed.' },
    ],
    related: ['education', 'healthcare', 'transportation-logistics'],
    cta: 'Talk to Our Public Sector Team',
  },

  'energy-utilities': {
    slug: 'energy-utilities',
    challengesTitle: 'The Challenges Energy Teams Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Backup power that fails when it’s needed.', copy: 'Batteries past their service life and generators that were never load-tested are a common cause of downtime. We deploy and maintain power systems sized for real load and regional conditions.', links: [tso('rollout', 'TSO › Rollout › Power Systems'), tso('managed-services', 'TSO › Managed Services › Power & Energy')] },
        { title: 'Limited visibility across remote assets.', copy: 'Without live data, maintenance stays reactive. IoT platforms and connected sensors let you monitor equipment condition and predict failures before they happen.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › IoT & Predictive Operations')] },
        { title: 'Operational technology exposed to cyber threats.', copy: 'As control systems connect to IT networks, the attack surface grows. We support secure IT/OT convergence with OT asset discovery, network segmentation and threat monitoring.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Security Operations & IT/OT')] },
        { title: 'High-risk work that demands strict safety.', copy: 'Our EHS approach covers power and high-risk environments with structured risk management, environmental controls and emergency preparedness, certified to ISO 45001 and ISO 14001.', links: [tsoPage('TSO › Overview › Environment, Health & Safety')] },
      ],
    }],
    supportTitle: 'How SIS Supports Energy & Utility Operators',
    support: [
      {
        title: '1. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'Power deployment', copy: 'DC power, rectifiers, batteries, UPS, hybrid and solar systems.', links: [tso('rollout', 'TSO › Rollout › Power Systems')] },
          { title: 'Power maintenance and fault response', copy: 'battery, generator, UPS and distribution maintenance.', links: [tso('managed-services', 'TSO › Managed Services › Power & Energy')] },
          { title: 'Preventive & corrective maintenance', copy: 'scheduled inspections and fault restoration.', links: [tso('managed-services', 'TSO › Managed Services › Preventive & Corrective')] },
          { title: 'Spare parts and logistics', copy: 'stock control, delivery to remote sites and RMA handling.', links: [tso('managed-services', 'TSO › Managed Services › Spare Parts'), tso('logistics-support', 'TSO › Logistics & Support')] },
        ],
      },
      {
        title: '2. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Energy & utility management', copy: 'consumption and performance monitoring.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Energy & Utilities')] },
          { title: 'Digital twins', copy: 'digital models of infrastructure for planning and operations.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Digital Twins')] },
          { title: 'Perimeter and site security', copy: 'intrusion detection, perimeter protection and CCTV.', links: [ict('cybersecurity', 'ICT › Physical Security › Intrusion & Perimeter')] },
          { title: 'Operations centers', copy: 'unified command and control.', links: [ict('cybersecurity', 'ICT › Intelligent Operations & Automation › Command & Control')] },
        ],
      },
      {
        title: '3. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Technical and project staffing', copy: 'engineers, technicians and project teams.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Workforce administration', copy: 'payroll, compliance and mobility for multi-site teams.', links: [hcm('hcm-services', 'HCM › HCM Services')] },
        ],
      },
    ],
    faqs: [
      { q: 'Do you install solar and hybrid power systems?', a: 'Yes. We deploy hybrid grid-generator-battery systems and solar solutions where projects require renewable generation.' },
      { q: 'Can you secure our OT environment?', a: 'Yes. We support OT asset discovery, IT/OT segmentation, industrial firewalls and secure remote access.' },
      { q: 'Can you maintain power systems at remote sites?', a: 'Yes. Our managed services cover battery, generator, UPS and hybrid power maintenance, with spare parts delivered to remote locations.' },
    ],
    related: ['oil-gas-manufacturing', 'data-centers'],
    cta: 'Talk to Our Energy Team',
  },

  'oil-gas-manufacturing': {
    slug: 'oil-gas-manufacturing',
    challengesTitle: 'The Challenges Industrial Operators and Manufacturers Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Large projects that need workers fast.', copy: 'Shutdowns, expansions and new production lines can require hundreds of hires in weeks. Our volume recruitment and contract staffing models scale with your project, with screening standards kept consistent.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
        { title: 'Visa, iqama and compliance pressure for international labor.', copy: 'We handle work permits, visa processing, iqama administration and transfers so your workforce arrives and stays compliant.', links: [hcm('hcm-services', 'HCM › HCM Services › Government Relations')] },
        { title: 'Control systems at risk.', copy: 'Connected plants need OT visibility and protection. We support OT asset discovery, industrial network monitoring, segmentation and secure remote access.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Security Operations & IT/OT')] },
        { title: 'Large perimeters that are hard to secure.', copy: 'We integrate perimeter detection, CCTV with AI analytics, vehicle barriers and under-vehicle surveillance for controlled sites.', links: [ict('cybersecurity', 'ICT › Physical Security › Vehicle & Barrier'), ict('cybersecurity', 'ICT › Physical Security › Intrusion & Perimeter')] },
        { title: 'Unplanned equipment downtime.', copy: 'Without condition data, maintenance stays reactive. IoT sensors and platforms monitor the condition of critical equipment, so teams can act before a failure stops production.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › IoT & Predictive Operations')] },
        { title: 'Limited traceability on the production floor.', copy: 'Reliable production-area Wi-Fi, barcode and label printing and mobile computers track materials and products from receiving to dispatch.', links: [ict('networking', 'ICT › Connectivity › Enterprise Wi-Fi'), ict('infrastructure', 'ICT › Printing, Imaging & Data Capture › Barcode & Data Capture')] },
      ],
    }],
    supportTitle: 'How SIS Supports Industrial Operations',
    support: [
      {
        title: '1. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Volume, technical and international recruitment', copy: 'skilled trades, engineers and specialists, sourced locally and overseas.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Project-based and contract staffing', copy: 'teams for shutdowns, expansions and production peaks.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Payroll, attendance and offboarding', copy: 'timesheets, payroll, end-of-service and final settlements.', links: [hcm('hcm-services', 'HCM › HCM Services › Workforce Management'), hcm('hcm-services', 'HCM › HCM Services › Offboarding')] },
        ],
      },
      {
        title: '2. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'IoT & predictive operations', copy: 'connected sensors and condition monitoring for critical equipment.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › IoT & Predictive Operations')] },
          { title: 'AI vision & edge analytics', copy: 'safety, intrusion and anomaly detection from existing cameras.', links: [ict('cybersecurity', 'ICT › Intelligent Operations & Automation › AI Vision')] },
          { title: 'Industrial connectivity', copy: 'Wi-Fi and cellular coverage for plants, production floors, warehouses and yards.', links: [ict('networking', 'ICT › Connectivity › Enterprise Wi-Fi'), ict('networking', 'ICT › Connectivity › Indoor Cellular')] },
          { title: 'Data capture', copy: 'industrial barcode and label printers and mobile computers.', links: [ict('infrastructure', 'ICT › Printing, Imaging & Data Capture › Barcode & Data Capture')] },
          { title: 'Process automation & integration', copy: 'digital workflows and connected plant, maintenance and business systems.', links: [ict('cybersecurity', 'ICT › Intelligent Operations & Automation › Process Automation'), ict('infrastructure', 'ICT › Intelligent Operations & Automation › Systems Integration')] },
        ],
      },
      {
        title: '3. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'Managed technical resources', copy: 'safety-certified technical personnel, ready for site deployment.', links: [tso('managed-services', 'TSO › Managed Services › Managed Technical Resources')] },
          { title: 'Backup power and logistics', copy: 'UPS, power systems, fleet, warehousing and material control.', links: [tso('rollout', 'TSO › Rollout › Power Systems'), tso('logistics-support', 'TSO › Logistics & Support')] },
        ],
      },
    ],
    notes: [{ title: 'Safety first', copy: 'ISO 45001 and ISO 14001 certified, with EHS built into planning and delivery in high-risk environments.', links: [tsoPage('TSO › Overview › Environment, Health & Safety')] }],
    faqs: [
      { q: 'How fast can you mobilize workers for a shutdown?', a: 'Timelines depend on volume and trades. Our structured volume-recruitment process is built to scale quickly while keeping screening consistent.' },
      { q: 'Can you protect our industrial control systems?', a: 'Yes. We support OT asset discovery, segmentation, industrial firewalls and threat monitoring.' },
      { q: 'Can a monitoring project start with selected assets?', a: 'Yes. Start with the equipment where better visibility supports a clear decision, validate the results, then expand.' },
    ],
    related: ['energy-utilities', 'transportation-logistics'],
    cta: 'Talk to Our Team',
  },

  'data-centers': {
    slug: 'data-centers',
    challengesTitle: 'The Challenges Technology Teams Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Capacity that can’t keep up with demand.', copy: 'We design and supply computing, storage, virtualization and hyperconverged platforms shaped around your workloads and availability targets.', links: [ict('infrastructure', 'ICT › Data Centers & Cybersecurity › Compute & Storage')] },
        { title: 'Power failures behind outages.', copy: 'High temperatures shorten battery life and stress power systems. We deploy and maintain UPS, battery and DC power sized for real load and regional conditions.', links: [tso('rollout', 'TSO › Rollout › Power Systems'), tso('managed-services', 'TSO › Managed Services › Power & Energy')] },
        { title: 'No tested recovery plan.', copy: 'Backups that have never been restored are a risk, not a plan. We implement backup, disaster recovery and business continuity solutions backed by our own ISO 22301 certification.', links: [ict('infrastructure', 'ICT › Data Centers & Cybersecurity › Backup & Recovery')] },
        { title: 'Rising cyber threats.', copy: 'We build layered protection with security architecture, identity management and security monitoring platforms.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Security Operations')] },
      ],
    }],
    supportTitle: 'How SIS Supports Data Centers & Technology Companies',
    support: [
      {
        title: '1. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Data center infrastructure', copy: 'racks, cabling, power distribution and supporting infrastructure.', links: [ict('infrastructure', 'ICT › Data Centers & Cybersecurity › Data Center Infrastructure')] },
          { title: 'Structured cabling & fiber', copy: 'design, installation, testing and documentation.', links: [ict('networking', 'ICT › Connectivity › Structured Cabling')] },
          { title: 'Servers, storage and networking supply', copy: 'HPE, Dell Technologies, Lenovo, Cisco and more, configured and delivered.', links: [ict('infrastructure', 'ICT › Hardware, Devices & Infrastructure › Servers & Storage')] },
          { title: 'Cloud and licensing', copy: 'cloud subscriptions, virtualization, backup and security software.', links: [ict('infrastructure', 'ICT › Software, Cloud & Licensing')] },
          { title: 'Identity & access management', copy: 'privileged access control for critical systems.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Identity & Access')] },
        ],
      },
      {
        title: '2. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'Critical facility maintenance', copy: 'preventive and corrective maintenance for IT and critical facilities.', links: [tso('managed-services', 'TSO › Managed Services › Preventive & Corrective')] },
          { title: 'Managed technical resources', copy: 'NOC, power and field technicians.', links: [tso('managed-services', 'TSO › Managed Services › Managed Technical Resources')] },
        ],
      },
      {
        title: '3. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Specialist IT recruitment', copy: 'infrastructure, cloud and cybersecurity roles.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'HR outsourcing for growing teams', copy: 'payroll, contracts and compliance.', links: [hcm('hcm-services', 'HCM › HCM Services')] },
        ],
      },
    ],
    faqs: [
      { q: 'Do you supply and install data center hardware?', a: 'Yes. We source servers, storage and networking from leading brands and handle configuration, integration and delivery.' },
      { q: 'Can you help us build a disaster recovery plan?', a: 'Yes. We design and implement backup, replication and recovery solutions aligned with your continuity requirements.' },
      { q: 'Can we buy equipment without a full integration project?', a: 'Yes. Hardware and software supply can be scoped on their own, with configuration, deployment or support added only if you need them.' },
    ],
    related: ['telecommunications', 'financial-services'],
    cta: 'Talk to Our ICT Team',
  },

  healthcare: {
    slug: 'healthcare',
    challengesTitle: 'The Challenges Healthcare Providers Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'No mobile signal where staff need it most.', copy: 'Concrete, shielding and basements block cellular signals in wards, theaters and car parks. Nextivity CEL-FI QUATRA solutions bring reliable 4G and 5G voice and data indoors, for one or several mobile operators.', links: [ict('networking', 'ICT › Connectivity › Indoor Cellular › CEL-FI'), tso('rollout', 'TSO › Rollout › In-Building Coverage')] },
        { title: 'Wi-Fi that can’t handle clinical devices.', copy: 'Tablets, monitors and IoT equipment need dense, dependable wireless. We survey, design and validate enterprise Wi-Fi around how each space is used, with segmentation that keeps staff, guests and medical-device traffic separate.', links: [ict('networking', 'ICT › Connectivity › Enterprise Wi-Fi')] },
        { title: 'Patient data at risk.', copy: 'Health records are a prime cyber target. We protect them with security architecture, identity management and tested backup and recovery.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Cybersecurity Architecture'), ict('infrastructure', 'ICT › Data Centers & Cybersecurity › Backup & Recovery')] },
        { title: 'Hard-to-fill clinical and specialist roles.', copy: 'We provide healthcare professionals locally and internationally, and manage visas, work permits and onboarding.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
      ],
    }],
    supportTitle: 'How SIS Supports Healthcare Providers',
    support: [
      {
        title: '1. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Access control and CCTV', copy: 'for pharmacies, labs, ICUs and records rooms.', links: [ict('cybersecurity', 'ICT › Physical Security › Access Control')] },
          { title: 'Patient identification and labeling', copy: 'wristband, label and barcode printers and mobile scanners.', links: [ict('infrastructure', 'ICT › Printing, Imaging & Data Capture › Barcode & Data Capture')] },
          { title: 'Smart building systems', copy: 'BMS integration for energy and environmental control.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Smart Buildings & BMS')] },
          { title: 'Digital signage and collaboration', copy: 'wayfinding, patient information displays and video-conferencing rooms.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Digital Signage'), ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Meeting & Collaboration')] },
          { title: 'Devices and IT supply', copy: 'computers, workstations and peripherals.', links: [ict('infrastructure', 'ICT › Hardware, Devices & Infrastructure › End-User Computing')] },
        ],
      },
      {
        title: '2. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Healthcare recruitment', copy: 'doctors, nurses, allied health and support staff.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'HR operations and benefits', copy: 'payroll, medical insurance, GOSI and employee administration.', links: [hcm('hcm-services', 'HCM › HCM Services › Payroll')] },
          { title: 'Employee self-service', copy: 'HR requests through the My Idarat app.', links: [hcm('my-idarat', 'HCM › MY Idarat')] },
        ],
      },
      {
        title: '3. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'Indoor coverage design and deployment', copy: 'surveys, IBS/DAS design, installation and testing.', links: [tso('design-optimization', 'TSO › Design & Optimization › In-Building Coverage Design')] },
          { title: 'Backup power', copy: 'UPS systems for critical equipment.', links: [tso('rollout', 'TSO › Rollout › Power Systems')] },
        ],
      },
    ],
    faqs: [
      { q: 'Can you improve mobile coverage inside our hospital?', a: 'Yes. We assess signal conditions and deploy Nextivity CEL-FI solutions for single or multiple operators, then test coverage across every floor.' },
      { q: 'Do you recruit healthcare professionals?', a: 'Yes. We support clinical and non-clinical hiring, locally and internationally.' },
      { q: 'Can you work alongside our existing healthcare applications?', a: 'Our infrastructure and integration services can support existing applications where their interfaces allow. Share your application landscape and security requirements so we can assess the scope.' },
    ],
    related: ['education', 'government'],
    cta: 'Talk to Our Healthcare Team',
  },

  education: {
    slug: 'education',
    challengesTitle: 'The Challenges Education Providers Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Wi-Fi that slows down when everyone logs on.', copy: 'Hundreds of students connecting at once overload poorly designed networks. We survey each building, design for real device density and validate performance after deployment.', links: [ict('networking', 'ICT › Connectivity › Enterprise Wi-Fi and Networking')] },
        { title: 'Weak mobile signal across campus buildings.', copy: 'Thick walls and underground spaces block cellular signal for students, staff and safety teams. Nextivity CEL-FI solutions bring reliable 4G and 5G coverage indoors.', links: [ict('networking', 'ICT › Connectivity › Indoor Cellular › CEL-FI')] },
        { title: 'Classrooms that aren’t ready for hybrid learning.', copy: 'We equip lecture halls and classrooms with interactive displays, audio and videoconferencing so remote and in-room students learn together.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Meeting & Collaboration'), ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Digital Signage & Interactive Displays')] },
        { title: 'Keeping students and staff safe.', copy: 'Controlled entrances, CCTV and integrated security management give campus teams full awareness.', links: [ict('cybersecurity', 'ICT › Physical Security')] },
      ],
    }],
    supportTitle: 'How SIS Supports Schools and Universities',
    support: [
      {
        title: '1. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Student and staff devices', copy: 'laptops, tablets and workstations for multiple campuses.', links: [ict('infrastructure', 'ICT › Hardware, Devices & Infrastructure › End-User Computing')] },
          { title: 'Software and licensing', copy: 'productivity, collaboration and cloud platforms.', links: [ict('infrastructure', 'ICT › Software, Cloud & Licensing › Productivity')] },
          { title: 'Smart campus systems', copy: 'IoT, energy management and BMS.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Smart Buildings & BMS')] },
          { title: 'Campus communication', copy: 'digital signage and professional audio.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Professional Audio')] },
          { title: 'Printing and scanning', copy: 'managed printing and document scanning.', links: [ict('infrastructure', 'ICT › Printing, Imaging & Data Capture › Business Printing')] },
          { title: 'Data protection', copy: 'identity, access control and backup.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Identity & Access')] },
        ],
      },
      {
        title: '2. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Faculty and staff recruitment', copy: 'academic, administrative and technical roles.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'HR outsourcing', copy: 'contracts, payroll, visas and iqamas.', links: [hcm('hcm-services', 'HCM › HCM Services')] },
        ],
      },
      {
        title: '3. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'In-building coverage deployment', copy: 'coverage surveys, installation and testing.', links: [tso('rollout', 'TSO › Rollout › In-Building Coverage')] },
        ],
      },
    ],
    faqs: [
      { q: 'Can you equip classrooms for hybrid learning?', a: 'Yes. We design and integrate interactive displays, cameras, microphones and videoconferencing for teaching spaces of any size.' },
      { q: 'Can you supply devices for a whole school or university?', a: 'Yes. We source, configure and deliver devices in bulk across multiple sites.' },
      { q: 'Can we start with one building before rolling out across campus?', a: 'Yes. Many institutions start with a priority building or lecture hall, then extend the same design across the campus.' },
    ],
    related: ['government', 'healthcare'],
    cta: 'Talk to Our Team',
  },

  'financial-services': {
    slug: 'financial-services',
    challengesTitle: 'The Challenges Financial Institutions Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Cyber threats and regulatory pressure.', copy: 'We design layered security architecture, endpoint and network protection, and security monitoring to reduce risk and support your compliance requirements.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Cybersecurity')] },
        { title: 'Too many users with too much access.', copy: 'Identity and access management controls who reaches which system, with strong authentication and privileged-access control.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Identity & Access')] },
        { title: 'Downtime that customers notice immediately.', copy: 'We design backup and disaster recovery around which systems must recover first, how fast and how much data loss is acceptable, then test that it works. We are also ISO 22301 certified for business continuity.', links: [ict('infrastructure', 'ICT › Data Centers & Cybersecurity › Backup & Recovery')] },
        { title: 'Manual back-office processes.', copy: 'Business process automation and AI-driven workflows cut processing time and errors in approvals, onboarding and reporting.', links: [ict('cybersecurity', 'ICT › Intelligent Operations & Automation › Process Automation')] },
      ],
    }],
    supportTitle: 'How SIS Supports Financial Institutions',
    support: [
      {
        title: '1. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Branch and head-office security', copy: 'CCTV with AI analytics, access control and intrusion detection.', links: [ict('cybersecurity', 'ICT › Physical Security')] },
          { title: 'Branch connectivity', copy: 'secure SD-WAN and multi-site networking.', links: [ict('networking', 'ICT › Connectivity › Enterprise Networking')] },
          { title: 'Customer experience in branches', copy: 'digital signage and interactive displays.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Digital Signage')] },
          { title: 'Document workflows', copy: 'scanning, imaging and secure printing.', links: [ict('infrastructure', 'ICT › Printing, Imaging & Data Capture › Document Scanning')] },
          { title: 'Security and data protection software', copy: 'licensed through verified vendors.', links: [ict('infrastructure', 'ICT › Software, Cloud & Licensing › Security & Data Protection')] },
        ],
      },
      {
        title: '2. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Specialist and executive recruitment', copy: 'risk, compliance, technology and leadership roles.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Payroll and HR outsourcing', copy: 'payroll, WPS, GOSI and benefits.', links: [hcm('hcm-services', 'HCM › HCM Services › Payroll')] },
          { title: 'Saudization monitoring', copy: 'Nitaqat tracking and compliance.', links: [hcm('hcm-services', 'HCM › HCM Services › Government Relations')] },
        ],
      },
      {
        title: '3. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'Indoor mobile coverage', copy: 'branches, offices and basement car parks.', links: [tso('rollout', 'TSO › Rollout › In-Building Coverage')] },
        ],
      },
    ],
    faqs: [
      { q: 'Can you outsource our payroll confidentially?', a: 'Yes. We handle payroll, WPS and GOSI under structured, controlled processes, backed by our ISO 27001 certification.' },
      { q: 'Do you secure multi-branch networks?', a: 'Yes. We design and integrate secure SD-WAN, firewalls and centralized network management across branches.' },
      { q: 'Can we use one service without a full package?', a: 'Yes. Each service, from identity management to payroll outsourcing, can be engaged on its own or combined with others.' },
    ],
    related: ['data-centers', 'retail-consumer'],
    cta: 'Talk to Our Team',
  },

  'transportation-logistics': {
    slug: 'transportation-logistics',
    challengesTitle: 'The Challenges Transport & Logistics Teams Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Losing track of goods in the warehouse.', copy: 'Barcode, label printing and rugged mobile computers capture every movement from receiving to dispatch so inventory stays accurate.', links: [ict('infrastructure', 'ICT › Printing, Imaging & Data Capture › Barcode & Data Capture')] },
        { title: 'Dead zones across large facilities.', copy: 'Scanners and handhelds need dependable wireless across warehouses, yards and terminals. We design enterprise Wi-Fi and indoor cellular coverage for large, complex spaces.', links: [ict('networking', 'ICT › Connectivity › Enterprise Wi-Fi'), ict('networking', 'ICT › Connectivity › Indoor Cellular')] },
        { title: 'Limited visibility across busy sites.', copy: 'AI video analytics turns existing cameras into a live source of insight into crowding, traffic flow and safety incidents.', links: [ict('cybersecurity', 'ICT › Intelligent Operations & Automation › AI Vision')] },
        { title: 'Vehicle entry points that need control.', copy: 'Barriers, automatic number plate recognition and under-vehicle surveillance secure gates at ports, depots and terminals.', links: [ict('cybersecurity', 'ICT › Physical Security › Vehicle & Barrier')] },
      ],
    }],
    supportTitle: 'How SIS Supports Transportation & Logistics Operators',
    support: [
      {
        title: '1. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Operations and control centers', copy: 'command platforms and video walls.', links: [ict('cybersecurity', 'ICT › Intelligent Operations & Automation › Command & Control'), ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Video Walls')] },
          { title: 'Passenger information', copy: 'digital signage and public address audio.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Digital Signage'), ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Professional Audio')] },
          { title: 'Systems integration and automation', copy: 'connected warehouse, transport and business systems.', links: [ict('infrastructure', 'ICT › Intelligent Operations & Automation › Systems Integration')] },
          { title: 'Smart mobility infrastructure', copy: 'connected infrastructure and IoT.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Smart City Infrastructure')] },
        ],
      },
      {
        title: '2. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'Fleet, warehousing and delivery', copy: 'fleet management, storage, inventory, delivery and reverse logistics.', links: [tso('logistics-support', 'TSO › Logistics & Support'), tso('logistics-support', 'TSO › Logistics & Support › Fleet')] },
          { title: 'In-building coverage', copy: 'terminals, stations and underground levels.', links: [tso('rollout', 'TSO › Rollout › In-Building Coverage')] },
        ],
      },
      {
        title: '3. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Volume recruitment', copy: 'warehouse, operations and supervisory staff.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Shift workforce management', copy: 'attendance, timesheets, leave and payroll.', links: [hcm('hcm-services', 'HCM › HCM Services › Workforce Management')] },
        ],
      },
    ],
    faqs: [
      { q: 'Can you equip our warehouse for barcode-based inventory?', a: 'Yes. We supply and configure barcode printers, scanners and mobile computers and provide the Wi-Fi they need.' },
      { q: 'Do you provide under-vehicle surveillance?', a: 'Yes, as part of our integrated vehicle and barrier security solutions.' },
      { q: 'Do you provide support after deployment?', a: 'Yes. We support and optimize installed networks and systems after handover as your operations grow and change.' },
    ],
    related: ['retail-consumer', 'government'],
    cta: 'Talk to Our Team',
  },

  'construction-real-estate': {
    slug: 'construction-real-estate',
    challengesTitle: 'The Challenges Developers and Property Owners Face and How We Help',
    challengeGroups: [
      {
        heading: 'During construction',
        items: [
          { title: 'Project labor that’s hard to secure.', copy: 'Technical and project-based staffing scales with each construction phase, with visas and work permits handled for international teams.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Low-current packages split across many subcontractors.', copy: 'We deliver structured cabling, networks, security, AV and BMS as one coordinated package, tested and documented for handover.', links: [ict('networking', 'ICT › Connectivity › Structured Cabling')] },
          { title: 'Mobile signal problems found after handover.', copy: 'Reinforced concrete, coated glass, basements and car parks block cellular signal. Planning indoor coverage before fit-out, with Nextivity CEL-FI and active DAS, avoids costly rework.', links: [ict('networking', 'ICT › Connectivity › Indoor Cellular › CEL-FI'), tso('design-optimization', 'TSO › Design & Optimization › In-Building Coverage Design')] },
        ],
      },
      {
        heading: 'Once the building is operating',
        items: [
          { title: 'Building systems that don’t talk to each other.', copy: 'HVAC, lighting, access and energy systems from different vendors create silos. We integrate them through BMS and IoT platforms, so facilities teams manage everything from one place.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Smart Buildings & BMS')] },
          { title: 'High running costs.', copy: 'Energy and utility management platforms track consumption and highlight waste, cutting operating costs for owners and tenants.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Energy & Utilities')] },
          { title: 'Security across the property.', copy: 'CCTV, access control, intrusion detection and vehicle barriers managed from one platform.', links: [ict('cybersecurity', 'ICT › Physical Security › Integrated Security Management')] },
          { title: 'Occupants who expect seamless connectivity.', copy: 'Enterprise networking, Wi-Fi and indoor mobile coverage for offices, residences and common areas.', links: [ict('networking', 'ICT › Connectivity › Enterprise Wi-Fi')] },
        ],
      },
    ],
    supportTitle: 'How SIS Supports Construction & Real Estate',
    support: [
      {
        title: '1. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Structured cabling & fiber', copy: 'design, installation, testing and documentation.', links: [ict('networking', 'ICT › Connectivity › Structured Cabling')] },
          { title: 'Building networks and Wi-Fi', copy: 'offices, residences and common areas.', links: [ict('networking', 'ICT › Connectivity › Enterprise Networking')] },
          { title: 'Security systems', copy: 'integrated CCTV, access control, intrusion detection and vehicle barriers.', links: [ict('cybersecurity', 'ICT › Physical Security › Integrated Security Management')] },
          { title: 'Digital twins', copy: 'a digital model of the asset for operations and planning.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Digital Twins')] },
          { title: 'AV and signage', copy: 'meeting rooms, lobby displays, wayfinding and audio.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience')] },
          { title: 'Large-format printing', copy: 'plotters and printers for drawings and technical documents.', links: [ict('infrastructure', 'ICT › Printing, Imaging & Data Capture › Large-Format Printing')] },
        ],
      },
      {
        title: '2. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'In-building coverage deployment', copy: 'surveys, installation and coverage verification.', links: [tso('rollout', 'TSO › Rollout › In-Building Coverage')] },
          { title: 'Power systems', copy: 'UPS and backup power for technology rooms.', links: [tso('rollout', 'TSO › Rollout › Power Systems')] },
        ],
      },
      {
        title: '3. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Project and volume recruitment', copy: 'engineers, supervisors and skilled trades.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Mobility and compliance', copy: 'visas, work permits and iqamas.', links: [hcm('hcm-services', 'HCM › HCM Services › Government Relations')] },
        ],
      },
    ],
    faqs: [
      { q: 'Can you deliver all low-current systems for a new building?', a: 'We design and integrate networks, cabling, security, AV and BMS as one coordinated solution.' },
      { q: 'When should indoor coverage be planned?', a: 'As early as possible. Designing coverage before fit-out avoids costly rework after handover.' },
      { q: 'Do you support the building after handover?', a: 'Yes. We support and optimize installed systems, including networks, security and BMS, as occupancy and operational needs change.' },
    ],
    related: ['hospitality-tourism', 'government'],
    cta: 'Talk to Our Team',
  },

  'hospitality-tourism': {
    slug: 'hospitality-tourism',
    challengesTitle: 'The Challenges Hospitality Operators Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Guests complaining about Wi-Fi and mobile signals.', copy: 'Weak coverage in rooms, ballrooms and basements leads straight to poor reviews. We design guest Wi-Fi around real usage and deploy Nextivity CEL-FI QUATRA solutions for strong indoor 4G and 5G across multiple mobile operators.', links: [ict('networking', 'ICT › Connectivity › Enterprise Wi-Fi'), ict('networking', 'ICT › Connectivity › Indoor Cellular › CEL-FI')] },
        { title: 'Events that need flawless AV.', copy: 'Conferences, weddings and launches depend on displays, sound and video-conferencing that just work.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › AV System Integration'), ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Professional Audio')] },
        { title: 'Keeping guests and assets safe without being intrusive.', copy: 'CCTV with AI analytics, access control and integrated security management protect guests, staff and property discreetly.', links: [ict('cybersecurity', 'ICT › Physical Security')] },
        { title: 'Staffing for peak seasons and new openings.', copy: 'Volume recruitment and contract staffing help you open on time and scale for high season.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
      ],
    }],
    supportTitle: 'How SIS Supports Hotels, Resorts and Venues',
    support: [
      {
        title: '1. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Digital signage and wayfinding', copy: 'lobby screens, event boards and interactive displays.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Digital Signage')] },
          { title: 'Smart building systems', copy: 'BMS and energy management.', links: [ict('cybersecurity', 'ICT › Smart Cities & Buildings › Smart Buildings & BMS')] },
          { title: 'Property networks', copy: 'networking and structured cabling for rooms, back-of-house and outlets.', links: [ict('networking', 'ICT › Connectivity › Enterprise Networking')] },
          { title: 'Devices and printing', copy: 'front-desk computers, printers and peripherals.', links: [ict('infrastructure', 'ICT › Hardware, Devices & Infrastructure')] },
        ],
      },
      {
        title: '2. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Hospitality recruitment', copy: 'front-of-house, operations and management roles.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'HR outsourcing', copy: 'payroll, visas, iqamas and employee administration.', links: [hcm('hcm-services', 'HCM › HCM Services')] },
          { title: 'Employee self-service', copy: 'HR requests through the My Idarat app.', links: [hcm('my-idarat', 'HCM › MY Idarat')] },
        ],
      },
      {
        title: '3. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'In-building coverage deployment', copy: 'guest floors, ballrooms and car parks.', links: [tso('rollout', 'TSO › Rollout › In-Building Coverage')] },
        ],
      },
    ],
    faqs: [
      { q: 'Can you improve mobile signal for guests on different networks?', a: 'Yes. Multi-operator CEL-FI solutions support guests on different mobile networks.' },
      { q: 'Can you staff a new hotel opening?', a: 'Yes. We support volume and specialist hiring, plus visas and onboarding for international staff.' },
      { q: 'Can existing properties be upgraded in stages?', a: 'Yes. Start with selected areas, a meeting space or one building system, planned around occupancy and daily operations.' },
    ],
    related: ['retail-consumer', 'construction-real-estate'],
    cta: 'Talk to Our Hospitality Team',
  },

  'professional-services': {
    slug: 'professional-services',
    challengesTitle: 'The Challenges Professional Firms Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Specialist roles that stay open too long.', copy: 'Senior and niche profiles are hard to find through job ads. Our search and selection team uses targeted sourcing and structured evaluation to reach the right candidates.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
        { title: 'HR admin eating into billable time.', copy: 'Contracts, payroll, GOSI, attendance and leave can be handled for you, individually or as a full HR outsourcing service.', links: [hcm('hcm-services', 'HCM › HCM Services')] },
        { title: 'Setting up in Saudi Arabia.', copy: 'Qiwa, Mudad, Muqeem, visas, iqamas and Nitaqat can slow a new office down. Our government relations team manages them so your people can start work.', links: [hcm('hcm-services', 'HCM › HCM Services › Government Relations')] },
        { title: 'Manual work between teams.', copy: 'Workflow automation digitizes requests, approvals and document handling, and connects them to the systems you already use.', links: [ict('cybersecurity', 'ICT › Intelligent Operations & Automation › Process Automation')] },
      ],
    }],
    supportTitle: 'How SIS Supports Professional & Business Services Firms',
    support: [
      {
        title: '1. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Recruitment process outsourcing', copy: 'part or all of your hiring process, from sourcing to onboarding.', links: [hcm('search-selection', 'HCM › Search & Selection › RPO')] },
          { title: 'Project-based staffing', copy: 'specialists for defined client assignments.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Payroll and benefits', copy: 'payroll, WPS, GOSI, medical insurance and compensation.', links: [hcm('hcm-services', 'HCM › HCM Services › Payroll')] },
          { title: 'My Idarat', copy: 'recruitment, employee information and HR requests in one app.', links: [hcm('my-idarat', 'HCM › MY Idarat')] },
        ],
      },
      {
        title: '2. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Workplace devices', copy: 'laptops, workstations, displays and peripherals.', links: [ict('infrastructure', 'ICT › Hardware, Devices & Infrastructure › End-User Computing')] },
          { title: 'Microsoft 365 and cloud licensing', copy: 'productivity, collaboration and cloud subscriptions.', links: [ict('infrastructure', 'ICT › Software, Cloud & Licensing')] },
          { title: 'Office network and meeting rooms', copy: 'networking, Wi-Fi and video conferencing.', links: [ict('networking', 'ICT › Connectivity › Enterprise Networking'), ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Meeting & Collaboration')] },
          { title: 'Data protection', copy: 'identity controls, endpoint protection and backup.', links: [ict('cybersecurity', 'ICT › Data Centers & Cybersecurity › Identity & Access')] },
        ],
      },
    ],
    faqs: [
      { q: 'Can SIS support a new office in Saudi Arabia?', a: 'Yes. We can cover local recruitment, employee administration and government processes alongside devices, connectivity and software. Share your staffing plan, location and opening date to define the scope.' },
      { q: 'Can we outsource just payroll?', a: 'Yes. Each HCM service can be used on its own or combined with others.' },
      { q: 'Can you recruit for roles outside Saudi Arabia?', a: 'Yes. Our search and selection covers local, regional and international recruitment, depending on where the role is based.' },
    ],
    related: ['financial-services', 'data-centers'],
    cta: 'Talk to Our Team',
  },

  'retail-consumer': {
    slug: 'retail-consumer',
    challengesTitle: 'The Challenges Retailers Face and How We Help',
    challengeGroups: [{
      items: [
        { title: 'Weak mobile signal inside stores and malls.', copy: 'Poor signal disrupts digital payments, loyalty apps and staff communication. Nextivity CEL-FI GO G43 boosts multi-operator 4G and 5G signal for shops, while QUATRA systems cover large malls.', links: [ict('networking', 'ICT › Connectivity › Indoor Cellular › CEL-FI')] },
        { title: 'Stock and pricing errors.', copy: 'Barcode and label printers, scanners and mobile computers keep shelf labels, receiving and stock counts accurate.', links: [ict('infrastructure', 'ICT › Printing, Imaging & Data Capture › Barcode & Data Capture')] },
        { title: 'Shrinkage and safety incidents.', copy: 'CCTV with AI video analytics helps detect suspicious activity, monitor footfall and protect staff across every branch.', links: [ict('cybersecurity', 'ICT › Physical Security › CCTV & AI Video Analytics')] },
        { title: 'Staffing peaks you can’t predict.', copy: 'Volume recruitment and contract staffing let you scale store teams for peak seasons and new openings without long-term overhead.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
      ],
    }],
    supportTitle: 'How SIS Supports Retailers and Consumer Brands',
    support: [
      {
        title: '1. Information & Communication Technology (Identiti ICT)',
        items: [
          { title: 'Digital signage', copy: 'eye-catching screens and interactive displays for promotions, menus and wayfinding, managed centrally.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Digital Signage')] },
          { title: 'Store and guest Wi-Fi', copy: 'secure wireless for operations and customers.', links: [ict('networking', 'ICT › Connectivity › Enterprise Wi-Fi')] },
          { title: 'Multi-branch networking', copy: 'SD-WAN and branch connectivity linking every store to head office.', links: [ict('networking', 'ICT › Connectivity › Enterprise Networking')] },
          { title: 'Store audio', copy: 'background music and announcement systems.', links: [ict('cybersecurity', 'ICT › Audiovisual & Digital Experience › Professional Audio')] },
          { title: 'Devices and supply', copy: 'computers, displays and peripherals delivered and configured across all branches.', links: [ict('infrastructure', 'ICT › Hardware, Devices & Infrastructure')] },
        ],
      },
      {
        title: '2. Human Capital Management (Idarat HCM)',
        items: [
          { title: 'Retail recruitment', copy: 'store staff, supervisors and managers, including Saudi nationals for localization targets.', links: [hcm('search-selection', 'HCM › Search & Selection')] },
          { title: 'Workforce management', copy: 'attendance, timesheets, leave and payroll for shift-based teams.', links: [hcm('hcm-services', 'HCM › HCM Services › Workforce Management')] },
          { title: 'Employee self-service', copy: 'store staff manage HR requests from their phones with My Idarat.', links: [hcm('my-idarat', 'HCM › MY Idarat')] },
        ],
      },
      {
        title: '3. Technical Services Operations (Idarat TSO)',
        items: [
          { title: 'Multi-site technology rollout', copy: 'delivery, installation and testing of in-store coverage across store networks.', links: [tso('rollout', 'TSO › Rollout › In-Building Coverage')] },
        ],
      },
    ],
    faqs: [
      { q: 'Can you fix poor mobile signals in our stores?', a: 'Yes. We assess each location and deploy the right CEL-FI solution, from a single-store booster to multi-operator systems for malls.' },
      { q: 'Can you provide staff for peak seasons?', a: 'Yes. We offer volume recruitment and contract staffing for seasonal peaks and new store openings.' },
      { q: 'Can you roll out technology across all our stores at once?', a: 'Yes. We supply, configure and deliver devices, signage and connectivity across multiple branches, coordinated around your opening dates.' },
    ],
    related: ['hospitality-tourism', 'transportation-logistics'],
    cta: 'Talk to Our Retail Team',
  },
}

export function getIndustryPage(slug: string): IndustryPageContent | undefined {
  const page = industryPages[slug]
  const intro = intros[slug]
  if (!page || !intro) return undefined
  return { ...page, intro }
}
