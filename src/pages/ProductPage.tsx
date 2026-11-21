import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, Heart, Minus, Plus, Star, Truck } from 'lucide-react'
import { colourways, discountPct, FREE_SHIPPING_OVER, fmtPKR, getProduct, isSale, needsSize, PRODUCTS, SHIPPING_FLAT, SIZES } from '../data/products'
import { ProductImage } from '../components/Art'
import { ProductCard } from '../components/ProductCard'
import { useStore } from '../context/Store'
import { useSeo } from '../lib/seo'
import NotFound from './NotFound'

function Accordion({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [o, setO] = useState(open)
  return (
    <div className="border-b border-charcoal/15">
      <button onClick={() => setO(!o)} aria-expanded={o} className="flex min-h-[56px] w-full items-center justify-between text-left text-[12px] font-medium uppercase tracking-[0.2em]">{title}<ChevronDown size={18} className={`transition-transform ${o ? 'rotate-180' : ''}`} /></button>
      {o && <div className="animate-fade pb-5 text-[15px] leading-relaxed text-charcoal/80">{children}</div>}
    </div>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const p = getProduct(slug)
  const nav = useNavigate()
  const { add, wishlist, toggleWish, setCartOpen, toast } = useStore()
  const [img, setImg] = useState(0)
  const [colour, setColour] = useState('')
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [sizeErr, setSizeErr] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { setLoading(true); setImg(0); setQty(1); setSize(''); setSizeErr(false); setColour(p?.colour ?? ''); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t) }, [slug]) // eslint-disable-line
  useSeo(p ? p.name : 'Product not found', p?.description)
  if (!p) return <NotFound />

  const ways = colourways(p)
  const hex = ways.find(c => c.name === colour)?.hex ?? p.colourHex
  const sized = needsSize(p)
  const wished = wishlist.includes(p.id)
  const related = PRODUCTS.filter(x => x.id !== p.id && (x.category === p.category || x.occasion === p.occasion)).slice(0, 4)

  const validate = () => { if (sized && !size) { setSizeErr(true); toast('Please select a size'); return false } return true }
  const addToBag = () => { if (!validate()) return; add(p.id, { qty, colour, size: sized ? size : undefined }); setCartOpen(true) }
  const buyNow = () => { if (!validate()) return; add(p.id, { qty, colour, size: sized ? size : undefined }, true); nav('/checkout') }

  return (
    <div className="wrap py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-mute">
        <Link to="/" className="hover:text-burgundy">Home</Link><ChevronRight size={13} />
        <Link to="/shop" className="hover:text-burgundy">Shop</Link><ChevronRight size={13} />
        <Link to={`/shop?category=${encodeURIComponent(p.category)}`} className="hover:text-burgundy">{p.category}</Link><ChevronRight size={13} />
        <span className="text-charcoal">{p.name}</span>
      </nav>

      <div className="grid gap-8 md:gap-14 lg:grid-cols-[1.1fr_1fr]">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
          <div className="flex gap-2.5 md:flex-col" role="tablist" aria-label="Product images">
            {[0, 1, 2, 3].map(i => (
              <button key={i} role="tab" aria-selected={img === i} aria-label={`View image ${i + 1}`} onClick={() => setImg(i)} className={`w-[22%] shrink-0 border-2 transition md:w-20 ${img === i ? 'border-burgundy' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                <ProductImage product={p} index={i} hex={hex} className="aspect-[4/5]" />
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            {loading ? <div className="skeleton aspect-[4/5]" /> : (
              <div className="relative aspect-[4/5] overflow-hidden bg-beige">
                {[0, 1, 2, 3].map(i => <div key={i} className={`absolute inset-0 transition-all duration-500 ${img === i ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-[1.03]'}`}><ProductImage product={p} index={i} hex={hex} className="h-full" /></div>)}
                {isSale(p) && <span className="absolute left-3 top-3 bg-burgundy px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ivory">-{discountPct(p)}%</span>}
              </div>
            )}
            <p className="mt-2 text-[12px] text-mute">Illustrative artwork — real photography would replace this in the finished store.</p>
          </div>
        </div>

        {/* Details */}
        <div className="lg:pt-2">
          <p className="eyebrow">{p.category} · {p.occasion}</p>
          <h1 className="mt-2 text-4xl leading-tight md:text-5xl">{p.name}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-mute" title="Demo rating — not a real review"><Star size={15} className="fill-gold text-gold" />{p.rating.toFixed(1)} · demo rating</p>
          <p className="mt-5 flex items-baseline gap-3"><span className="font-serif text-4xl text-burgundy">{fmtPKR(p.price)}</span>{isSale(p) && <span className="text-mute line-through">{fmtPKR(p.originalPrice!)}</span>}</p>
          <p className="mt-5 text-[16px] leading-relaxed text-charcoal/85">{p.description}</p>

          <div className="mt-7">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em]">Colour: <span className="font-normal normal-case tracking-normal text-mute">{colour}</span></p>
            <div className="mt-3 flex gap-3" role="radiogroup" aria-label="Colour">
              {ways.map(c => (
                <button key={c.name} role="radio" aria-checked={colour === c.name} aria-label={c.name} title={c.name} onClick={() => setColour(c.name)} className={`grid h-11 w-11 place-items-center rounded-full border transition ${colour === c.name ? 'border-burgundy' : 'border-charcoal/20 hover:border-charcoal/50'}`}>
                  <span className="h-8 w-8 rounded-full border border-charcoal/10" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          {sized && (
            <div className="mt-6">
              <div className="flex items-center justify-between"><p className="text-[12px] font-medium uppercase tracking-[0.2em]">Size</p><Link to="/page/size-guide" className="text-[12px] underline underline-offset-4">Size guide</Link></div>
              <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Size">
                {SIZES.map(s => <button key={s} role="radio" aria-checked={size === s} onClick={() => { setSize(s); setSizeErr(false) }} className={`min-h-[48px] min-w-[56px] border px-4 text-sm transition ${size === s ? 'border-burgundy bg-burgundy text-ivory' : 'border-charcoal/25 hover:border-charcoal'}`}>{s}</button>)}
              </div>
              {sizeErr && <p className="mt-2 text-[13px] text-red-700" role="alert">Please select a size to continue.</p>}
            </div>
          )}

          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center border border-charcoal/30">
              <button aria-label="Decrease quantity" onClick={() => setQty(q => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center hover:bg-beige"><Minus size={16} /></button>
              <span className="w-10 text-center" aria-live="polite" aria-label={`Quantity ${qty}`}>{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(q => Math.min(10, q + 1))} className="grid h-12 w-12 place-items-center hover:bg-beige"><Plus size={16} /></button>
            </div>
            <button onClick={() => toggleWish(p.id)} aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'} className="grid h-12 w-12 place-items-center border border-charcoal/30 hover:border-burgundy"><Heart size={20} strokeWidth={1.5} className={wished ? 'fill-burgundy text-burgundy' : ''} /></button>
          </div>

          {p.available ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button onClick={addToBag} className="btn-primary">Add to Cart</button>
              <button onClick={buyNow} className="btn-outline">Buy Now</button>
            </div>
          ) : (
            <div className="mt-4"><button disabled className="btn-primary w-full">Sold out</button><p className="mt-2 text-sm text-mute">This demo item is out of stock. <Link to="/shop?avail=in" className="underline">See what's in stock</Link>.</p></div>
          )}

          <div className="mt-6 flex gap-3 bg-beige p-4 text-sm"><Truck size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-burgundy" />
            <p><b className="font-medium">Delivery (demo):</b> {fmtPKR(SHIPPING_FLAT)} flat rate, free over {fmtPKR(FREE_SHIPPING_OVER)}. Estimated 3–7 working days. Cash on Delivery available.</p></div>

          <div className="mt-6 border-t border-charcoal/15">
            <Accordion title="Product details" open>
              <ul className="space-y-1.5"><li><b className="font-medium">Fabric:</b> {p.fabric}</li><li><b className="font-medium">Colour:</b> {colour}</li><li><b className="font-medium">Occasion:</b> {p.occasion}</li><li><b className="font-medium">Includes:</b> {p.includes}</li></ul>
            </Accordion>
            <Accordion title="Fabric & care"><p>{p.fabric} — {p.category === 'Unstitched Lawn' ? 'cold wash separately, dry in shade, iron on medium.' : p.category === 'Bridal' ? 'dry clean only; store folded in muslin.' : 'dry clean recommended; gentle hand wash for chiffon and organza.'} Colours may vary slightly by screen.</p></Accordion>
            <Accordion title="Delivery & exchanges"><p>Demo policy: delivery in 3–5 working days (major cities) or 5–7 elsewhere. Unstitched, unworn items can be exchanged within 7 days. Final policies would be set by the business.</p></Accordion>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24" aria-labelledby="rel-h">
          <h2 id="rel-h" className="mb-8 text-4xl md:text-5xl">You May Also Love</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">{related.map(r => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </div>
  )
}
