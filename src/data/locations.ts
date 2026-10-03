export type GlobalLocation = {
  id: string
  country: string
  year: string
  city?: string
  headquarters?: boolean
  blurb: string
}

export const globalLocations: GlobalLocation[] = [
  { id: 'united-kingdom', country: 'United Kingdom', year: '2006', blurb: 'SIS Global location in United Kingdom.' },
  { id: 'saudi-arabia', country: 'Saudi Arabia', year: '2007', city: 'Riyadh', headquarters: true, blurb: 'SIS Global headquarters in Riyadh, Saudi Arabia.' },
  { id: 'egypt', country: 'Egypt', year: '2020', blurb: 'SIS Global location in Egypt.' },
  { id: 'united-arab-emirates', country: 'United Arab Emirates', year: '2021', blurb: 'SIS Global location in United Arab Emirates.' },
  { id: 'palestine', country: 'Palestine', year: '2023', blurb: 'SIS Global location in Palestine.' },
  { id: 'jordan', country: 'Jordan', year: '2023', blurb: 'SIS Global location in Jordan.' },
  { id: 'tanzania', country: 'Tanzania', year: '2024', blurb: 'SIS Global location in Tanzania.' },
  { id: 'syria', country: 'Syria', year: '2026', blurb: 'SIS Global location in Syria.' },
]
