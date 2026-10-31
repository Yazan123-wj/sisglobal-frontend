import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="form-card success-state">
        <span>✓</span>
        <h3>Thanks for getting in touch.</h3>
        <p>Your enquiry has been received. A SIS Global specialist will contact you shortly.</p>
        <Link className="text-link" to="/what-we-do">Explore what we do</Link>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-heading">
        <h3>How can we help?</h3>
        <p>Fields marked with * are required.</p>
      </div>
      <div className="form-grid">
        <label>
          Name*
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Business email*
          <input name="email" type="email" required placeholder="nina.v@example.com" />
        </label>
        <label>
          Company*
          <input name="company" required placeholder="Organisation" />
        </label>
        <label>
          Area of interest*
          <select name="interest" required defaultValue="">
            <option value="" disabled>Select a service</option>
            <option>Idarat HCM</option>
            <option>Idarat TSO</option>
            <option>Identiti ICT</option>
            <option>Multiple services</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="wide">
          Message
          <textarea name="message" rows={4} placeholder="Tell us about your project or question" />
        </label>
      </div>
      <button className="button button-primary form-submit" type="submit">Send Enquiry</button>
    </form>
  )
}
