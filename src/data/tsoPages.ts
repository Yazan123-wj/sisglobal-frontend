import { STAT_LABEL } from '@/data/stats'

export type TsoSectionId = 'overview' | 'rollout' | 'managed-services' | 'design-optimization' | 'logistics-support'

type Line = { title: string; copy: string; cta?: string; href?: string }

export type TsoBlock =
  | { type: 'prose'; paragraphs: string[] }
  | { type: 'stats'; title: string; items: { value: string; label: string }[] }
  | { type: 'certs'; title: string }
  | { type: 'partners'; title: string }
  | { type: 'cta'; title?: string; copy?: string; label: string }
  | {
      type: 'section'
      id?: string
      title: string
      paragraphs?: string[]
      chips?: string[]
      steps?: { title: string; copy: string }[]
      why?: Line[]
      items?: Line[]
      note?: string
      cta?: string
      link?: { label: string; to: string }
    }

export type TsoSection = {
  id: TsoSectionId
  nav: string
  eyebrow: string
  title: string
  lead: string
  blocks: TsoBlock[]
}

const learn = (id: string) => ({ cta: 'Learn More', href: `#${id}` })

export const tsoNav: { id: TsoSectionId; label: string }[] = [
  { id: 'overview', label: 'TSO Overview' },
  { id: 'rollout', label: 'Rollout' },
  { id: 'managed-services', label: 'Managed Services' },
  { id: 'design-optimization', label: 'Design & Optimization' },
  { id: 'logistics-support', label: 'Logistics & Support Services' },
]

export const tsoInnerNav: Partial<Record<TsoSectionId, { id: string; label: string }[]>> = {
  rollout: [
    { id: 'rollout-overview', label: 'Rollout Overview' },
    { id: 'ran', label: 'RAN Deployment' },
    { id: 'transmission', label: 'Transmission Deployment' },
    { id: 'installation', label: 'Installation & Commissioning' },
    { id: 'integration', label: 'Site Integration & Acceptance' },
    { id: 'ibs', label: 'IBS' },
    { id: 'swap', label: 'Network Swap & Modernization' },
    { id: 'power', label: 'Power Systems Deployment' },
  ],
  'managed-services': [
    { id: 'managed-services-overview', label: 'Managed Service Overview' },
    { id: 'noc', label: 'NOC Operations' },
    { id: 'field', label: 'Field Maintenance' },
    { id: 'preventive', label: 'Preventive & Corrective Maintenance' },
    { id: 'civil', label: 'Civil & Site Maintenance' },
    { id: 'power-energy', label: 'Power & Energy Management' },
    { id: 'spares', label: 'Spare Parts Management' },
    { id: 'resources', label: 'Managed Technical Resources' },
  ],
  'design-optimization': [
    { id: 'design-optimization-overview', label: 'Design & Optimization Overview' },
    { id: 'rf', label: 'RF Planning & Coverage' },
    { id: 'transmission-planning', label: 'Transmission Planning' },
    { id: 'capacity', label: 'Planning & Network Dimensioning' },
    { id: 'surveys', label: 'Site Surveys' },
    { id: 'drive', label: 'Drive Testing' },
    { id: 'optimization', label: 'Network Optimization' },
    { id: 'ibs-design', label: 'IBS / DAS Design' },
  ],
  'logistics-support': [
    { id: 'logistics-support-overview', label: 'Logistics & Support Services Overview' },
    { id: 'fleet', label: 'Fleet Management' },
    { id: 'warehousing', label: 'Storage & Warehousing' },
    { id: 'inventory', label: 'Inventory Management' },
    { id: 'packing', label: 'Material Packing & Handling' },
    { id: 'delivery', label: 'Delivery & Transportation' },
    { id: 'inspection', label: 'Inspection & Quality Assurance' },
    { id: 'reverse', label: 'Reverse Logistics & RMA Management' },
  ],
}

export const tsoSections: Record<TsoSectionId, TsoSection> = {
  overview: {
    id: 'overview',
    nav: 'TSO Overview',
    eyebrow: 'TSO Overview',
    title: 'Your Technical Services Partner',
    lead: 'Idarat TSO, the Technical Services Operations arm of SIS Global, delivers specialized expertise and field capabilities to support critical infrastructure throughout its lifecycle.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          "Since 2007, we've supported complex operating environments with the expertise and on-the-ground execution needed to keep projects moving and infrastructure performing.",
          "Backed by SIS Global's regional presence, we mobilize the right teams and capabilities around each engagement, from focused specialist scopes to large-scale, long-running programs.",
        ],
      },
      {
        type: 'stats',
        title: 'TSO at a Glance',
        items: [
          { value: '15+', label: STAT_LABEL.clientsServed },
          { value: '19+', label: STAT_LABEL.years },
          { value: '22+', label: STAT_LABEL.projects },
          { value: '46+', label: STAT_LABEL.activeTeams },
          { value: '1,850+', label: STAT_LABEL.dailyOperations },
        ],
      },
      {
        type: 'section',
        title: 'Environment, Health & Safety (EHS)',
        paragraphs: [
          'At Idarat TSO, Environment, Health & Safety (EHS) is not an added layer of compliance, it is built into how we plan, manage and deliver technical operations.',
          'Our EHS approach integrates risk management, workforce protection and environmental responsibility into every stage of delivery, helping our teams operate safely and consistently across demanding technical environments.',
          'Safety is engineered into our operations with the same discipline as the technical work itself through:',
        ],
        items: [
          { title: 'Telecom & Field Safety', copy: 'Manage site-specific risks across telecom infrastructure and field operations through structured safety practices, environmental monitoring and risk management.' },
          { title: 'Power & High-Risk Environments', copy: 'Apply rigorous safety practices, environmental controls and emergency preparedness across power facilities and high-risk operating environments.' },
          { title: 'IT & Critical Facilities', copy: 'Maintain safe and compliant operations across data centers and technology facilities through structured risk management and safety controls.' },
          { title: 'Enterprise Environments', copy: 'Promote safer workplaces through occupational health practices, workplace safety, compliance and ongoing EHS management across corporate facilities.' },
        ],
      },
      { type: 'certs', title: 'Certified to International Standards' },
      {
        type: 'section',
        title: 'Why Idarat TSO',
        why: [
          { title: 'End-to-End, Under One Roof', copy: 'From network planning and rollout to ongoing O&M and logistics support, our capabilities span the technical service lifecycle, reducing handovers and simplifying coordination through one accountable partner.' },
          { title: 'Multi-Vendor by Design', copy: 'Our engineers work fluently across Ericsson, Nokia, Huawei, and ZTE, so operators can consolidate mixed-vendor estates under a single managed contract.' },
          { title: "A Track Record That's Measurable", copy: '8,500+ field jobs delivered, 1,850+ daily operations and 46+ active teams, proven delivery capability backed by years of field experience.' },
          { title: 'Delivery Models That Flex', copy: 'Specialist crew for a two-week drive test campaign. Embedded team on a client program. Managed nationwide O&M. We design the model around the work, not the other way around.' },
        ],
      },
      { type: 'partners', title: 'Trusted by Leading Organizations' },
      {
        type: 'cta',
        title: "Let's Build Reliable Operations Together",
        copy: 'Talk to our TSO team about your technical and operational requirements.',
        label: 'Talk to Our TSO Team',
      },
      {
        type: 'section',
        title: 'Rollout Overview',
        paragraphs: [
          'Idarat TSO delivers technical rollout and deployment services for telecom and network infrastructure, bringing sites from deployment plan to live network through experienced field teams and structured delivery processes.',
          'From focused site deployments to large multi-site programs, our teams coordinate installation, configuration, integration, testing, and handover across live and evolving network environments.',
        ],
        chips: ['RAN Deployment', 'Transmission Deployment', 'Installation & Commissioning', 'Site Integration & Acceptance', 'In-Building Solutions / DAS Deployment', 'Network Swap & Modernization', 'Power Systems Deployment'],
        link: { label: 'Explore Rollout Services', to: '/what-we-do/tso/rollout' },
      },
      {
        type: 'section',
        title: 'Managed Services Overview',
        paragraphs: [
          'Idarat TSO provides technical operations and maintenance services designed to keep telecom and critical infrastructure available, reliable and ready to perform.',
          'From single-site maintenance contracts to fully managed multi-site operations, our teams handle the day-to-day work that determines whether a network delivers its designed availability.',
        ],
        chips: ['NOC Operations', 'Field Maintenance', 'Preventive & Corrective Maintenance', 'Civil & Site Maintenance', 'Power & Energy Management', 'Spare Parts Management', 'Managed Technical Resources'],
        link: { label: 'Explore Managed Services', to: '/what-we-do/tso/managed-services' },
      },
      {
        type: 'section',
        title: 'Design & Optimization',
        paragraphs: [
          'Idarat TSO provides network design, planning and optimization services that help operators and infrastructure owners build, expand and improve telecom networks around real coverage, capacity and performance requirements.',
          'Our teams support networks at both ends of the lifecycle: planning what gets built, and improving what already exists.',
        ],
        chips: ['RF Planning & Coverage Design', 'Transmission Planning & Design', 'Capacity Planning & Network Dimensioning', 'Site Surveys', 'Drive Testing & Benchmarking', 'Network Optimization', 'IBS / DAS Design'],
        link: { label: 'Explore Design & Optimization', to: '/what-we-do/tso/design-optimization' },
      },
      {
        type: 'section',
        title: 'Logistics & Support Services',
        paragraphs: [
          'Idarat TSO provides logistics and operational support services for technical projects and field operations, helping clients manage the movement, storage and control of equipment and materials across their operations.',
          'From project material handling to ongoing operational supply, our teams manage the physical flow of equipment that deployment and maintenance depend on.',
        ],
        chips: ['Fleet Management', 'Storage & Warehousing', 'Inventory Management', 'Material Packing & Handling', 'Delivery & Transportation', 'Inspection & Quality Assurance', 'Reverse Logistics & RMA Management'],
        link: { label: 'Explore Logistics & Support Services', to: '/what-we-do/tso/logistics-support' },
      },
    ],
  },
  rollout: {
    id: 'rollout',
    nav: 'Rollout',
    eyebrow: 'Rollout Overview',
    title: 'Network Build, Network Rollout',
    lead: 'Idarat TSO delivers technical rollout and deployment services for telecom and network infrastructure, combining experienced field teams with structured on-the-ground execution to bring infrastructure into operation efficiently and reliably.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'From focused site deployments to large multi-site programs, our teams work across live and evolving network environments, coordinating installation, configuration, integration, testing and handover while maintaining consistent quality and EHS standards.',
        ],
      },
      {
        type: 'section',
        title: 'Our Rollout Approach',
        steps: [
          { title: 'Plan & Prepare', copy: 'Align technical requirements, site readiness, resources, and deployment activities before field execution begins.' },
          { title: 'Install & Configure', copy: 'Deploy equipment and infrastructure according to approved technical requirements and vendor specifications.' },
          { title: 'Integrate & Test', copy: 'Connect deployed infrastructure into the network, complete required configuration, and verify operational readiness.' },
          { title: 'Accept & Handover', copy: 'Complete technical verification, documentation, and acceptance requirements before final handover to the operator or client.' },
        ],
      },
      {
        type: 'section',
        title: 'Our Rollout Services',
        paragraphs: [
          "Idarat TSO's rollout capabilities cover new network deployment, coverage expansion, modernization, and infrastructure upgrades across telecom and ICT environments.",
        ],
        items: [
          { title: 'RAN Deployment', copy: '2G, 3G, 4G and 5G radio access network deployment across macro, micro and small-cell environments.', ...learn('ran') },
          { title: 'Transmission Deployment', copy: 'Microwave, fiber and IP backhaul installation and commissioning.', ...learn('transmission') },
          { title: 'Installation & Commissioning', copy: 'Hardware installation, cabling, parameter loading and system commissioning across network elements.', ...learn('installation') },
          { title: 'Site Integration & Acceptance', copy: 'Site integration, technical verification and formal acceptance to operator and vendor standards.', ...learn('integration') },
          { title: 'In-Building Solutions (IBS) / DAS Deployment', copy: 'Indoor coverage solutions for commercial buildings, campuses, venues and enterprise environments.', ...learn('ibs') },
          { title: 'Network Swap & Modernization', copy: 'Multi-vendor swaps, legacy equipment replacement and technology migration programs.', ...learn('swap') },
          { title: 'Power Systems Deployment', copy: 'Rectifiers, batteries, hybrid power and DC systems for reliable site operation.', ...learn('power') },
        ],
      },
      {
        type: 'section',
        title: 'Why Idarat TSO for Rollout',
        why: [
          { title: 'One Partner from Field to Integration', copy: 'Coordinate field deployment, installation and network integration through a single technical delivery partner reducing handovers and simplifying accountability throughout the rollout.' },
          { title: 'Experienced Field Capability', copy: 'Draw on established technical teams and extensive field delivery experience across complex, multi-vendor, and multi-technology operating environments.' },
          { title: 'Flexible Rollout Capacity', copy: 'Scale field resources and delivery capabilities around project scope, deployment schedules, and geographic requirements, from a focused specialist engagement to a large-scale rollout program.' },
          { title: 'Quality Built into Delivery', copy: 'Technical quality, acceptance and EHS requirements are integrated throughout the rollout process, helping identify issues early, maintain consistent delivery standards and minimize rework before handover.' },
        ],
      },
      {
        type: 'section',
        id: 'ran',
        title: 'RAN Deployment',
        paragraphs: [
          'Idarat TSO provides radio access network deployment services covering the installation, expansion and modernization of mobile network infrastructure.',
          'Our field teams deploy RAN equipment across 2G, 3G, 4G and 5G environments, from single-site additions to multi-site expansion programs, installing, commissioning and integrating radio infrastructure to vendor specification and operator standard.',
        ],
      },
      {
        type: 'section',
        title: 'Our Deployment Capabilities',
        items: [
          { title: 'Macro & Small Cell Sites', copy: 'Rooftop, greenfield tower and monopole macro deployments, plus street-level small cell installations for capacity relief in dense urban areas and high-traffic locations.' },
          { title: 'Antenna Systems', copy: 'Antenna mounting, alignment and azimuth/tilt configuration to design specification — including multi-band, multi-sector and MIMO configurations used in 4G and 5G deployments.' },
          { title: 'Radio & Baseband Equipment', copy: 'RRU and RRH mounting, baseband unit installation, feeder and jumper runs, and site build-out to approved design.' },
          { title: 'Equipment Configuration & Commissioning', copy: 'Software loading, parameter configuration, license activation and functional testing to bring the node online against approved design.' },
          { title: 'Site Expansion & Capacity Upgrades', copy: 'Sector additions, carrier expansion and equipment upgrades on existing sites as traffic demand grows.' },
          { title: 'RAN Modernization', copy: 'Field execution for replacement or upgrade of existing radio infrastructure as network generations evolve.' },
        ],
      },
      {
        type: 'section',
        title: 'How We Work',
        paragraphs: [
          'Every RAN site follows the same disciplined sequence consistency is what keeps large programs on schedule.',
          'Site survey and readiness verification confirms structural capacity, power availability, access arrangements and transmission readiness before crews mobilize. Most rollout delays trace back to something that should have been caught here.',
          'Installation to vendor specification covers equipment mounting, cabling, grounding and antenna work executed by crews with the rigging and working-at-height qualifications the site demands.',
          'Commissioning and configuration bring the node online and verify it performs against the approved design.',
          'Integration and verification connect the site into the live network, confirms cell activation, and validates performance against acceptance criteria before handover.',
        ],
      },
      { type: 'cta', copy: 'Planning a RAN rollout or network expansion?', label: 'Talk to Our Deployment Team' },
      {
        type: 'section',
        id: 'transmission',
        title: 'Transmission Deployment',
        paragraphs: [
          'A radio site performs only as well as the link behind it. Idarat TSO delivers transmission deployment services covering the connectivity between network sites, access infrastructure and the wider telecom network.',
          'Our field capabilities cover microwave, fiber and IP backhaul deployment establishing reliable transport for new sites, coverage expansions and modernization programs.',
        ],
      },
      {
        type: 'section',
        title: 'What We Deploy',
        items: [
          { title: 'Microwave Link Deployment', copy: 'Antenna and ODU installation, precision alignment to measure RSL against design targets, IDU installation, and link commissioning with documented performance verification.' },
          { title: 'Fiber Optic Infrastructure', copy: 'Fiber deployment, fusion splicing, termination and certification — including OTDR testing and optical power measurement to confirm link performance before handover.' },
          { title: 'IP Backhaul & Transport Nodes', copy: "Router and switch installation, IP and VLAN configuration, and integration into the operator's transport network." },
          { title: 'Cabling & DDF/ODF Infrastructure', copy: 'Structured cabling, DDF and ODF installation, termination and cross-connect work — labelled and documented so the infrastructure stays maintainable.' },
          { title: 'Transmission Integration', copy: 'Configuration and integration of transmission equipment into the wider network environment, with verification before acceptance.' },
        ],
      },
      { type: 'cta', copy: 'Building or expanding your transmission network?', label: 'Talk to Our Deployment Team' },
      {
        type: 'section',
        id: 'installation',
        title: 'Installation & Commissioning (I&C)',
        paragraphs: [
          'Idarat TSO provides telecom installation and commissioning services that move equipment from physical deployment to operational readiness.',
          'Our field teams carry out installation, cabling, configuration, commissioning and technical verification to approved specifications preparing infrastructure for integration and acceptance.',
        ],
      },
      {
        type: 'section',
        title: 'Installation & Commissioning Scope',
        paragraphs: ['Depending on project requirements, our I&C capabilities can include:'],
        items: [
          { title: 'Equipment Installation', copy: 'Mounting and assembly of network elements, radio units, baseband, transmission equipment, cabinets and racks to vendor specification and structural requirement.' },
          { title: 'Cabling & Connectivity', copy: "Power cabling, RF feeders and jumpers, fiber and data cabling, and DDF termination routed, labelled and dressed to standard. Cable management isn't cosmetic; it's what makes future maintenance possible." },
          { title: 'Earthing & Grounding', copy: 'Earth bar installation, equipment bonding and lightning protection, with earth resistance verification to specification.' },
          { title: 'Equipment Configuration', copy: 'Software and firmware loading to approved release, license activation, and parameter configuration against approved design.' },
          { title: 'Commissioning & Functional Testing', copy: 'Element-level checks confirming the installation performs as designed alarm verification, power checks, link testing and functional confirmation before integration.' },
          { title: 'Documentation & Handover Preparation', copy: 'As-built records, test results and site documentation prepared as part of the work, not compiled afterwards.' },
        ],
      },
      {
        type: 'section',
        title: 'Getting Installation Right the First Time',
        paragraphs: [
          'Installation quality determines network reliability, acceptance timelines and how expensive the site is to maintain for the next decade. Poor cable dressing costs an extra hour today and hours on every maintenance visit afterwards. Weak earthing shows up as unexplained equipment faults years later.',
          'Our I&C approach brings execution, verification and documentation together, so issues are identified before equipment enters operation.',
        ],
      },
      { type: 'cta', copy: 'Need experienced installation and commissioning teams?', label: 'Talk to Our Technical Team' },
      {
        type: 'section',
        id: 'integration',
        title: 'Site Integration & Acceptance',
        paragraphs: [
          "The site isn't complete when the equipment is installed. It's complete when the infrastructure has been integrated, verified and accepted for operation.",
          'Idarat TSO provides site integration and technical acceptance services covering the final stage between field deployment and live network operation.',
        ],
      },
      {
        type: 'section',
        title: 'Site Integration',
        paragraphs: [
          'Our teams handle the technical activities required to connect newly deployed or upgraded infrastructure into the existing network transmission activation, cell activation, required configuration, and verification of operational readiness.',
        ],
      },
      {
        type: 'section',
        title: 'Technical Acceptance',
        paragraphs: [
          'Idarat TSO can perform acceptance activities on behalf of clients, verifying that installations meet agreed technical, quality and project requirements.',
          'Capabilities include:',
        ],
        items: [
          { title: 'Site Verification & Quality Audits', copy: 'Inspection of installation quality, infrastructure and equipment against agreed technical requirements and vendor standards.' },
          { title: 'Configuration Verification', copy: 'Confirmation that deployed parameters match approved design catching configuration drift before it surfaces as a performance problem weeks later.' },
          { title: 'Functional & Performance Testing', copy: 'Verification that installed equipment performs as intended, with KPI checks against acceptance criteria.' },
          { title: 'Snag Identification & Closure', copy: 'Documentation of deviations and outstanding items, tracked through to closure and re-verified before sign-off.' },
          { title: 'Acceptance Documentation', copy: 'Technical records, test results, installation evidence and reporting prepared in the format the client requires.' },
          { title: 'Final Acceptance Support', copy: 'Verification, documentation and submission of project information required to complete formal acceptance.' },
        ],
      },
      {
        type: 'section',
        title: 'Why Acceptance Is Where Programs Get Stuck',
        paragraphs: [
          "Rollout schedules rarely slip during installation. They slip at acceptance, when documentation is incomplete, test results are missing, or configuration doesn't match design, and sites sit in limbo waiting for a crew to return.",
          'We treat acceptance as part of delivery rather than the paperwork that follows it. Verification happens while crews are still mobilized, so issues close in the same visit instead of generating a second one.',
        ],
      },
      { type: 'cta', copy: 'Preparing new or upgraded sites for acceptance?', label: 'Talk to Our Technical Team' },
      {
        type: 'section',
        id: 'ibs',
        title: 'In-Building Coverage Solutions',
        paragraphs: [
          'Modern buildings create difficult environments for mobile connectivity. Reinforced concrete, coated glass, basements, parking structures and deep floor plates all attenuate signal the outdoor network reaches the building and then stops at the façade.',
          "Idarat TSO deploys in-building coverage solutions that strengthen mobile signal availability inside these environments, providing field deployment and integration for indoor telecom infrastructure where outdoor networks alone don't deliver the required performance.",
        ],
      },
      {
        type: 'section',
        title: 'Deployment Capability',
        paragraphs: ['Depending on the selected solution, our capabilities can cover:'],
        items: [
          { title: 'Site Assessment & Coverage Survey', copy: 'Review of building conditions, existing signal levels and technical requirements — identifying dead zones and donor signal availability before installation begins.' },
          { title: 'Equipment Installation', copy: 'Deployment of in-building coverage equipment, head-end units and indoor antenna systems according to approved design.' },
          { title: 'Cabling & Passive Infrastructure', copy: 'Installation of coaxial cabling, splitters, couplers, antennas and passive components required by the coverage solution.' },
          { title: 'Configuration & Integration', copy: 'Configuration and integration of deployed equipment to solution and network requirements.' },
          { title: 'Coverage Testing & Verification', copy: 'Walk testing and signal verification across floors, stairwells and basement levels to confirm coverage performance before handover.' },
          { title: 'CEL-FI Deployment', copy: 'Idarat TSO works with Nextivity CEL-FI technology to address in-building mobile coverage requirements through professionally deployed cellular coverage solutions matching system type to building requirement rather than defaulting to a single approach.' },
        ],
      },
      {
        type: 'section',
        title: 'Getting In-Building Coverage Right',
        paragraphs: [
          'Indoor coverage projects fail for predictable reasons: an antenna layout designed from a floor plan that doesn\'t reflect how the building was actually built, a donor signal too weak to support the system, or an installation that looks correct on paper but leaves dead zones in the stairwells and basement.',
          'We assess before we deploy and walk-test after so coverage is verified where people use their phones, not just where the design said it should work.',
        ],
      },
      { type: 'cta', copy: 'Need better mobile coverage inside your building?', label: 'Talk to Our Team' },
      {
        type: 'section',
        id: 'swap',
        title: 'Network Swap & Modernization',
        paragraphs: [
          "Network evolution requires existing infrastructure to be upgraded, replaced or reconfigured usually while it's carrying live traffic.",
          'Idarat TSO delivers network swap and modernization programs with field capabilities that move existing infrastructure toward newer technologies, updated equipment and changing network requirements.',
        ],
      },
      {
        type: 'section',
        title: 'Modernization Capability',
        items: [
          { title: 'Equipment Swap & Replacement', copy: 'Removal and replacement of existing network equipment according to approved migration and deployment plans, across RAN, transmission and power infrastructure.' },
          { title: 'Technology Migration', copy: 'Field execution for network generation transitions — legacy decommissioning, capacity expansion and technology overlay on existing sites.' },
          { title: 'Site Modernization', copy: 'Upgrading site infrastructure alongside network equipment — power systems, cabinets, cabling and earthing brought to current standard rather than left to become the next constraint.' },
          { title: 'Add / Remove Activities', copy: 'Approved equipment additions, removals and modifications within existing network environments.' },
          { title: 'Reconfiguration & Integration', copy: 'Configuration and integration of upgraded infrastructure into the existing network, with verification against design.' },
          { title: 'Testing & Acceptance Support', copy: 'Verification of installation quality and technical readiness following modernization, with documentation required before handover.' },
        ],
      },
      {
        type: 'section',
        title: 'Controlled Change in Live Networks',
        paragraphs: [
          'Swap execution lives or dies on preparation. Equipment staged and verified before the window opens. Rollback plan defined and understood. Crews briefed on the specific site, not the generic procedure. Verification is ready to run the moment installation finishes.',
        ],
      },
      { type: 'cta', copy: 'Planning a network modernization or equipment swap?', label: 'Talk to Our Rollout Team' },
      {
        type: 'section',
        id: 'power',
        title: 'Power Systems Deployment',
        paragraphs: [
          "Network equipment rarely fails. Power does. Battery strings past their service life, rectifiers running beyond rated capacity, DC distribution never sized for the load the site now carries power sits behind a large share of site outages, and it's the layer most often treated as an afterthought during rollout.",
          'Idarat TSO deploys power systems across telecom and critical infrastructure environments, covering conventional and alternative power solutions.',
        ],
      },
      {
        type: 'section',
        title: 'Power Deployment Capabilities',
        items: [
          { title: 'DC Power Systems & Rectifiers', copy: "Rectifier and DC power plant deployment, load configuration and distribution sizing specified for the capacity the site will carry as it grows, not just today's load." },
          { title: 'Battery & Backup Systems', copy: "Battery bank installation and commissioning with capacity verification, configured for the site's required autonomy under real operating temperatures." },
          { title: 'UPS Systems', copy: 'Deployment and integration of uninterruptible power supply systems for critical technical environments.' },
          { title: 'Hybrid Energy Systems', copy: 'Power solutions combining grid, generator and battery sources to improve availability and reduce fuel consumption at sites where grid supply is unreliable.' },
          { title: 'Solar Power Systems', copy: 'Installation and integration of solar power solutions where project requirements call for renewable generation.' },
          { title: 'Power Distribution', copy: 'LV distribution deployment and MV where applicable including breaker configuration, cabling and labelled distribution infrastructure.' },
          { title: 'Commissioning & Integration', copy: 'Load testing, commissioning and integration of deployed power systems into the operating environment, with capacity verification documented at handover.' },
        ],
      },
      {
        type: 'section',
        title: 'Sized for Load, Built for Environment',
        paragraphs: [
          'Regional operating conditions punish power systems. High ambient temperatures shorten battery life significantly below rated figures. Dust degrades ventilation and cooling. Unstable grid supply cycles systems constantly.',
          'Power infrastructure specified against catalogue assumptions underperforms in these conditions. We deploy to the load and the environment because oversizing costs money once, and under sizing costs availability continuously.',
        ],
      },
      { type: 'cta', copy: 'Planning a power deployment for critical infrastructure?', label: 'Talk to Our Technical Team' },
    ],
  },
  'managed-services': {
    id: 'managed-services',
    nav: 'Managed Services',
    eyebrow: 'Managed Services',
    title: 'Managed Service Overview',
    lead: 'Idarat TSO delivers managed operations and maintenance services for telecom and critical infrastructure, combining network monitoring, field operations and structured maintenance to keep infrastructure available, reliable and performing.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Where rollout concludes with an operational site, managed services take over — focusing on day-to-day availability, fault response and long-term network reliability.',
          'Effective network operations go beyond responding to faults. They require continuous visibility, clear escalation and coordinated field response to identify issues early and restore service efficiently.',
          'Idarat TSO brings network monitoring and field operations together through a structured O&M approach, connecting fault identification with the technical response required on the ground.',
        ],
      },
      {
        type: 'section',
        title: 'Our Approach',
        steps: [
          { title: 'Monitor & Identify', copy: 'Maintain visibility into network conditions and identify alarms, faults and operational issues requiring attention.' },
          { title: 'Assess & Coordinate', copy: 'Evaluate incidents, establish priorities and coordinate the appropriate technical or field response.' },
          { title: 'Respond & Restore', copy: 'Dispatch and execute corrective activities to resolve faults and restore normal operation.' },
          { title: 'Maintain & Prevent', copy: 'Carry out planned preventive activities designed to maintain infrastructure condition and reduce avoidable failures.' },
          { title: 'Verify & Report', copy: 'Confirm service restoration or maintenance completion and maintain the required operational records and reporting.' },
        ],
      },
      {
        type: 'section',
        title: 'Scope',
        items: [
          { title: 'NOC Operations', copy: 'Network monitoring, alarm management, fault triage and escalation.', ...learn('noc') },
          { title: 'Field Maintenance', copy: 'Multi-vendor field response, site visits and technician dispatch under defined SLAs.', ...learn('field') },
          { title: 'Preventive & Corrective Maintenance', copy: 'Scheduled maintenance programs and fault resolution across network and site infrastructure.', ...learn('preventive') },
          { title: 'Civil & Site Maintenance', copy: 'Tower, shelter, fencing, earthing and site infrastructure upkeep.', ...learn('civil') },
          { title: 'Power & Energy Management', copy: 'Rectifier, battery, generator and hybrid power system maintenance.', ...learn('power-energy') },
          { title: 'Spare Parts Management', copy: 'Spare pool management, forward stocking and parts logistics for faster resolution.', ...learn('spares') },
          { title: 'Managed Technical Resources', copy: 'Dedicated technical teams embedded in client operations.', ...learn('resources') },
        ],
      },
      {
        type: 'section',
        title: 'SLA Delivery',
        paragraphs: [
          'Managed services contracts live or die on SLA performance response time, resolution time, availability, and the reporting that proves it. Idarat TSO delivers against defined service levels with performance tracked and reported transparently. Where targets are missed, the reason is documented and addressed rather than absorbed. Clients get visibility into how their network is performing, not a monthly summary that says everything is fine.',
        ],
      },
      {
        type: 'section',
        title: 'Why Idarat TSO for Managed Services',
        why: [
          { title: 'Multi-Vendor Field Capability', copy: 'Technicians who work across different vendor platforms — so mixed-vendor estates can be maintained under a single contract rather than fragmented across vendor-specific providers.' },
          { title: 'Operations and Field connected', copy: 'Monitoring and field response delivered by the same partner, removing the handoff gap between the team that detects a fault and the team that fixes it.' },
          { title: 'Scalable Service Models', copy: 'Coverage that flexes with scope, geography and network size — from targeted maintenance contracts to fully managed operations with dedicated embedded teams.' },
          { title: 'Quality & EHS Built into Operations', copy: "Maintenance and field activities are delivered within Idarat TSO's established quality and EHS framework, integrating technical standards, risk assessment and safe working practices into day-to-day operations. Each intervention is planned and executed against defined safety and operational requirements." },
        ],
      },
      {
        type: 'cta',
        copy: 'Talk to our Managed Services team about your network operations, field maintenance and ongoing infrastructure requirements.',
        label: 'Talk to Our Managed Services Team',
      },
      {
        type: 'section',
        id: 'noc',
        title: 'NOC Operations',
        paragraphs: [
          'Idarat TSO provides Network Operations Center (NOC) services giving clients centralized visibility into network conditions, alarms and operational issues requiring attention.',
          'By bringing network monitoring, fault identification, escalation and operational coordination together, our NOC teams identify service-impacting issues early and coordinate the response needed to maintain network availability.',
        ],
      },
      {
        type: 'section',
        title: 'NOC Capabilities',
        items: [
          { title: 'Network Monitoring', copy: 'Surveillance of network elements, transmission links, power systems and site alarms with thresholds configured so genuine faults surface above routine background noise.' },
          { title: 'Alarm Management & Correlation', copy: 'Filtering and correlation of network alarms to identify root cause rather than chase symptoms. A single power failure generating forty downstream alarms is one incident, not forty.' },
          { title: 'Fault Identification & Triage', copy: 'Assessment against agreed severity levels to determine impact, priority and the correct response path remote resolution, field dispatch or vendor escalation.' },
          { title: 'Incident Escalation', copy: 'Structured escalation to technical teams, client contacts or vendor support according to defined procedures and agreed timelines.' },
          { title: 'Field Coordination', copy: 'Dispatch coordination with field teams passing fault detail, site information and required parts so technicians arrive prepared rather than diagnosing from scratch.' },
          { title: 'Service Restoration Follow-Up', copy: 'Incidents tracked through to resolution with restoration verified before closure confirming the fault is genuinely cleared, not just that the alarm stopped.' },
          { title: 'Operational Reporting', copy: 'Incident records, event history and action logs maintained for performance review and fault trend analysis.' },
        ],
      },
      {
        type: 'section',
        title: 'Connecting the NOC to the Field',
        paragraphs: [
          'NOC creates value when monitoring leads to action. Plenty of networks have visibility; fewer have visibility that drives resolution.',
          'The difference process is how quickly an alarm is classified, whether the person seeing it can dispatch, and whether the field team receives enough information to arrive equipped. Idarat TSO connects network visibility with field response, moving incidents from identification through assessment to intervention and resolution.',
        ],
      },
      { type: 'cta', copy: 'Need greater visibility and control across your network operations?', label: 'Talk to Our Managed Services Team' },
      {
        type: 'section',
        id: 'field',
        title: 'Multi-Vendor Field Maintenance',
        paragraphs: [
          'Not every network issue can be resolved from an operations center. Idarat TSO provides field maintenance services that bring technical response directly to network sites, covering fault investigation, repair and ongoing infrastructure maintenance.',
          'Working in coordination with network operations and client teams, our field resources respond to site-level technical requirements and carry out the interventions needed to return affected infrastructure to normal operation.',
        ],
      },
      {
        type: 'section',
        title: 'Field Maintenance Capabilities',
        items: [
          { title: 'On-Site Fault Investigation', copy: 'Physical inspection of equipment, cabling, connections and site conditions to isolate the actual source of a reported fault.' },
          { title: 'Technical Troubleshooting', copy: 'Systematic diagnosis across radio, transmission, power and supporting site infrastructure identifying root cause rather than replacing components until the alarm clears.' },
          { title: 'Corrective Field Intervention', copy: 'Module replacement, component repair, reconnection and remedial work carried out on site within the agreed maintenance scope.' },
          { title: 'Equipment & Infrastructure Checks', copy: 'Verification of network equipment, cabling integrity, connections, power systems and supporting site infrastructure during each intervention.' },
          { title: 'Site Visits & Technical Dispatch', copy: 'Field mobilization in response to alarms, faults, planned activities and operational requirements with technicians matched to fault type and required skill set.' },
          { title: 'Restoration & Closure', copy: 'Verification that the intervention resolved the issue, with field records, findings and parts consumed documented for work-order closure.' },
        ],
      },
      {
        type: 'section',
        title: 'Response Time Is a Logistics Problem',
        paragraphs: [
          "Fast field response isn't mainly about how quickly a technician leaves. It's about whether the right technician goes, whether they carry the right part, and whether site access is already arranged when they arrive.",
          'A four-hour response that ends in "we need to come back with the spare" isn\'t a four-hour response. By connecting field teams with operational coordination, Idarat TSO shortens the path between identifying an issue and resolving it at the site.',
        ],
      },
      { type: 'cta', copy: 'Need reliable technical support across your field network?', label: 'Talk to Our Field Maintenance Team' },
      {
        type: 'section',
        id: 'preventive',
        title: 'Preventive & Corrective Maintenance',
        paragraphs: [
          'Network maintenance works on two fronts: keeping infrastructure in good operating condition and responding effectively when faults occur anyway.',
          'Idarat TSO provides preventive and corrective maintenance across telecom and supporting site infrastructure, combining scheduled maintenance programs with technical fault response to maintain network reliability and asset condition.',
        ],
      },
      {
        type: 'section',
        title: 'Preventive Maintenance',
        paragraphs: [
          'Preventive maintenance identifies developing issues before they become operational failures. Activities can include:',
        ],
        items: [
          { title: 'Scheduled Site Inspections', copy: 'Structured condition assessment against defined maintenance requirements, carried out on cycle rather than deferred until something fails.' },
          { title: 'Equipment & Connection Checks', copy: 'Inspection of equipment, cabling, connectors and terminations for corrosion, looseness, heat damage and deterioration the failure modes that develop quietly over months.' },
          { title: 'Cleaning & Routine Maintenance', copy: 'Filter cleaning, ventilation clearance, cabinet cleaning and equipment servicing directly relevant in high-dust environments where accumulation degrades cooling performance.' },
          { title: 'Power & Environmental Checks', copy: 'Battery condition, rectifier function, cooling performance and environmental conditions reviewed where included in the maintenance scope.' },
          { title: 'Maintenance Records & Condition Reporting', copy: 'Documented findings per site, identifying deterioration early enough to plan replacement rather than react to failure.' },
        ],
      },
      {
        type: 'section',
        title: 'Corrective Maintenance',
        items: [
          { title: 'Fault Diagnosis', copy: 'Investigation to determine the actual source of failure, distinguishing the fault from its symptoms.' },
          { title: 'Repair & Replacement', copy: 'Repair or replacement of faulty components within the agreed scope, using appropriate spares and procedures.' },
          { title: 'Technical Testing', copy: 'Post-intervention verification confirming equipment and infrastructure perform correctly after the repair.' },
          { title: 'Service Restoration', copy: 'Affected infrastructure returned to normal operation with completion confirmed and documented.' },
        ],
      },
      {
        type: 'section',
        title: 'The Economics of Getting the Ratio Right',
        paragraphs: [
          'Every network runs a ratio of planned to unplanned maintenance and that ratio shows up directly in operating cost. Emergency response costs multiples of scheduled work, and it arrives with service impact attached. A site maintained on schedule generally needs fewer emergency visits than one visited only when it fails. Combining preventive and corrective maintenance addresses immediate faults while reducing the likelihood that avoidable issues develop into service-impacting failures.',
        ],
      },
      { type: 'cta', copy: 'Looking to strengthen your network maintenance program?', label: 'Talk to Our Managed Services Team' },
      {
        type: 'section',
        id: 'civil',
        title: 'Civil & Site Maintenance',
        paragraphs: [
          'Reliable network operations depend on more than active telecom equipment. Towers, shelters, fencing, earthing and supporting civil infrastructure all require ongoing attention to keep sites safe, accessible and operational.',
          'Idarat TSO provides civil and site maintenance covering the physical infrastructure surrounding telecom and technical assets.',
        ],
      },
      {
        type: 'section',
        title: 'Site Maintenance Capabilities',
        items: [
          { title: 'Tower & Structural Maintenance', copy: 'Inspection of structural members, connections, mounting hardware and corrosion condition keeping structures safe to climb and fit to carry the loads mounted on them.' },
          { title: 'Shelter & Equipment Area Maintenance', copy: 'Door seals, weatherproofing, ventilation, insulation and structural integrity keeping dust, humidity and heat out of the environment where equipment operates.' },
          { title: 'Fencing & Site Security Infrastructure', copy: 'Perimeter fencing, gates, locks and access hardware maintained to preserve physical security and site integrity.' },
          { title: 'Earthing & Grounding Systems', copy: 'Inspection of earth bars, bonding connections and lightning protection, with resistance verification where included in scope.' },
          { title: 'Light Civil Works', copy: 'Minor concrete repair, cable route remediation, drainage clearance and remedial works required to maintain site condition.' },
          { title: 'Site Condition Inspections', copy: 'Scheduled or requested inspections identifying physical defects, deterioration and emerging maintenance requirements before they escalate.' },
        ],
      },
      {
        type: 'section',
        title: 'Why Site Condition Is an Availability Issue',
        paragraphs: [
          "Site infrastructure degrades slowly and invisibly, then fails suddenly. A shelter that stops sealing lets dust into cabinets; dust degrades cooling; cooling failure takes equipment offline. Corrosion doesn't announce itself until an inspection finds a member has lost section. Regular civil maintenance is how those chains get interrupted while intervention is still cheap and the site is still safe to work on.",
        ],
      },
      { type: 'cta', copy: 'Need ongoing maintenance across your telecom sites?', label: 'Talk to Our Managed Services Team' },
      {
        type: 'section',
        id: 'power-energy',
        title: 'Power & Energy Management',
        paragraphs: [
          'Network availability depends on the power systems behind it. Ask any operations team where downtime originates and power features heavily battery strings past service life, rectifiers running beyond rated capacity, generators that failed to start when the grid dropped.',
          'Idarat TSO provides ongoing maintenance and operational support for power infrastructure serving telecom sites and other critical technical environments covering primary, backup and alternative power systems.',
        ],
      },
      {
        type: 'section',
        title: 'Power & Energy Capabilities',
        items: [
          { title: 'Rectifier & DC Power Systems', copy: 'Rectifier servicing, module testing, load verification and DC distribution inspection confirming systems still perform to rating rather than assuming they do.' },
          { title: 'Battery & Backup Systems', copy: 'Condition assessment, capacity verification, terminal and connection maintenance, and replacement planning. Batteries degrade predictably with heat and cycling testing shows where they are, not where the datasheet says.' },
          { title: 'Generator Systems', copy: "Inspection, servicing, start reliability verification and load testing where included in the managed scope. A generator that hasn't been load-tested is an assumption, not a backup." },
          { title: 'UPS Systems', copy: "Maintenance of uninterruptible power supply system's protecting critical technical equipment." },
          { title: 'Hybrid & Solar Power Systems', copy: 'Maintenance and performance checks across hybrid configurations including solar generation, controller function and system switching behavior.' },
          { title: 'Power Distribution', copy: 'Inspection and maintenance of distribution infrastructure, breakers, cabling and connections appropriate to the operating environment.' },
          { title: 'Power System Fault Response', copy: 'Investigation and corrective response to power-related faults affecting site or equipment availability.' },
        ],
      },
      { type: 'cta', copy: 'Need reliable power management across your network infrastructure?', label: 'Talk to Our Managed Services Team' },
      {
        type: 'section',
        id: 'spares',
        title: 'Spare Parts Management',
        paragraphs: [
          "Maintenance response can only move as fast as the parts required to complete it. A technician on site without the right module hasn't resolved anything they've scheduled a second visit.",
          'Idarat TSO can support spare parts management as part of managed technical operations, organizing the availability, movement and control of critical replacement materials. Integrated with field maintenance, structured spare management reduces delays between fault diagnosis and corrective intervention.',
        ],
      },
      {
        type: 'section',
        title: 'Spare Parts Capabilities',
        items: [
          { title: 'Spare Parts Inventory Management', copy: "Visibility into available spares by type, quantity and condition — knowing what's held and whether it's serviceable before a technician needs it." },
          { title: 'Storage & Stock Control', copy: 'Organized storage with maintained records, stock level monitoring and controlled handling of sensitive equipment.' },
          { title: 'Parts Issue & Return', copy: 'Controlled movement of parts to and from field operations, with issue records tied to the work order they support.' },
          { title: 'Field Parts Coordination', copy: 'Alignment of required replacement materials with maintenance and dispatch activity, so parts and technicians reach site together rather than sequentially.' },
          { title: 'Faulty Equipment Returns', copy: 'Management of the return flow for faulty or replaced equipment, including RMA handling where required — recovering value rather than writing modules off.' },
          { title: 'Inventory Reporting', copy: 'Reporting on stock levels, consumption patterns and movement — identifying high-failure items and informing replenishment before stockouts occur.' },
        ],
      },
      { type: 'cta', copy: 'Need better control of technical spares across your field operations?', label: 'Talk to Our Managed Services Team' },
      {
        type: 'section',
        id: 'resources',
        title: 'Managed Technical Resources',
        paragraphs: [
          'Idarat TSO provides technical resource support helping organizations access the skills and field capabilities required to operate, maintain and support complex technical environments.',
          'From individual specialists to full project and operational teams, our resource model strengthens internal capability, addresses technical skill gaps, and scales around changing operational demand.',
        ],
      },
      {
        type: 'section',
        title: 'Technical Resource Capabilities',
        items: [
          { title: 'Technical Resource Sourcing', copy: 'Identification and selection of technical professionals against defined role requirements RF, transmission, power, civil, NOC and field disciplines rather than generic headcount.' },
          { title: 'Project & Operational Staffing', copy: "Technical resources assigned to defined projects or ongoing operations, working to client priorities under Idarat TSO's employment and management structure." },
          { title: 'Field Resource Preparation', copy: 'Preparation of field personnel for assignment safety certification, tooling, PPE and site-readiness requirements completed before deployment rather than after arrival.' },
          { title: 'Technical Training & Development', copy: 'Structured technical training and skill development programs aligned to the disciplines and equipment the assignment requires.' },
          { title: 'On-the-Job Training (OJT)', copy: "Practical capability developed through supervised experience in live operating environments building competence that classroom training alone doesn't produce." },
          { title: 'Vendor Assessment Preparation', copy: "Preparation of technical resources for vendor qualification and assessment requirements, so personnel meet certification standards before they're needed on a vendor-managed program." },
          { title: 'Performance Management Support', copy: 'Ongoing supervision and performance oversight against defined responsibilities, targets and operational requirements.' },
        ],
      },
      { type: 'cta', copy: 'Need additional technical capacity for your operations?', label: 'Talk to Our Managed Technical Resources Team' },
    ],
  },
  'design-optimization': {
    id: 'design-optimization',
    nav: 'Design & Optimization',
    eyebrow: 'Design & Optimization',
    title: 'Design & Optimization Overview',
    lead: 'Idarat TSO provides technical design, network planning and optimization services for telecom infrastructure, supporting new deployments, network expansion and performance improvement across live networks.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Our approach brings network requirements, field conditions and performance data together to develop practical designs around coverage, capacity, transmission and site requirements.',
          'Good network performance starts before deployment. By combining engineering analysis with field data, we help clients make informed design decisions, validate network performance and identify opportunities for optimization as network requirements evolve.',
        ],
      },
      {
        type: 'section',
        title: 'Our Approach',
        steps: [
          { title: 'Assess & Define', copy: 'Establish network requirements, existing conditions, performance objectives and engineering constraints including what the current network delivers versus what it was designed to.' },
          { title: 'Plan & Design', copy: 'Develop radio, transmission and supporting network design around coverage, capacity and operational requirements engineered for the environment as it is, not as the propagation model assumes.' },
          { title: 'Measure & Analyze', copy: 'Collect and analyze field and network performance data to establish actual conditions, validate design assumptions and identify performance gaps.' },
          { title: 'Optimize & Verify', copy: 'Implement or recommend optimization actions, then evaluate performance against network objectives to confirm the improvement held.' },
        ],
      },
      {
        type: 'section',
        title: 'Scope',
        items: [
          { title: 'RF Planning & Coverage Design', copy: 'Radio network planning, coverage prediction, site design and frequency planning across network generations.', ...learn('rf') },
          { title: 'Transmission Planning', copy: 'Microwave path analysis, link budget design, fiber routing and transport network planning.', ...learn('transmission-planning') },
          { title: 'Capacity Planning & Network Dimensioning', copy: 'Traffic analysis, capacity forecasting and network dimensioning against demand growth.', ...learn('capacity') },
          { title: 'Site Surveys', copy: "Radio and technical site surveys establishing what's feasible at each location before design is finalized.", ...learn('surveys') },
          { title: 'Drive Testing & Benchmarking', copy: 'Field measurement of coverage, signal quality and network performance, including drive test post-processing and analysis.', ...learn('drive') },
          { title: 'Network Optimization', copy: 'Radio network planning and optimization (NPO), parameter tuning, transport optimization and KPI improvement.', ...learn('optimization') },
          { title: 'In-Building Coverage Design', copy: 'Indoor coverage system design for commercial, enterprise and high-density environments.', ...learn('ibs-design') },
        ],
      },
      {
        type: 'section',
        title: 'Design',
        paragraphs: [
          'A strong network design turns coverage, capacity and operational requirements into a technical plan that can be executed in the field.',
          'Idarat TSO develops practical network designs around network architecture, available infrastructure and technical constraints, providing rollout teams with the engineering information required for deployment, integration and acceptance.',
        ],
      },
      {
        type: 'section',
        title: 'Optimization & Field Data',
        paragraphs: [
          'Once a network is live, field measurements provide insight that planning models alone cannot. Idarat TSO uses site surveys, drive testing, post-processing and performance analysis to identify coverage gaps and areas requiring engineering attention.',
          "The objective isn't simply to collect data, but to understand what it says about network performance and where optimization can make a measurable difference.",
        ],
      },
      {
        type: 'section',
        title: 'Why Idarat TSO for Design & Optimization',
        why: [
          { title: 'Engineering Connected to Field Reality', copy: 'Network planning and engineering analysis combined with field measurement and practical deployment experience producing designs grounded in actual network conditions.' },
          { title: 'Design Through Optimization', copy: 'Support across the full engineering cycle: initial planning and design, field validation, and ongoing performance improvement once the network is live.' },
          { title: 'Radio & Transmission Expertise', copy: 'Radio and transport capabilities under one team, addressing coverage, capacity and connectivity requirements that are engineered together rather than in isolation.' },
          { title: 'Connected to Delivery', copy: "Design and optimization sit inside Idarat TSO's wider delivery model so engineering requirements connect directly to rollout, integration and field operations rather than being handed over as a document." },
        ],
      },
      {
        type: 'cta',
        copy: 'Talk to our Design & Optimization team about your network planning, coverage, capacity and performance requirements.',
        label: 'Talk to Our Design & Optimization Team',
      },
      {
        type: 'section',
        id: 'rf',
        title: 'RF Planning & Coverage Design',
        paragraphs: [
          'Idarat TSO provides radio network planning and RF design services for operators planning new coverage, expanding existing networks and improving radio network performance.',
          'Our engineers translate coverage, capacity and service requirements into practical radio network designs accounting for site locations, surrounding environment, existing infrastructure and network objectives before deployment begins.',
        ],
      },
      {
        type: 'section',
        title: 'RF Planning Capabilities',
        items: [
          { title: 'Coverage Planning & Prediction', copy: 'Coverage modelling against terrain, clutter and environment data producing predicted coverage footprints, identifying gaps and informing where sites are actually needed.' },
          { title: 'Site & Radio Planning', copy: 'Radio requirements developed around proposed or existing sites, including antenna height, orientation and sector configuration relative to the surrounding environment.' },
          { title: 'Radio Network Design', copy: 'Radio designs built around coverage footprint, capacity requirements and quality-of-service objectives across the planned area.' },
          { title: 'Frequency Planning', copy: 'Radio resource and Frequency Allocation Planning to support efficient spectrum use and control interference within the network.' },
          { title: 'Expansion & Modernization Planning', copy: 'Assessment of where additional coverage, capacity or radio infrastructure is required as networks grow, and technology generations evolve.' },
          { title: 'Design Documentation', copy: 'Coverage plots, site parameters and engineering documentation prepared to carry the approved design into acquisition, deployment and integration.' },
        ],
      },
      { type: 'cta', copy: 'Planning new coverage or expanding an existing radio network?', label: 'Talk to Our Design & Optimization Team' },
      {
        type: 'section',
        id: 'transmission-planning',
        title: 'Transmission Planning & Design',
        paragraphs: [
          'Radio sites depend on the transport network connecting them. Idarat TSO provides transmission planning and design services for site connectivity, network expansion and transport capacity requirements.',
          'Our engineering teams plan transmission around site connectivity, available infrastructure, bandwidth requirements and network architecture developing designs that move efficiently from engineering into implementation.',
        ],
      },
      {
        type: 'section',
        title: 'Transmission Planning Capabilities',
        items: [
          { title: 'Transport Network Planning', copy: 'Topology and connectivity planning between sites and network infrastructure, including chain and ring configuration according to resilience requirements.' },
          { title: 'Microwave Link Planning', copy: 'Path assessment and technical design for proposed microwave links, covering clearance requirements, antenna specification and hop configuration.' },
          { title: 'Link Budget Design', copy: 'Link parameter calculation and expected performance assessment establishing whether a proposed link meets availability targets under real conditions.' },
          { title: 'Fiber Network Planning & Dimensioning', copy: 'Fiber infrastructure planning and sizing against connectivity and bandwidth requirements, including capacity headroom for growth.' },
          { title: 'Fiber Route Planning', copy: 'Route development around network architecture, site locations and available infrastructure, with distance and loss considerations.' },
          { title: 'Transmission Expansion Planning', copy: 'Transport requirements identified for new sites, added capacity and modernization programs before the transport layer becomes the constraint.' },
          { title: 'Design Documentation', copy: 'Technical documentation supporting transmission rollout, integration and acceptance.' },
        ],
      },
      { type: 'cta', copy: 'Planning new transmission infrastructure or expanding network capacity?', label: 'Talk to Our Design & Optimization Team' },
      {
        type: 'section',
        id: 'capacity',
        title: 'Network Dimensioning & Capacity Planning',
        paragraphs: [
          'Network requirements change as traffic, users and services grow. Capacity planning determines where network resources need to expand before demand starts degrading performance.',
          'Idarat TSO supports network planning and dimensioning by assessing network requirements, available capacity and expected demand helping clients size infrastructure around current and future operational needs.',
        ],
      },
      {
        type: 'section',
        title: 'Planning Capabilities',
        items: [
          { title: 'Network Capacity Assessment', copy: 'Review of available capacity across radio and transport layers against current operational requirements and service levels.' },
          { title: 'Traffic Analysis', copy: 'Analysis of demand patterns and utilization to identify where the network is approaching capacity constraints and which specific elements, since congestion is rarely uniform.' },
          { title: 'Capacity Forecasting', copy: 'Growth projection against expected subscriber, traffic and service evolution, establishing when capacity thresholds will be reached.' },
          { title: 'Network Dimensioning', copy: 'Calculation of infrastructure and capacity requirements to meet expected demand at target quality levels.' },
          { title: 'Expansion Requirements', copy: 'Identification of where additional resources are needed carrier addition, sector configuration, new sites or transport capacity matched to the actual constraint rather than a default solution.' },
          { title: 'Capacity & Coverage Alignment', copy: 'Capacity requirements planned alongside coverage objectives, so expansion addresses reach and demand together rather than solving one and creating a problem in the other.' },
          { title: 'Planning Ahead of Demand', copy: 'Effective network dimensioning helps identify capacity requirements before they begin affecting network performance, giving clients a clearer basis for planning infrastructure expansion and future investment.' },
        ],
      },
      { type: 'cta', copy: 'Planning for network growth?', label: 'Talk to Our Design & Optimization Team' },
      {
        type: 'section',
        id: 'surveys',
        title: 'Site Surveys (Radio & Technical)',
        paragraphs: [
          'Before a network design moves into deployment, engineers need a clear picture of the environment it will be built in.',
          'Idarat TSO provides site survey support collecting the technical and field information required for planning, design and rollout preparation identifying site conditions and constraints before implementation begins.',
        ],
      },
      {
        type: 'section',
        title: 'Site Survey Capabilities',
        items: [
          { title: 'Radio Site Surveys', copy: 'Assessment of antenna mounting positions, available height, clearance and surrounding obstruction affecting the proposed coverage design.' },
          { title: 'Technical Site Surveys (TSS)', copy: 'Review of site layout, available space, equipment room condition, cable routes and mounting options affecting installation.' },
          { title: 'Site Infrastructure Assessment', copy: 'Documentation of existing infrastructure, structural arrangements, access conditions and site characteristics relevant to engineering review.' },
          { title: 'Power & Supporting Infrastructure Review', copy: 'Assessment of available power supply, capacity headroom and earthing arrangements were required by the design scope.' },
          { title: 'Installation Feasibility', copy: "Identification of physical and technical constraints that should shape the design before it's finalized access limitations, space restrictions, structural considerations." },
          { title: 'Survey Documentation', copy: 'Structured survey records with measurements, photographs and identified constraints, prepared in a format engineering and rollout teams can work from directly.' },
          { title: 'Better Information Before Deployment', copy: 'Identifying site constraints during the survey stage helps engineering and rollout teams address potential issues before field deployment begins.' },
        ],
      },
      { type: 'cta', copy: 'Need field information before finalizing your network design?', label: 'Talk to Our Design & Optimization Team' },
      {
        type: 'section',
        id: 'drive',
        title: 'Drive Testing & Benchmarking',
        paragraphs: [
          'Planning models predict how a network should perform. Drive testing measures how it performs across real operating environments.',
          'Idarat TSO provides drive testing and post-processing services, collecting, analyzing and interpreting radio network data to evaluate coverage, capacity and performance, and identify where optimization is required.',
        ],
      },
      {
        type: 'section',
        title: 'Driving Testing Capabilities',
        items: [
          { title: 'Network Drive Testing', copy: 'Field measurement across defined routes and coverage areas, capturing signal level, quality and performance data under real conditions.' },
          { title: 'Coverage Measurement', copy: 'Measured coverage footprint compared against predicted, identifying weak-signal areas, dead zones and inconsistent service.' },
          { title: 'Signal Quality Analysis', copy: 'Assessment of measured radio conditions signal quality, interference indicators and the parameters that separate usable coverage from merely present coverage.' },
          { title: 'Drive Test Post-Processing', copy: 'Processing of collected data into coverage plots, statistical analysis and problem-area identification turning log files into engineering information.' },
          { title: 'Performance Issue Identification', copy: 'Field data used to locate coverage gaps, quality problems and areas needing further engineering investigation.' },
          { title: 'Before & After Verification', copy: 'Comparative measurement around optimization or network changes, establishing whether the intended improvement was delivered.' },
          { title: 'Network Benchmarking', copy: 'Comparative performance measurement across defined areas, technologies or networks according to the agreed benchmarking scope.' },
        ],
      },
      { type: 'cta', copy: 'Need a clearer picture of real network performance?', label: 'Talk to Our Design & Optimization Team' },
      {
        type: 'section',
        id: 'optimization',
        title: 'Network Optimization',
        paragraphs: [
          'Network performance shifts as traffic patterns, infrastructure and operating conditions change. Optimization uses network and field data to identify performance issues and determine where engineering changes improve coverage, capacity and quality of service.',
          'Idarat TSO provides radio and transport network optimization, combining performance analysis with field measurement to improve what existing infrastructure delivers.',
        ],
      },
      {
        type: 'section',
        title: 'Network Optimization Capabilities',
        items: [
          { title: 'Radio Network Planning & Optimization (NPO)', copy: 'Radio network performance analysis identifying opportunities to improve coverage footprint, capacity utilization and quality of service.' },
          { title: 'Coverage Optimization', copy: 'Investigation of coverage gaps, weak-service areas, overshooting cells and pilot pollution using network counters and field measurement.' },
          { title: 'Capacity Optimization', copy: 'Identification of cells and areas where traffic and resource utilization require engineering attention including load balancing between cells and carriers.' },
          { title: 'Performance Analysis', copy: 'KPI and counter analysis identifying degradation trends, underperforming elements and recurring problem patterns across the network.' },
          { title: 'Drive-Test Analysis', copy: 'Field measurement and post-processing results applied to optimization decisions and used to validate network conditions against reported KPIs.' },
          { title: 'Radio Parameter Optimization', copy: 'Parameter adjustment power settings, handover thresholds, neighbor relations and timers recommended or implemented as agreed with the client.' },
          { title: 'Transport Network Optimization', copy: 'Transport layer performance assessment, identifying capacity, latency and resilience improvements across the backhaul network.' },
        ],
      },
      { type: 'cta', copy: 'Looking to improve coverage, capacity or network performance?', label: 'Talk to Our Design & Optimization Team' },
      {
        type: 'section',
        id: 'ibs-design',
        title: 'In-Building Coverage Design',
        paragraphs: [
          'Building materials, layout and surrounding network conditions significantly affect indoor mobile coverage. Reinforced concrete, coated glass, basements and deep floor plates all attenuate signal often far more than outdoor planning assumptions account for.',
          'Idarat TSO supports the planning and design of in-building telecom solutions, connecting site conditions, coverage requirements and selected technologies into practical indoor coverage designs.',
        ],
      },
      {
        type: 'section',
        title: 'In-Building Design Capabilities',
        items: [
          { title: 'Indoor Coverage Assessment', copy: 'Measurement of existing indoor signal conditions and identification of areas where coverage improvement is required including donor signal availability where the solution depends on it.' },
          { title: 'Site & Building Assessment', copy: "Review of building construction, layout, floor arrangement and technical constraints relevant to the proposed solution." },
          { title: 'Coverage Requirements & Design', copy: "Technical design developed around required coverage zones, expected usage patterns and the building's actual physical conditions." },
          { title: 'Equipment & Infrastructure Planning', copy: 'Equipment locations, antenna positioning and supporting infrastructure defined according to the selected in-building solution.' },
          { title: 'Cabling & Passive Infrastructure Design', copy: 'Cable routing, passive component layout and supporting infrastructure planned for practical installation.' },
          { title: 'Design Documentation', copy: 'Engineering documentation, layouts and specifications required to move the approved design into deployment.' },
          { title: 'Coverage Verification Planning', copy: 'Definition of the measurements and validation activities required after implementation to confirm coverage was delivered.' },
        ],
      },
      { type: 'cta', copy: 'Planning better mobile coverage inside your facilities?', label: 'Talk to Our Design & Optimization Team' },
    ],
  },
  'logistics-support': {
    id: 'logistics-support',
    nav: 'Logistics & Support Services',
    eyebrow: 'Logistics & Support Services',
    title: 'Logistics & Support Services Overview',
    lead: 'Idarat TSO provides logistics, material management and operational support services that keep technical projects and field operations supplied with the equipment and materials they need.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Our capabilities cover the movement, handling, storage and control of technical materials from receiving and inspection through warehousing, inventory management, packing and transportation.',
          'By coordinating these activities around project and field requirements, Idarat TSO helps maintain material visibility and ensure equipment reaches the right location when it is needed.',
        ],
      },
      {
        type: 'section',
        title: 'Our Approach',
        steps: [
          { title: 'Receive & Inspect', copy: 'Materials received, checked against documentation and inspected for condition, quantity and completeness before entering stock.' },
          { title: 'Store & Control', copy: 'Materials organized in appropriate storage conditions with inventory records maintained to provide visibility into what is held, where it is stored and its current status.' },
          { title: 'Prepare & Handle', copy: 'Equipment packed, kitted and prepared according to its handling characteristics and destination requirements.' },
          { title: 'Dispatch & Deliver', copy: 'Transportation coordinated to project locations and technical sites in line with field and project requirements.' },
          { title: 'Track & Reconcile', copy: 'Material movement, delivery and inventory changes recorded to maintain visibility from storage through dispatch and delivery.' },
        ],
      },
      {
        type: 'section',
        title: 'Scope',
        paragraphs: [
          "Idarat TSO's logistics capabilities cover the physical flow and control of technical materials across projects and ongoing field operations.",
        ],
        items: [
          { title: 'Storage & Warehousing', copy: 'Secure, organized storage for technical equipment and materials protected, accessible and ready to move into projects and field operations.', ...learn('warehousing') },
          { title: 'Inventory Management', copy: 'Stock control and material tracking maintaining visibility into levels, availability, condition and movement across the managed inventory.', ...learn('inventory') },
          { title: 'Material Packing & Handling', copy: 'Packing, kitting and handling of technical equipment to protect it through storage, movement and transport to site.', ...learn('packing') },
          { title: 'Delivery & Transportation', copy: 'Movement of equipment and materials between warehouses, project locations and operational sites according to delivery requirements.', ...learn('delivery') },
          { title: 'Fleet Management', copy: 'Vehicle coordination for field and operational requirements, covering the transport resources teams need across project locations.', ...learn('fleet') },
          { title: 'Inspection & Quality Assurance', copy: 'Inspection of incoming and outgoing materials against defined requirements identifying condition, quantity or specification issues before equipment reaches deployment.', ...learn('inspection') },
          { title: 'Reverse Logistics & RMA Management', copy: 'Recovery of surplus, replaced and faulty equipment from site, with returns routed to repair, vendor RMA or redeployment.', ...learn('reverse') },
        ],
      },
      {
        type: 'section',
        title: 'Technical Logistics',
        paragraphs: [
          "Technical equipment isn't general freight. Radio units, transmission equipment, batteries and passive components can carry specific handling, protection, storage and delivery requirements that need to be considered throughout the logistics process.",
          "Idarat TSO's logistics capability sits within its wider Technical Services Operations model, connecting material movement with the practical requirements of rollout, maintenance and field operations.",
          'This helps ensure logistics is planned around the technical activity it supports — from how equipment is stored and prepared to when and where it is delivered.',
        ],
      },
      {
        type: 'section',
        title: 'Material Control',
        paragraphs: [
          'Material availability directly affects field execution. Missing equipment, incorrect quantities or deliveries to the wrong location can delay activity even when engineering and field resources are ready.',
          'By connecting inventory visibility with material handling and transportation, Idarat TSO helps clients maintain greater control over where technical materials are stored, how they move and when they reach the required destination.',
        ],
      },
      {
        type: 'section',
        title: 'Why Idarat TSO',
        why: [
          { title: 'Connected to Technical Delivery', copy: 'Logistics and material support sit inside the wider Idarat TSO delivery model, connecting equipment movement directly to rollout, maintenance and field requirements.' },
          { title: 'Material Visibility & Control', copy: 'Structured inventory, storage and material-management processes that maintain a reliable position on technical materials as they move through operations.' },
          { title: 'Field-Oriented Support', copy: "Logistics coordinated around the practical realities of project locations and field schedules, so resources reach the point of execution when they're needed." },
          { title: 'Flexible Operational Support', copy: 'Support is scaled to project size, location and operational requirement from defined logistics activities to broader material-management scopes.' },
        ],
      },
      {
        type: 'cta',
        copy: 'Talk to our Logistics & Support Services team about your material management, warehousing, inventory and field logistics requirements.',
        label: 'Talk to Our Logistics & Support Services Team',
      },
      {
        type: 'section',
        id: 'fleet',
        title: 'Fleet Sourcing & Management',
        paragraphs: [
          "Field operations depend on the right vehicles being available particularly when technical teams work across multiple sites, changing schedules and locations that ordinary vehicles can't reach.",
          'Idarat TSO provides fleet sourcing and operational support for technical and field activities, coordinating vehicle requirements around project scope, workforce deployment and geographic coverage.',
        ],
      },
      {
        type: 'section',
        title: 'Fleet Support Capabilities',
        items: [
          { title: 'Fleet Sourcing', copy: 'Vehicles sourced against operational requirements matched to terrain; load capacity, crew size and the access conditions sites present.' },
          { title: 'Vehicle Allocation & Coordination', copy: 'Vehicles assigned across teams, locations and activities, coordinated with field schedules so transport availability matches when crews need to move.' },
          { title: 'Field Operations Support', copy: 'Transport resources aligned to the practical mobility demands of dispersed technical teams working across changing site locations.' },
          { title: 'Fleet Utilization Monitoring', copy: 'Visibility into allocation and utilization across supported operations identifying under-used vehicles and coverage gaps.' },
          { title: 'Vehicle Maintenance Coordination', copy: 'Scheduled servicing and repair coordination, supporting vehicle availability across field operations.' },
          { title: 'Fleet Performance & Reporting', copy: 'Fleet records and operational reporting maintained to the agreed scope, supporting planning and cost visibility.' },
        ],
      },
      { type: 'cta', copy: 'Need fleet support for your field operations?', label: 'Talk to Our Logistics & Support Services Team' },
      {
        type: 'section',
        id: 'warehousing',
        title: 'Storage & Warehousing',
        paragraphs: [
          "Technical equipment needs to stay protected, organized and findable from the moment it enters storage until the day it's required at site.",
          'Idarat TSO provides storage and warehousing for technical equipment and materials keeping stock organized and prepared for efficient movement into projects and field operations.',
        ],
      },
      {
        type: 'section',
        title: 'Warehousing Capabilities',
        items: [
          { title: 'Material Receiving', copy: 'Incoming equipment checked against documentation and located systematically on receipt, so what enters the warehouse can be found later without searching.' },
          { title: 'Storage & Organization', copy: 'Materials arranged by type, project allocation or movement frequency supporting efficient retrieval while reducing unnecessary handling.' },
          { title: 'Material Identification', copy: 'Location and identification records maintained per item, giving a reliable position on where specific material sits within the warehouse.' },
          { title: 'Stock Movement', copy: 'Movement into, within and out of storage controlled and recorded, helping maintain accurate stock positions.' },
          { title: 'Material Preparation', copy: 'Stored material prepared for issue, packing, transport or project dispatch ahead of mobilization.' },
          { title: 'Warehouse Records & Reporting', copy: 'Receiving, storage and movement records maintained to the agreed scope, supporting inventory visibility across held material.' },
        ],
      },
      { type: 'cta', copy: 'Looking for warehousing support for technical equipment and materials?', label: 'Talk to Our Logistics & Support Services Team' },
      {
        type: 'section',
        id: 'inventory',
        title: 'Inventory Management',
        paragraphs: [
          "Technical operations depend on accurate material visibility. Without reliable records, equipment can exist somewhere in the supply chain and still be unavailable to the team that needs it, which is functionally the same as not having it.",
          'Idarat TSO provides inventory management services maintaining visibility and control over technical materials as they move through storage and into field operations.',
        ],
      },
      {
        type: 'section',
        title: 'Inventory Management Capabilities',
        items: [
          { title: 'Stock Recording & Control', copy: 'Records maintained across material received, held, issued and transferred including condition and allocation status, not just quantity.' },
          { title: 'Material Identification & Location', copy: 'Storage location tracked per item, supporting efficient retrieval across the warehouse.' },
          { title: 'Stock-Level Visibility', copy: 'Available quantities and material status visible across the managed scope, helping identify potential shortfalls before planned field activity.' },
          { title: 'Inventory Reconciliation', copy: 'Physical stock compared against records with discrepancies investigated to maintain inventory accuracy.' },
          { title: 'Material Movement Tracking', copy: 'Movement recorded storage locations, projects and operational destinations, maintaining traceability across the managed material flow.' },
          { title: 'Inventory Reporting', copy: 'Reporting on stock position, movement and consumption to the agreed scope, supporting material planning and operational decisions.' },
        ],
      },
      { type: 'cta', copy: 'Need greater visibility and control over your technical inventory?', label: 'Talk to Our Logistics & Support Services Team' },
      {
        type: 'section',
        id: 'packing',
        title: 'Material Packing & Handling',
        paragraphs: [
          'Technical material passes through multiple handling points before reaching site receiving, storage, preparation, loading, transport and unloading. Appropriate packing and handling help protect equipment throughout this movement.',
          'Idarat TSO provides packaging and handling for technical equipment and components, preparing material for safe and organized movement between warehouses, projects and field locations.',
        ],
      },
      {
        type: 'section',
        title: 'Packing & Handling Capabilities',
        items: [
          { title: 'Material Preparation', copy: "Equipment prepared for storage, transfer or delivery according to its handling characteristics and where it's going." },
          { title: 'Packing & Protection', copy: 'Protective packing matched to the material and the journey with appropriate protection against shock, moisture and other handling conditions.' },
          { title: 'Kitting', copy: 'Equipment, components and accessories grouped by project, site or work package helping field teams receive organized material for the required activity.' },
          { title: 'Loading & Unloading Support', copy: 'Materials handled through receiving, dispatch and transport according to agreed procedures, with load preparation that accounts for weight, stacking and site handling requirements.' },
          { title: 'Material Identification', copy: 'Labelling and documentation maintained through movement, supporting correct identification and delivery on arrival.' },
          { title: 'Special Handling', copy: 'Additional handling for sensitive, heavy or specialized equipment where required including ESD-sensitive electronics and battery systems.' },
          { title: 'Prepared for Field Execution', copy: 'Kitting and organized material preparation can simplify field delivery by grouping the equipment and components required for a specific project, site or work package. Materials that arrive properly packed, identified and organized are easier for field teams to receive and move into execution.' },
        ],
      },
      { type: 'cta', copy: 'Need packing and handling support for technical equipment?', label: 'Talk to Our Logistics & Support Services Team' },
      {
        type: 'section',
        id: 'delivery',
        title: 'Delivery & Transportation',
        paragraphs: [
          'Delivery timing matters as much as delivery itself. Technical equipment needs to reach project and operational locations in line with field requirements and delivery schedules.',
          'Idarat TSO provides delivery and transportation for technical equipment and materials, coordinating movement between storage locations, project sites and operational facilities.',
        ],
      },
      {
        type: 'section',
        title: 'Delivery & Transportation Capabilities',
        items: [
          { title: 'Warehouse-to-Site Delivery', copy: 'Material moved from storage to technical and project sites according to site access and delivery requirements.' },
          { title: 'Inter-Site Transportation', copy: 'Equipment moved between project locations and operational sites, including repositioning stock closer to where it will next be required.' },
          { title: 'Delivery Coordination', copy: 'Transport planned around destination conditions, material requirements and field schedules, helping align delivery with site requirements.' },
          { title: 'Loading & Dispatch Support', copy: 'Materials are prepared and loaded for dispatch, with load planning that supports efficient transportation while protecting equipment.' },
          { title: 'Delivery Documentation', copy: 'Dispatch, receipt and delivery confirmation records maintained, supporting traceability through handover.' },
          { title: 'Specialized Transportation', copy: 'Transport arranged for equipment requiring specific vehicles, handling or delivery conditions.' },
        ],
      },
      { type: 'cta', copy: 'Need reliable transportation for technical materials and equipment?', label: 'Talk to Our Logistics & Support Services Team' },
      {
        type: 'section',
        id: 'inspection',
        title: 'Material Inspection & Quality Assurance',
        paragraphs: [
          'Material issues are easier to address before equipment enters deployment. Inspection helps identify visible damage, quantity discrepancies and other non-conformities before materials move further into technical operations.',
          'Idarat TSO provides inspection and quality assurance within its material-management scope, verifying equipment and materials against defined requirements at receiving, storage or dispatch.',
        ],
      },
      {
        type: 'section',
        title: 'Inspection & Quality Assurance Capabilities',
        items: [
          { title: 'Incoming Material Inspection', copy: 'Received materials checked for visible condition, quantity and completeness against documentation before acceptance into stock.' },
          { title: 'Outgoing Material Inspection', copy: 'Materials verified before dispatch confirming the correct equipment and quantities leave for the intended destination.' },
          { title: 'Documentation Verification', copy: 'Delivery notes, packing lists and order documentation checked against physical items received or dispatched.' },
          { title: 'Condition Assessment', copy: 'Visible damage, packaging failure and transit-related issues identified and recorded.' },
          { title: 'Non-Conformance Reporting', copy: 'Discrepancies and defects documented against agreed quality procedures.' },
          { title: 'Material Release & Records', copy: 'Inspection records maintained and release controls applied before material progresses to the next operational stage.' },
          { title: 'Quality Before Deployment', copy: 'Inspection provides a control point before materials move further into technical operations, helping identify visible damage, quantity discrepancies and other non-conformities at an earlier stage. Connecting inspection with warehousing, inventory and material handling helps maintain greater control over the equipment moving toward field deployment.' },
        ],
      },
      { type: 'cta', copy: 'Need stronger material inspection and quality controls?', label: 'Talk to Our Logistics & Support Services Team' },
      {
        type: 'section',
        id: 'reverse',
        title: 'Reverse Logistics & RMA Management',
        paragraphs: [
          'Material flow doesn\'t end at installation. Faulty, replaced, surplus and recoverable equipment may need to move back from field locations for assessment, repair, return, redeployment or disposal.',
          'Idarat TSO can support reverse material flows by coordinating the recovery, tracking and routing of technical equipment from field locations through the appropriate process.',
        ],
      },
      {
        type: 'section',
        title: 'Reverse Logistics Capabilities',
        items: [
          { title: 'Equipment Recovery', copy: 'Collection and recording of faulty, replaced or surplus equipment from technical sites.' },
          { title: 'Return Tracking', copy: 'Visibility over returned equipment as it moves from site to warehouse, repair facility or vendor.' },
          { title: 'RMA Coordination', copy: 'Return Material Authorization workflows managed for equipment requiring vendor repair, replacement or assessment including documentation and status tracking.' },
          { title: 'Faulty & Recovered Stock Control', copy: 'Returned equipment segregated and tracked by condition and next required action, helping prevent faulty stock from being reissued as serviceable.' },
          { title: 'Repair & Vendor Routing', copy: 'Equipment routed to approved repair facilities or vendors, with movement recorded through the repair process.' },
          { title: 'Redeployment of Serviceable Equipment', copy: 'Eligible equipment returned to available inventory for future operational use.' },
          { title: 'Disposal Coordination', copy: 'Approved disposal processes coordinated for equipment beyond repair or reuse, where included in scope.' },
        ],
      },
      { type: 'cta', copy: 'Need greater control over returned and recovered technical equipment?', label: 'Talk to Our Logistics & Support Services Team' },
    ],
  },
}

export function getTsoSection(id: string | null): TsoSection {
  if (id && id in tsoSections) return tsoSections[id as TsoSectionId]
  return tsoSections.overview
}
