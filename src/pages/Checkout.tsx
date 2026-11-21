import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Landmark, ShieldAlert, Truck } from 'lucide-react'
import { useStore } from '../context/Store'
import { fmtPKR, hexForColour } from '../data/products'
import { ProductImage } from '../components/Art'
import { useSeo } from '../lib/seo'

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Hyderabad', 'Other']
type F = { name: string; phone: string; email: string; city: string; address: string }
const EMPTY: F = { name: '', phone: '', email: '', city: '', address: '' }

function validate(f: F): Partial<Record<keyof F, string>> {
  const e: Partial<Record<keyof F, string>> = {}
  if (f.name.trim().length < 3) e.name = 'Please enter your full name.'
  if (!/^(\+92|0092|0)?3\d{9}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid Pakistani mobile number, e.g. 0300 1234567.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!f.city) e.city = 'Please choose your city.'
  if (f.address.trim().length < 10) e.address = 'Please enter your complete delivery address (house, street, area).'
  return e
}

export default function Checkout() {
  const { lines, subtotal, shipping, total, clear, toast } = useStore()
  const [f, setF] = useState<F>(EMPTY)
  const [errs, setErrs] = useState<Partial<Record<keyof F, string>>>({})
  const [pay, setPay] = useState<'cod' | 'bank'>('cod')
  const [busy, setBusy] = useState(false)
  const [order, setOrder] = useState<null | { no: string; total: number; name: string; pay: string; items: number }>(null)
  useSeo(order ? 'Order confirmed' : 'Checkout', 'Demo checkout — no real orders or payments are processed.')

  const upd = (k: keyof F) => (e: { target: { value: string } }) => { setF(p => ({ ...p, [k]: e.target.value })); if (errs[k]) setErrs(p => ({ ...p, [k]: undefined })) }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const v = validate(f); setErrs(v)
    if (Object.keys(v).length) { toast('Please fix the highlighted fields'); setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 30); return }
    setBusy(true)
    setTimeout(() => { // simulated — nothing is sent anywhere
      setOrder({ no: 'MF-DEMO-' + Math.floor(100000 + Math.random() * 900000), total, name: f.name.trim(), pay: pay === 'cod' ? 'Cash on Delivery' : 'Bank Transfer (demo)', items: lines.reduce((n, l) => n + l.qty, 0) })
      clear(); setBusy(false); window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1100)
  }

  if (order) return (
    <div className="wrap max-w-2xl py-16 text-center md:py-24">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-burgundy text-ivory"><Check size={30} /></span>
      <p className="eyebrow mt-6">Demo order confirmation</p>
      <h1 className="mt-2 text-5xl md:text-6xl">Thank you, {order.name.split(' ')[0]}</h1>
      <p className="mx-auto mt-4 max-w-md text-mute">This is a simulated confirmation. No order was placed, no payment was taken and no data was sent.</p>
      <dl className="mx-auto mt-9 max-w-sm divide-y divide-charcoal/10 border border-charcoal/15 bg-beige/40 text-left text-[15px]">
        <div className="flex justify-between p-4"><dt className="text-mute">Order number</dt><dd className="font-medium">{order.no}</dd></div>
        <div className="flex justify-between p-4"><dt className="text-mute">Items</dt><dd>{order.items}</dd></div>
        <div className="flex justify-between p-4"><dt className="text-mute">Payment</dt><dd>{order.pay}</dd></div>
        <div className="flex justify-between p-4 font-serif text-xl"><dt>Total</dt><dd className="text-burgundy">{fmtPKR(order.total)}</dd></div>
      </dl>
      <Link to="/shop" className="btn-primary mt-10">Continue shopping</Link>
    </div>
  )

  if (lines.length === 0) return (
    <div className="wrap py-28 text-center">
      <h1 className="text-5xl">Your bag is empty</h1><p className="mt-3 text-mute">Add something beautiful before checking out.</p>
      <Link to="/shop" className="btn-primary mt-8">Explore the collection</Link>
    </div>
  )

  const Field = ({ k, label, type = 'text', ...rest }: { k: keyof F; label: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={`f-${k}`} className="mb-1.5 block text-[12px] uppercase tracking-[0.16em]">{label}</label>
      <input id={`f-${k}`} name={k} type={type} value={f[k]} onChange={upd(k)} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `e-${k}` : undefined} className={`field ${errs[k] ? 'field-err' : ''}`} {...rest} />
      {errs[k] && <p id={`e-${k}`} className="mt-1.5 text-[13px] text-red-700">{errs[k]}</p>}
    </div>
  )

  return (
    <div className="wrap py-10 md:py-14">
      <h1 className="text-5xl md:text-6xl">Checkout</h1>
      <div className="mt-5 flex items-start gap-3 border border-gold/60 bg-beige/60 p-4 text-sm"><ShieldAlert size={18} className="mt-0.5 shrink-0 text-burgundy" /><p><b className="font-medium">Demo checkout.</b> Please don't enter real payment or sensitive details. Nothing is submitted or stored.</p></div>

      <form onSubmit={submit} noValidate className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div className="space-y-10">
          <section aria-labelledby="del-h">
            <h2 id="del-h" className="mb-5 text-3xl">Delivery details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">{Field({ k: 'name', label: 'Full name', autoComplete: 'name' })}</div>
              {Field({ k: 'phone', label: 'Phone number', type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '0300 1234567' })}
              {Field({ k: 'email', label: 'Email', type: 'email', inputMode: 'email', autoComplete: 'email' })}
              <div>
                <label htmlFor="f-city" className="mb-1.5 block text-[12px] uppercase tracking-[0.16em]">City</label>
                <select id="f-city" value={f.city} onChange={upd('city')} aria-invalid={!!errs.city} aria-describedby={errs.city ? 'e-city' : undefined} className={`field ${errs.city ? 'field-err' : ''}`}>
                  <option value="">Select city</option>{CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
                {errs.city && <p id="e-city" className="mt-1.5 text-[13px] text-red-700">{errs.city}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-address" className="mb-1.5 block text-[12px] uppercase tracking-[0.16em]">Complete delivery address</label>
                <textarea id="f-address" rows={3} value={f.address} onChange={upd('address')} autoComplete="street-address" aria-invalid={!!errs.address} aria-describedby={errs.address ? 'e-address' : undefined} className={`field py-3 ${errs.address ? 'field-err' : ''}`} />
                {errs.address && <p id="e-address" className="mt-1.5 text-[13px] text-red-700">{errs.address}</p>}
              </div>
            </div>
          </section>

          <section aria-labelledby="pay-h">
            <h2 id="pay-h" className="mb-5 text-3xl">Payment</h2>
            <div className="space-y-3" role="radiogroup" aria-label="Payment method">
              {([['cod', 'Cash on Delivery', 'Pay in cash when your order arrives.', Truck], ['bank', 'Bank Transfer (demo only)', 'Illustration of a transfer option — no real account.', Landmark]] as const).map(([id, t, d, Icon]) => (
                <label key={id} className={`flex min-h-[64px] cursor-pointer items-center gap-4 border p-4 transition ${pay === id ? 'border-burgundy bg-burgundy/[.04]' : 'border-charcoal/20 hover:border-charcoal/50'}`}>
                  <input type="radio" name="pay" checked={pay === id} onChange={() => setPay(id)} className="h-4 w-4 accent-[#641E32]" />
                  <Icon size={22} strokeWidth={1.4} className="text-burgundy" />
                  <span><span className="block font-medium">{t}</span><span className="text-sm text-mute">{d}</span></span>
                </label>
              ))}
              {pay === 'bank' && <p className="animate-fade bg-beige p-4 text-sm">Demo only: in a live store, bank details would appear here after the order is placed. <b className="font-medium">No real account is shown or used.</b></p>}
            </div>
          </section>
        </div>

        <aside className="h-fit bg-beige/60 p-6 md:p-8 lg:sticky lg:top-28" aria-labelledby="sum-h">
          <h2 id="sum-h" className="text-3xl">Order summary</h2>
          <ul className="mt-5 divide-y divide-charcoal/10">
            {lines.map(l => (
              <li key={l.key} className="flex gap-4 py-4">
                <div className="relative w-16 shrink-0"><ProductImage product={l.product} index={0} hex={hexForColour(l.product, l.colour)} className="aspect-[4/5]" /><span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-charcoal px-1 text-[11px] text-ivory">{l.qty}</span></div>
                <div className="flex-1"><p className="font-serif text-lg leading-tight">{l.product.name}</p><p className="text-[13px] text-mute">{l.colour}{l.size ? ` · ${l.size}` : ''}</p></div>
                <p className="text-sm">{fmtPKR(l.product.price * l.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-2 border-t border-charcoal/15 pt-4 text-[15px]">
            <div className="flex justify-between"><dt className="text-mute">Subtotal</dt><dd>{fmtPKR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-mute">Shipping (demo)</dt><dd>{shipping === 0 ? 'Free' : fmtPKR(shipping)}</dd></div>
            <div className="flex justify-between border-t border-charcoal/15 pt-3 font-serif text-2xl"><dt>Total</dt><dd className="text-burgundy">{fmtPKR(total)}</dd></div>
          </dl>
          <button type="submit" disabled={busy} className="btn-primary mt-6 w-full">{busy ? 'Placing demo order…' : 'Place Demo Order'}</button>
          <Link to="/shop" className="mt-3 block text-center text-[12px] uppercase tracking-[0.2em] underline underline-offset-4">Continue shopping</Link>
        </aside>
      </form>
    </div>
  )
}
