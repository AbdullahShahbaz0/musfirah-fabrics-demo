import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Art, HeroArt } from '../components/Art'
import { ProductCard } from '../components/ProductCard'
import { Newsletter } from '../components/Newsletter'
import { byId, PRODUCTS } from '../data/products'
import { SITE_PHOTOS } from '../lib/config'
import { useSeo } from '../lib/seo'

const TILES = [
  { name: 'Unstitched Lawn', desc: 'Breathable, embroidered and printed lawn for every day.', to: '/shop?category=Unstitched%20Lawn', id: 1, v: 0 },
  { name: 'Luxury Pret', desc: 'Ready-to-wear silhouettes in raw silk and cotton satin.', to: '/shop?category=Luxury%20Pret', id: 5, v: 3 },
  { name: 'Formal & Festive', desc: 'Zari, organza and chiffon for dawats and Eid.', to: '/shop?category=Formal%20Wear,Organza,Chiffon&occasion=Festive,Formal,Eid', id: 4, v: 0 },
  { name: 'Bridal Collection', desc: 'Heirloom-worthy lehengas, ghararas and peshwas.', to: '/shop?category=Bridal', id: 14, v: 0 },
]

export default function Home() {
  useSeo('', 'Elegance woven into every thread. A premium Pakistani fabric and fashion storefront concept — demo content only.')
  const arrivals = [...PRODUCTS].sort((a, b) => a.addedDaysAgo - b.addedDaysAgo).slice(0, 8)
  const best = PRODUCTS.filter(p => p.bestSeller).slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[560px] overflow-hidden bg-burgundy-deep text-ivory md:min-h-[min(82vh,780px)]">
        <div className="absolute inset-0 -z-10">
          {SITE_PHOTOS.hero ? <img src={SITE_PHOTOS.hero} alt="" className="h-full w-full object-cover" /> : <HeroArt />}
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/95 via-burgundy-deep/60 to-transparent md:via-burgundy-deep/30" />
          <div className="absolute inset-0 bg-burgundy-deep/45 md:hidden" />
        </div>
        <div className="wrap flex min-h-[inherit] items-center py-20">
          <div className="max-w-2xl animate-fadeUp">
            <p className="eyebrow !text-gold-soft">The Festive Edit · Concept</p>
            <h1 className="mt-5 text-[3.4rem] leading-[0.98] sm:text-7xl lg:text-[6.5rem]">Elegance Woven Into <em className="font-normal text-gold-soft">Every Thread</em></h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ivory/85">Discover thoughtfully curated fabrics and timeless Pakistani fashion for every occasion.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="btn-light">Explore Collection</Link>
              <Link to="/shop?sort=newest" className="btn-ghost-light">Discover New Arrivals</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="wrap py-20 md:py-28" aria-labelledby="cat-h">
        <div className="mb-10 text-center md:mb-14">
          <p className="eyebrow">Shop by category</p>
          <h2 id="cat-h" className="mt-3 text-5xl md:text-6xl">The Collections</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
          {TILES.map(t => (
            <Link key={t.name} to={t.to} className="group relative block aspect-[3/4] overflow-hidden bg-beige">
              <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"><Art product={byId(t.id)!} variant={t.v} label={`${t.name} (illustration)`} /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-ivory md:p-6">
                <h3 className="text-[1.45rem] leading-tight md:text-3xl">{t.name}</h3>
                <p className="mt-1.5 hidden text-sm text-ivory/80 sm:block">{t.desc}</p>
                <span className="mt-3 inline-flex min-h-[32px] items-center gap-2 border-b border-gold-soft pb-0.5 text-[11px] uppercase tracking-[0.2em] transition-all group-hover:gap-3.5">Explore <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="wrap pb-20 md:pb-28" aria-labelledby="na-h">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div><p className="eyebrow">Just landed</p><h2 id="na-h" className="mt-3 text-5xl md:text-6xl">New Arrivals</h2></div>
          <Link to="/shop?sort=newest" className="ulink hidden pb-1 text-[12px] uppercase tracking-[0.2em] sm:inline-block">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">{arrivals.map(p => <ProductCard key={p.id} p={p} />)}</div>
        <div className="mt-12 text-center sm:hidden"><Link to="/shop?sort=newest" className="btn-outline">View all new arrivals</Link></div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-beige" aria-labelledby="story-h">
        <div className="wrap grid items-center gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-28">
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -bottom-5 -right-5 h-full w-full border border-gold" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden">
              {SITE_PHOTOS.story ? <img src={SITE_PHOTOS.story} alt="Close-up of embroidered fabric" className="h-full w-full object-cover" /> : <Art product={byId(3)!} variant={1} label="Close-up of tonal paisley embroidery (illustration)" />}
            </div>
          </div>
          <div className="md:pr-8">
            <p className="eyebrow">Our philosophy · demo copy</p>
            <h2 id="story-h" className="mt-3 text-5xl leading-[1.02] md:text-6xl">Crafted for Moments That Matter</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-charcoal/80">At Musfirah Fabrics, every collection celebrates the beauty of Pakistani fashion. From everyday elegance to special-occasion ensembles, discover fabrics and styles that bring your personal expression to life.</p>
            <p className="mt-4 text-[13px] italic text-mute">Proposed demonstration copy — not verified information about the business.</p>
            <Link to="/page/about" className="btn-primary mt-8">Discover Our Story</Link>
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className="relative isolate overflow-hidden bg-burgundy py-24 text-center text-ivory md:py-32" aria-labelledby="promo-h">
        <div className="absolute inset-0 -z-10 opacity-[.18]">
          <svg className="h-full w-full" aria-hidden="true"><defs><pattern id="pp" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M40 6 L74 40 L40 74 L6 40Z" fill="none" stroke="#B99A63" /><circle cx="40" cy="40" r="3" fill="#B99A63" /><path d="M40 22 L58 40 L40 58 L22 40Z" fill="none" stroke="#B99A63" /></pattern></defs><rect width="100%" height="100%" fill="url(#pp)" /></svg>
        </div>
        <div className="wrap max-w-3xl">
          <p className="eyebrow !text-gold-soft">Festive &amp; Formal</p>
          <h2 id="promo-h" className="mt-4 text-5xl leading-[1.02] md:text-7xl">Celebrate Every Occasion in Style</h2>
          <p className="mx-auto mt-5 max-w-md text-[17px] text-ivory/85">Explore our curated festive and formal collections.</p>
          <Link to="/shop?occasion=Festive,Eid,Formal" className="btn-light mt-9">Shop Festive Collection</Link>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="wrap py-20 md:py-28" aria-labelledby="bs-h">
        <div className="mb-10 text-center"><p className="eyebrow">Most loved</p><h2 id="bs-h" className="mt-3 text-5xl md:text-6xl">Best Sellers</h2><p className="mt-3 text-[13px] text-mute">Ratings shown are demo values, not real customer reviews.</p></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">{best.map(p => <ProductCard key={p.id} p={p} showRating />)}</div>
      </section>

      <Newsletter />
    </>
  )
}
