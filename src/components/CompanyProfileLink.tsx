import Arrow from '@/components/Arrow'
import type { CompanyProfile } from '@/data/companyProfiles'

export default function CompanyProfileLink({ profile }: { profile: CompanyProfile }) {
  return (
    <a className="button button-primary profile-link" href={profile.href} download={profile.filename}>
      Download Company Profile <Arrow />
    </a>
  )
}
