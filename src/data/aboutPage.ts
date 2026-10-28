import iso14001 from '@/assets/certs/iso-14001.png'
import iso22301 from '@/assets/certs/iso-22301.png'
import iso27001 from '@/assets/certs/iso-27001.png'
import iso45001 from '@/assets/certs/iso-45001.png'
import iso9001 from '@/assets/certs/iso-9001.png'
import { STAT_LABEL } from '@/data/stats'

export const aboutIntro = [
  'SIS Global is a Riyadh-headquartered business solutions group helping organizations manage their people, their technology and their critical operations through specialized, integrated services.',
  'Founded in the United Kingdom in 2006, we established operations in Saudi Arabia in 2007 and have continued to grow in response to our clients’ changing needs.',
  'Today, our specialized businesses bring together Human Capital Management (HCM), Technical Services Operations (TSO) and Information & Communication Technology (ICT), allowing organizations to access distinct capabilities through one established group.',
  'We combine deep local market understanding with international experience and scalable delivery capabilities, giving clients the expertise they need with the accountability of a single business partner.',
]

export const aboutGlance = [
  { value: '8+', label: STAT_LABEL.countries },
  { value: '19+', label: STAT_LABEL.years },
  { value: '40+', label: STAT_LABEL.partners },
  { value: '500+', label: STAT_LABEL.enterpriseClients },
  { value: '1,850+', label: STAT_LABEL.dailyOperations },
  { value: '3,000+', label: STAT_LABEL.professionals },
  { value: '8,000+', label: STAT_LABEL.devices },
  { value: '8,500+', label: STAT_LABEL.fieldJobs },
]

export const aboutStory = [
  {
    year: '2006',
    title: 'Founded in the UK',
    copy: 'SIS is founded in the United Kingdom, marking the beginning of the group’s journey.',
  },
  {
    year: '2007',
    title: 'Entering the Middle East',
    copy: 'SIS establishes operations in Riyadh, supporting organizations in the Saudi market.',
  },
  {
    year: '2010s',
    title: 'Expanding Our Capabilities',
    copy: 'SIS expands beyond recruitment into integrated HR operations and technical field services, building the foundation for today’s specialized businesses.',
  },
  {
    year: '2020',
    title: 'Egypt',
    copy: 'Operations open in Egypt, expanding our regional presence.',
  },
  {
    year: '2021',
    title: 'United Arab Emirates',
    copy: 'Operations are established in the UAE, extending our footprint across the Gulf.',
  },
  {
    year: '2023',
    title: 'Certified and Recognized',
    copy: 'SIS Global achieves five ISO certifications, earns Great Place to Work certification in Saudi Arabia and ranks 19th among the Best Workplaces in the Middle East, GCC 2023.',
  },
  {
    year: '2023',
    title: 'Jordan and Palestine',
    copy: 'Two new markets open, strengthening our presence across the Levant.',
  },
  {
    year: '2024',
    title: 'Tanzania',
    copy: 'Operations extend into East Africa.',
  },
  {
    year: '2026',
    title: 'Syria',
    copy: 'Operations open in Syria as regional expansion continues.',
  },
]

export const aboutVision = 'To become the region\'s most trusted partner for integrated business solutions bringing together the people, technology and operational expertise organizations need to perform and grow.'

export const aboutMission = 'To simplify complex business operations by combining specialized expertise, technology-enabled solutions and deep local understanding delivering measurable value through reliable, long-term partnerships.'

export const aboutValues = [
  { title: 'Integrity', copy: 'We act transparently, take responsibility and build relationships on trust.' },
  { title: 'Reliability', copy: 'We deliver with consistency and take ownership of the commitments we make.' },
  { title: 'Innovation', copy: 'We continuously look for smarter ways to improve how services are designed and delivered.' },
  { title: 'Collaboration', copy: 'We work alongside our clients, partners and teams because complex challenges are rarely solved in isolation.' },
]

export const aboutDifference = [
  { title: 'Integrated Capabilities', copy: 'Access specialized HCM, technical operations and ICT capabilities through one established group.' },
  { title: 'Local Understanding', copy: 'Operate with teams that understand the regulatory, operational and commercial realities of the markets they serve.' },
  { title: 'Flexible Delivery', copy: 'Engage SIS Global for a defined requirement, specialized capability or broader managed solution according to your operational needs.' },
  { title: 'Accountability', copy: 'Reduce fragmented delivery by working with teams structured around clear responsibility, coordination and measurable outcomes.' },
]

export const aboutCeo = {
  label: 'A Message from Our Founder & CEO',
  paragraphs: [
    'SIS Global was built on the belief that lasting business success comes from combining strong people, efficient operations and the right technology.',
    'Since our beginnings in Saudi Arabia, we have continued to evolve alongside our clients expanding our capabilities while remaining focused on what matters most: understanding their challenges, delivering with accountability and building partnerships that last.',
    'As SIS Global continues to grow, our commitment remains the same: to invest in our people, embrace innovation and create meaningful, sustainable value for every organization we serve.',
  ],
  name: 'Sammer Al Sabawi',
  role: 'Founder & CEO, SIS Global',
}

export const aboutCerts = [
  { code: 'ISO 9001', label: 'Quality Management', logo: iso9001 },
  { code: 'ISO 45001', label: 'Occupational Health & Safety', logo: iso45001 },
  { code: 'ISO 14001', label: 'Environmental Management', logo: iso14001 },
  { code: 'ISO 27001', label: 'Information Security Management', logo: iso27001 },
  { code: 'ISO 22301', label: 'Business Continuity Management', logo: iso22301 },
]

export const aboutCta = {
  title: "Let's Build What's Next.",
  copy: "Whether you're strengthening your workforce, managing critical technical operations or advancing your technology environment, SIS Global brings together the expertise and capabilities to help you move forward.",
  action: 'Talk to SIS Global',
}

export const aboutPresence = {
  heading: 'Where You Can Find Us',
  lead: "Explore our locations and connect with the teams delivering SIS Global's services and solutions across the Middle East and Africa.",
  officesTitle: 'Our Offices',
  officesLead: 'Being close to our clients is how we deliver. With offices across the region, you can reach a team that understands your market. Find the one nearest to you.',
  missing: "Can't find what you're looking for?",
}

export type AboutOffice = {
  country: string
  city?: string
  place?: string
  lines?: string[]
  phone?: string
  email?: string
}

export const aboutOffices: AboutOffice[] = [
  {
    country: 'Saudi Arabia',
    city: 'Riyadh',
    place: 'Headquarters',
    lines: [
      '3rd Floor, Alraida Building, King Fahad Road',
      'Riyadh 11564, Saudi Arabia',
    ],
    phone: '+966 11 451 8700',
    email: 'riyadh@sisglobal.com',
  },
  {
    country: 'Jordan',
    city: 'Amman',
    lines: [
      'Al Husseini Complex, 7th Circle, Zahran Street',
      'Amman 11183, Jordan',
    ],
    phone: '+962 6 438 2632',
    email: 'amman@sisglobal.com',
  },
  {
    country: 'United Arab Emirates',
    city: 'Dubai',
    lines: [
      'Office 1204, Boulevard Plaza Tower 1, Downtown',
      'Dubai, United Arab Emirates',
    ],
    phone: '+971 4 320 1840',
    email: 'dubai@sisglobal.com',
  },
  {
    country: 'Egypt',
    city: 'Cairo',
    lines: [
      'Building 14, Street 90, Fifth Settlement',
      'New Cairo, Egypt',
    ],
    phone: '+20 2 2531 7640',
    email: 'cairo@sisglobal.com',
  },
  {
    country: 'Palestine',
    city: 'Ramallah',
    lines: [
      '3rd Floor, Al Bireh Business Center, Al Irsal Street',
      'Ramallah, Palestine',
    ],
    phone: '+970 2 297 4310',
    email: 'ramallah@sisglobal.com',
  },
  {
    country: 'Tanzania',
    city: 'Dar es Salaam',
    lines: [
      'Plot 22, Ohio Street, Kinondoni',
      'Dar es Salaam, Tanzania',
    ],
    phone: '+255 22 211 4580',
    email: 'tanzania@sisglobal.com',
  },
  {
    country: 'Syria',
    city: 'Damascus',
    lines: [
      '5th Floor, Hijaz Building, Baghdad Street',
      'Damascus, Syria',
    ],
    phone: '+963 11 334 2190',
    email: 'damascus@sisglobal.com',
  },
]
