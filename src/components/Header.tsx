import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useStore } from '../context/Store'

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'New Arrivals', to: '/shop?sort=newest' },
  { label: 'Unstitched', to: '/shop?category=Unstitched%20Lawn,Chiffon,Organza' },
  { label: 'Ready to Wear', to: '/shop?category=Luxury%20Pret,Formal%20Wear' },
  { label: 'Bridal Collection', to: '/shop?category=Bridal' },
  { label: 'Sale', to: '/shop?sale=1' },
]

export function Wordmark({ light = false, small = false }: { light?: boolean; small?: boolean }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${light ? 'text-ivory' : 'text-burgundy'}`}>
      <span className={`font-serif font-semibold tracking-[0.12em] ${small ? 'text-2xl' : 'text-[1.7rem] md:text-[2rem]'}`}>MUSFIRAH</span>
      <span className={`mt-1 text-[9px] uppercase tracking-[0.5em] ${light ? 'text-gold-soft' : 'text-gold'}`}>Fabrics</span>
    </span>
  )
}

export function Header() {
  const { count, wishlist, setCartOpen, setSearchOpen } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const loc = useLocation()
  const current = loc.pathname + loc.search

  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => setMenu(false), [current])
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [menu])

  const active = (to: string) => (to === '/' ? current === '/' : current === to)

  return (
    <>
      <div className="bg-burgundy text-ivory">
        <div className="wrap flex min-h-[38px] items-center justify-center text-center text-[10.5px] uppercase tracking-[0.2em] md:justify-between">
          <span className="hidden w-56 whitespace-nowrap md:block text-gold-soft/90">Portfolio concept · demo</span>
          <span>Discover Our Latest Collection <span className="mx-2 hidden text-gold sm:inline">|</span><br className="sm:hidden" />Nationwide Delivery Available</span>
          <span className="hidden w-56 md:block" />
        </div>
      </div>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-ivory/95 shadow-[0_1px_0_rgba(41,39,37,.1)] backdrop-blur' : 'bg-ivory'}`}>
        <div className={`wrap flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-[72px] md:h-20'}`}>
          <button className="-ml-3 grid h-12 w-12 place-items-center lg:hidden" aria-label="Open menu" onClick={() => setMenu(true)}><Menu size={24} strokeWidth={1.5} /></button>
          <Link to="/" aria-label="Musfirah Fabrics — home" className="lg:mr-8"><Wordmark /></Link>
          <nav aria-label="Primary" className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {NAV.map(n => (
              <Link key={n.label} to={n.to} className={`ulink py-2 text-[12px] uppercase tracking-[0.18em] ${active(n.to) ? 'text-burgundy' : 'text-charcoal'} ${n.label === 'Sale' ? 'text-burgundy font-medium' : ''}`} style={active(n.to) ? { backgroundSize: '100% 1px' } : undefined}>{n.label}</Link>
            ))}
          </nav>
          <div className="-mr-3 flex items-center">
            <button className="grid h-12 w-12 place-items-center" aria-label="Search" onClick={() => setSearchOpen(true)}><Search size={22} strokeWidth={1.5} /></button>
            <Link to="/wishlist" className="relative hidden h-12 w-12 place-items-center sm:grid" aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart size={22} strokeWidth={1.5} />
              {wishlist.length > 0 && <span className="absolute right-1.5 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] text-white">{wishlist.length}</span>}
            </Link>
            <button className="relative grid h-12 w-12 place-items-center" aria-label={`Shopping bag, ${count} items`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span data-testid="cart-count" className={`absolute right-1 top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-medium text-ivory transition ${count ? 'bg-burgundy scale-100' : 'bg-charcoal/30 scale-90'}`}>{count}</span>
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-charcoal/50 animate-fade" onClick={() => setMenu(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-ivory animate-slideLeft">
            <div className="flex h-[72px] items-center justify-between border-b border-charcoal/10 px-5">
              <Wordmark small />
              <button className="-mr-3 grid h-12 w-12 place-items-center" aria-label="Close menu" onClick={() => setMenu(false)}><X size={24} strokeWidth={1.5} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              {NAV.map(n => (
                <Link key={n.label} to={n.to} className={`flex min-h-[56px] items-center justify-between border-b border-charcoal/10 font-serif text-2xl ${n.label === 'Sale' ? 'text-burgundy' : ''}`}>{n.label}<span className="text-gold">→</span></Link>
              ))}
              <Link to="/wishlist" className="flex min-h-[56px] items-center border-b border-charcoal/10 font-serif text-2xl">Wishlist {wishlist.length > 0 && <span className="ml-2 text-base text-mute">({wishlist.length})</span>}</Link>
              <Link to="/page/contact" className="mt-6 block text-xs uppercase tracking-[0.2em] text-mute">Contact (demo)</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
