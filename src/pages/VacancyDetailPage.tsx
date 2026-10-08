import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import Arrow from '@/components/Arrow'
import { getVacancy } from '@/data/vacancies'

export default function VacancyDetailPage() {
  const { id = '' } = useParams()
  const vacancy = getVacancy(id)
  const [sent, setSent] = useState(false)

  if (!vacancy) return <Navigate to="/vacancies" replace />

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <main className="vacancy-detail-page">
      <section className="vacancy-detail-hero">
        <div className="container">
          <Link className="text-link" to="/vacancies"><Arrow dir="left" /> All vacancies</Link>
          <p className="vacancy-meta">{vacancy.unit} · {vacancy.type} · {vacancy.location}</p>
          <h1>{vacancy.title}</h1>
          <p>{vacancy.summary}</p>
          <a className="button button-navy" href="#apply">Apply Now</a>
        </div>
      </section>

      <section className="section vacancy-detail">
        <div className="container vacancy-detail-grid">
          <div className="vacancy-copy">
            <h2>The role</h2>
            <p>{vacancy.overview}</p>
            <h2>What you will do</h2>
            <ul>
              {vacancy.responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <h2>What we look for</h2>
            <ul>
              {vacancy.requirements.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <aside id="apply" className="form-card vacancy-apply">
            {sent ? (
              <div className="success-state">
                <span>✓</span>
                <h3>Application received.</h3>
                <p>Thank you. The SIS Global hiring team will review your application for {vacancy.title}.</p>
                <button className="button button-outline" type="button" onClick={() => setSent(false)}>Submit another</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="form-heading">
                  <h3>Apply Now</h3>
                  <p>Fields marked with * are required.</p>
                </div>
                <div className="form-grid vacancy-form-grid">
                  <label>Full name *<input required name="name" placeholder="Your full name" /></label>
                  <label>Email *<input required type="email" name="email" placeholder="name@email.com" /></label>
                  <label>Phone<input name="phone" placeholder="+966…" /></label>
                  <label>Current location<input name="location" placeholder="City, country" defaultValue={vacancy.location} /></label>
                  <label className="wide">CV / resume *<input required type="file" name="cv" accept=".pdf,.doc,.docx" /></label>
                  <label className="wide">Message<textarea name="message" rows={4} placeholder="A short note about your experience" /></label>
                </div>
                <button className="button button-navy form-submit" type="submit">Submit application</button>
              </form>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}
