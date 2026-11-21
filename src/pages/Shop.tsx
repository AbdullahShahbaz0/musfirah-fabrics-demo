import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import { CATEGORIES, FABRICS, isSale, OCCASIONS, PRODUCTS, searchProducts } from '../data/products'
import { ProductCard, ProductSkeleton } from '../components/ProductCard'
import { useSeo } from '../lib/seo'

const PRICE = [
  { id: 'u5', label: 'Under PKR 5,000', min: 0, max: 5000 },
  { id: '5-10', label: 'PKR 5,000 – 10,000', min: 5000, max: 10000 },
  { id: '10-20', label: 'PKR 10,000 – 20,000', min: 10000, max: 20000 },
  { id: 'o20', label: 'Above PKR 20,000', min: 20000, max: Infinity },
]
const SORTS = [
  { id: 'featured', label: 'Featured' }, { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' }, { id: 'price-desc', label: 'Price: High to Low' },
]
const list = (v: string | null) => (v ? v.split(',').filter(Boolean) : [])

export default function Shop() {
  const [sp, setSp] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const category = list(sp.get('category')), fabric = list(sp.get('fabric')), occasion = list(sp.get('occasion'))
  const price = sp.get('price') ?? '', avail = sp.get('avail') === 'in', sale = sp.get('sale') === '1'
  const q = sp.get('q') ?? '', sort = sp.get('sort') ?? 'featured'

  useEffect(() => { const t = setTimeout(() => setLoading(false), 450); return () => clearTimeout(t) }, [])

  const set = (k: string, v: string | null) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }) }
  const toggle = (k: string, cur: string[], v: string) => set(k, (cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v]).join(',') || null)
  const clearAll = () => setSp(new URLSearchParams(sort !== 'featured' ? { sort } : {}), { replace: true })

  const results = useMemo(() => {
    let r = searchProducts(q, PRODUCTS)
    if (category.length) r = r.filter(p => category.includes(p.category))
    if (fabric.length) r = r.filter(p => fabric.includes(p.fabric))
    if (occasion.length) r = r.filter(p => occasion.includes(p.occasion))
    const pr = PRICE.find(x => x.id === price); if (pr) r = r.filter(p => p.price >= pr.min && p.price < pr.max)
    if (avail) r = r.filter(p => p.available)
    if (sale) r = r.filter(isSale)
    const s = [...r]
    if (sort === 'newest') s.sort((a, b) => a.addedDaysAgo - b.addedDaysAgo)
    else if (sort === 'price-asc') s.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') s.sort((a, b) => b.price - a.price)
    else s.sort((a, b) => Number(!!b.bestSeller) - Number(!!a.bestSeller) || b.ratingCount - a.ratingCount)
    return s
  }, [q, category.join(), fabric.join(), occasion.join(), price, avail, sale, sort]) // eslint-disable-line react-hooks/exhaustive-deps

  const active = category.length + fabric.length + occasion.length + (price ? 1 : 0) + (avail ? 1 : 0) + (sale ? 1 : 0) + (q ? 1 : 0)
  const title = sale ? 'Sale' : q ? `Search: ${q}` : 'Explore Our Collection'
  useSeo(sale ? 'Sale' : q ? `Search “${q}”` : 'Shop', 'Browse unstitched lawn, chiffon, organza, luxury pret, formal and bridal wear (demo catalogue).')

  const Check = ({ k, cur, v, count }: { k: string; cur: string[]; v: string; count?: number }) => (
    <label className="flex min-h-[40px] cursor-pointer items-center gap-3 text-[15px]">
      <input type="checkbox" checked={cur.includes(v)} onChange={() => toggle(k, cur, v)} className="h-4 w-4 accent-[#641E32]" />
      <span className="flex-1">{v}</span>{count !== undefined && <span className="text-xs text-mute">{count}</span>}
    </label>
  )
  const Group = ({ t, children }: { t: string; children: React.ReactNode }) => (
    <fieldset className="border-b border-charcoal/10 py-5 first:pt-0"><legend className="mb-2 text-[12px] font-medium uppercase tracking-[0.2em]">{t}</legend>{children}</fieldset>
  )

  const filters = (
    <div>
      <Group t="Category">{CATEGORIES.map(c => <Check key={c} k="category" cur={category} v={c} count={PRODUCTS.filter(p => p.category === c).length} />)}</Group>
      <Group t="Price range">
        <label className="flex min-h-[40px] cursor-pointer items-center gap-3 text-[15px]"><input type="radio" name="price" checked={!price} onChange={() => set('price', null)} className="accent-[#641E32]" />Any price</label>
        {PRICE.map(p => <label key={p.id} className="flex min-h-[40px] cursor-pointer items-center gap-3 text-[15px]"><input type="radio" name="price" checked={price === p.id} onChange={() => set('price', p.id)} className="accent-[#641E32]" />{p.label}</label>)}
      </Group>
      <Group t="Fabric">{FABRICS.map(f => <Check key={f} k="fabric" cur={fabric} v={f} />)}</Group>
      <Group t="Occasion">{OCCASIONS.map(o => <Check key={o} k="occasion" cur={occasion} v={o} />)}</Group>
      <Group t="Availability">
        <label className="flex min-h-[40px] cursor-pointer items-center gap-3 text-[15px]"><input type="checkbox" checked={avail} onChange={e => set('avail', e.target.checked ? 'in' : null)} className="h-4 w-4 accent-[#641E32]" />In stock only</label>
        <label className="flex min-h-[40px] cursor-pointer items-center gap-3 text-[15px]"><input type="checkbox" checked={sale} onChange={e => set('sale', e.target.checked ? '1' : null)} className="h-4 w-4 accent-[#641E32]" />On sale</label>
      </Group>
      {active > 0 && <button onClick={clearAll} className="mt-4 text-[12px] uppercase tracking-[0.2em] text-burgundy underline underline-offset-4">Clear all filters</button>}
    </div>
  )

  return (
    <div className="wrap py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-[13px] text-mute">
        <Link to="/" className="hover:text-burgundy">Home</Link><ChevronRight size={13} />
        <span className="text-charcoal">{sale ? 'Sale' : 'Shop'}</span>
      </nav>
      <h1 className="text-5xl md:text-6xl">{title}</h1>
      <p className="mt-2 max-w-xl text-mute">{q ? 'Showing matches by name, category, fabric and colour.' : 'Unstitched lawn, chiffon, organza, luxury pret, formal and bridal — all demo products.'}</p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-charcoal/10 py-3">
        <button onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="mobile-filters" className="flex min-h-[44px] items-center gap-2 text-[12px] uppercase tracking-[0.2em] lg:hidden"><SlidersHorizontal size={16} /> Filters{active ? ` (${active})` : ''}</button>
        <p className="hidden text-sm text-mute lg:block" aria-live="polite">{results.length} product{results.length === 1 ? '' : 's'}</p>
        <div className="ml-auto flex items-center gap-3">
          <p className="text-sm text-mute lg:hidden" aria-live="polite">{results.length} items</p>
          <label className="flex items-center gap-2 text-sm"><span className="hidden sm:inline text-mute">Sort by</span>
            <select value={sort} onChange={e => set('sort', e.target.value === 'featured' ? null : e.target.value)} className="min-h-[44px] border border-charcoal/25 bg-transparent px-3 text-sm outline-none focus:border-burgundy" aria-label="Sort products">
              {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      {open && <div id="mobile-filters" className="animate-fade border-b border-charcoal/10 bg-beige/50 px-4 py-5 lg:hidden">{filters}<button onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">Show {results.length} results</button></div>}

      {(active > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[...category.map(v => ['category', category, v] as const), ...fabric.map(v => ['fabric', fabric, v] as const), ...occasion.map(v => ['occasion', occasion, v] as const)].map(([k, cur, v]) => (
            <button key={k + v} onClick={() => toggle(k, cur as string[], v)} className="flex min-h-[36px] items-center gap-1.5 border border-charcoal/25 px-3 text-[13px] hover:border-burgundy">{v}<X size={13} /></button>
          ))}
          {q && <button onClick={() => set('q', null)} className="flex min-h-[36px] items-center gap-1.5 border border-charcoal/25 px-3 text-[13px] hover:border-burgundy">“{q}”<X size={13} /></button>}
        </div>
      )}

      <div className="mt-8 grid gap-12 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters"><div className="sticky top-28">{filters}</div></aside>
        <section aria-label="Products">
          {loading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">{Array.from({ length: 6 }, (_, i) => <ProductSkeleton key={i} />)}</div>
          ) : results.length === 0 ? (
            <div className="mx-auto max-w-md py-20 text-center">
              <p className="font-serif text-4xl">Nothing found</p>
              <p className="mt-3 text-mute">{q ? <>We couldn't find a match for “{q}”. Try a broader term such as “lawn”, “silk” or a colour.</> : 'No products match these filters. Try removing a few.'}</p>
              <button onClick={() => setSp(new URLSearchParams(), { replace: true })} className="btn-primary mt-7">Clear search &amp; filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">{results.map(p => <ProductCard key={p.id} p={p} />)}</div>
          )}
        </section>
      </div>
    </div>
  )
}
