import heroNetworkImage from '@/assets/sis-global-network-hero.png'
import ContactForm from '@/components/ContactForm'
import GlobalPresenceSection from '@/components/GlobalPresenceSection'
import { aboutOffices } from '@/data/aboutPage'

const hq = aboutOffices[0]

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="about-hero" aria-labelledby="contact-title">
        <div className="about-hero-visual" style={{ backgroundImage: `url(${heroNetworkImage})` }} aria-hidden="true" />
        <div className="container about-hero-inner">
          <div className="about-hero-copy">
            <p className="eyebrow light">Contact Us</p>
            <h1 id="contact-title">Let’s put your plans into action.</h1>
            <p>Tell us what your business needs and the right specialist will get back to you.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="surface-band surface-mist contact-panel">
        <div className="container contact-layout">
          <div className="contact-copy">
            <h2>Get in touch</h2>
            <p>Tell us what your business needs and the right specialist will get back to you.</p>
            <div className="contact-details">
              <div>
                <span>Headquarters</span>
                <b>{hq.city}, {hq.country}</b>
                {hq.lines?.map((line) => <p key={line}>{line}</p>)}
              </div>
              {hq.phone ? (
                <div>
                  <span>Phone</span>
                  <b><a href={telHref(hq.phone)}>{hq.phone}</a></b>
                </div>
              ) : null}
              <div>
                <span>Email</span>
                <b><a href="mailto:info@sisglobal.com">info@sisglobal.com</a></b>
                {hq.email ? <b><a href={`mailto:${hq.email}`}>{hq.email}</a></b> : null}
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <GlobalPresenceSection
        heading={<>Where you can<br /><em>find us.</em></>}
        lead="Explore our locations and connect with the teams delivering SIS Global’s services across the region."
      />
    </main>
  )
}
