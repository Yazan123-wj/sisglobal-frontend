import type { TsoBlock } from '@/data/tsoPages'

export type IctSectionId =
  | 'overview'
  | 'solutions-services'
  | 'products-supply'
  | 'how-we-deliver'
  | 'connectivity'
  | 'data-centers'
  | 'smart-cities'
  | 'intelligent-ops'
  | 'audiovisual'
  | 'physical-security'
  | 'hardware'
  | 'printing'
  | 'software'

export type IctSection = {
  id: IctSectionId
  nav: string
  eyebrow: string
  title: string
  lead: string
  blocks: TsoBlock[]
}

const to = (id: IctSectionId) => `/what-we-do/ict/${id}`
const explore = (id: IctSectionId, title: string) => ({ label: `Explore ${title}`, to: to(id) })
const learn = (id: IctSectionId) => ({ cta: 'Learn More', href: to(id) })
const inner = (parent: IctSectionId, id: string) => ({
  cta: 'Learn More',
  href: `/what-we-do/ict/${parent}/${id}`,
})
const services = (
  parent: IctSectionId,
  title: string,
  cards: { id: string; title: string; copy: string }[],
): TsoBlock => ({
  type: 'section',
  title,
  items: cards.map((card) => ({ title: card.title, copy: card.copy, ...inner(parent, card.id) })),
})
const talk = (copy?: string, title?: string): TsoBlock => ({
  type: 'cta',
  title,
  copy: copy ?? 'Whether you need a fully integrated solution or a reliable supply of technology products, Identiti ICT brings the expertise, partnerships and delivery capability to support your requirements.',
  label: 'Talk to Our ICT Team',
})

export const ictNav: { id: IctSectionId; label: string }[] = [
  { id: 'overview', label: 'ICT Overview' },
  { id: 'connectivity', label: 'Connectivity & Network Infrastructure' },
  { id: 'data-centers', label: 'Data Centers & Cybersecurity' },
  { id: 'smart-cities', label: 'Smart Cities & Buildings' },
  { id: 'intelligent-ops', label: 'Intelligent Operations & Automation' },
  { id: 'audiovisual', label: 'Audiovisual & Digital Experience' },
  { id: 'physical-security', label: 'Physical Security Solutions' },
  { id: 'hardware', label: 'Hardware, Devices & IT Infrastructure' },
  { id: 'printing', label: 'Printing, Imaging & Data Capture' },
  { id: 'software', label: 'Software, Cloud & Licensing' },
]

export const ictOverviewNav: { id: IctSectionId; label: string }[] = [
  { id: 'overview', label: 'ICT Overview' },
  { id: 'solutions-services', label: 'Solutions & Services' },
  { id: 'products-supply', label: 'Products & Supply' },
  { id: 'how-we-deliver', label: 'How We Deliver' },
]

const ictProductIds: IctSectionId[] = ['hardware', 'printing', 'software']
export const ictProductNav = ictNav.filter((item) => ictProductIds.includes(item.id))
export const ictSolutionNav = ictNav.filter((item) => item.id !== 'overview' && !ictProductIds.includes(item.id))

export const ictInnerNav: Partial<Record<IctSectionId, { id: string; label: string }[]>> = {
  connectivity: [
    { id: 'connectivity-overview', label: 'Connectivity Overview' },
    { id: 'enterprise-networking', label: 'Enterprise Networking' },
    { id: 'enterprise-wifi', label: 'Enterprise Wi-Fi' },
    { id: 'indoor-cellular', label: 'Indoor Cellular Connectivity' },
    { id: 'structured-cabling', label: 'Structured Cabling & Fiber' },
    { id: 'network-design', label: 'Network Design, Integration & Support' },
  ],
  'data-centers': [
    { id: 'data-centers-overview', label: 'Overview' },
    { id: 'dc-infrastructure', label: 'Data Center Infrastructure' },
    { id: 'compute-storage', label: 'Compute & Storage' },
    { id: 'backup-recovery', label: 'Backup & Recovery' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'identity-access', label: 'Identity & Access' },
    { id: 'security-operations', label: 'Security Operations & IT/OT' },
  ],
  'smart-cities': [
    { id: 'smart-cities-overview', label: 'Overview' },
    { id: 'smart-city-infrastructure', label: 'Smart City Infrastructure' },
    { id: 'smart-buildings', label: 'Smart Buildings & BMS' },
    { id: 'iot-operations', label: 'IoT & Predictive Operations' },
    { id: 'energy-utilities', label: 'Energy & Utilities' },
    { id: 'digital-twins', label: 'Digital Twins' },
  ],
  'intelligent-ops': [
    { id: 'intelligent-ops-overview', label: 'Overview' },
    { id: 'command-control', label: 'Command & Control' },
    { id: 'ai-vision', label: 'AI Vision & Edge Analytics' },
    { id: 'process-automation', label: 'Process Automation' },
    { id: 'systems-integration', label: 'Systems Integration' },
  ],
  audiovisual: [
    { id: 'audiovisual-overview', label: 'Overview' },
    { id: 'av-design', label: 'AV System Integration' },
    { id: 'video-walls', label: 'Video Walls & Control Rooms' },
    { id: 'meeting-rooms', label: 'Meeting & Collaboration' },
    { id: 'digital-signage', label: 'Digital Signage & Interactive Displays' },
    { id: 'professional-audio', label: 'Professional Audio' },
  ],
  'physical-security': [
    { id: 'physical-security-overview', label: 'Overview' },
    { id: 'cctv', label: 'CCTV & AI Video Analytics' },
    { id: 'access-control', label: 'Access Control & Entry Management' },
    { id: 'intrusion-perimeter', label: 'Intrusion & Perimeter Security' },
    { id: 'vehicle-barrier', label: 'Vehicle & Barrier Security' },
    { id: 'security-management', label: 'Integrated Security Management' },
  ],
  hardware: [
    { id: 'hardware-overview', label: 'Overview' },
    { id: 'end-user-computing', label: 'End-User Computing' },
    { id: 'workstations-displays', label: 'Workstations, Displays & Peripherals' },
    { id: 'servers-storage', label: 'Servers, Storage & Data Center Products' },
    { id: 'networking-power', label: 'Networking, Power & Supporting Infrastructure' },
    { id: 'technology-brands', label: 'Technology Brands' },
  ],
  printing: [
    { id: 'printing-overview', label: 'Overview' },
    { id: 'business-printing', label: 'Business & Enterprise Printing' },
    { id: 'document-scanning', label: 'Document Scanning & Imaging' },
    { id: 'large-format', label: 'Large-Format & Specialized Printing' },
    { id: 'barcode-capture', label: 'Barcode, Label & Data Capture' },
    { id: 'featured-printing', label: 'Featured Technology' },
  ],
  software: [
    { id: 'software-overview', label: 'Overview' },
    { id: 'productivity-licensing', label: 'Productivity & Enterprise Licensing' },
    { id: 'cloud-platforms', label: 'Cloud Platforms' },
    { id: 'security-protection', label: 'Security & Data Protection' },
    { id: 'infrastructure-apps', label: 'Infrastructure & Business Applications' },
    { id: 'featured-software', label: 'Featured Platform' },
  ],
}

export function isIctInner(parent: string | null | undefined, innerId: string | null | undefined) {
  if (!parent || !innerId || innerId.endsWith('-overview')) return false
  return Boolean(ictInnerNav[parent as IctSectionId]?.some((item) => item.id === innerId))
}

export const ictSections: Record<IctSectionId, IctSection> = {
  overview: {
    id: 'overview',
    nav: 'ICT Overview',
    eyebrow: 'ICT Overview',
    title: 'Your Integrated ICT Partner',
    lead: 'Identiti ICT, the technology solutions and supply arm of SIS Global, delivers integrated ICT solutions and technology products to organizations across Saudi Arabia and the region.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Since 2007, we have supported enterprises, government entities and growing businesses with the technology they need to connect, protect, automate and grow, from network infrastructure and cybersecurity to smart buildings, physical security, audiovisual systems and end-to-end technology supply.',
          'Whether you need a fully integrated solution or a reliable supply of technology products, Identiti ICT brings the expertise, partnerships and delivery capability to support your requirements.',
        ],
      },
      {
        type: 'stats',
        title: 'ICT at a Glance',
        items: [
          { value: '19+', label: 'Years of ICT Expertise' },
          { value: '200+', label: 'Clients Served' },
          { value: '20,000+', label: 'Devices Supplied' },
          { value: '18+', label: 'Technology Brand Partners' },
        ],
      },
      {
        type: 'section',
        title: 'Why Identiti ICT?',
        why: [
          { title: 'End-to-End ICT Capability', copy: 'Bring solution design, technology supply, integration, deployment and support together through one ICT partner.' },
          { title: 'Solutions Built Around Your Requirements', copy: 'Receive technology designed around your operating environment, existing infrastructure and business priorities not a predefined product or vendor.' },
          { title: 'Local Understanding, Regional Reach', copy: 'Benefit from local market understanding supported by SIS Global’s regional presence and operational capabilities.' },
          { title: 'Flexible & Scalable Delivery', copy: 'Engage Identiti for a focused technology requirement, a multi-system integration project or a wider infrastructure modernization program.' },
        ],
      },
      { type: 'partners', title: 'Technology Partners' },
      talk(undefined, 'Your Integrated ICT Partner'),
    ],
  },
  'solutions-services': {
    id: 'solutions-services',
    nav: 'Solutions & Services',
    eyebrow: 'Solutions & Services',
    title: 'Solutions & Services',
    lead: 'Identiti ICT designs integrate and supports technology solutions across six capability areas, each built around real operational requirements and delivered with the expertise to make them perform.',
    blocks: [
      {
        type: 'section',
        title: 'Technology That Works. Solutions That Last.',
        items: [
          { title: 'Connectivity & Network Infrastructure', copy: 'Build the foundation your organization runs on. From enterprise networking and Wi-Fi to indoor cellular coverage and structured cabling, we design, implement and support the connectivity infrastructure that keeps your operations moving.', ...learn('connectivity') },
          { title: 'Data Centers & Cybersecurity', copy: 'Protect your infrastructure and your data. We support organizations with data center design, compute and storage solutions, backup and disaster recovery, and a comprehensive range of cybersecurity capabilities, from architecture and identity management to threat monitoring and IT/OT security.', ...learn('data-centers') },
          { title: 'Smart Cities & Buildings', copy: 'Connect your infrastructure to intelligence. Identiti ICT integrates smart building systems, IoT platforms, energy management and digital twin capabilities to help cities, campuses and facilities operate more efficiently and sustainably.', ...learn('smart-cities') },
          { title: 'Intelligent Operations & Automation', copy: 'Turn data into decisions. We implement unified command and control platforms, operational intelligence systems, business process automation and AI-driven workflows that help organizations reduce manual effort, respond faster and operate with greater precision.', ...learn('intelligent-ops') },
          { title: 'Audiovisual & Digital Experience', copy: 'Design spaces that communicate. From control rooms and video walls to meeting room technology, digital signage and professional audio systems, we deliver AV and digital experience solutions that support collaboration, communication and operational awareness.', ...learn('audiovisual') },
          { title: 'Physical Security Solutions', copy: 'Secure your people, assets and facilities. Identiti ICT integrates comprehensive physical security systems, from CCTV, access control and intrusion detection to perimeter security, under-vehicle surveillance and integrated physical security management platforms.', ...learn('physical-security') },
        ],
      },
    ],
  },
  'products-supply': {
    id: 'products-supply',
    nav: 'Products & Supply',
    eyebrow: 'Products & Supply',
    title: 'Technology Products & Supply',
    lead: 'The Right Technology. From the Right Partners.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Identiti ICT supports enterprise technology procurement and deployment, supplying hardware, devices, printing and imaging equipment, and software from established global technology brands. From BOQ and RFQ sourcing to configuration, bulk and multi-site delivery, and software and manufacturer support renewals, we help organizations procure, deploy and manage technology throughout its lifecycle.',
        ],
      },
      {
        type: 'section',
        title: '',
        items: [
          { title: 'Hardware, Devices & IT Infrastructure', copy: 'Business computing devices, professional workstations, enterprise servers, storage, networking equipment and data center infrastructure, supplied and supported across your organization\'s technology requirements.', ...learn('hardware') },
          { title: 'Printing, Imaging & Data Capture', copy: 'Business printers, multifunction devices, document scanners, large-format printing, barcode and label printers, and mobile data capture equipment for organizations that depend on reliable document and data workflows.', ...learn('printing') },
          { title: 'Software, Cloud & Licensing', copy: 'Productivity and collaboration platforms, operating systems, cloud subscriptions, cybersecurity software, backup solutions, virtualization tools and business applications licensed and managed through Identiti ICT\'s verified vendor relationships.', ...learn('software') },
        ],
      },
      talk(),
    ],
  },
  'how-we-deliver': {
    id: 'how-we-deliver',
    nav: 'How We Deliver',
    eyebrow: 'How We Deliver',
    title: 'How We Deliver',
    lead: 'Identiti brings planning, technology selection, integration and implementation together through a structured delivery approach.',
    blocks: [
      {
        type: 'section',
        title: '',
        steps: [
          { title: 'Discover & Assess', copy: 'Understand the current environment, technical requirements, operational priorities and existing constraints.' },
          { title: 'Design & Architect', copy: 'Develop a solution architecture aligned with the required operational and business outcomes.' },
          { title: 'Source & Integrate', copy: 'Select suitable technologies and integrate products, platforms and systems into one coordinated solution.' },
          { title: 'Deploy & Validate', copy: 'Implement, configure, test and verify the solution before operational handover.' },
          { title: 'Support & Optimize', copy: 'Support, monitor and optimize the environment as operational requirements evolve.' },
        ],
      },
    ],
  },
  connectivity: {
    id: 'connectivity',
    nav: 'Connectivity & Network Infrastructure',
    eyebrow: 'Connectivity Overview',
    title: 'Connectivity & Network Infrastructure',
    lead: 'Every digital operation depends on the infrastructure beneath it. As organizations adopt cloud platforms, connected devices, smart systems and data-intensive applications, their networks must support greater capacity, mobility, security and operational visibility.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Identiti ICT provides end-to-end connectivity and network infrastructure solutions designed around each organization\'s operating environment, users, applications and future requirements.',
          'Whether you are building a new environment, connecting multiple locations, improving wireless performance or modernizing existing infrastructure, Identiti brings the required technologies and capabilities together into one coordinated solution.',
        ],
      },
      {
        type: 'section',
        title: 'Our Connectivity Approach',
        steps: [
          { title: 'Assess & Design', copy: 'Evaluate the existing environment, coverage requirements, users, applications, security needs and expected growth.' },
          { title: 'Build & Integrate', copy: 'Deploy and configure the required network, wireless, cellular and physical connectivity infrastructure.' },
          { title: 'Test & Validate', copy: 'Verify coverage, capacity, connectivity, security and performance before operational handover.' },
          { title: 'Monitor & Optimize', copy: 'Support the network after deployment and optimize performance as usage and operational requirements evolve.' },
        ],
      },
      services('connectivity', 'Our Connectivity Services', [
        { id: 'enterprise-networking', title: 'Enterprise Networking & Intelligent Connectivity', copy: 'Identiti ICT designs and implements enterprise network environments that connect users, devices, systems, applications and locations through secure and scalable infrastructure.' },
        { id: 'enterprise-wifi', title: 'Enterprise Wi-Fi & Intelligent Wireless', copy: 'Identiti ICT designs and deploys enterprise wireless solutions based on the physical environment, expected number of users, device density, application requirements and required coverage.' },
        { id: 'indoor-cellular', title: 'Indoor Cellular Connectivity', copy: 'Identiti ICT provides indoor cellular connectivity solutions designed to improve mobile signal availability across offices, commercial buildings, campuses, healthcare facilities, hospitality environments, parking areas and other indoor spaces.' },
        { id: 'structured-cabling', title: 'Structured Cabling & Fiber Infrastructure', copy: 'Identiti ICT designs and implements structured cable and fiber infrastructure for new buildings, existing facilities, data centers, offices, campuses and operational environments.' },
        { id: 'network-design', title: 'Network Design, Integration & Lifecycle Support', copy: 'Identiti ICT supports organizations throughout the network lifecycle—from assessment and architecture to implementation, migration, monitoring and modernization.' },
      ]),
      {
        type: 'section',
        title: 'Technology Ecosystem',
        paragraphs: ['Identiti ICT works with established networking, infrastructure and connectivity technology providers to develop solutions suited to different enterprise requirements.'],
        chips: ['Cisco', 'HPE Aruba Networking', 'Fortinet', 'F5', 'Huawei', 'Nextivity CEL-FI'],
      },
      talk(),
      {
        type: 'section',
        id: 'enterprise-networking',
        title: 'Enterprise Networking & Intelligent Connectivity',
        paragraphs: [
          'Identiti ICT designs and implements enterprise network environments that connect users, devices, systems, applications and locations through secure and scalable infrastructure.',
          'Our solutions can support individual offices, multi-building campuses, branches, data centers and distributed enterprise environments. We assess traffic requirements, application dependencies, security policies and future growth to develop a network architecture aligned with the organization\'s operational needs.',
        ],
      },
      {
        type: 'section',
        title: 'Capabilities',
        items: [
          { title: 'LAN and WAN architecture and implementation', copy: '' },
          { title: 'Core, distribution and access-layer switching', copy: '' },
          { title: 'Enterprise routing and gateway configuration', copy: '' },
          { title: 'SD-WAN and software-defined networking', copy: '' },
          { title: 'Multi-site and branch connectivity', copy: '' },
          { title: 'Network segmentation and VLAN architecture', copy: '' },
          { title: 'Firewall and network-security integration', copy: '' },
          { title: 'Network upgrades, migration and modernization', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'enterprise-wifi',
        title: 'Enterprise Wi-Fi & Intelligent Wireless',
        paragraphs: [
          'Modern organizations depend on wireless connectivity for employees, visitors, operational devices, mobile applications and connected systems.',
          'Identiti ICT designs and deploys enterprise wireless solutions based on the physical environment, expected number of users, device density, application requirements and required coverage.',
          'Our approach goes beyond installing access points. We assess how the space is used, identify potential interference and coverage challenges, design the wireless architecture and validate performance after implementation.',
        ],
      },
      {
        type: 'section',
        title: 'Capabilities',
        items: [
          { title: 'Wireless site surveys and RF planning', copy: '' },
          { title: 'Enterprise Wi-Fi design and deployment', copy: '' },
          { title: 'Indoor and outdoor wireless coverage', copy: '' },
          { title: 'Wireless controllers and centralized management', copy: '' },
          { title: 'Guest and employee wireless access', copy: '' },
          { title: 'IoT wireless network segmentation', copy: '' },
          { title: 'Coverage testing and performance validation', copy: '' },
          { title: 'Wi-Fi optimization and expansion', copy: '' },
        ],
      },
      {
        type: 'section',
        title: 'Featured Enterprise Networking Platforms',
        groups: [
          {
            title: 'Cisco Enterprise Networking',
            copy: 'Cisco technologies can support connectivity across campus, branches, data center and distributed enterprise environments.',
            paragraphs: ['Depending on the organization’s requirements, solutions may include Cisco Catalyst switching and wireless infrastructure, enterprise routing, SD-WAN and Cisco Meraki cloud-managed networking.'],
            points: [
              'Cisco Catalyst switching and wireless',
              'Enterprise routing and branch connectivity',
              'Cisco SD-WAN solutions',
              'Cisco Meraki cloud-managed networks',
              'Centralized network visibility and management',
              'Secure wired and wireless access',
              'Multi-site network deployment',
            ],
          },
          {
            title: 'HPE Aruba Networking',
            copy: 'HPE Aruba Networking solutions can support secure wired and wireless connectivity across offices, campuses, hospitality environments, healthcare facilities and other enterprise locations.',
            paragraphs: ['Solutions may combine enterprise Wi-Fi, switching, network access control and centralized management to provide improved visibility and more consistent user and device connectivity.'],
            points: [
              'Aruba enterprise Wi-Fi and access points',
              'Aruba switching infrastructure',
              'Aruba Central network management',
              'ClearPass network access control',
              'Guest and employee access management',
              'Wireless performance and user-experience monitoring',
              'Campus and multi-site network connectivity',
            ],
          },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'indoor-cellular',
        title: 'Indoor Cellular Connectivity',
        paragraphs: [
          'Building materials, underground spaces, complex layouts and large floor areas can weaken cellular signals and create coverage gaps inside facilities. For organizations where mobile connectivity is operationally important; for staff, visitors, safety operations or connected devices, these gaps can affect productivity, communication and service reliability.',
          'Identiti ICT provides indoor cellular connectivity solutions designed to improve mobile signal availability across offices, commercial buildings, campuses, healthcare facilities, hospitality environments, parking areas and other indoor spaces.',
          'Each solution begins with an assessment of the building environment, existing signal conditions, coverage requirements, operator requirements and expected usage. The appropriate technology is then selected and integrated according to the size, complexity and operational requirements of the facility.',
        ],
      },
      {
        type: 'section',
        title: 'Nextivity CEL-FI Smart Indoor Cellular Coverage',
        paragraphs: [
          'For indoor cellular coverage requirements, Identiti ICT works with Nextivity CEL-FI, a range of intelligent cellular coverage solutions designed to improve reliable voice and data connectivity inside buildings and facilities.',
          'CEL-FI solutions use Nextivity’s proprietary IntelliBoost technology to process and strengthen cellular signals while maintaining network-safe operation. Depending on the selected system and deployment architecture, CEL-FI can support single, dual or multiple mobile network operators, 4G and 5G connectivity, active DAS configurations and remote system management through the Nextivity WAVE platform.',
          'Selected CEL-FI solutions can also support IoT connectivity, private network applications and smart-building environments, allowing the indoor coverage system to contribute to broader connected-infrastructure requirements.',
        ],
      },
      {
        type: 'section',
        title: 'CEL-FI Solution Range',
        groups: [
          {
            title: 'CEL-FI QUATRA 4000e — Multi-Carrier Active DAS Hybrid',
            copy: 'Designed for larger and more complex environments requiring simultaneous multi-carrier coverage. QUATRA 4000e provides scalable indoor 4G and 5G coverage and supports centralized remote management through the Nextivity WAVE platform.',
            points: ['Ideal for: offices, hospitals, hotels, shopping centers and large commercial buildings.'],
          },
          {
            title: 'CEL-FI QUATRA EVO — Flexible Active DAS Hybrid',
            copy: 'A flexible single or dual-operator solution designed to deliver reliable indoor 4G and 5G connectivity. Its category-cabling and Power-over-Ethernet architecture supports scalable deployment across mid-sized enterprise environments.',
            points: ['Ideal for: offices, hotels, hospitals and commercial buildings.'],
          },
          {
            title: 'CEL-FI GO G43 — Multi-Operator Smart Signal Booster',
            copy: 'A compact multi-operator solution designed to improve indoor 3G, 4G and 5G connectivity for up to three mobile network operator signals. It provides a practical option for smaller commercial environments requiring focused coverage enhancement.',
            points: ['Ideal for: retail stores, restaurants, branch offices, convenience stores and other smaller commercial locations.'],
          },
        ],
      },
      {
        type: 'section',
        title: 'Key CEL-FI Advantages',
        items: [
          { title: 'Single, dual and multi-operator coverage options', copy: '' },
          { title: 'Support for 4G and 5G connectivity', copy: '' },
          { title: 'High signal gain and reliable voice and data performance', copy: '' },
          { title: 'Scalable solutions for small, medium and large environments', copy: '' },
          { title: 'Network-safe operation', copy: '' },
          { title: 'Active DAS and smart signal booster options', copy: '' },
          { title: 'IoT and private network capabilities on selected solutions', copy: '' },
          { title: 'Remote monitoring and management through the Nextivity WAVE platform', copy: '' },
        ],
      },
      {
        type: 'section',
        title: 'Capabilities',
        items: [
          { title: 'Indoor cellular coverage assessments and signal surveys', copy: '' },
          { title: 'CEL-FI solution selection and coverage design', copy: '' },
          { title: 'CEL-FI QUATRA 4000e multi-carrier active DAS hybrid', copy: '' },
          { title: 'CEL-FI QUATRA EVO single or dual-operator active DAS hybrid', copy: '' },
          { title: 'CEL-FI GO G43 multi-operator smart signal booster', copy: '' },
          { title: 'Multi-floor and multi-zone coverage design', copy: '' },
          { title: 'Passive and active infrastructure', copy: '' },
          { title: 'Equipment, cabling and antenna integration', copy: '' },
          { title: 'System configuration and commissioning', copy: '' },
          { title: 'Coverage testing and post-installation verification', copy: '' },
          { title: 'Remote monitoring through the Nextivity WAVE platform', copy: '' },
          { title: 'Performance optimization and technical support', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'structured-cabling',
        title: 'Structured Cabling & Fiber Infrastructure',
        paragraphs: [
          'Build the Physical Foundation for Reliable Connectivity',
          'Network performance depends on the quality and organization of the physical infrastructure supporting it.',
          'Identiti ICT designs and implements structured cable and fiber infrastructure for new buildings, existing facilities, data centers, offices, campuses and operational environments.',
          'Our solutions are planned around current connectivity requirements while considering future expansion, maintenance access and the long-term manageability of the infrastructure.',
        ],
      },
      {
        type: 'section',
        title: 'Capabilities',
        items: [
          { title: 'Cat6, Cat6A and Cat8 copper cabling', copy: '' },
          { title: 'Single-mode and multi-mode fiber-optic infrastructure', copy: '' },
          { title: 'Horizontal and vertical cabling', copy: '' },
          { title: 'Data center and equipment-room cabling', copy: '' },
          { title: 'Racks, cabinets and patch panels', copy: '' },
          { title: 'Fiber termination and splicing', copy: '' },
          { title: 'Cable routing and containment', copy: '' },
          { title: 'Testing and certification', copy: '' },
          { title: 'Labeling and documentation', copy: '' },
          { title: 'Existing infrastructure upgrades and remediation', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'network-design',
        title: 'Network Design, Integration & Lifecycle Support',
        paragraphs: [
          'A network must continue to perform as the organization adds users, locations, applications and connected devices. Ongoing monitoring, configuration management and optimization are therefore essential to maintaining availability, performance and security.',
          'Identiti ICT supports organizations throughout the network lifecycle—from assessment and architecture to implementation, migration, monitoring and modernization.',
        ],
      },
      {
        type: 'section',
        title: '',
        groups: [
          {
            title: 'Design & Architecture',
            points: [
              'Network assessments and requirements analysis',
              'Network architecture and topology design',
              'Capacity and scalability planning',
              'Technology evaluation and selection',
              'Security architecture integration',
              'Coverage and connectivity planning',
            ],
          },
          {
            title: 'Integration & Implementation',
            points: [
              'Multi-vendor network integration',
              'Network configuration and commissioning',
              'Migration planning and execution',
              'Integration with security and operational systems',
              'Testing, validation and documentation',
              'Operational handover',
            ],
          },
          {
            title: 'Lifecycle Support',
            points: [
              'Network monitoring and fault management',
              'Configuration management and technical support',
              'Performance optimization and tuning',
              'Network health assessments',
              'Expansion and upgrade planning',
              'Network refresh and modernization',
              'Preventive and corrective maintenance',
            ],
          },
        ],
        note: 'Looking for networking equipment and infrastructure products?',
        link: explore('hardware', 'Hardware, Devices & IT Infrastructure'),
      },
      talk(),
    ],
  },
  'data-centers': {
    id: 'data-centers',
    nav: 'Data Centers & Cybersecurity',
    eyebrow: 'Data Centers & Cybersecurity',
    title: 'Data Centers & Cybersecurity',
    lead: 'Data center infrastructure and cybersecurity are increasingly inseparable. The systems that store and process an organization’s data must be built for performance, availability and resilience and protected against the threats that target them.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Identiti ICT addresses both disciplines through an integrated delivery approach. We design and implement data center environments around each organization’s compute, storage and availability requirements. We integrate cybersecurity architecture, controls and monitoring capabilities from the outset rather than treating security as an additional layer after the infrastructure is already in place.',
          'Whether you are building a new data center environment, modernizing existing infrastructure, strengthening your security posture or addressing specific risks across your IT and OT environments, Identiti ICT brings the technical capability and multi-vendor expertise to support your requirements.',
        ],
      },
      {
        type: 'section',
        title: 'Our Approach',
        steps: [
          { title: 'Assess & Design', copy: 'Understand the organization’s infrastructure requirements, security posture, risk exposure and operational priorities before defining the appropriate technical approach.' },
          { title: 'Build & Integrate', copy: 'Implement data center infrastructure and integrate cybersecurity controls, identity management and monitoring capabilities into a coordinated technology environment.' },
          { title: 'Validate & Harden', copy: 'Test infrastructure performance, verify security controls, validate availability configurations and address identified gaps before operational handover.' },
          { title: 'Support & Optimize', copy: 'Support infrastructure performance, security-tool effectiveness and ongoing optimization as operational requirements and the threat landscape evolve.' },
        ],
      },
      services('data-centers', 'Our Data Center & Cybersecurity Services', [
        { id: 'dc-infrastructure', title: 'Data Center Infrastructure', copy: 'Identiti ICT designs, implements and modernizes data center environments for organizations requiring on-premises infrastructure, colocation deployments or hybrid environments.' },
        { id: 'compute-storage', title: 'Compute, Storage & Virtualization', copy: 'Identiti ICT supplies, configures and integrate enterprise compute, storage and virtualization solutions for conventional, virtualized, hyperconverged and hybrid environments.' },
        { id: 'backup-recovery', title: 'Backup, Disaster Recovery & Business Continuity', copy: 'Identiti ICT designs and implements backup and disaster recovery solutions aligned with the organization’s data volumes, system criticality, recovery-time objectives and recovery-point objectives.' },
        { id: 'cybersecurity', title: 'Cybersecurity Architecture & Integrated Protection', copy: 'Identiti ICT assesses security requirements and integrates multiple protection technologies into a coordinated cybersecurity architecture aligned with the organization’s operating environment and risk profile.' },
        { id: 'identity-access', title: 'Identity & Access Management', copy: 'Identiti ICT designs and integrates identity solutions that help organizations protect user accounts, manage privileged access and strengthen controls against credential-based threats.' },
        { id: 'security-operations', title: 'Security Monitoring, Threat Management & IT/OT Security', copy: 'Identiti ICT implements and integrates security monitoring and threat-management technologies across networks, endpoints, applications and operational environments.' },
      ]),
      {
        type: 'section',
        title: 'Why Identiti ICT for Data Centers & Cybersecurity?',
        why: [
          { title: 'Infrastructure and Security Delivered Together', copy: 'Address data center and cybersecurity requirements through one ICT partner, reducing the technical gaps and coordination challenges that can arise when they are delivered separately.' },
          { title: 'Solutions, Products and Integration', copy: 'Access the infrastructure equipment, software platforms and security technologies required for the solution, together with design, configuration and integration.' },
          { title: 'Designed Around Your Environment', copy: 'Implement infrastructure and security controls selected around your workloads, existing technology, operational priorities and risk profile.' },
          { title: 'From Architecture to Ongoing Support', copy: 'Move from technical requirements and solution design to supply, implementation, testing, documentation, operational handover and technical support.' },
        ],
      },
      {
        type: 'section',
        title: 'Technology Ecosystem',
        groups: [
          { title: 'Data Center & Infrastructure', points: ['HPE', 'Dell Technologies', 'Microsoft', 'Cisco', 'APC'] },
          { title: 'Cybersecurity', points: ['Fortinet', 'Palo Alto Networks', 'F5', 'Cisco', 'Microsoft', 'Trend Micro', 'Kaspersky'] },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'dc-infrastructure',
        title: 'Data Center Infrastructure',
        paragraphs: [
          'A dependable data center requires more than servers and storage. Power availability, cooling, cabling, racks, environmental conditions and physical infrastructure all affect the performance and resilience of the technology environment.',
          'Identiti ICT designs, implements and modernizes data center environments for organizations requiring on-premises infrastructure, colocation deployments or hybrid environments.',
          'Our solutions cover the physical data center layer from initial assessment and technical design to infrastructure installation, modernization, testing and operational handover.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Data center assessment, planning and technical design', copy: '' },
          { title: 'Server room and equipment room design and build', copy: '' },
          { title: 'Racks, cabinets and containment systems', copy: '' },
          { title: 'UPS systems, power distribution and backup power', copy: '' },
          { title: 'Precision cooling and environmental monitoring', copy: '' },
          { title: 'Structured cabling, fiber and network connectivity', copy: '' },
          { title: 'Testing, documentation and operational handover', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'compute-storage',
        title: 'Compute, Storage & Virtualization',
        paragraphs: [
          'Compute and storage requirements differ according to the applications, databases, users and operational systems they support. Selecting the appropriate architecture is essential to achieving the required performance, scalability and availability.',
          'Identiti ICT supplies, configures and integrate enterprise compute, storage and virtualization solutions for conventional, virtualized, hyperconverged and hybrid environments.',
          'We work across multiple technology platforms to develop infrastructure suited to each organization’s workload requirements and existing technology environment.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Rack, tower and blade enterprise servers', copy: '' },
          { title: 'SAN, NAS, all-flash and hybrid-storage systems', copy: '' },
          { title: 'Storage area network design and implementation', copy: '' },
          { title: 'Server virtualization and virtual desktop infrastructure', copy: '' },
          { title: 'Hyperconverged infrastructure solutions', copy: '' },
          { title: 'Hybrid-cloud infrastructure integration', copy: '' },
          { title: 'Capacity expansion and performance optimization', copy: '' },
        ],
      },
      {
        type: 'section',
        title: 'Featured Data Center Platforms',
        groups: [
          {
            title: 'HPE Infrastructure Solutions',
            copy: 'HPE technologies can support conventional data center, virtualized, edge and hybrid-cloud environments through integrated compute, storage and infrastructure-management capabilities.',
            paragraphs: ['Depending on the organization’s requirements, solutions may include HPE ProLiant servers, HPE Synergy composable infrastructure, HPE Alletra storage and HPE GreenLake-enabled infrastructure models.'],
            points: [
              'HPE ProLiant rack and enterprise servers',
              'HPE Synergy composable infrastructure',
              'HPE Alletra storage platforms',
              'Hybrid and all-flash storage environments',
              'Infrastructure management and monitoring',
              'Edge and distributed compute deployments',
              'HPE GreenLake-enabled infrastructure models',
            ],
          },
          {
            title: 'Dell Technologies Infrastructure Solutions',
            copy: 'Dell Technologies provides enterprise infrastructure platforms supporting compute, storage, virtualization, hyperconverged infrastructure and data protection.',
            paragraphs: ['Depending on the required architecture, solutions may include Dell PowerEdge servers, Dell PowerStore storage, Dell VxRail hyperconverged infrastructure and Dell PowerProtect data-protection platforms.'],
            points: [
              'Dell PowerEdge enterprise servers',
              'Dell PowerStore Storage Platforms',
              'Rack, edge and purpose-built compute',
              'Virtualized data center environments',
              'Dell VxRail hyperconverged infrastructure',
              'Dell PowerProtect backup, replication and recovery',
              'Infrastructure management and monitoring',
              'Data center modernization and capacity expansion',
            ],
          },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'backup-recovery',
        title: 'Backup, Disaster Recovery & Business Continuity',
        paragraphs: [
          'Data loss and extended system downtime can result from equipment failure, human error, cyberattacks or wider operational disruptions. Effective recovery depends on having the right backup technologies, protected recovery copies and tested recovery procedures in place.',
          'Identiti ICT designs and implements backup and disaster recovery solutions aligned with the organization’s data volumes, system criticality, recovery-time objectives and recovery-point objectives.',
          'Our approach covers the technologies required to protect data, maintain recoverable copies and restore critical systems following interruption.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Enterprise backup software and backup appliances', copy: '' },
          { title: 'Application, database and virtual-machine backup', copy: '' },
          { title: 'On-premises, off-site and cloud-integrated backup', copy: '' },
          { title: 'Immutable and ransomware-resilient backup storage', copy: '' },
          { title: 'Data replication and synchronization', copy: '' },
          { title: 'Disaster recovery infrastructure and recovery environments', copy: '' },
          { title: 'Failover, failback and recovery testing', copy: '' },
          { title: 'Backup monitoring, reporting and recovery documentation', copy: '' },
        ],
        note: 'Backup, recovery and security software can also be supplied as standalone licenses or subscriptions through our software portfolio.',
        link: explore('software', 'Software, Cloud & Licensing'),
      },
      talk(),
      {
        type: 'section',
        id: 'cybersecurity',
        title: 'Cybersecurity Architecture & Integrated Protection',
        paragraphs: [
          'Cybersecurity requires coordinated protection across the entire technology environment. Networks, applications, endpoints, cloud services and sensitive data each present different risks that cannot be addressed effectively through isolated security products.',
          'Identiti ICT assesses security requirements and integrates multiple protection technologies into a coordinated cybersecurity architecture aligned with the organization’s operating environment and risk profile.',
          'Our multi-vendor approach allows security solutions to be selected according to technical suitability, compatibility and the level of protection required.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Next-generation firewalls and unified threat management', copy: '' },
          { title: 'Network segmentation and micro segmentation', copy: '' },
          { title: 'Web application firewalls and application protection', copy: '' },
          { title: 'Secure email gateways and anti-phishing controls', copy: '' },
          { title: 'Endpoint protection, EDR and XDR solutions', copy: '' },
          { title: 'Data-loss prevention and encryption technologies', copy: '' },
          { title: 'Cloud security and secure remote-access solutions', copy: '' },
        ],
      },
      {
        type: 'section',
        title: 'Featured Cybersecurity Platform',
        groups: [
          {
            title: 'Fortinet Integrated Cybersecurity Solutions',
            copy: 'Identiti ICT helps organizations select, configure and integrate Fortinet technologies to protect networks, users, devices and cloud environments. Fortinet Security Fabric connects these capabilities to improve visibility and support consistent security management.',
            points: [
              'FortiGate and Secure SD-WAN: Protect network traffic, connect branches and secure application access across distributed locations.',
              'FortiManager and FortiAnalyzer: Centralize security policies, device management, logs, analytics and reporting.',
              'FortiEDR and FortiSIEM: Detect and respond to endpoint threats while bringing security events together for monitoring and investigation.',
              'Secure wired and wireless access: FortiSwitch, FortiAP and FortiNAC support protected connectivity and access control.',
            ],
          },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'identity-access',
        title: 'Identity & Access Management',
        paragraphs: [
          'Organizations need to ensure that employees, contractors, administrators and third parties can access only the systems and information required for their roles.',
          'Identity and access management brings authentication, authorization, access policies and identity governance together to provide stronger control across on-premises, cloud and hybrid technology environments.',
          'Identiti ICT designs and integrates identity solutions that help organizations protect user accounts, manage privileged access and strengthen controls against credential-based threats.',
        ],
      },
      {
        type: 'section',
        title: 'Typical Solution Scope',
        paragraphs: [
          'An identity engagement may include integrating directory services, deploying single sign-on and multi-factor authentication, protecting privileged accounts, configuring role-based access policies, and managing user access throughout the identity lifecycle.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Directory services and identity-platform integration', copy: '' },
          { title: 'Single sign-on and federated identity', copy: '' },
          { title: 'Multi-factor authentication', copy: '' },
          { title: 'Privileged access management', copy: '' },
          { title: 'Role-based access control', copy: '' },
          { title: 'Identity governance and administration', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'security-operations',
        title: 'Security Monitoring, Threat Management & IT/OT Security',
        paragraphs: [
          'Security technologies are most effective when organizations can identify suspicious activity, understand what is happening across their environments and respond before threats cause wider disruption.',
          'Identiti ICT implements and integrates security monitoring and threat-management technologies across networks, endpoints, applications and operational environments. For organizations operating industrial systems or critical infrastructure, we also support the secure convergence of information technology and operational technology.',
        ],
      },
      {
        type: 'section',
        title: 'Typical Solution Scope',
        paragraphs: [
          'A typical engagement may include implementing a SIEM platform, centralizing security logs, integrating threat intelligence, deploying network and endpoint detection technologies, and configuring alerts and dashboards. In operational environments, the scope may also include OT asset discovery, industrial network monitoring, segmentation and secure remote access.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'SIEM, centralized log management and security dashboards', copy: '' },
          { title: 'Threat intelligence and security detection integration', copy: '' },
          { title: 'Network and endpoint detection and response', copy: '' },
          { title: 'Vulnerability scanning and security monitoring optimization', copy: '' },
          { title: 'OT asset discovery and industrial network visibility', copy: '' },
          { title: 'IT/OT segmentation, industrial firewalls and secure remote access', copy: '' },
          { title: 'Incident response planning, investigation support and remediation guidance', copy: '' },
        ],
      },
      talk(),
    ],
  },
  'smart-cities': {
    id: 'smart-cities',
    nav: 'Smart Cities & Buildings',
    eyebrow: 'Smart Cities & Buildings',
    title: 'Smart Cities & Buildings',
    lead: 'Cities, campuses, buildings and facilities generate information through their equipment, utilities and operational systems. When these technologies operate separately, teams have limited visibility and must rely on fragmented processes to manage performance, maintenance and resource consumption.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Identiti ICT brings these systems together by connecting physical assets to sensors, platforms and management applications that provide centralized information and control.',
          'Our capabilities cover connected city infrastructure, smart building and BMS integration, IoT platforms, predictive monitoring, energy and utility management, and digital twin environments.',
        ],
      },
      {
        type: 'section',
        title: 'Our Approach',
        steps: [
          { title: 'Assess & Define', copy: 'Understand the physical environment, operational priorities, existing systems, assets and available infrastructure.' },
          { title: 'Design & Connect', copy: 'Define the solution architecture and connect sensors, controllers, gateways, platforms and existing systems.' },
          { title: 'Integrate & Visualize', copy: 'Bring operational data into centralized dashboards, management platforms and digital representations.' },
          { title: 'Optimize & Expand', copy: 'Use collected data to improve performance, automate workflows and expand the solution as operational requirements evolve.' },
        ],
      },
      services('smart-cities', 'Our Smart Cities & Buildings Services', [
        { id: 'smart-city-infrastructure', title: 'Smart City & Connected Infrastructure', copy: 'Identiti ICT designs and integrates connected infrastructure solutions for municipalities, developments, campuses and large public environments.' },
        { id: 'smart-buildings', title: 'Smart Building & BMS Integration', copy: 'Identiti ICT implements and integrates building management systems that bring building equipment and operational data into a coordinated management environment.' },
        { id: 'iot-operations', title: 'IoT Platforms, Connected Devices & Predictive Operations', copy: 'Identiti ICT connects sensors, devices, gateways and IoT platforms to provide visibility across physical assets and operating environments.' },
        { id: 'energy-utilities', title: 'Energy & Utility Management', copy: 'Identiti ICT implements energy and utility management solutions that collect consumption data, consolidate it through centralized platforms and provide the information required to monitor performance across facilities and assets.' },
        { id: 'digital-twins', title: 'Digital Twin & Infrastructure Intelligence', copy: 'Identiti ICT supports the integration of digital twin environments that connect building information models, IoT data and operational systems into a unified view.' },
      ]),
      {
        type: 'section',
        title: 'Why Identiti ICT for Smart Cities & Buildings?',
        why: [
          { title: 'Physical-to-Digital Integration', copy: 'Connect building systems, infrastructure, sensors, IoT platforms and operational applications within one coordinated technology environment.' },
          { title: 'Designed Around Real Operating Requirements', copy: 'Select technologies and use cases according to the environment, existing assets and required operational outcomes not around a predefined package.' },
          { title: 'Multi-Vendor and Protocol Expertise', copy: 'Integrate technologies from different manufacturers using established building, industrial and IoT communication protocols.' },
          { title: 'From Design to Technical Support', copy: 'Work with Identiti across assessment, architecture, technology supply, device installation, platform integration, testing, handover and ongoing technical support.' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'smart-city-infrastructure',
        title: 'Smart City & Connected Infrastructure',
        paragraphs: [
          'Smart city solutions connect public assets, facilities and services to digital platforms that improve visibility and support more coordinated operations.',
          'Identiti ICT designs and integrates connected infrastructure solutions for municipalities, developments, campuses and large public environments. We bring sensors, field devices, communications infrastructure and management platforms together according to the requirements of each location and use case.',
          'Solutions can be implemented as focused applications or integrated into a wider smart city environment as requirements expand.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Smart city architecture and integration design', copy: '' },
          { title: 'Connected street lighting, parking and public asset monitoring', copy: '' },
          { title: 'Environmental and air-quality monitoring', copy: '' },
          { title: 'Smart infrastructure sensors and field gateways', copy: '' },
          { title: 'Citywide IoT platforms and operational dashboards', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'smart-buildings',
        title: 'Smart Building & BMS Integration',
        paragraphs: [
          'Modern buildings contain multiple systems responsible for comfort, safety, energy use and daily operations. When these systems operate independently, facility teams have limited visibility and must manage information across separate interfaces.',
          'Identiti ICT implements and integrates building management systems that bring building equipment and operational data into a coordinated management environment.',
          'Our approach supports new developments and existing facilities, including the modernization of legacy building systems and integration with wider facility management and enterprise platforms.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Building management system design and integration', copy: '' },
          { title: 'HVAC, lighting and electrical system monitoring and control', copy: '' },
          { title: 'Indoor air quality, occupancy and space-utilization monitoring', copy: '' },
          { title: 'Alarm, event and maintenance notifications', copy: '' },
          { title: 'Legacy BMS modernization and multi-system integration (BACnet, Modbus, KNX)', copy: '' },
        ],
        note: 'Smart building environments can also be integrated with surveillance, access control, intrusion detection and centralized physical security management.',
        link: explore('physical-security', 'Physical Security Solutions'),
      },
      talk(),
      {
        type: 'section',
        id: 'iot-operations',
        title: 'IoT Platforms, Connected Devices & Predictive Operations',
        paragraphs: [
          'IoT technologies allow organizations to collect real-time information from equipment, facilities and distributed assets. The value comes from turning that information into alerts, maintenance actions and operational decisions.',
          'Identiti ICT connects sensors, devices, gateways and IoT platforms to provide visibility across physical assets and operating environments.',
          'By monitoring equipment condition, usage patterns and performance indicators, organizations can identify abnormal behavior earlier and move from reactive maintenance toward more planned and predictive operations.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'IoT platform architecture, sensors and edge gateways', copy: '' },
          { title: 'Equipment condition monitoring (temperature, vibration, pressure)', copy: '' },
          { title: 'Asset tracking and location monitoring', copy: '' },
          { title: 'Threshold-based alerts and automated notifications', copy: '' },
          { title: 'Predictive maintenance and anomaly-detection support (MQTT, LoRaWAN)', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'energy-utilities',
        title: 'Energy & Utility Management',
        paragraphs: [
          'Buildings, campuses and facilities require accurate information about how electricity, water and other utilities are being consumed. Without centralized metering and analysis, inefficiencies can remain hidden and unusual consumption patterns may go unnoticed.',
          'Identiti ICT implements energy and utility management solutions that collect consumption data, consolidate it through centralized platforms and provide the information required to monitor performance across facilities and assets.',
          'These solutions can support individual buildings, multi-building campuses and distributed operating environments.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Smart meters, submetering and consumption monitoring (electricity, water, gas)', copy: '' },
          { title: 'Power quality and electrical performance monitoring', copy: '' },
          { title: 'Building and facility consumption dashboards with baselines and trend alerts', copy: '' },
          { title: 'Peak demand, load monitoring and automated optimization controls', copy: '' },
          { title: 'Energy performance reporting and BMS/IoT platform integration', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'digital-twins',
        title: 'Digital Twin & Infrastructure Intelligence',
        paragraphs: [
          'A digital twin brings information about buildings, facilities and infrastructure into a visual digital environment. By connecting models, asset information and live operational data, organizations can better understand how physical environments are performing.',
          'Identiti ICT supports the integration of digital twin environments that connect building information models, IoT data and operational systems into a unified view.',
          'The result is a more accessible representation of infrastructure that can support monitoring, maintenance, planning and asset lifecycle management.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Digital twin architecture and BIM/3D model integration', copy: '' },
          { title: 'Live IoT and BMS data feeds with spatial dashboards', copy: '' },
          { title: 'Asset and equipment visualization with alarm overlays', copy: '' },
          { title: 'Asset information and maintenance data integration', copy: '' },
          { title: 'Infrastructure performance and utilization analysis', copy: '' },
        ],
        note: 'Operational information from BMS, IoT and digital twin environments can be connected to unified dashboards, command-and-control platforms and automated workflows.',
        link: explore('intelligent-ops', 'Intelligent Operations & Automation'),
      },
      talk(),
    ],
  },
  'intelligent-ops': {
    id: 'intelligent-ops',
    nav: 'Intelligent Operations & Automation',
    eyebrow: 'Intelligent Operations & Automation',
    title: 'Intelligent Operations & Automation',
    lead: 'Organizations often manage operations through multiple independent systems, applications and data sources. This fragmentation makes it difficult to maintain a complete operational view, identify important events and coordinate action across teams.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Identiti ICT connects systems, data and workflows within integrated operational environments. We implement platforms that consolidate real-time information, visualize operational conditions, prioritize alerts, support decision-making and automate repeatable processes.',
          'Whether you are managing a control room, monitoring distributed facilities, automating internal processes or connecting operational systems with enterprise applications, Identiti ICT can help design and integrate the appropriate technology environment.',
        ],
      },
      {
        type: 'section',
        title: 'Our Approach',
        steps: [
          { title: 'Assess & Map', copy: 'Understand the operating environment, existing systems, data sources, users, processes and decision requirements.' },
          { title: 'Design & Integrate', copy: 'Define the solution architecture and connect the required platforms, applications, devices and data sources.' },
          { title: 'Configure & Automate', copy: 'Develop dashboards, alerts, workflows, rules and automation aligned with operational procedures.' },
          { title: 'Validate & Optimize', copy: 'Test system behavior, data flows and workflows before handover, then refine the environment as requirements evolve.' },
        ],
      },
      services('intelligent-ops', 'Our Intelligent Operations & Automation Services', [
        { id: 'command-control', title: 'Unified Command, Control & Operational Intelligence', copy: 'Identiti ICT implements unified command and control environments that consolidate information from connected systems into a centralized operational interface.' },
        { id: 'ai-vision', title: 'AI Vision & Edge Analytics', copy: 'Identiti ICT integrates AI vision and edge analytics solutions for operational use cases across facilities, campuses, transportation environments, industrial locations and customer-facing spaces.' },
        { id: 'process-automation', title: 'Business Process Automation & AI-Driven Workflows', copy: 'Identiti ICT develops workflow and process-automation solutions that connect people, information and applications through defined digital processes.' },
        { id: 'systems-integration', title: 'Systems, Data & Application Integration', copy: 'Identiti ICT integrates operational technologies, enterprise applications and data sources so information can move securely and consistently across the environment.' },
      ]),
      {
        type: 'section',
        title: 'Why Identiti ICT for Intelligent Operations & Automation?',
        why: [
          { title: 'Integrated Operational Environments', copy: 'Bring systems, data, alerts, analytics and workflows together through coordinated platforms that connect technologies from different vendors.' },
          { title: 'Designed Around Real Processes', copy: 'Develop solutions around the organization’s actual operating procedures, users, priorities and escalation requirements.' },
          { title: 'From Insight to Action', copy: 'Connect dashboards and analytics with alerts, tasks, response procedures and automated workflows so information supports clear operational outcomes.' },
          { title: 'Scalable Implementation', copy: 'Begin with a focused operational requirement or workflow and expand as additional processes, systems and locations are connected.' },
        ],
      },
      {
        type: 'section',
        title: 'Technology Ecosystem',
        chips: ['Microsoft', 'Microsoft Azure', 'Other Approved Command and Control, AI, Automation and Integration Partners'],
      },
      talk(),
      {
        type: 'section',
        id: 'command-control',
        title: 'Unified Command, Control & Operational Intelligence',
        paragraphs: [
          'Organizations managing facilities, infrastructure or distributed operations often rely on multiple systems that provide separate information, alerts and performance data. This makes it difficult to maintain situational awareness, identify what requires attention and coordinate an effective response.',
          'Identiti ICT implements unified command and control environments that consolidate information from connected systems into a centralized operational interface.',
          'Live status, alarms, maps, performance indicators and response workflows can be presented according to the organization’s operating procedures and user responsibilities, helping teams understand events, prioritize action and coordinate their response.',
          'Solutions can support control rooms, command centers, emergency operations, smart-city environments, campuses, transportation networks, utilities and other complex operating environments.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Unified command and control platform implementation', copy: '' },
          { title: 'Real-time dashboards, maps and operational views', copy: '' },
          { title: 'Alarm prioritization, event correlation and exception management', copy: '' },
          { title: 'Operational KPIs, analytical reporting and trend visualization', copy: '' },
          { title: 'Incident workflows, escalation procedures and decision support', copy: '' },
          { title: 'Integration with security, BMS, IoT and communication systems', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'ai-vision',
        title: 'AI Vision & Edge Analytics',
        paragraphs: [
          'Cameras, visual sensors and connected devices can provide information beyond conventional surveillance. When combined with AI and edge-processing technologies, they can help organizations understand activity patterns, monitor processes and identify operational conditions without requiring teams to watch every source continuously.',
          'Identiti ICT integrates AI vision and edge analytics solutions for operational use cases across facilities, campuses, transportation environments, industrial locations and customer-facing spaces.',
          'Processing information closer to where it is generated can reduce response time, limit unnecessary data transmission and enable alerts or automated actions to be triggered in near real time.',
          'Applications can be developed around specific requirements such as occupancy analysis, queue monitoring, traffic flow, asset movement, workplace safety, process compliance and equipment conditions.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'AI vision platform and edge-device integration', copy: '' },
          { title: 'Occupancy, queue, zone and movement analytics', copy: '' },
          { title: 'Operational process and workplace-safety monitoring', copy: '' },
          { title: 'Object, condition and event detection', copy: '' },
          { title: 'Edge computing configuration and management', copy: '' },
          { title: 'Real-time alerts and operational-platform integration', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'process-automation',
        title: 'Business Process Automation & AI-Driven Workflows',
        paragraphs: [
          'Processes built around emails, spreadsheets, paper forms and repetitive data entry can slow operations, create inconsistencies and make it difficult to track progress or accountability.',
          'Identiti ICT develops workflow and process-automation solutions that connect people, information and applications through defined digital processes.',
          'Solutions can digitize requests, route approvals, assign tasks, generate notifications, process documents and update connected business systems automatically.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Digital forms, requests and approval workflows', copy: '' },
          { title: 'End-to-end business process automation', copy: '' },
          { title: 'Robotic process automation for repetitive tasks', copy: '' },
          { title: 'Document capture, OCR and intelligent data extraction', copy: '' },
          { title: 'AI-assisted classification and workflow support', copy: '' },
          { title: 'Process dashboards, SLA tracking and performance reporting', copy: '' },
        ],
      },
      {
        type: 'section',
        title: 'Featured Automation Platform',
        groups: [
          {
            title: 'Microsoft Power Platform',
            copy: 'Identiti ICT can use Microsoft Power Platform to develop business applications, automate workflows and create operational dashboards connected with Microsoft 365, Dynamics 365, Azure and other organizational systems.',
            paragraphs: [
              'Solutions may combine:',
              'Microsoft Power Platform can support focused departmental requirements or broader process-transformation initiatives.',
              'The selected components and solution architecture depend on the organization’s processes, existing systems, users, data environment, licensing and integration requirements.',
            ],
            points: [
              'Power Apps for custom business applications',
              'Power Automate for approvals, workflows and repetitive-task automation',
              'Power BI for dashboards and operational reporting',
              'Microsoft Copilot Studio for AI-enabled agents and assisted workflows',
              'Microsoft Dataverse for structured application data',
            ],
          },
        ],
        note: 'For Microsoft 365, Azure and Power Platform licensing,',
        link: explore('software', 'Software, Cloud & Licensing'),
      },
      talk(),
      {
        type: 'section',
        id: 'systems-integration',
        title: 'Systems, Data & Application Integration',
        paragraphs: [
          'Operational intelligence and automation depend on reliable information moving between systems. When applications and platforms cannot exchange data, teams often rely on manual workarounds that duplicate effort and introduce delays and errors.',
          'Identiti ICT integrates operational technologies, enterprise applications and data sources so information can move securely and consistently across the environment.',
          'Solutions can connect new platforms with existing systems and support phased modernization without requiring every application to be replaced.',
          'The integration architecture is developed around the organization’s existing technology, security requirements, data ownership and operational priorities.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'API design, development and application integration', copy: '' },
          { title: 'Middleware and integration-platform implementation', copy: '' },
          { title: 'Data aggregation, transformation and synchronization', copy: '' },
          { title: 'Operational and enterprise-system integration', copy: '' },
          { title: 'Cloud and on-premises system integration', copy: '' },
          { title: 'Interface monitoring, testing and documentation', copy: '' },
        ],
      },
      talk(),
    ],
  },
  audiovisual: {
    id: 'audiovisual',
    nav: 'Audiovisual & Digital Experience',
    eyebrow: 'Audiovisual & Digital Experience',
    title: 'Audiovisual & Digital Experience',
    lead: 'Meeting rooms, control rooms, public spaces and customer environments require audiovisual technology that is reliable, intuitive and designed around how each space is used.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Poor AV integration creates unnecessary friction from meetings delayed by connection problems to control rooms with unclear displays and digital signage that is difficult to manage. Effective integration removes that friction by bringing display, audio, control and communication technologies together within one reliable environment.',
          'Identiti ICT designs and integrates audiovisual solutions around the specific requirements of each space, bringing together displays, control systems, video conferencing, audio and content-management platforms.',
        ],
      },
      {
        type: 'section',
        title: 'Our Approach',
        steps: [
          { title: 'Consult & Design', copy: 'Understand how the space is used, who uses it, what it needs to communicate and which technical constraints apply.' },
          { title: 'Supply & Integrate', copy: 'Select appropriate display, audio, control, conferencing and content technologies and integrate them into one coordinated environment.' },
          { title: 'Commission & Validate', copy: 'Install, configure and test the complete system before handover, verifying its performance against the design requirements.' },
          { title: 'Support & Maintain', copy: 'Provide technical support, system updates and maintenance to help keep the audiovisual environment operating consistently.' },
        ],
      },
      services('audiovisual', 'Our Audiovisual & Digital Experience Services', [
        { id: 'av-design', title: 'Audiovisual System Design & Integration', copy: 'Identiti ICT designs audiovisual systems around the function of each environment, specifying the appropriate combination of displays, audio, control, connectivity and supporting infrastructure.' },
        { id: 'video-walls', title: 'Video Walls, Control Rooms & Visualization', copy: 'Identiti ICT designs and integrates video-wall and control-room environments by combining display technology, video processors, content sources, operator workstations and control interfaces within one coordinated system.' },
        { id: 'meeting-rooms', title: 'Meeting Room & Video-Conferencing Solutions', copy: 'Identiti ICT designs and integrates collaboration environments for huddle spaces, meeting rooms, boardrooms, training facilities and multipurpose spaces.' },
        { id: 'digital-signage', title: 'Digital Signage & Interactive Display Solutions', copy: 'Identiti ICT designs and integrates digital-signage and interactive-display solutions for corporate offices, retail environments, hospitality venues, healthcare facilities, educational institutions, transportation environments and public spaces.' },
        { id: 'professional-audio', title: 'Professional Audio Systems', copy: 'Identiti ICT designs and integrates professional audio systems around the acoustic characteristics, audience, content and operational requirements of each space.' },
      ]),
      {
        type: 'section',
        title: 'Why Identiti ICT for Audiovisual & Digital Experience?',
        why: [
          { title: 'Designed Around the Space and Its Users', copy: 'Develop audiovisual solutions around how each space is used, who uses it and what the environment needs to achieve.' },
          { title: 'End-to-End AV Integration', copy: 'Bring displays, audio, control, conferencing and content technologies together within a complete and tested environment, from individual rooms to multi-site deployments.' },
          { title: 'Multi-Vendor Technology Capability', copy: 'Select and integrate technologies from established audiovisual, display and collaboration providers according to compatibility, performance and project requirements.' },
          { title: 'From Installation to Ongoing Support', copy: 'Work with Identiti across assessment, design, equipment supply, installation, programming, testing, handover, maintenance and technical support.' },
        ],
      },
      {
        type: 'section',
        title: 'Technology Ecosystem',
        chips: ['Samsung', 'Microsoft', 'Logitech', 'Cisco', 'Epson', 'Other Approved Audiovisual and Collaboration Partners'],
      },
      talk(),
      {
        type: 'section',
        id: 'av-design',
        title: 'Audiovisual System Design & Integration',
        paragraphs: [
          'Every space has different audiovisual requirements. A boardroom needs dependable conferencing and presentation technology. A training room requires clear displays and audio throughout the space. An operations center needs large-format visualization and multiple live information sources.',
          'Identiti ICT designs audiovisual systems around the function of each environment, specifying the appropriate combination of displays, audio, control, connectivity and supporting infrastructure.',
          'We then supply, install, configure and commission the technologies as one coordinated solution rather than a collection of independent products.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'AV requirements assessment and system design', copy: '' },
          { title: 'Display, projection, audio and control integration', copy: '' },
          { title: 'AV signal distribution and connectivity', copy: '' },
          { title: 'Multi-room and multi-zone environments', copy: '' },
          { title: 'AV control-system programming', copy: '' },
          { title: 'Testing, commissioning and user handover', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'video-walls',
        title: 'Video Walls, Control Rooms & Visualization',
        paragraphs: [
          'Video walls and large-format visualization environments are used across command centers, control rooms, network operations centers, security operations centers, lobbies and public spaces.',
          'These environments must display information from multiple sources clearly, maintain consistent image quality and provide operators with straightforward control over layouts and content.',
          'Identiti ICT designs and integrates video-wall and control-room environments by combining display technology, video processors, content sources, operator workstations and control interfaces within one coordinated system.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Video-wall design, supply and installation', copy: '' },
          { title: 'LED, LCD and direct-view LED display walls', copy: '' },
          { title: 'Video processors and multi-source management', copy: '' },
          { title: 'Screen-layout and content control', copy: '' },
          { title: 'Operator workstations and consoles', copy: '' },
          { title: 'Integration with operational and security platforms', copy: '' },
        ],
        note: 'For control rooms requiring unified dashboards, real-time operational data, alarm management and decision-support workflows, explore our intelligent operations capabilities.',
        link: explore('intelligent-ops', 'Intelligent Operations & Automation'),
      },
      talk(),
      {
        type: 'section',
        id: 'meeting-rooms',
        title: 'Meeting Room & Video-Conferencing Solutions',
        paragraphs: [
          'Meeting spaces must support clear communication between people in the room and remote participants. Complicated controls, poor audio and inconsistent technology across rooms can disrupt meetings and reduce adoption.',
          'Identiti ICT designs and integrates collaboration environments for huddle spaces, meeting rooms, boardrooms, training facilities and multipurpose spaces.',
          'Solutions can combine displays, conferencing cameras, microphones, speakers, wireless presentation, interactive screens and room controls through a simple and consistent user experience.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Meeting-room and boardroom AV integration', copy: '' },
          { title: 'Video-conferencing room systems', copy: '' },
          { title: 'Professional cameras, microphones and speakers', copy: '' },
          { title: 'Interactive displays and digital whiteboards', copy: '' },
          { title: 'Wireless presentation and content sharing', copy: '' },
          { title: 'Room scheduling, touch control and device management', copy: '' },
        ],
      },
      {
        type: 'section',
        title: 'Featured Collaboration Solution',
        groups: [
          {
            title: 'Microsoft Teams Rooms with Logitech',
            copy: 'Identiti ICT can deliver Microsoft Teams Rooms environments using compatible Logitech video-collaboration technologies for meeting spaces of different sizes.',
            paragraphs: [
              'Microsoft Teams Rooms extends the Teams collaboration experience into shared meeting spaces, while Logitech room solutions provide integrated cameras, microphones, speakers and touch controls.',
              'Depending on the space and requirements, solutions may include Logitech Rally Bar, Rally Bar Mini, Tap IP and other compatible room devices.',
            ],
            points: [
              'Microsoft Teams Rooms on Windows or Android',
              'Huddle rooms, meeting rooms and boardrooms',
              'Logitech cameras, video bars and audio systems',
              'Logitech Tap IP room control',
              'One-touch meeting access and content sharing',
              'Multi-room standardization and device management',
            ],
          },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'digital-signage',
        title: 'Digital Signage & Interactive Display Solutions',
        paragraphs: [
          'Digital signage allows organizations to replace static communication with dynamic content that can be scheduled, updated and managed across individual displays or multiple locations.',
          'Interactive displays extend this experience by allowing users to explore information, navigate facilities, collaborate or engage directly with digital content.',
          'Identiti ICT designs and integrates digital-signage and interactive-display solutions for corporate offices, retail environments, hospitality venues, healthcare facilities, educational institutions, transportation environments and public spaces.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Digital-signage network design', copy: '' },
          { title: 'Indoor and outdoor commercial displays', copy: '' },
          { title: 'Content-management platform integration', copy: '' },
          { title: 'Media players and centralized scheduling', copy: '' },
          { title: 'Interactive displays and touch kiosks', copy: '' },
          { title: 'Wayfinding and public information systems', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'professional-audio',
        title: 'Professional Audio Systems',
        paragraphs: [
          'Clear audio is essential to effective communication in meeting rooms, auditoriums, training facilities, hospitality environments, retail spaces and public venues.',
          'Identiti ICT designs and integrates professional audio systems around the acoustic characteristics, audience, content and operational requirements of each space.',
          'Solutions can support speech reinforcement, presentations, conferencing, paging, background music and zoned audio across individual rooms or wider facilities.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Professional audio-system design', copy: '' },
          { title: 'Acoustic assessment and coverage planning', copy: '' },
          { title: 'Speakers, amplifiers and digital signal processing', copy: '' },
          { title: 'Microphone and speech-reinforcement systems', copy: '' },
          { title: 'Public-address, paging and background music systems', copy: '' },
          { title: 'Multi-zone audio and AV-control integration', copy: '' },
        ],
      },
      talk(),
    ],
  },
  'physical-security': {
    id: 'physical-security',
    nav: 'Physical Security Solutions',
    eyebrow: 'Physical Security Solutions',
    title: 'Physical Security Solutions',
    lead: 'Identiti ICT designs physical security as an integrated system, connecting surveillance, access control, intrusion detection, perimeter protection, vehicle security and centralized management technologies within a coordinated architecture.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Our capabilities cover individual security systems as well as wider environments that consolidate alarms, events, monitoring and incident workflows across multiple systems and locations.',
          'Whether you are securing a corporate facility, government building, public venue, industrial site or multi-site estate, Identiti ICT can help design, integrate and support the appropriate security environment.',
        ],
      },
      {
        type: 'section',
        title: 'Our Approach',
        steps: [
          { title: 'Assess & Design', copy: 'Understand the facility, assets, identified risks, operational requirements, existing systems and applicable security standards before defining the appropriate architecture.' },
          { title: 'Supply & Integrate', copy: 'Select suitable security technologies and integrate cameras, access control, detection systems, barriers and management platforms within one coordinated environment.' },
          { title: 'Commission & Validate', copy: 'Install, configure and test the systems, verifying coverage, detection, access rules, alerts and response workflows before operational handover.' },
          { title: 'Support & Maintain', copy: 'Provide technical support and maintenance to help keep physical security systems operating reliably as requirements evolve.' },
        ],
      },
      services('physical-security', 'Our Physical Security Services', [
        { id: 'cctv', title: 'CCTV, Video Surveillance & AI Video Analytics', copy: 'Identiti ICT designs and integrates CCTV and IP video-surveillance systems that provide coverage across entrances, buildings, public areas, operational zones and facility perimeters.' },
        { id: 'access-control', title: 'Access Control & Entry Management', copy: 'Identiti ICT designs and implements access-control and entry-management solutions ranging from individual controlled doors to enterprise environments spanning multiple buildings, locations and user groups.' },
        { id: 'intrusion-perimeter', title: 'Intrusion Detection & Perimeter Security', copy: 'Identiti ICT designs and integrates layered detection solutions suited to different facility types, boundaries, environmental conditions and security requirements.' },
        { id: 'vehicle-barrier', title: 'Vehicle & Barrier Security', copy: 'Identiti ICT supplies and integrates vehicle-screening, identification and physical entry-control technologies that help security teams inspect vehicles, manage access and protect restricted areas.' },
        { id: 'security-management', title: 'Integrated Physical Security Management', copy: 'Identiti ICT designs and integrates physical security management environments that help security teams monitor connected systems, prioritize alarms, verify events and follow predefined incident-response procedures.' },
      ]),
      {
        type: 'section',
        title: 'Why Identiti ICT for Physical Security?',
        why: [
          { title: 'Integrated by Design', copy: 'Connect surveillance, access control, intrusion detection, perimeter security, vehicle protection and management technologies within one coordinated multi-vendor security environment.' },
          { title: 'Designed Around the Facility and Its Risks', copy: 'Develop the security architecture around the site, assets, access points, identified risks and operational procedures rather than a standard product package.' },
          { title: 'Physical Protection and Digital Management Together', copy: 'Bring cameras, sensors, locks and barriers together with dashboards, analytics, incident workflows and centralized management platforms.' },
          { title: 'From Design to Technical Support', copy: 'Work with Identiti across assessment, architecture, technology supply, installation, integration, testing, handover, maintenance and ongoing support.' },
        ],
      },
      {
        type: 'section',
        title: 'Technology Ecosystem',
        chips: ['Approved CCTV', 'Video Management', 'Access Control', 'Perimeter Security', 'Vehicle Screening', 'PSIM Technology Partners'],
      },
      talk(),
      {
        type: 'section',
        id: 'cctv',
        title: 'CCTV, Video Surveillance & AI Video Analytics',
        paragraphs: [
          'Video surveillance provides the visual foundation of a physical security environment, but cameras alone are not enough.',
          'The effectiveness of a surveillance system depends on its coverage design, image quality, lighting conditions, network capacity, storage architecture, retrieval capability and integration with wider security operations.',
          'Identiti ICT designs and integrates CCTV and IP video-surveillance systems that provide coverage across entrances, buildings, public areas, operational zones and facility perimeters.',
          'AI video analytics can be incorporated to identify defined events and direct operator attention toward situations requiring verification or response.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'CCTV and IP video-surveillance design and installation', copy: '' },
          { title: 'Fixed, PTZ, panoramic, thermal and specialized cameras', copy: '' },
          { title: 'Video Management Systems and network video recording', copy: '' },
          { title: 'Video storage, retention and retrieval architecture', copy: '' },
          { title: 'Unattended-object, object-removal and defined-event analytics', copy: '' },
          { title: 'Alerts, forensic search and security-platform integration', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'access-control',
        title: 'Access Control & Entry Management',
        paragraphs: [
          'Access control determines who can enter a facility, which areas they can access and when that access is permitted.',
          'Identiti ICT designs and implements access-control and entry-management solutions ranging from individual controlled doors to enterprise environments spanning multiple buildings, locations and user groups.',
          'Solutions can combine electronic access control with doors, gates, turnstiles, visitor processes and identity platforms to provide more consistent entry management and a documented record of access events.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Electronic access-control system design and installation', copy: '' },
          { title: 'Card, mobile and biometric credential readers', copy: '' },
          { title: 'Door controllers, locking devices and supporting hardware', copy: '' },
          { title: 'Turnstiles, speed gates and controlled-entry systems', copy: '' },
          { title: 'Access permissions, schedules and user administration', copy: '' },
          { title: 'Integration with identity, surveillance and security platforms', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'intrusion-perimeter',
        title: 'Intrusion Detection & Perimeter Security',
        paragraphs: [
          'Perimeter and intrusion-detection technologies help organizations identify unauthorized activity before it reaches sensitive buildings, assets or operational areas.',
          'Identiti ICT designs and integrates layered detection solutions suited to different facility types, boundaries, environmental conditions and security requirements.',
          'Detection events can relate to video surveillance and centralized security platforms, allowing operators to verify alarms and initiate the appropriate response.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Intrusion-detection and alarm systems', copy: '' },
          { title: 'Fence-mounted detection and vibration sensing', copy: '' },
          { title: 'Infrared beam, microwave and perimeter sensors', copy: '' },
          { title: 'Thermal-camera and radar integration', copy: '' },
          { title: 'Motion detection and protected-zone monitoring', copy: '' },
          { title: 'Alarm panels, zones and event configuration', copy: '' },
          { title: 'CCTV verification and security-platform integration', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'vehicle-barrier',
        title: 'Vehicle & Barrier Security',
        paragraphs: [
          'Vehicle entrances can represent a significant security risk for government facilities, critical infrastructure, industrial sites, data centers and other controlled environments.',
          'Identiti ICT supplies and integrates vehicle-screening, identification and physical entry-control technologies that help security teams inspect vehicles, manage access and protect restricted areas.',
          'The solution is developed around the facility layout, traffic flow, required protection level and established vehicle-entry procedures.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Under-Vehicle Surveillance Systems', copy: '' },
          { title: 'Automatic Number-Plate Recognition', copy: '' },
          { title: 'Vehicle identification, access logging and verification', copy: '' },
          { title: 'Road blockers, rising barriers and rated vehicle-mitigation systems', copy: '' },
          { title: 'Fixed, removable and automatic security bollards', copy: '' },
          { title: 'Gate controls and security-platform integration', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'security-management',
        title: 'Integrated Physical Security Management',
        paragraphs: [
          'When surveillance, access control, intrusion detection and barrier systems operate separately, operators must switch between interfaces and manually correlate events before they can respond.',
          'Physical Security Information Management platforms bring events, alarms and information from multiple systems into one coordinated interface.',
          'Identiti ICT designs and integrates physical security management environments that help security teams monitor connected systems, prioritize alarms, verify events and follow predefined incident-response procedures.',
        ],
      },
      {
        type: 'section',
        title: 'Solutions & Capabilities',
        items: [
          { title: 'Physical Security Information Management platforms', copy: '' },
          { title: 'Unified dashboards, facility maps and operational views', copy: '' },
          { title: 'Multi-system alarm and event consolidation', copy: '' },
          { title: 'Alarm correlation, prioritization and verification', copy: '' },
          { title: 'Incident logging, escalation, reporting and audit trails', copy: '' },
          { title: 'Multi-site security operations and control-room integration', copy: '' },
        ],
        note: 'Security information can also be connected with wider command-and-control platforms, operational dashboards and automated incident workflows.',
        link: explore('intelligent-ops', 'Intelligent Operations & Automation'),
      },
      talk(),
    ],
  },
  hardware: {
    id: 'hardware',
    nav: 'Hardware, Devices & IT Infrastructure',
    eyebrow: 'Hardware, Devices & IT Infrastructure',
    title: 'Hardware, Devices & IT Infrastructure',
    lead: 'Technology procurement involves more than selecting a manufacturer or model. Organizations must consider user requirements, application compatibility, performance, security, standardization, warranty coverage, product availability and future expansion.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Identiti ICT supports this process by helping organizations define suitable specifications, compare available technologies and source products through a broad multi-vendor ecosystem. We support individual product requirements, BOQ and RFQ sourcing, bulk procurement, standardized device programs and multi-site deployments. Our services can include device configuration, operating system installation, imaging, asset tagging and pre-deployment staging, followed by coordinated delivery and deployment according to the agreed scope.',
        ],
      },
      {
        type: 'section',
        title: 'How We Support Technology Procurement',
        steps: [
          { title: 'Define & Standardize', copy: 'Review technical requirements, user profiles, bills of quantities (BOQs) and requests for quotation (RFQs) to establish suitable specifications and approved device configurations.' },
          { title: 'Source & Prepare', copy: 'Source equipment from appropriate manufacturers and suppliers, confirm specifications and availability, and prepare devices through configuration, operating-system installation, imaging, asset tagging and pre-deployment staging where required.' },
          { title: 'Deliver & Deploy', copy: 'Coordinate individual, bulk or phased deliveries across one or multiple locations, with installation, deployment and operational handover support according to the agreed scope.' },
          { title: 'Support & Refresh', copy: 'Assist with warranty coordination, manufacturer support renewals, replacement requirements and technology lifecycle planning, including future upgrades and equipment refreshes.' },
        ],
      },
      services('hardware', 'Our Hardware, Devices & IT Infrastructure Products', [
        { id: 'end-user-computing', title: 'End-User Computing & Mobility', copy: 'Identiti ICT supplies end-user computing devices selected according to each organization’s applications, working environment, security requirements and user profiles.' },
        { id: 'workstations-displays', title: 'Workstations, Displays & Peripherals', copy: 'Identiti ICT supplies professional workstations, displays and peripherals for both general business environments and specialized technical users.' },
        { id: 'servers-storage', title: 'Servers, Storage & Data Center Products', copy: 'Identiti ICT supplies enterprise infrastructure products for organizations establishing, expanding or refreshing their on-premises and hybrid technology environments.' },
        { id: 'networking-power', title: 'Networking, Power & Supporting Infrastructure', copy: 'Identiti ICT supplies networking, connectivity, power and supporting infrastructure products for new deployments, infrastructure upgrades and ongoing replacement requirements.' },
      ]),
      {
        type: 'section',
        title: 'Why Identiti ICT for Technology Supply?',
        why: [
          { title: 'Requirements-Based Selection', copy: 'Select products according to user needs, applications, compatibility, performance and organizational standards rather than a single predefined brand or configuration.' },
          { title: 'Flexible Supply & Deployment', copy: 'Procure individual products, standardized device fleets or complete project requirements, with configuration, deployment and multi-site delivery support available where needed.' },
          { title: 'Procurement & Lifecycle Support', copy: 'Receive support from BOQ and RFQ sourcing through device preparation, delivery, deployment, warranty coordination, manufacturer support renewals and technology refresh planning.' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'end-user-computing',
        title: 'End-User Computing & Mobility',
        paragraphs: [
          'Different users require different levels of mobility, performance and portability. Identiti ICT supplies end-user computing devices selected according to each organization’s applications, working environment, security requirements and user profiles.',
          'We support organizations in standardizing their device environment while maintaining appropriate configurations for general users, mobile teams, executives and users with specialized performance requirements.',
        ],
      },
      {
        type: 'section',
        title: 'Product Range',
        items: [
          { title: 'Business laptops and notebook computers', copy: '' },
          { title: 'Desktop computers and all-in-one systems', copy: '' },
          { title: 'Thin clients and compact computing devices', copy: '' },
          { title: 'Tablets and mobile devices', copy: '' },
          { title: 'Business mobility accessories', copy: '' },
          { title: 'Docking stations and connectivity solutions', copy: '' },
          { title: 'Device bundles for office and remote users', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'workstations-displays',
        title: 'Workstations, Displays & Peripherals',
        paragraphs: [
          'Engineering, design, analytics, media production and other demanding applications require computing platforms that provide higher levels of processing, graphics and memory performance.',
          'Identiti ICT supplies professional workstations, displays and peripherals for both general business environments and specialized technical users.',
        ],
      },
      {
        type: 'section',
        title: 'Product Range',
        items: [
          { title: 'Professional desktop and mobile workstations', copy: '' },
          { title: 'High-performance computing configurations', copy: '' },
          { title: 'Professional and business monitors', copy: '' },
          { title: 'Large-format and specialized displays', copy: '' },
          { title: 'Graphics and performance components', copy: '' },
          { title: 'Keyboards, mice and input devices', copy: '' },
          { title: 'Headsets, webcams and collaboration peripherals', copy: '' },
          { title: 'Docking stations, adapters and connectivity accessories', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'servers-storage',
        title: 'Servers, Storage & Data Center Products',
        paragraphs: [
          'Identiti ICT supplies enterprise infrastructure products for organizations establishing, expanding or refreshing their on-premises and hybrid technology environments.',
          'Products can be supplied as individual requirements or as part of a wider data center project involving architecture, integration, implementation and technical support.',
        ],
      },
      {
        type: 'section',
        title: 'Product Range',
        items: [
          { title: 'Rack, tower and modular server systems', copy: '' },
          { title: 'SAN, NAS and direct-attached storage products', copy: '' },
          { title: 'Flash and hybrid-storage systems', copy: '' },
          { title: 'Backup and data-protection appliances', copy: '' },
          { title: 'Hyperconverged infrastructure products', copy: '' },
          { title: 'Data center racks and cabinets', copy: '' },
          { title: 'Rack-mounted power distribution units', copy: '' },
          { title: 'Server, storage and rack components', copy: '' },
          { title: 'Memory, drives and infrastructure expansion products', copy: '' },
        ],
        note: 'For requirements involving data center architecture, infrastructure integration, virtualization, backup or cybersecurity, explore our complete data center solutions.',
        link: explore('data-centers', 'Data Centers & Cybersecurity'),
      },
      talk(),
      {
        type: 'section',
        id: 'networking-power',
        title: 'Networking, Power & Supporting Infrastructure',
        paragraphs: [
          'Business systems depend on a supporting environment that provides connectivity, power protection and the physical components required to keep technology operating reliably.',
          'Identiti ICT supplies networking, connectivity, power and supporting infrastructure products for new deployments, infrastructure upgrades and ongoing replacement requirements.',
        ],
      },
      {
        type: 'section',
        title: 'Product Range',
        items: [
          { title: 'Enterprise switches and routers', copy: '' },
          { title: 'Wireless access points and controllers', copy: '' },
          { title: 'Firewalls and network-security appliances', copy: '' },
          { title: 'Network modules, transceivers and interface components', copy: '' },
          { title: 'Network cabinets and cable-management products', copy: '' },
          { title: 'Copper and fiber connectivity products', copy: '' },
          { title: 'Uninterruptible power supply systems', copy: '' },
          { title: 'Power distribution and power-protection equipment', copy: '' },
          { title: 'Data center cooling products', copy: '' },
        ],
        note: 'For network assessment, architecture, Wi-Fi design, structured cabling, implementation and lifecycle support, explore our connectivity solutions.',
        link: explore('connectivity', 'Connectivity & Network Infrastructure'),
      },
      talk(),
      {
        type: 'section',
        id: 'technology-brands',
        title: 'Featured Technology Brands',
        paragraphs: [
          'Identiti ICT provides access to business computing and infrastructure products from established global technology manufacturers. This multi-brand approach allows products to be selected according to performance, compatibility, availability, budget and organizational standards.',
          'Our product portfolio may include:',
        ],
        groups: [
          {
            title: 'HP Business Computing',
            copy: 'HP technologies support a broad range of end-user and professional computing requirements from everyday business devices to high-performance workstations and displays.',
            points: [
              'HP business laptops',
              'Business desktop and all-in-one computers',
              'HP professional workstations',
              'Business and professional monitors',
              'Docking stations and accessories',
              'Standardized device configurations',
            ],
          },
          {
            title: 'Dell Business & Enterprise Technology',
            copy: 'Dell Technologies provides products across end-user computing, professional workstations and enterprise infrastructure. Depending on the requirement, Dell products can support individual users, standardized device fleets and wider infrastructure deployments.',
            points: [
              'Dell business laptops and desktops',
              'Professional workstations',
              'Business monitors and accessories',
              'Dell PowerEdge servers',
              'Dell enterprise storage products',
              'Infrastructure components and management products',
            ],
          },
          {
            title: 'Lenovo Business Technology',
            copy: 'Lenovo provides business computing products suited to general office users, mobile teams and professionals requiring higher-performance systems.',
            points: [
              'ThinkPad business laptops',
              'ThinkCentre desktop computers',
              'ThinkStation professional workstations',
              'Business tablets and mobile devices',
              'Professional monitors',
              'Docking stations and business accessories',
            ],
          },
          {
            title: 'Apple for Business',
            copy: 'Apple devices can support executive, creative, mobile and specialized business users requiring an integrated hardware and software environment.',
            points: [
              'MacBook laptops',
              'Mac desktop products',
              'iPad devices',
              'Apple professional displays',
              'Business mobility accessories',
              'Apple device configurations for organizational use',
            ],
          },
          {
            title: 'ASUS Business Computing',
            copy: 'ASUS products can support general business users, mobile professionals and users requiring performance-focused computing environments.',
            points: [
              'Business laptops',
              'Desktop computers',
              'Professional workstations',
              'Business and professional monitors',
              'Mobile computing products',
              'Accessories and supporting components',
            ],
          },
          {
            title: 'HPE',
            copy: 'Enterprise servers, storage, networking and data center infrastructure products.',
            paragraphs: ['Exact models, configurations and availability are selected according to the organization’s requirements and the manufacturers’ current product portfolios.'],
          },
        ],
        note: 'For detailed Dell server, storage and data-protection solutions, explore our Data Centers & Cybersecurity page.',
        link: explore('data-centers', 'Data Centers & Cybersecurity'),
      },
      {
        type: 'section',
        title: 'Technology Ecosystem',
        groups: [
          { title: 'Business Computing & Devices', points: ['HP', 'Apple', 'Lenovo', 'Dell Technologies', 'ASUS', 'Microsoft Surface', 'Other Approved Device Partners'] },
          { title: 'Servers, Storage & Infrastructure', points: ['HPE', 'Dell Technologies', 'Lenovo', 'Other Approved Infrastructure Partners'] },
          { title: 'Networking & Connectivity', points: ['Cisco', 'HPE Aruba Networking', 'Fortinet', 'Huawei', 'Other Approved Networking Partners'] },
          { title: 'Power, Displays & Peripherals', points: ['APC', 'Samsung', 'Logitech', 'Other Approved Technology Partners'] },
        ],
      },
      talk(),
    ],
  },
  printing: {
    id: 'printing',
    nav: 'Printing, Imaging & Data Capture',
    eyebrow: 'Printing, Imaging & Data Capture',
    title: 'Printing, Imaging & Data Capture',
    lead: 'Printing and data-capture requirements vary significantly across organizations and industries. A corporate office managing document-heavy workflows has different needs from a logistics warehouse tracking thousands of shipments, a healthcare facility managing patient identification or a retail environment processing products and transactions.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Identiti ICT supplies printing, imaging and data-capture equipment suited to each environment matching products to the required volumes, formats, connectivity, applications and operating conditions.',
          'Our product portfolio covers business and enterprise printing, document scanning and imaging, large-format and specialized printing, barcode and label printing, RFID and mobile data capture.',
        ],
      },
      {
        type: 'section',
        title: 'How We Support Your Requirements',
        steps: [
          { title: 'Assess & Specify', copy: 'Understand output volumes, document types, workflow requirements, operating conditions and system compatibility before defining equipment specifications.' },
          { title: 'Select & Supply', copy: 'Identify appropriate products and configurations from established printing, imaging and data-capture manufacturers.' },
          { title: 'Configure & Deploy', copy: 'Coordinate delivery and support device configuration, network connectivity, driver installation and deployment where required.' },
          { title: 'Support & Refresh', copy: 'Assist with warranty coordination, consumables, replacement requirements and future equipment refreshes according to the agreed scope.' },
        ],
      },
      services('printing', 'Our Printing, Imaging & Data Capture Products', [
        { id: 'business-printing', title: 'Business & Enterprise Printing', copy: 'From desktop printers and shared workgroup devices to high-volume enterprise multifunction systems, Identiti ICT supplies business printing equipment suited to different output volumes, document types and office environments.' },
        { id: 'document-scanning', title: 'Document Scanning & Imaging', copy: 'Document scanning and imaging technologies allow organizations to convert physical documents into digital information that can be stored, searched, shared and incorporated into digital workflows.' },
        { id: 'large-format', title: 'Large-Format & Specialized Printing', copy: 'Identiti ICT supplies large-format and specialized printing equipment for engineering, architecture, facilities management, government, education, retail and commercial environments.' },
        { id: 'barcode-capture', title: 'Barcode, Label Printing & Data Capture', copy: 'Barcode, labeling and mobile data-capture technologies help organizations identify products, track assets, process transactions and capture operational information where work takes place.' },
      ]),
      {
        type: 'section',
        title: 'Why Identiti ICT for Printing & Data Capture?',
        why: [
          { title: 'Matched to Your Environment and Workflows', copy: 'Select equipment according to actual volumes, document types, physical conditions, connectivity and operational requirements rather than a standard configuration.' },
          { title: 'Business and Specialized Technologies', copy: 'Source office printing, document imaging, large-format output, labeling and enterprise data-capture products through one technology supplier.' },
          { title: 'Multi-Vendor Product Portfolio', copy: 'Access technologies from established manufacturers and select products according to suitability, compatibility, availability and required performance.' },
          { title: 'From Procurement to Deployment', copy: 'Receive support across product specification, sourcing, configuration, delivery, deployment, warranty coordination and future replacement requirements.' },
        ],
      },
      {
        type: 'section',
        title: 'Technology Ecosystem',
        groups: [
          { title: 'Printing & Imaging', points: ['HP', 'Epson', 'Other Approved Printing and Imaging Partners'] },
          { title: 'Labeling & Data Capture', points: ['Zebra Technologies', 'Other Approved Data-Capture Partners'] },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'business-printing',
        title: 'Business & Enterprise Printing',
        paragraphs: [
          'From desktop printers and shared workgroup devices to high-volume enterprise multifunction systems, Identiti ICT supplies business printing equipment suited to different output volumes, document types and office environments.',
          'Products are selected according to printing speed, color requirements, monthly volume, paper handling, connectivity, security features and the number of users supported.',
        ],
      },
      {
        type: 'section',
        title: 'Products & Capabilities',
        items: [
          { title: 'Desktop and workgroup printers', copy: '' },
          { title: 'Color and monochrome printing devices', copy: '' },
          { title: 'Multifunction printers and copiers', copy: '' },
          { title: 'Network-connected and wireless printers', copy: '' },
          { title: 'Departmental and high-volume enterprise printers', copy: '' },
          { title: 'Duplex printing and advanced paper-handling options', copy: '' },
          { title: 'Standardized printer fleets for single or multiple locations', copy: '' },
          { title: 'Toner, ink, replacement parts and supporting consumables', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'document-scanning',
        title: 'Document Scanning & Imaging',
        paragraphs: [
          'Document scanning and imaging technologies allow organizations to convert physical documents into digital information that can be stored, searched, shared and incorporated into digital workflows.',
          'For organizations managing large volumes of contracts, forms, records or incoming documents, dedicated scanning equipment can provide higher throughput, more reliable paper handling and improved image quality compared with standard office devices.',
        ],
      },
      {
        type: 'section',
        title: 'Products & Capabilities',
        items: [
          { title: 'Desktop and workgroup document scanners', copy: '' },
          { title: 'Departmental and high-volume production scanners', copy: '' },
          { title: 'Flatbed and sheet-fed scanners', copy: '' },
          { title: 'Network-connected scanning devices', copy: '' },
          { title: 'ID card, passport and specialized document scanners', copy: '' },
          { title: 'Optical character recognition and image processing', copy: '' },
          { title: 'Document capture, indexing and classification technologies', copy: '' },
          { title: 'Integration support for document-management and workflow platforms', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'large-format',
        title: 'Large-Format & Specialized Printing',
        paragraphs: [
          'Technical drawings, architectural plans, maps, signage, display graphics and other specialized output require technologies that standard office printers cannot provide.',
          'Identiti ICT supplies large-format and specialized printing equipment for engineering, architecture, facilities management, government, education, retail and commercial environments.',
          'Equipment is selected according to the required media size, print quality, production volume, durability and intended application.',
        ],
      },
      {
        type: 'section',
        title: 'Products & Capabilities',
        items: [
          { title: 'Large-format printers and plotters', copy: '' },
          { title: 'Technical and computer-aided design printing', copy: '' },
          { title: 'Architectural drawings, plans and mapping output', copy: '' },
          { title: 'Graphics, presentation and display printing', copy: '' },
          { title: 'Wide-format printers for signage and promotional materials', copy: '' },
          { title: 'Point-of-sale and receipt printers', copy: '' },
          { title: 'Mobile and compact printing devices', copy: '' },
          { title: 'Large-format media, inks and supporting consumables', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'barcode-capture',
        title: 'Barcode, Label Printing & Data Capture',
        paragraphs: [
          'Barcode, labeling and mobile data-capture technologies help organizations identify products, track assets, process transactions and capture operational information where work takes place.',
          'These technologies are particularly important across warehousing, logistics, manufacturing, retail, healthcare and field-service environments, where accurate identification and real-time access to information directly affect operational efficiency.',
        ],
      },
      {
        type: 'section',
        title: 'Products & Capabilities',
        items: [
          { title: 'Desktop and industrial barcode and label printers', copy: '' },
          { title: 'Direct-thermal and thermal-transfer printing devices', copy: '' },
          { title: 'Mobile label and receipt printers', copy: '' },
          { title: 'Handheld, presentation and fixed barcode scanners', copy: '' },
          { title: 'Rugged mobile computers and handheld terminals', copy: '' },
          { title: 'Radio-frequency identification readers and supporting equipment', copy: '' },
          { title: 'Healthcare identification and data-capture devices', copy: '' },
          { title: 'Labels, ribbons, tags and specialized printing supplies', copy: '' },
          { title: 'Charging, docking and device-management accessories', copy: '' },
        ],
        note: 'For workflow automation and application integration that connects data capture devices with warehouse management, ERP and operational business systems,',
        link: explore('intelligent-ops', 'Intelligent Operations & Automation'),
      },
      talk(),
      {
        type: 'section',
        id: 'featured-printing',
        title: 'Featured Printing, Imaging & Data-Capture Technologies',
        paragraphs: [
          'Identiti ICT works across established technology platforms to address office printing, document imaging, specialized output, labeling and operational data-capture requirements.',
          'The appropriate manufacturer, product and configuration are selected according to required volumes, formats, applications, operating conditions, connectivity and compatibility with the organization’s existing environment.',
        ],
        groups: [
          {
            title: 'HP Business and Large-Format Printing',
            copy: 'HP technologies support printing requirements ranging from individual business users and office workgroups to enterprise and specialized large-format environments.',
            paragraphs: ['Depending on the requirement, Identiti ICT can supply HP business printers, multifunction devices and HP DesignJet systems for technical drawings, architectural plans, maps and graphics.'],
            points: [
              'Business Laser and inkjet printers',
              'Color and monochrome printing',
              'Workgroup and enterprise multifunction devices',
              'Network-connected printing',
              'Print-security and device-management capabilities',
              'HP DesignJet large-format printers and plotters',
              'Printing supplies, accessories and consumables',
            ],
          },
          {
            title: 'Epson Printing, Scanning and Point-of-Sale Technologies',
            copy: 'Epson provides printing and imaging technologies for offices, workgroups, retail operations and organizations requiring professional or specialized output.',
            paragraphs: ['Depending on the operating environment, Epson products can support business document printing, scanning, receipt printing and large-format applications.'],
            points: [
              'Business inkjet printers',
              'Workgroup multifunction devices',
              'Document and photo scanners',
              'Point-of-sale and receipt printers',
              'Large-format and professional imaging systems',
              'Mobile and compact printing devices',
              'Inks, media and supporting consumables',
            ],
          },
          {
            title: 'Zebra Labeling and Data-Capture Technologies',
            copy: 'Zebra technologies support organizations that depend on accurate identification, tracking and operational data capture across logistics, warehousing, manufacturing, retail, healthcare and field-service environments.',
            paragraphs: ['The portfolio covers label printing, barcode scanning, rugged mobile computing and RFID technologies that connect physical products, assets and activities with digital systems.'],
            points: [
              'Desktop and industrial label printers',
              'Mobile label and receipt printers',
              'Handheld, presentation and fixed barcode scanners',
              'Rugged mobile computers and handheld terminals',
              'Healthcare identification and data-capture devices',
              'RFID readers, printers and tags',
              'Device accessories, labels, ribbons and supporting supplies',
            ],
          },
        ],
      },
      talk(),
    ],
  },
  software: {
    id: 'software',
    nav: 'Software, Cloud & Licensing',
    eyebrow: 'Software, Cloud & Licensing',
    title: 'Software, Cloud & Licensing',
    lead: 'Software procurement involves more than selecting a product. Licensing models vary across vendors and may be based on users, devices, workloads, subscriptions, consumption or perpetual ownership.',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Organizations must consider the capabilities they require, the number and type of users, compatibility with existing systems, renewal requirements and how software will be deployed across their environment.',
          'Identiti ICT helps organizations define their software requirements, select suitable licensing models and procure products through a multi-vendor technology ecosystem.',
          'Our portfolio covers productivity and collaboration software, operating systems and enterprise licensing, cloud platforms, cybersecurity and backup subscriptions, virtualization and infrastructure management, and business applications.',
        ],
      },
      {
        type: 'section',
        title: 'How We Support Software & Licensing',
        steps: [
          { title: 'Assess & Define', copy: 'Review users, applications, workloads, existing software and operational requirements to define the required licensing scope.' },
          { title: 'Select & License', copy: 'Identify appropriate products, editions, subscription plans and licensing models based on the required capabilities.' },
          { title: 'Activate & Configure', copy: 'Support license activation, account setup, user assignment, configuration and integration where required.' },
          { title: 'Renew & Manage', copy: 'Support software license, cloud subscription and original equipment manufacturer (OEM) license and support renewals. Review renewal dates and adjust licensing as users, devices, workloads and operational requirements change.' },
        ],
      },
      services('software', 'Our Software, Cloud & Licensing Products', [
        { id: 'productivity-licensing', title: 'Productivity, Collaboration & Enterprise Licensing', copy: 'Identiti ICT supplies business and enterprise software licensing according to the organization’s number of users, device environment, required applications and preferred deployment model.' },
        { id: 'cloud-platforms', title: 'Cloud Platforms & Subscriptions', copy: 'Identiti ICT supports the selection and procurement of cloud accounts, subscriptions and services for organizations adopting cloud-first or hybrid environments.' },
        { id: 'security-protection', title: 'Cybersecurity, Backup & Data Protection Software', copy: 'Identiti ICT supplies cybersecurity and backup software according to the organization’s users, endpoints, workloads, risk profile and recovery requirements.' },
        { id: 'infrastructure-apps', title: 'Infrastructure Management & Business Applications', copy: 'Identiti ICT supplies virtualization, infrastructure-management and business application platforms aligned with different technical and operational requirements.' },
      ]),
      {
        type: 'section',
        title: 'Why Identiti ICT for Software, Cloud & Licensing?',
        why: [
          { title: 'Licensing Based on Actual Requirements', copy: 'Select products, editions and subscription plans according to your users, workloads and required capabilities.' },
          { title: 'Software and Infrastructure Together', copy: 'Coordinate software, cloud services and licensing with the devices, networks, data center infrastructure and security technologies they depend on.' },
          { title: 'Procurement & Lifecycle Management', copy: 'Receive support across software selection, procurement, activation, configuration and renewals, with licensing adjustments aligned with changing business requirements.' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'productivity-licensing',
        title: 'Productivity, Collaboration & Enterprise Licensing',
        paragraphs: [
          'Productivity and collaboration platforms support document creation, communication, email, meetings, file sharing and teamwork across office, remote and mobile environments.',
          'Identiti ICT supplies business and enterprise software licensing according to the organization’s number of users, device environment, required applications and preferred deployment model.',
          'This category also covers the operating systems, server software and database licenses required to support end-user and infrastructure environments.',
        ],
      },
      {
        type: 'section',
        title: 'Products & Capabilities',
        items: [
          { title: 'Productivity and office software suites', copy: '' },
          { title: 'Business email and communication platforms', copy: '' },
          { title: 'Team collaboration and video-meeting software', copy: '' },
          { title: 'File storage and document-sharing subscriptions', copy: '' },
          { title: 'Desktop operating-system licenses', copy: '' },
          { title: 'Server operating-system licensing', copy: '' },
          { title: 'Database and enterprise software licensing', copy: '' },
          { title: 'User-based and device-based licensing', copy: '' },
          { title: 'Subscription, volume and perpetual licensing options', copy: '' },
          { title: 'Software license activation, renewal and lifecycle management', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'cloud-platforms',
        title: 'Cloud Platforms & Subscriptions',
        paragraphs: [
          'Cloud platforms allow organizations to access computing, storage, databases, applications and other technology services without depending entirely on physical infrastructure.',
          'Identiti ICT supports the selection and procurement of cloud accounts, subscriptions and services for organizations adopting cloud-first or hybrid environments.',
          'Cloud services can be supplied independently or as part of a wider infrastructure, collaboration, backup, security or digital-transformation project.',
        ],
      },
      {
        type: 'section',
        title: 'Products & Capabilities',
        items: [
          { title: 'Cloud-platform accounts and subscriptions', copy: '' },
          { title: 'Cloud compute and virtual-machine services', copy: '' },
          { title: 'Cloud storage and managed databases', copy: '' },
          { title: 'Cloud backup and disaster recovery', copy: '' },
          { title: 'Hybrid-cloud connectivity and integration', copy: '' },
          { title: 'Cloud identity and access services', copy: '' },
          { title: 'Software-as-a-Service subscriptions', copy: '' },
          { title: 'Cloud security and monitoring services', copy: '' },
          { title: 'Subscription renewal and service adjustments', copy: '' },
          { title: 'Cloud migration and configuration support', copy: '' },
        ],
      },
      talk(),
      {
        type: 'section',
        id: 'security-protection',
        title: 'Cybersecurity, Backup & Data Protection Software',
        paragraphs: [
          'Security and data-protection software helps organizations protect accounts, devices, applications and information while maintaining recoverable copies of critical data.',
          'Identiti ICT supplies cybersecurity and backup software according to the organization’s users, endpoints, workloads, risk profile and recovery requirements.',
          'Products can be supplied as standalone licenses or integrated within broader cybersecurity, infrastructure and business-continuity solutions.',
        ],
      },
      {
        type: 'section',
        title: 'Products & Capabilities',
        items: [
          { title: 'Endpoint protection, EDR and XDR software', copy: '' },
          { title: 'Email security and anti-phishing platforms', copy: '' },
          { title: 'Firewall and network-security subscriptions', copy: '' },
          { title: 'Identity and access-security software', copy: '' },
          { title: 'Data-loss prevention and encryption tools', copy: '' },
          { title: 'Security monitoring and SIEM platforms', copy: '' },
          { title: 'Vulnerability-management software', copy: '' },
          { title: 'Enterprise backup and recovery software', copy: '' },
          { title: 'Cloud and Software-as-a-Service backup', copy: '' },
          { title: 'Ransomware-resilient and immutable backup platforms', copy: '' },
          { title: 'Security, backup and OEM license and support renewals', copy: '' },
        ],
        note: 'For cybersecurity architecture, backup implementation, identity management, security monitoring and IT/OT protection, explore our integrated security solutions.',
        link: explore('data-centers', 'Data Centers & Cybersecurity'),
      },
      talk(),
      {
        type: 'section',
        id: 'infrastructure-apps',
        title: 'Infrastructure Management & Business Applications',
        paragraphs: [
          'Organizations require software to manage infrastructure, monitor performance, connect applications and digitize business processes.',
          'Identiti ICT supplies virtualization, infrastructure-management and business application platforms aligned with different technical and operational requirements.',
          'Where required, these platforms can be integrated with existing infrastructure, data sources and workflows as part of a wider ICT implementation.',
        ],
      },
      {
        type: 'section',
        title: 'Products & Capabilities',
        items: [
          { title: 'Server and desktop virtualization platforms', copy: '' },
          { title: 'Infrastructure monitoring and management software', copy: '' },
          { title: 'Network monitoring and management tools', copy: '' },
          { title: 'Device and endpoint-management platforms', copy: '' },
          { title: 'Database and application-server software', copy: '' },
          { title: 'IT service-management and helpdesk platforms', copy: '' },
          { title: 'Workflow and process-automation tools', copy: '' },
          { title: 'Customer relationship management applications', copy: '' },
          { title: 'Enterprise resource planning applications', copy: '' },
          { title: 'Reporting, analytics and business-intelligence platforms', copy: '' },
          { title: 'Creative, engineering and document-workflow software', copy: '' },
          { title: 'Application integration and middleware platforms', copy: '' },
        ],
        note: 'For workflow design, business process automation, operational dashboards and application integration, explore our implementation and automation capabilities.',
        link: explore('intelligent-ops', 'Intelligent Operations & Automation'),
      },
      talk(),
      {
        type: 'section',
        id: 'featured-software',
        title: 'Featured Software & Cloud Platform',
        groups: [
          {
            title: 'Microsoft Cloud & Business Technologies',
            copy: 'Microsoft provides an integrated technology ecosystem spanning productivity, collaboration, cloud infrastructure, operating systems, databases, security and business applications.',
            paragraphs: ['Identiti ICT can support organizations in selecting and procuring Microsoft products and subscriptions according to their users, workloads, existing environment and required capabilities.'],
            points: [
              'Microsoft 365 Business and Enterprise plans',
              'Word, Excel, PowerPoint and Outlook',
              'Microsoft Teams',
              'Exchange Online, SharePoint and OneDrive',
              'Microsoft Intune and Microsoft Entra',
              'Microsoft 365 security and compliance capabilities',
              'Microsoft 365 Copilot licensing',
              'Microsoft Azure cloud services',
              'Windows and Windows Server',
              'Microsoft SQL Server',
              'Microsoft Project and Visio',
              'Power BI, Power Apps and Power Automate',
              'Dynamics 365 business applications',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Technology Ecosystem',
        groups: [
          { title: 'Productivity, Cloud & Business Applications', points: ['Microsoft', 'Adobe', 'Autodesk', 'DocuSign', 'Other Approved Software and Cloud Partners'] },
          { title: 'Cybersecurity & Data Protection', points: ['Fortinet', 'Palo Alto Networks', 'Trend Micro', 'Kaspersky', 'Veeam', 'Other Approved Security and Backup Partners'] },
          { title: 'Virtualization & Infrastructure Management', points: ['Microsoft', 'VMware by Broadcom', 'Other Approved Infrastructure Software Partners'] },
        ],
      },
      talk(),
    ],
  },
}

export function getIctSection(id: string | null): IctSection {
  if (id && id in ictSections) return ictSections[id as IctSectionId]
  return ictSections.overview
}
