'use client'
import { useState, type FormEvent } from 'react'

export function InquiryForm({ productName }: { productName?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'saved' | 'error'>('idle')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const values = new FormData(event.currentTarget)
    try {
      const config = await fetch('/api/inquiry-form')
      if (!config.ok) throw new Error('unavailable')
      const { id } = await config.json()
      const response = await fetch('/api/form-submissions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: id,
          submissionData: Array.from(values.entries()).map(([field, value]) => ({ field, value })),
        }),
      })
      if (!response.ok) throw new Error('unavailable')
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }
  return (
    <form className="xr-inquiry-form flex flex-col gap-5" onSubmit={submit}>
      <div className="xr-field-row grid grid-cols-[1fr_1fr] gap-5 max-[700px]:grid-cols-[1fr] max-[700px]:gap-5">
        <label>
          Your name *
          <input name="name" autoComplete="name" required placeholder="Full name" maxLength={120} />
        </label>
        <label>
          Work email *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            maxLength={254}
          />
        </label>
      </div>
      <div className="xr-field-row grid grid-cols-[1fr_1fr] gap-5 max-[700px]:grid-cols-[1fr] max-[700px]:gap-5">
        <label>
          Company
          <input
            name="company"
            autoComplete="organization"
            placeholder="Company name"
            maxLength={200}
          />
        </label>
        <label>
          Phone *
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="Include country code"
            maxLength={60}
          />
        </label>
      </div>
      {productName ? (
        <input type="hidden" name="subject" value={productName} />
      ) : (
      <label>
        What are you interested in?
        <select name="subject" defaultValue="Drip Irrigation Equipment">
          {[
            'Drip Irrigation Equipment',
            'Drip Emitters',
            'Drip Tape',
            'Injection Molds',
            'Auxiliary Equipment',
            'Other inquiry',
          ].map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      )}
      <label>
        Tell us about your project *
        <textarea
          name="message"
          required
          rows={3}
          placeholder={productName ? "Production line requirements, hose specifications or factory layout…" : "Product, application, specifications or drawings available…"}
          maxLength={5000}
        />
      </label>
      <div className="xr-form-bottom flex items-center justify-between gap-5 max-[700px]:items-start max-[700px]:flex-col">
        <p>Your details will be used to respond to this inquiry.</p>
        <button
          className="xr-button inline-flex items-center justify-between gap-[35px] min-h-[54px] py-4 px-6 xr-button-blue bg-xr-blue text-white"
          type="submit"
          disabled={status === 'sending' || status === 'saved'}
        >
          {status === 'sending'
            ? 'Sending…'
            : status === 'saved'
              ? 'Inquiry saved ✓'
              : 'Send inquiry ↗'}
        </button>
      </div>
      {status === 'saved' && (
        <p role="status" className="xr-form-message text-xr-blue p-[15px]">
          Thank you. Your inquiry has been saved for the XINRONG team.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="xr-form-message text-xr-blue p-[15px]">
          We couldn’t confirm your submission. Please try again later.
        </p>
      )}
    </form>
  )
}
