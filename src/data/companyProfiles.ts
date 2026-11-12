export type CompanyProfileId = 'sis' | 'hcm' | 'tso' | 'ict'

export type CompanyProfile = {
  id: CompanyProfileId
  name: string
  label: string
  href: string
  filename: string
}

export const companyProfiles: CompanyProfile[] = [
  {
    id: 'sis',
    name: 'SIS Global',
    label: 'SIS company profile',
    href: '/profiles/sis-company-profile.pdf',
    filename: 'SIS-Global-Company-Profile.pdf',
  },
  {
    id: 'hcm',
    name: 'Idarat HCM',
    label: 'HCM company profile',
    href: '/profiles/idarat-hcm-company-profile.pdf',
    filename: 'Idarat-HCM-Company-Profile.pdf',
  },
  {
    id: 'tso',
    name: 'Idarat TSO',
    label: 'TSO company profile',
    href: '/profiles/idarat-tso-company-profile.pdf',
    filename: 'Idarat-TSO-Company-Profile.pdf',
  },
  {
    id: 'ict',
    name: 'Identiti ICT',
    label: 'ICT company profile',
    href: '/profiles/identiti-ict-company-profile.pdf',
    filename: 'Identiti-ICT-Company-Profile.pdf',
  },
]

export function companyProfile(id: CompanyProfileId) {
  return companyProfiles.find((profile) => profile.id === id) ?? companyProfiles[0]
}
