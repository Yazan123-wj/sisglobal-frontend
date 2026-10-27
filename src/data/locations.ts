export type GlobalLocation = {
  id: string
  country: string
  year: string
  city?: string
  headquarters?: boolean
  blurb: string
  lat: number
  lng: number
}

export const globalLocations: GlobalLocation[] = [
  { id: 'united-kingdom', country: 'United Kingdom', year: '2006', lat: 51.5074, lng: -0.1278, blurb: 'SIS Global location in United Kingdom.' },
  { id: 'saudi-arabia', country: 'Saudi Arabia', year: '2007', city: 'Riyadh', headquarters: true, lat: 24.7136, lng: 46.6753, blurb: 'SIS Global headquarters in Riyadh, Saudi Arabia.' },
  { id: 'egypt', country: 'Egypt', year: '2020', lat: 30.0444, lng: 31.2357, blurb: 'SIS Global location in Egypt.' },
  { id: 'united-arab-emirates', country: 'United Arab Emirates', year: '2021', lat: 25.2048, lng: 55.2708, blurb: 'SIS Global location in United Arab Emirates.' },
  { id: 'palestine', country: 'Palestine', year: '2023', lat: 31.9038, lng: 35.2034, blurb: 'SIS Global location in Palestine.' },
  { id: 'jordan', country: 'Jordan', year: '2023', lat: 31.9454, lng: 35.9284, blurb: 'SIS Global location in Jordan.' },
  { id: 'tanzania', country: 'Tanzania', year: '2024', lat: -6.7924, lng: 39.2083, blurb: 'SIS Global location in Tanzania.' },
  { id: 'syria', country: 'Syria', year: '2026', lat: 33.5138, lng: 36.2765, blurb: 'SIS Global location in Syria.' },
]

export const headquarters = globalLocations.find((location) => location.headquarters) ?? globalLocations[1]
