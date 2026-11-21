import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { byId, FREE_SHIPPING_OVER, Product, SHIPPING_FLAT } from '../data/products'

export interface CartLine { id: number; qty: number; colour: string; size?: string }
export interface Toast { id: number; msg: string }
export const lineKey = (l: Pick<CartLine, 'id' | 'colour' | 'size'>) => `${l.id}|${l.colour}|${l.size ?? ''}`

function load<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback } catch { return fallback }
}
function save(key: string, v: unknown) { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable */ } }

interface Ctx {
  lines: (CartLine & { product: Product; key: string })[]
  count: number; subtotal: number; shipping: number; total: number
  add: (id: number, o: { qty?: number; colour: string; size?: string }, silent?: boolean) => void
  remove: (key: string) => void
  setQty: (key: string, qty: number) => void
  clear: () => void
  wishlist: number[]; toggleWish: (id: number) => void
  toasts: Toast[]; toast: (msg: string) => void
  cartOpen: boolean; setCartOpen: (v: boolean) => void
  searchOpen: boolean; setSearchOpen: (v: boolean) => void
}
const StoreCtx = createContext<Ctx | null>(null)
export const useStore = () => { const c = useContext(StoreCtx); if (!c) throw new Error('StoreProvider missing'); return c }

export function StoreProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>(() => load<CartLine[]>('mf_cart_v1', []).filter(l => byId(l.id)))
  const [wishlist, setWishlist] = useState<number[]>(() => load<number[]>('mf_wish_v1', []))
  const [toasts, setToasts] = useState<Toast[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => save('mf_cart_v1', raw), [raw])
  useEffect(() => save('mf_wish_v1', wishlist), [wishlist])

  const toast = useCallback((msg: string) => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t.slice(-2), { id, msg }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200)
  }, [])

  const add: Ctx['add'] = useCallback((id, o, silent) => {
    const line: CartLine = { id, qty: Math.max(1, o.qty ?? 1), colour: o.colour, size: o.size }
    setRaw(prev => {
      const k = lineKey(line)
      const hit = prev.find(l => lineKey(l) === k)
      return hit ? prev.map(l => (lineKey(l) === k ? { ...l, qty: Math.min(10, l.qty + line.qty) } : l)) : [...prev, line]
    })
    if (!silent) toast(`${byId(id)?.name} added to your bag`)
  }, [toast])

  const remove = useCallback((key: string) => setRaw(p => p.filter(l => lineKey(l) !== key)), [])
  const setQty = useCallback((key: string, qty: number) =>
    setRaw(p => p.flatMap(l => (lineKey(l) !== key ? [l] : qty < 1 ? [] : [{ ...l, qty: Math.min(10, qty) }]))), [])
  const clear = useCallback(() => setRaw([]), [])
  const toggleWish = useCallback((id: number) => {
    setWishlist(w => {
      const has = w.includes(id)
      toast(has ? 'Removed from wishlist' : 'Saved to your wishlist')
      return has ? w.filter(x => x !== id) : [...w, id]
    })
  }, [toast])

  const value = useMemo<Ctx>(() => {
    const lines = raw.map(l => ({ ...l, product: byId(l.id)!, key: lineKey(l) }))
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0)
    const shipping = count === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT
    return { lines, count, subtotal, shipping, total: subtotal + shipping, add, remove, setQty, clear, wishlist, toggleWish, toasts, toast, cartOpen, setCartOpen, searchOpen, setSearchOpen }
  }, [raw, wishlist, toasts, cartOpen, searchOpen, add, remove, setQty, clear, toggleWish, toast])

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>
}
