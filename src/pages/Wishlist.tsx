import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useStore } from '../context/Store'
import { byId, Product } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { useSeo } from '../lib/seo'

export default function Wishlist() {
  const { wishlist } = useStore()
  useSeo('Wishlist', 'Your saved pieces.')
  const items = wishlist.map(byId).filter(Boolean) as Product[]
  return (
    <div className="wrap py-12 md:py-16">
      <p className="eyebrow">Saved for later</p>
      <h1 className="mt-2 text-5xl md:text-6xl">Your Wishlist</h1>
      {items.length === 0 ? (
        <div className="mx-auto max-w-md py-20 text-center">
          <Heart size={40} strokeWidth={1} className="mx-auto text-gold" />
          <p className="mt-5 font-serif text-3xl">Nothing saved yet</p>
          <p className="mt-2 text-mute">Tap the heart on any piece to save it here.</p>
          <Link to="/shop" className="btn-primary mt-8">Explore the collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">{items.map(p => <ProductCard key={p.id} p={p} />)}</div>
      )}
    </div>
  )
}
