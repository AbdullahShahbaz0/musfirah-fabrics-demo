import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useStore } from '../context/Store'
import { FREE_SHIPPING_OVER, fmtPKR, hexForColour } from '../data/products'
import { ProductImage } from './Art'

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, count, subtotal, shipping, total, setQty, remove } = useStore()
  const nav = useNavigate()

  useEffect(() => {
    if (!cartOpen) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false)
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [cartOpen, setCartOpen])

  if (!cartOpen) return null
  const remaining = FREE_SHIPPING_OVER - subtotal

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="absolute inset-0 bg-charcoal/50 animate-fade" onClick={() => setCartOpen(false)} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-ivory animate-slideIn">
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-charcoal/10 px-5">
          <h2 className="font-serif text-2xl">Your Bag <span className="text-base text-mute">({count})</span></h2>
          <button className="-mr-3 grid h-12 w-12 place-items-center" aria-label="Close bag" onClick={() => setCartOpen(false)}><X size={24} strokeWidth={1.5} /></button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag size={44} strokeWidth={1} className="text-gold" />
            <p className="mt-5 font-serif text-3xl">Your bag is empty</p>
            <p className="mt-2 text-mute">Discover lawn, chiffon, organza and more.</p>
            <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-primary mt-8">Start Shopping</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-charcoal/10 bg-beige/60 px-5 py-3 text-[13px]">
              {remaining > 0
                ? <>Add <b>{fmtPKR(remaining)}</b> more for free delivery <span className="text-mute">(demo)</span></>
                : <>You've unlocked <b>free delivery</b> <span className="text-mute">(demo)</span></>}
              <div className="mt-2 h-[3px] bg-charcoal/10"><div className="h-full bg-gold transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_OVER) * 100)}%` }} /></div>
            </div>
            <ul className="flex-1 divide-y divide-charcoal/10 overflow-y-auto px-5">
              {lines.map(l => (
                <li key={l.key} className="flex gap-4 py-5">
                  <Link to={`/product/${l.product.slug}`} onClick={() => setCartOpen(false)} className="block w-24 shrink-0">
                    <ProductImage product={l.product} index={0} hex={hexForColour(l.product, l.colour)} className="aspect-[4/5]" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <Link to={`/product/${l.product.slug}`} onClick={() => setCartOpen(false)} className="font-serif text-lg leading-tight">{l.product.name}</Link>
                      <button aria-label={`Remove ${l.product.name}`} onClick={() => remove(l.key)} className="-mr-2 -mt-1 grid h-9 w-9 shrink-0 place-items-center text-mute hover:text-burgundy"><X size={16} /></button>
                    </div>
                    <p className="mt-1 text-[13px] text-mute">{l.colour}{l.size ? ` · Size ${l.size}` : ''}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-charcoal/25">
                        <button aria-label="Decrease quantity" onClick={() => setQty(l.key, l.qty - 1)} className="grid h-10 w-10 place-items-center hover:bg-beige"><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm" aria-live="polite">{l.qty}</span>
                        <button aria-label="Increase quantity" onClick={() => setQty(l.key, l.qty + 1)} className="grid h-10 w-10 place-items-center hover:bg-beige"><Plus size={14} /></button>
                      </div>
                      <span className="font-medium text-burgundy">{fmtPKR(l.product.price * l.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="shrink-0 border-t border-charcoal/10 bg-ivory px-5 py-5">
              <dl className="space-y-1.5 text-[15px]">
                <div className="flex justify-between"><dt className="text-mute">Subtotal</dt><dd>{fmtPKR(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-mute">Delivery (demo flat rate)</dt><dd>{shipping === 0 ? 'Free' : fmtPKR(shipping)}</dd></div>
                <div className="flex justify-between border-t border-charcoal/10 pt-2 font-serif text-2xl"><dt>Total</dt><dd className="text-burgundy">{fmtPKR(total)}</dd></div>
              </dl>
              <button className="btn-primary mt-4 w-full" onClick={() => { setCartOpen(false); nav('/checkout') }}>Checkout</button>
              <button className="btn-outline mt-2.5 w-full" onClick={() => { setCartOpen(false); nav('/shop') }}>Continue Shopping</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
