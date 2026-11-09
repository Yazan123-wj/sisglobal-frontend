import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

import { contactInterests, isContactInterest, messageFromContact } from '@/data/contact'

const shapes = ['circle', 'square', 'diamond', 'plus'] as const
type Shape = (typeof shapes)[number]

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

function ShapeMark({ shape }: { shape: Shape }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {shape === 'circle' ? <circle cx="16" cy="16" r="8" /> : null}
      {shape === 'square' ? <rect x="8" y="8" width="16" height="16" rx="1.5" /> : null}
      {shape === 'diamond' ? <path d="M16 6 26 16 16 26 6 16Z" /> : null}
      {shape === 'plus' ? <path d="M14 8h4v6h6v4h-6v6h-4v-6H8v-4h6V8Z" /> : null}
    </svg>
  )
}

function VerifyPuzzle({ onPass }: { onPass: () => void }) {
  const [challenge, setChallenge] = useState(() => shuffle([...shapes])[0])
  const options = useMemo(() => shuffle([...shapes]), [challenge])
  const [error, setError] = useState(false)

  const pick = (shape: Shape) => {
    if (shape === challenge) {
      setError(false)
      onPass()
      return
    }
    setError(true)
    setChallenge(shuffle(shapes.filter((item) => item !== challenge))[0])
  }

  return (
    <div className="form-card form-verify">
      <div className="form-heading">
        <h3>Quick verification</h3>
        <p>Select the matching shape to send your enquiry.</p>
      </div>
      <p className="form-verify-prompt">
        Select the <b>{challenge}</b>
      </p>
      <div className="form-verify-board" role="group" aria-label="Verification puzzle">
        {options.map((shape) => (
          <button
            key={shape}
            type="button"
            className="form-verify-tile"
            aria-label={shape}
            onClick={() => pick(shape)}
          >
            <ShapeMark shape={shape} />
          </button>
        ))}
      </div>
      {error ? <p className="form-verify-error">That wasn’t the one. Try the new shape.</p> : null}
    </div>
  )
}

export default function ContactForm() {
  const [stage, setStage] = useState<'form' | 'verify' | 'sent'>('form')
  const [params] = useSearchParams()
  const requested = params.get('interest') ?? ''
  const interest = isContactInterest(requested) ? requested : ''
  const message = messageFromContact(params)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStage('verify')
  }

  if (stage === 'sent') {
    return (
      <div className="form-card success-state">
        <span>✓</span>
        <h3>Thanks for getting in touch.</h3>
        <p>Your enquiry has been received. A SIS Global specialist will contact you shortly.</p>
      </div>
    )
  }

  if (stage === 'verify') {
    return <VerifyPuzzle onPass={() => setStage('sent')} />
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
          <select name="interest" required defaultValue={interest} key={interest}>
            <option value="" disabled>Select a service</option>
            {contactInterests.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="wide">
          Message
          <textarea name="message" rows={4} defaultValue={message} key={message} />
        </label>
      </div>
      <button className="button button-primary form-submit" type="submit">Send Enquiry</button>
    </form>
  )
}
