import { FormEvent, useState } from 'react'
import { Check } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setErr('Please enter a valid email address.'); return }
    setErr(''); setDone(true) // demo only — nothing is stored or sent
  }

  return (
    <section className="bg-beige py-20 md:py-28" aria-labelledby="nl-h">
      <div className="wrap mx-auto max-w-2xl text-center">
        <p className="eyebrow">Newsletter</p>
        <h2 id="nl-h" className="mt-3 text-5xl md:text-6xl">Stay Inspired</h2>
        <p className="mx-auto mt-4 max-w-md text-mute">Be the first to discover new arrivals, exclusive collections and special offers.</p>
        {done ? (
          <div className="mx-auto mt-9 flex max-w-md animate-fadeUp items-center justify-center gap-3 border border-gold bg-ivory px-6 py-5 text-left" role="status">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-burgundy text-ivory"><Check size={18} /></span>
            <span><b className="font-medium">Thank you for subscribing.</b><br /><span className="text-sm text-mute">Demo only — no email was stored or sent.</span></span>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row">
            <div className="flex-1 text-left">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={e => { setEmail(e.target.value); setErr('') }}
                placeholder="Your email address" aria-invalid={!!err} aria-describedby={err ? 'nl-err' : undefined} className={`field bg-ivory ${err ? 'field-err' : ''}`} />
              {err && <p id="nl-err" className="mt-1.5 text-[13px] text-red-700">{err}</p>}
            </div>
            <button className="btn-primary sm:self-start">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  )
}
