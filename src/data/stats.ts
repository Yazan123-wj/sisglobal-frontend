export type StatItem = {
  value: string
  label: string
}

export const STAT_LABEL = {
  countries: 'Countries of Operation',
  years: 'Years of Experience',
  partners: 'Technology Partners',
  enterpriseClients: 'Enterprise Clients',
  dailyOperations: 'Daily Operations',
  professionals: 'Professionals Managed',
  devices: 'PCs & Devices Supported',
  fieldJobs: 'Field Jobs Delivered',
  clientsServed: 'Clients Served',
  activeResources: 'Active Resources',
  hrOperations: 'HR Operations Processed',
  helpdeskTickets: 'Helpdesk Tickets Resolved',
  payslips: 'Payslips Issued',
  projects: 'Projects',
  activeTeams: 'Active Teams',
} as const

export const homeStats: StatItem[] = [
  { value: '8+', label: STAT_LABEL.countries },
  { value: '19+', label: STAT_LABEL.years },
  { value: '500+', label: STAT_LABEL.enterpriseClients },
  { value: '3,000+', label: STAT_LABEL.professionals },
  { value: '8,500+', label: STAT_LABEL.fieldJobs },
]
