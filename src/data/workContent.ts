export type ServiceKey = 'hcm' | 'tso' | 'ict'

export type WorkMetric = { value: string; label: string }
export type WorkReason = { title: string; copy: string }
export type WorkItem = { title: string; copy: string; scope?: string }
export type WorkAudience = { title: string; copy: string }
export type WorkPillar = {
  id: string
  label: string
  title: string
  intro: string
  approach?: WorkItem[]
  items: WorkItem[]
  notes?: string[]
}

export type WorkService = {
  key: ServiceKey
  label: string
  eyebrow: string
  title: string
  intro: string[]
  metrics: WorkMetric[]
  reasons: WorkReason[]
  pillars: WorkPillar[]
  extra?: { title: string; copy: string[]; cta?: string }
  audiences: WorkAudience[]
  industries: string[]
  cta: { title: string; copy: string; label: string }
}

export const workOverview = {
  title: 'Three specialized capabilities.',
  copy: 'SIS Global is a Saudi-founded business solutions group helping organizations manage their people, their technology and their critical operations through specialized, integrated services.',
  facts: [
    { value: '3', label: 'Specialized capabilities' },
    { value: '19+', label: 'Years of delivery' },
    { value: '8+', label: 'Countries of operation' },
  ],
  units: [
    {
      key: 'hcm' as const,
      label: 'Idarat HCM',
      eyebrow: 'Human Capital Management',
      copy: 'Helping organizations build, manage and support their workforce through recruitment, HR operations, payroll, government relations, compliance and employee lifecycle management.',
      children: ['Search & Selection', 'HCM Services', 'My Idarat'],
    },
    {
      key: 'tso' as const,
      label: 'Idarat TSO',
      eyebrow: 'Technical Services Operations',
      copy: 'Supporting critical infrastructure through technical rollout, managed services, network design and optimization, and logistics and operational support.',
      children: ['Technical Rollout & Integration', 'Operations & Maintenance', 'Engineering, Quality & Support'],
    },
    {
      key: 'ict' as const,
      label: 'Identiti ICT',
      eyebrow: 'Information & Communication Technology',
      copy: 'Enterprise technology, infrastructure and digital capability, delivered through established partnerships with the world’s leading vendors.',
      children: ['ICT Infrastructure & Data Centers', 'Networking & Connectivity', 'Cybersecurity & Digital Solutions'],
    },
  ],
  industries: [
    'Telecommunications & Technology',
    'Government & Public Sector',
    'Engineering & Infrastructure',
    'Healthcare',
    'Financial & Professional Services',
    'Retail & Consumer',
  ],
}

export const workServices: Record<ServiceKey, WorkService> = {
  hcm: {
    key: 'hcm',
    label: 'Idarat HCM',
    eyebrow: 'Human Capital Management',
    title: 'Your human capital partner.',
    intro: [
      'Idarat HCM, the Human Capital Management arm of SIS Global, provides flexible, end-to-end HCM services designed to help organizations attract, manage, support and retain their workforce.',
      'Since 2007, we have supported organizations with Human Capital Management solutions tailored to their workforce and operational requirements. From talent acquisition and employee administration to ongoing workforce management and offboarding, our flexible service model allows organizations to select the support they need and build an HCM solution aligned with their size, structure and business objectives.',
      'Combining regional expertise, scalable delivery and a deep understanding of workforce operations, Idarat HCM helps organizations simplify HR processes and focus on their core business.',
    ],
    metrics: [
      { value: '3,000+', label: 'Resources managed' },
      { value: '1,200+', label: 'Active resources' },
      { value: '70+', label: 'Clients served' },
      { value: '280K+', label: 'Payslips issued' },
      { value: '230K+', label: 'Helpdesk tickets resolved' },
      { value: '100K+', label: 'HR operations processed' },
    ],
    reasons: [
      { title: 'End-to-end HCM expertise', copy: 'Support across the employee lifecycle, from finding the right talent to managing ongoing workforce requirements.' },
      { title: 'Flexible & scalable service models', copy: 'Choose individual HCM services or combine multiple capabilities into a solution that can evolve with your workforce.' },
      { title: 'Regional understanding', copy: 'Local and regional workforce expertise, supported by SIS Global’s international presence.' },
      { title: 'One trusted partner', copy: 'Bring multiple workforce requirements together under a single HCM partner, simplifying coordination and delivery.' },
    ],
    pillars: [
      {
        id: 'search-selection',
        label: 'Search & Selection',
        title: 'Find the right talent. Build stronger teams.',
        intro: 'Idarat HCM provides tailored recruitment and talent acquisition services designed to connect organizations with qualified professionals who meet their technical, operational and workforce requirements. With extensive experience across Saudi Arabia and the Middle East, our recruitment specialists combine market knowledge, targeted talent sourcing and structured candidate evaluation.',
        items: [
          { title: 'Executive & specialized recruitment', copy: 'Identify experienced professionals for critical, senior and specialized positions through focused search and selection, including executive and C-suite appointments and hard-to-fill roles.' },
          { title: 'Technical & professional recruitment', copy: 'Access qualified technical and professional talent across specialized functions and industries, with targeted sourcing and structured candidate evaluation.' },
          { title: 'Volume & mass recruitment', copy: 'Scale recruitment for projects, expansions and large workforce requirements while maintaining consistent screening and selection standards.' },
          { title: 'Local, Saudi national & international recruitment', copy: 'Source talent through local, regional and international search, including targeted Saudi national recruitment aligned with localization and Saudization requirements.' },
          { title: 'Project-based & contract staffing', copy: 'Build flexible teams around project requirements, defined timelines or changing workforce demands without relying solely on permanent hiring.' },
          { title: 'Recruitment Process Outsourcing (RPO)', copy: 'Outsource part or all of the recruitment process — from sourcing and screening to candidate coordination, selection support and onboarding.' },
        ],
        approach: [
          { title: 'Tailored talent sourcing', copy: 'Every search starts with your requirements. We develop sourcing strategies based on the role, skills, industry, location and hiring objectives.' },
          { title: 'Screening & evaluation', copy: 'Candidates are screened through structured interviews, assessments and reference checks.' },
          { title: 'Specialized recruitment expertise', copy: 'Recruiters combine talent acquisition expertise with an understanding of different industries and job functions.' },
          { title: 'Local & international reach', copy: 'Saudi and Middle Eastern talent markets, supported by SIS Global’s international presence.' },
          { title: 'Onboarding support', copy: 'Support can extend beyond selection to help move a successful hire into onboarding.' },
        ],
      },
      {
        id: 'hcm-services',
        label: 'HCM Services',
        title: 'Simplify HR. Focus on your business.',
        intro: 'Idarat HCM provides flexible Human Capital Management and HR outsourcing services designed to support organizations throughout the employee lifecycle. Organizations can select the services they need or combine multiple capabilities into a tailored HCM solution.',
        items: [
          { title: 'Employee administration', copy: 'Manage essential employee administration throughout the workforce lifecycle, helping organizations maintain accurate records and efficient day-to-day HR operations.', scope: 'Employment contracts · Employee records & files · HR documentation · Personnel administration · Employee support & HR helpdesk' },
          { title: 'Payroll, compensation & benefits', copy: 'Support accurate and timely payroll, compensation and employee benefits administration while helping organizations manage key statutory requirements.', scope: 'Payroll processing · WPS administration · GOSI administration · Compensation administration · Medical insurance · Employee benefits' },
          { title: 'Government relations, compliance & employee mobility', copy: 'Support workforce-related government processes, regulatory requirements and employee mobility across Saudi Arabia.', scope: 'Qiwa · Mudad · Muqeem · MHRSD · Saudization & Nitaqat · Visa processing · Iqama · Work permits · Renewals · Transfers' },
          { title: 'Workforce management', copy: 'Support day-to-day workforce management through structured HR processes and workforce insights.', scope: 'Attendance & timesheets · Leave administration · Performance management support · Employee relations · Workforce reporting · HR analytics' },
          { title: 'Offboarding & final settlement', copy: 'Manage employee exits through a structured process that supports accurate settlements and a consistent transition out of the organization.', scope: 'Exit administration · Final settlement · End-of-service calculations · Exit documentation · Exit formalities' },
        ],
        notes: [
          'Individual HCM services — choose support for specific HR functions where additional expertise or capacity is required.',
          'Integrated HCM support — combine multiple services into a coordinated solution covering key stages of the employee lifecycle.',
          'End-to-end HR outsourcing — extend your HR capability across ongoing workforce operations.',
        ],
      },
    ],
    extra: {
      title: 'My Idarat — manage your workforce from one platform',
      copy: [
        'My Idarat is SIS Global’s talent management platform and mobile app. It brings recruitment, employee self-service and day-to-day workforce management together in one place.',
        'Organizations can use My Idarat to source and recruit talent, manage employee information, support HR requests, and give employees easier access to essential services. By reducing manual work and bringing key processes together, the platform helps HR teams save time, control costs and manage their workforce more efficiently.',
      ],
      cta: 'Manage HR tasks wherever you are. Download the My Idarat app.',
    },
    audiences: [
      { title: 'Large enterprises', copy: 'Support complex and large-scale workforce requirements through structured HCM services, recruitment solutions and scalable HR operations.' },
      { title: 'Growing & mid-sized businesses', copy: 'Extend internal HR capabilities as the organization grows, with flexible support across recruitment, administration, payroll and workforce management.' },
      { title: 'Global & international organizations', copy: 'Navigate local workforce requirements with regional HCM expertise in Saudi Arabia and the wider region.' },
      { title: 'Project-based & specialized workforces', copy: 'Flexible HCM and recruitment support for projects, specialized teams and changing workforce requirements.' },
    ],
    industries: workOverview.industries,
    cta: { title: 'Talk to our HCM team', copy: 'Looking for an HCM solution built around your organization?', label: 'Talk to Our HCM Team' },
  },

  tso: {
    key: 'tso',
    label: 'Idarat TSO',
    eyebrow: 'Technical Services Operations',
    title: 'Your technical services partner.',
    intro: [
      'Idarat TSO, the Technical Services Operations arm of SIS Global, delivers specialized expertise and field capabilities to support critical infrastructure throughout its lifecycle.',
      'Since 2007, we have supported complex operating environments with the expertise and on-the-ground execution needed to keep projects moving and infrastructure performing. Backed by SIS Global’s regional presence, we mobilize the right teams and capabilities around each engagement — from focused specialist scopes to large-scale, long-running programs.',
    ],
    metrics: [
      { value: '19+', label: 'Years of excellence' },
      { value: '1,850+', label: 'Daily operations' },
      { value: '46+', label: 'Active teams' },
      { value: '22+', label: 'Projects' },
      { value: '8,500+', label: 'Field jobs delivered' },
      { value: '15+', label: 'Clients served' },
    ],
    reasons: [
      { title: 'End-to-end, under one roof', copy: 'From network planning and rollout to ongoing O&M and logistics support, capabilities span the technical service lifecycle through one accountable partner.' },
      { title: 'Multi-vendor by design', copy: 'Engineers work across Ericsson, Nokia, Huawei and ZTE, so operators can consolidate mixed-vendor estates under a single managed contract.' },
      { title: 'A track record that is measurable', copy: '8,500+ field jobs delivered, 1,850+ daily operations and 46+ active teams — proven delivery backed by years of field experience.' },
      { title: 'Delivery models that flex', copy: 'A specialist crew for a two-week drive test. An embedded team on a client program. Managed nationwide O&M. We design the model around the work.' },
    ],
    pillars: [
      {
        id: 'rollout',
        label: 'Technical Rollout & Integration',
        title: 'Bring sites from plan to live network.',
        intro: 'Idarat TSO delivers technical rollout and deployment services for telecom and network infrastructure, bringing sites from deployment plan to live network through experienced field teams and structured delivery processes. From focused site deployments to large multi-site programs, our teams coordinate installation, configuration, integration, testing and handover across live and evolving network environments.',
        approach: [
          { title: 'Plan & prepare', copy: 'Align technical requirements, site readiness, resources and deployment activities before field execution begins.' },
          { title: 'Install & configure', copy: 'Deploy equipment and infrastructure according to approved technical requirements and vendor specifications.' },
          { title: 'Integrate & test', copy: 'Connect deployed infrastructure into the network, complete required configuration and verify operational readiness.' },
          { title: 'Accept & handover', copy: 'Complete technical verification, documentation and acceptance requirements before final handover.' },
        ],
        items: [
          { title: 'RAN deployment', copy: '2G, 3G, 4G and 5G radio access network deployment across macro, micro and small-cell environments — including antenna systems, radio and baseband equipment, commissioning and RAN modernization.' },
          { title: 'Transmission deployment', copy: 'Microwave, fiber and IP backhaul installation and commissioning, including link alignment, fusion splicing, OTDR testing and transport-node integration.' },
          { title: 'Installation & commissioning', copy: 'Hardware installation, cabling, earthing, parameter loading and system commissioning across network elements, with as-built records prepared as part of the work.' },
          { title: 'Site integration & acceptance', copy: 'Site integration, technical verification, quality audits, snag closure and formal acceptance to operator and vendor standards.' },
          { title: 'In-building solutions / DAS', copy: 'Indoor coverage solutions for commercial buildings, campuses, venues and enterprise environments, including CEL-FI deployment, walk testing and verification.' },
          { title: 'Network swap & modernization', copy: 'Multi-vendor swaps, legacy equipment replacement, technology migration and site modernization while live traffic is still being carried.' },
          { title: 'Power systems deployment', copy: 'Rectifiers, batteries, UPS, hybrid energy, solar and DC distribution sized for load and regional operating conditions.' },
        ],
      },
      {
        id: 'managed-services',
        label: 'Operations & Maintenance',
        title: 'Keep infrastructure available and ready to perform.',
        intro: 'Idarat TSO provides technical operations and maintenance services designed to keep telecom and critical infrastructure available, reliable and ready to perform. From single-site maintenance contracts to fully managed multi-site operations, our teams handle the day-to-day work that determines whether a network delivers its designed availability.',
        approach: [
          { title: 'Monitor & identify', copy: 'Maintain visibility into network conditions and identify alarms, faults and operational issues requiring attention.' },
          { title: 'Assess & coordinate', copy: 'Evaluate incidents, establish priorities and coordinate the appropriate technical or field response.' },
          { title: 'Respond & restore', copy: 'Dispatch and execute corrective activities to resolve faults and restore normal operation.' },
          { title: 'Maintain & prevent', copy: 'Carry out planned preventive activities designed to maintain infrastructure condition and reduce avoidable failures.' },
          { title: 'Verify & report', copy: 'Confirm restoration or maintenance completion and maintain the required operational records.' },
        ],
        items: [
          { title: 'NOC operations', copy: 'Network monitoring, alarm management and correlation, fault triage, escalation, field coordination and operational reporting.' },
          { title: 'Field maintenance', copy: 'Multi-vendor on-site fault investigation, troubleshooting, corrective intervention and work-order closure under defined SLAs.' },
          { title: 'Preventive & corrective maintenance', copy: 'Scheduled inspections, equipment and power checks, plus diagnosis, repair and restoration when faults occur.' },
          { title: 'Civil & site maintenance', copy: 'Tower, shelter, fencing, earthing, light civil works and site-condition inspections that keep physical infrastructure safe and operational.' },
          { title: 'Power & energy management', copy: 'Rectifier, battery, generator, UPS, hybrid and solar system maintenance, plus power-related fault response.' },
          { title: 'Spare parts management', copy: 'Spare pool management, storage, issue and return, field parts coordination, RMA handling and inventory reporting.' },
          { title: 'Managed technical resources', copy: 'Dedicated technical teams embedded in client operations — sourcing, staffing, field preparation, training and performance oversight.' },
        ],
      },
      {
        id: 'design-optimization',
        label: 'Engineering',
        title: 'Plan what gets built. Improve what already exists.',
        intro: 'Idarat TSO provides network design, planning and optimization services that help operators and infrastructure owners build, expand and improve telecom networks around real coverage, capacity and performance requirements. Our teams support networks at both ends of the lifecycle.',
        approach: [
          { title: 'Assess & define', copy: 'Establish network requirements, existing conditions, performance objectives and engineering constraints.' },
          { title: 'Plan & design', copy: 'Develop radio, transmission and supporting network design around coverage, capacity and operational requirements.' },
          { title: 'Measure & analyze', copy: 'Collect and analyze field and network performance data to validate assumptions and identify gaps.' },
          { title: 'Optimize & verify', copy: 'Implement or recommend optimization actions, then evaluate performance against network objectives.' },
        ],
        items: [
          { title: 'RF planning & coverage design', copy: 'Coverage prediction, site and radio planning, frequency planning and design documentation across network generations.' },
          { title: 'Transmission planning & design', copy: 'Microwave path analysis, link budgets, fiber routing and transport network planning.' },
          { title: 'Capacity planning & dimensioning', copy: 'Traffic analysis, capacity forecasting and network dimensioning against demand growth.' },
          { title: 'Site surveys', copy: 'Radio and technical site surveys establishing what is feasible at each location before design is finalized.' },
          { title: 'Drive testing & benchmarking', copy: 'Field measurement of coverage, signal quality and network performance, including post-processing and analysis.' },
          { title: 'Network optimization', copy: 'Radio network planning and optimization, parameter tuning, transport optimization and KPI improvement.' },
          { title: 'IBS / DAS design', copy: 'Indoor coverage system design for commercial, enterprise and high-density environments.' },
        ],
      },
      {
        id: 'logistics-support',
        label: 'Quality & Support Services',
        title: 'Keep projects and field teams supplied.',
        intro: 'Idarat TSO provides logistics and operational support services for technical projects and field operations, helping clients manage the movement, storage and control of equipment and materials. From project material handling to ongoing operational supply, our teams manage the physical flow of equipment that deployment and maintenance depend on.',
        approach: [
          { title: 'Receive & inspect', copy: 'Materials received, checked against documentation and inspected before entering stock.' },
          { title: 'Store & control', copy: 'Materials organized with inventory records that show what is held, where it is stored and its status.' },
          { title: 'Prepare & handle', copy: 'Equipment packed, kitted and prepared according to handling characteristics and destination.' },
          { title: 'Dispatch & deliver', copy: 'Transportation coordinated to project locations and technical sites.' },
          { title: 'Track & reconcile', copy: 'Movement, delivery and inventory changes recorded from storage through dispatch.' },
        ],
        items: [
          { title: 'Fleet management', copy: 'Vehicle sourcing, allocation and coordination for field and operational requirements, including utilization and maintenance coordination.' },
          { title: 'Storage & warehousing', copy: 'Secure, organized storage for technical equipment — receiving, identification, movement and preparation for dispatch.' },
          { title: 'Inventory management', copy: 'Stock recording, location tracking, reconciliation, movement tracking and inventory reporting.' },
          { title: 'Material packing & handling', copy: 'Packing, kitting, loading support and special handling for sensitive, heavy or specialized equipment.' },
          { title: 'Delivery & transportation', copy: 'Warehouse-to-site delivery, inter-site transportation, dispatch support and delivery documentation.' },
          { title: 'Inspection & quality assurance', copy: 'Incoming and outgoing inspection, documentation verification, non-conformance reporting and material release controls.' },
          { title: 'Reverse logistics & RMA', copy: 'Recovery of surplus, replaced and faulty equipment, return tracking, vendor RMA, redeployment and disposal coordination.' },
        ],
      },
    ],
    extra: {
      title: 'Environment, Health & Safety',
      copy: [
        'At Idarat TSO, Environment, Health & Safety is not an added layer of compliance. It is built into how we plan, manage and deliver technical operations — across telecom and field safety, power and high-risk environments, IT and critical facilities, and enterprise workplaces.',
        'Certified to ISO 45001, ISO 14001, ISO 9001, ISO 27001 and ISO 22301.',
      ],
    },
    audiences: [
      { title: 'Telecom operators', copy: 'Rollout, O&M, design and logistics for live and evolving mobile and transmission networks.' },
      { title: 'Infrastructure owners', copy: 'One partner from planning and deployment through ongoing maintenance and material control.' },
      { title: 'Enterprise & critical facilities', copy: 'In-building coverage, power, EHS and technical resources for demanding operating environments.' },
    ],
    industries: workOverview.industries,
    cta: { title: 'Let’s build reliable operations together', copy: 'Talk to our TSO team about your technical and operational requirements.', label: 'Talk to Our TSO Team' },
  },

  ict: {
    key: 'ict',
    label: 'Identiti ICT',
    eyebrow: 'Information & Communication Technology',
    title: 'Infrastructure built for what is next.',
    intro: [
      'Identiti ICT is the Information & Communication Technology arm of SIS Global. We deliver enterprise technology, infrastructure and digital capability through established partnerships with the world’s leading vendors.',
      'From data centers and workplace devices to networks, cybersecurity and systems integration, Identiti ICT helps organizations build secure technology foundations and keep them supported.',
    ],
    metrics: [
      { value: '8,000+', label: 'PCs & devices supported' },
      { value: '40+', label: 'Technology partners' },
      { value: '19+', label: 'Years of excellence' },
      { value: '8+', label: 'Countries of operation' },
    ],
    reasons: [
      { title: 'Vendor-backed delivery', copy: 'Established partnerships with leading technology vendors, used to design and support enterprise environments.' },
      { title: 'Infrastructure to the endpoint', copy: 'Data centers, networks and workplace technology supported as one ICT estate, not isolated projects.' },
      { title: 'Security in the design', copy: 'Cybersecurity and digital controls planned with the infrastructure, not added after go-live.' },
      { title: 'One group, one accountable partner', copy: 'ICT sits alongside HCM and TSO inside SIS Global, so technology work can connect to people and field operations when the job requires it.' },
    ],
    pillars: [
      {
        id: 'infrastructure',
        label: 'ICT Infrastructure & Data Centers',
        title: 'Foundations that stay available.',
        intro: 'Identiti ICT designs, deploys and supports the rooms, racks, compute and workplace platforms that enterprise operations run on.',
        items: [
          { title: 'Data center infrastructure', copy: 'Plan, build and support data center environments — power, cooling, racks and the systems they host.' },
          { title: 'Servers, storage & workplace devices', copy: 'Enterprise hardware supply, deployment and lifecycle support, including PCs and devices across the estate.' },
          { title: 'Systems integration', copy: 'Bring platforms, identity and infrastructure together so the environment can be operated as one.' },
          { title: 'Managed ICT support', copy: 'Ongoing support for the infrastructure after handover, with a single point of accountability.' },
        ],
      },
      {
        id: 'networking',
        label: 'Networking & Connectivity',
        title: 'Connect sites, users and systems.',
        intro: 'Networks have to carry the business — between offices, data centers, sites and the people who use them.',
        items: [
          { title: 'Enterprise networking', copy: 'Local and wide-area networks designed around how the organization actually works.' },
          { title: 'Connectivity & access', copy: 'Secure access for offices, remote users and operational locations.' },
          { title: 'Wireless & in-building connectivity', copy: 'Workplace and facility connectivity, coordinated with SIS Global’s wider technical capability where indoor coverage is part of the job.' },
          { title: 'Network refresh & modernization', copy: 'Upgrade ageing infrastructure without losing sight of what has to stay online.' },
        ],
      },
      {
        id: 'cybersecurity',
        label: 'Cybersecurity & Digital Solutions',
        title: 'Protect the environment you run.',
        intro: 'Identiti ICT helps organizations strengthen cybersecurity and adopt digital solutions that sit on a stable infrastructure base.',
        items: [
          { title: 'Cybersecurity', copy: 'Protect networks, endpoints and critical systems with controls designed for the environment they serve.' },
          { title: 'Identity & access', copy: 'Help the right people reach the right systems, and keep that access governable.' },
          { title: 'Digital workplace solutions', copy: 'Tools and platforms that reduce friction for employees without weakening control.' },
          { title: 'Secure integration', copy: 'Connect applications and infrastructure with security and operability in mind.' },
        ],
      },
    ],
    audiences: [
      { title: 'Enterprise & public sector', copy: 'ICT estates that need accountable delivery, vendor alignment and support after go-live.' },
      { title: 'Organizations modernizing infrastructure', copy: 'Refresh, integration and cybersecurity as one programme rather than disconnected purchases.' },
    ],
    industries: workOverview.industries,
    cta: { title: 'Talk to our ICT team', copy: 'Whether you are refreshing infrastructure, connecting sites or strengthening security, Identiti ICT can help you move forward.', label: 'Talk to Our ICT Team' },
  },
}
