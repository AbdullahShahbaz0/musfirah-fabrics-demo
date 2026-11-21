import { Link } from 'react-router-dom'
import { Heart, Plus, Star } from 'lucide-react'
import { discountPct, fmtPKR, isSale, needsSize, Product } from '../data/products'
import { useStore } from '../context/Store'
import { ProductImage } from './Art'

export function ProductCard({ p, showRating = false }: { p: Product; showRating?: boolean }) {
  const { add, wishlist, toggleWish, setCartOpen } = useStore()
  const wished = wishlist.includes(p.id)
  const sized = needsSize(p)
  const url = `/product/${p.slug}`

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <Link to={url} aria-label={p.name} className="block h-full w-full">
          <ProductImage product={p} index={0} className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0" />
          <ProductImage product={p} index={3} className="absolute inset-0 opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100" />
        </Link>
        {isSale(p) && <span className="absolute left-3 top-3 bg-burgundy px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ivory">-{discountPct(p)}%</span>}
        {!p.available && <span className="absolute left-3 bottom-3 bg-ivory/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-charcoal">Sold out</span>}
        <button
          onClick={() => toggleWish(p.id)} aria-pressed={wished} aria-label={wished ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
          className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-ivory/90 text-charcoal transition hover:bg-ivory"
        >
          <Heart size={18} strokeWidth={1.6} className={`transition ${wished ? 'fill-burgundy text-burgundy scale-110' : ''}`} />
        </button>
        {p.available && (
          <div className="absolute inset-x-0 bottom-0 md:translate-y-full md:transition-transform md:duration-300 md:group-hover:translate-y-0 focus-within:translate-y-0">
            {sized
              ? <Link to={url} className="flex min-h-[44px] w-full items-center justify-center gap-2 bg-charcoal/90 text-[11px] uppercase tracking-[0.2em] text-ivory backdrop-blur hover:bg-burgundy">Select size</Link>
              : <button onClick={() => { add(p.id, { colour: p.colour }); setCartOpen(true) }} className="flex min-h-[44px] w-full items-center justify-center gap-2 bg-charcoal/90 text-[11px] uppercase tracking-[0.2em] text-ivory backdrop-blur hover:bg-burgundy"><Plus size={14} /> Quick add</button>}
          </div>
        )}
      </div>
      <div className="pt-3.5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-mute">{p.category}</p>
        <h3 className="mt-1 font-serif text-[1.15rem] leading-snug md:text-[1.3rem]"><Link to={url} className="ulink">{p.name}</Link></h3>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-[15px]">
          <span className="font-medium text-burgundy">{fmtPKR(p.price)}</span>
          {isSale(p) && <span className="text-sm text-mute line-through">{fmtPKR(p.originalPrice!)}</span>}
        </p>
        {showRating && (
          <p className="mt-1 flex items-center gap-1 text-xs text-mute" title="Demo rating — not a real customer review">
            <Star size={13} className="fill-gold text-gold" /> {p.rating.toFixed(1)} <span>· demo rating</span>
          </p>
        )}
      </div>
    </article>
  )
}

export function ProductSkeleton() {
  return (<div><div className="skeleton aspect-[4/5]" /><div className="skeleton mt-4 h-3 w-1/3" /><div className="skeleton mt-2 h-5 w-3/4" /><div className="skeleton mt-2 h-4 w-1/3" /></div>)
}
