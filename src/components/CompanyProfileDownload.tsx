import Arrow from '@/components/Arrow'
import type { CompanyProfile } from '@/data/companyProfiles'

export default function CompanyProfileDownload({ profile }: { profile: CompanyProfile }) {
  return (
    <section className="home-profiles is-single section" aria-labelledby="company-profile-title">
      <div className="container">
        <div className="home-profiles-row">
          <h2 id="company-profile-title">Company profile</h2>
          <a className="home-profile-card" href={profile.href} download={profile.filename} aria-label={profile.label}>
            <h3>{profile.name}</h3>
            <span className="text-link">Download <Arrow /></span>
          </a>
        </div>
      </div>
    </section>
  )
}
