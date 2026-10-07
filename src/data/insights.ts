export type InsightKind = 'article' | 'news' | 'story'
export type InsightImage = 'workforce' | 'telecom' | 'ict' | 'network'

export type Insight = {
  id: string
  kind: InsightKind
  unit: string
  topic: string
  title: string
  excerpt: string
  date: string
  read: string
  image: InsightImage
  body: string[]
}

export const insights: Insight[] = [
  {
    id: '5g-rollout-complexity',
    kind: 'article',
    unit: 'TSO',
    topic: 'Technical operations',
    title: 'What 5G rollout complexity looks like on the ground',
    excerpt: 'Multi-site radio programmes succeed when planning, field teams and acceptance stay in one sequence.',
    date: '12 March 2026',
    read: '6 min',
    image: 'telecom',
    body: [
      'A 5G rollout is rarely one job. It is a sequence of site access, installation, integration, testing and handover — often across mixed-vendor estates and live traffic.',
      'The programmes that stay on schedule treat field readiness as part of the plan, not a later problem. Materials, power, access and the crew have to arrive in the same window.',
      'Idarat TSO’s view from the field is consistent: complexity sits between the design and the live network. That is where coordination, documentation and acceptance standards decide whether a site is actually done.',
      'Operators that keep rollout, integration and quality in one accountable team spend less time reconciling vendors, contractors and status reports.',
    ],
  },
  {
    id: 'managing-large-workforces',
    kind: 'article',
    unit: 'HCM',
    topic: 'Human capital',
    title: 'Managing large workforces in high-compliance environments',
    excerpt: 'Scale is manageable when records, payroll and government processes stay aligned.',
    date: '4 March 2026',
    read: '5 min',
    image: 'workforce',
    body: [
      'Large workforces in Saudi Arabia and the wider region sit inside a dense set of statutory processes — from contracts and payroll to Qiwa, GOSI and mobility.',
      'When those processes sit in different systems, or with different vendors, HR teams spend their time reconciling files instead of supporting the business.',
      'Idarat HCM is built around the employee lifecycle: hire, administer, pay, remain compliant, and exit cleanly. The service model can be one function or the full cycle.',
      'The organisations that stay in control treat workforce data as an operating system, not a filing cabinet.',
    ],
  },
  {
    id: 'resilient-infrastructure-ksa',
    kind: 'article',
    unit: 'ICT',
    topic: 'ICT infrastructure',
    title: 'Building resilient infrastructure for enterprise in KSA',
    excerpt: 'Availability is designed in — from the data centre to the workplace device.',
    date: '18 February 2026',
    read: '5 min',
    image: 'ict',
    body: [
      'Enterprise technology in the Kingdom has to stay available. That is as true for a data centre hall as it is for the PCs and networks people use every day.',
      'Resilience is not a single product. It is how compute, connectivity and security are designed, handed over and supported.',
      'Identiti ICT works through established vendor partnerships so infrastructure, networking and cybersecurity can be delivered as one estate.',
      'The organisations that modernise well refresh the foundation first, then add digital tools — not the other way around.',
    ],
  },
  {
    id: 'regional-operations-update',
    kind: 'news',
    unit: 'SIS Global',
    topic: 'Company update',
    title: 'SIS Global continues to support operations across the region',
    excerpt: 'A Saudi-founded group with teams working across people, field operations and ICT.',
    date: '20 March 2026',
    read: '3 min',
    image: 'network',
    body: [
      'SIS Global remains focused on the work that keeps organisations moving: human capital, technical services operations and ICT infrastructure.',
      'The group is Saudi-founded and headquartered in Riyadh, with a presence across multiple countries of operation.',
      'Delivery stays specialised by unit — Idarat HCM, Idarat TSO and Identiti ICT — under one accountable group.',
    ],
  },
  {
    id: 'hcm-service-model',
    kind: 'news',
    unit: 'HCM',
    topic: 'Announcement',
    title: 'Flexible HCM support, from one function to the full lifecycle',
    excerpt: 'Organisations can choose individual HCM services or combine them into one solution.',
    date: '8 March 2026',
    read: '3 min',
    image: 'workforce',
    body: [
      'Idarat HCM continues to offer a flexible service model. Organisations can take support for a single HR function, or combine recruitment, administration, payroll and workforce management.',
      'My Idarat brings recruitment, employee self-service and day-to-day workforce tasks into one platform.',
      'The intent is practical: give HR teams a way to extend capacity without rebuilding their operating model.',
    ],
  },
  {
    id: 'tso-iso-certifications',
    kind: 'news',
    unit: 'TSO',
    topic: 'Quality',
    title: 'EHS remains part of how TSO plans and delivers',
    excerpt: 'Environment, Health & Safety is built into technical operations, supported by ISO certifications.',
    date: '27 February 2026',
    read: '3 min',
    image: 'telecom',
    body: [
      'At Idarat TSO, Environment, Health & Safety is part of how technical operations are planned and delivered — across telecom sites, power environments, IT facilities and workplaces.',
      'The unit is certified to ISO 45001, ISO 14001, ISO 9001, ISO 27001 and ISO 22301.',
      'That standard of work is how field teams stay aligned with client and regulatory expectations on live infrastructure.',
    ],
  },
  {
    id: 'telecom-site-delivery',
    kind: 'story',
    unit: 'TSO',
    topic: 'Telecommunications',
    title: 'Bringing multi-site radio programmes from plan to live network',
    excerpt: 'Rollout, integration and acceptance kept in one sequence across a live mobile estate.',
    date: '15 January 2026',
    read: '4 min',
    image: 'telecom',
    body: [
      'A multi-site radio programme has to move from a deployment plan to a live network without losing quality at each site.',
      'The work typically covers RAN and transmission deployment, installation and commissioning, integration and formal acceptance.',
      'Keeping those steps with one technical partner reduces the gaps that appear when design, field and quality sit in different contracts.',
      'The result is a clearer path from site ready to site live — with the documentation operators need at handover.',
    ],
  },
  {
    id: 'workforce-for-public-services',
    kind: 'story',
    unit: 'HCM',
    topic: 'Government',
    title: 'Standing up workforce operations for a public-sector programme',
    excerpt: 'Recruitment, administration and payroll aligned to a large, time-bound workforce.',
    date: '9 January 2026',
    read: '4 min',
    image: 'workforce',
    body: [
      'Public programmes often need people in place quickly, then need those people administered correctly for as long as the work lasts.',
      'Idarat HCM supports that shape of work: search and selection at volume, then employee administration, payroll and government relations.',
      'The operating model can expand or step back as the programme changes, without forcing a permanent in-house build for every HR function.',
    ],
  },
  {
    id: 'enterprise-ict-refresh',
    kind: 'story',
    unit: 'ICT',
    topic: 'Financial services',
    title: 'Refreshing enterprise ICT without taking the estate offline',
    excerpt: 'Infrastructure, connectivity and security treated as one programme.',
    date: '22 December 2025',
    read: '4 min',
    image: 'ict',
    body: [
      'An ICT refresh has to keep the current environment available while the next one is built.',
      'Identiti ICT approaches that as infrastructure, networking and cybersecurity in one programme — not as disconnected purchases.',
      'Vendor-backed delivery and support after handover are what make the new estate operable, not just installed.',
    ],
  },
]

export const insightKinds: { id: InsightKind; label: string; intro: string }[] = [
  { id: 'article', label: 'Articles', intro: 'Featured writing and recent editorial from the SIS Global team.' },
  { id: 'news', label: 'News', intro: 'Company updates, certifications and service announcements.' },
  { id: 'story', label: 'Success Stories', intro: 'How the work looks when people, operations and technology come together.' },
]

export const insightKindPath: Record<InsightKind, string> = {
  article: '/insights/articles',
  news: '/insights/news',
  story: '/case-studies',
}

export function insightsByKind(kind: InsightKind) {
  return insights.filter((item) => item.kind === kind)
}

export function getInsight(id: string) {
  return insights.find((item) => item.id === id)
}

export function relatedInsights(insight: Insight, count = 3) {
  return insights.filter((item) => item.id !== insight.id && item.kind === insight.kind).slice(0, count)
}

export function getCaseStudy(id: string) {
  return insights.find((item) => item.id === id && item.kind === 'story')
}

export function relatedCaseStudies(id: string, count = 2) {
  return insightsByKind('story').filter((item) => item.id !== id).slice(0, count)
}
