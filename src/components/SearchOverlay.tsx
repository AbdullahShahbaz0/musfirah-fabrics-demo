import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useStore } from '../context/Store'
import { fmtPKR, PRODUCTS, searchProducts } from '../data/products'
import { ProductImage } from './Art'

const SUGGEST = ['Lawn', 'Chiffon', 'Organza', 'Emerald', 'Raw Silk', 'Bridal']

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [q, setQ] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const nav = useNavigate()
  const results = useMemo(() => (q.trim() ? searchProducts(q) : []), [q])

  useEffect(() => {
    if (!searchOpen) { setQ(''); return }
    setTimeout(() => ref.current?.focus(), 50)
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setSearchOpen(false)
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [searchOpen, setSearchOpen])

  if (!searchOpen) return null
  const submit = (e: FormEvent) => { e.preventDefault(); if (!q.trim()) return; setSearchOpen(false); nav(`/shop?q=${encodeURIComponent(q.trim())}`) }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-ivory animate-fade" role="dialog" aria-modal="true" aria-label="Search">
      <div className="wrap flex h-[72px] shrink-0 items-center gap-3 border-b border-charcoal/10 md:h-20">
        <form onSubmit={submit} className="flex flex-1 items-center gap-3" role="search">
          <Search size={22} strokeWidth={1.5} className="shrink-0 text-gold" />
          <input ref={ref} value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, category, fabric or colour" aria-label="Search products" className="min-h-[48px] flex-1 bg-transparent font-serif text-xl outline-none placeholder:text-charcoal/40 md:text-3xl" />
        </form>
        <button className="-mr-3 grid h-12 w-12 place-items-center" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={26} strokeWidth={1.5} /></button>
      </div>
      <div className="wrap flex-1 overflow-y-auto py-8">
        {!q.trim() && (
          <div>
            <p className="eyebrow">Popular searches</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {SUGGEST.map(s => <button key={s} onClick={() => setQ(s)} className="min-h-[44px] border border-charcoal/25 px-5 text-sm hover:border-burgundy hover:text-burgundy">{s}</button>)}
            </div>
            <p className="mt-10 text-sm text-mute">{PRODUCTS.length} demo products · try “emerald”, “raw silk”, “wedding”.</p>
          </div>
        )}
        {q.trim() && results.length === 0 && (
          <div className="mx-auto max-w-md py-16 text-center">
            <p className="font-serif text-3xl">No results for “{q}”</p>
            <p className="mt-3 text-mute">Check the spelling or try a broader term like “lawn”, “chiffon” or a colour.</p>
            <Link to="/shop" onClick={() => setSearchOpen(false)} className="btn-outline mt-7">Browse all products</Link>
          </div>
        )}
        {results.length > 0 && (
          <div>
            <p className="eyebrow mb-5">{results.length} result{results.length > 1 ? 's' : ''}</p>
            <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
              {results.slice(0, 8).map(p => (
                <li key={p.id}>
                  <Link to={`/product/${p.slug}`} onClick={() => setSearchOpen(false)} className="flex items-center gap-4 border-b border-charcoal/10 py-3 hover:bg-beige/50">
                    <ProductImage product={p} index={0} className="h-20 w-16 shrink-0" />
                    <span className="min-w-0 flex-1"><span className="block font-serif text-xl leading-tight">{p.name}</span><span className="block text-[13px] text-mute">{p.category} · {p.fabric} · {p.colour}</span></span>
                    <span className="text-sm font-medium text-burgundy">{fmtPKR(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button onClick={submit as unknown as () => void} className="btn-primary mt-8">View all {results.length} results</button>
          </div>
        )}
      </div>
    </div>
  )
}
