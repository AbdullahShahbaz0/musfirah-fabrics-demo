import { Link } from 'react-router-dom'
import { Facebook, Instagram } from 'lucide-react'
import { Wordmark } from './Header'
import { useStore } from '../context/Store'
import { DEMO_CONTACT } from '../lib/config'

export function Footer() {
  const { toast } = useStore()
  const col = 'text-[12px] uppercase tracking-[0.22em] text-gold-soft mb-5'
  const li = 'block py-1.5 text-[15px] text-ivory/80 hover:text-ivory transition-colors'
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-ivory/75">Thoughtfully curated fabrics and timeless Pakistani fashion for every occasion. <i>Concept copy for demonstration.</i></p>
          <div className="mt-6 flex gap-3">
            <button aria-label="Instagram (placeholder)" onClick={() => toast('Instagram link placeholder — demo only')} className="grid h-11 w-11 place-items-center border border-ivory/30 hover:bg-ivory hover:text-charcoal transition"><Instagram size={18} strokeWidth={1.5} /></button>
            <button aria-label="Facebook (placeholder)" onClick={() => toast('Facebook link placeholder — demo only')} className="grid h-11 w-11 place-items-center border border-ivory/30 hover:bg-ivory hover:text-charcoal transition"><Facebook size={18} strokeWidth={1.5} /></button>
          </div>
        </div>
        <div>
          <h3 className={col}>Shop</h3>
          <Link className={li} to="/shop?category=Unstitched%20Lawn">Unstitched Lawn</Link>
          <Link className={li} to="/shop?category=Chiffon">Chiffon</Link>
          <Link className={li} to="/shop?category=Organza">Organza</Link>
          <Link className={li} to="/shop?category=Luxury%20Pret">Luxury Pret</Link>
          <Link className={li} to="/shop?category=Formal%20Wear">Formal Wear</Link>
          <Link className={li} to="/shop?category=Bridal">Bridal</Link>
        </div>
        <div>
          <h3 className={col}>Customer Care</h3>
          <Link className={li} to="/page/shipping">Shipping Information</Link>
          <Link className={li} to="/page/returns">Returns &amp; Exchanges</Link>
          <Link className={li} to="/page/size-guide">Size Guide</Link>
          <Link className={li} to="/page/care">Fabric Care</Link>
          <Link className={li} to="/page/about">About the Concept</Link>
          <Link className={li} to="/page/contact">Contact Us</Link>
        </div>
        <div>
          <h3 className={col}>Contact <span className="normal-case tracking-normal text-ivory/50">(demo information)</span></h3>
          <p className="text-[15px] leading-relaxed text-ivory/80">{DEMO_CONTACT.address}<br />{DEMO_CONTACT.phone}<br />{DEMO_CONTACT.email}</p>
          <p className="mt-4 text-[13px] text-ivory/50">Placeholder details — not the real business's contact information.</p>
        </div>
      </div>
      <div className="border-t border-ivory/15">
        <div className="wrap flex flex-col gap-2 py-6 text-[12px] text-ivory/55 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Musfirah Fabrics — portfolio concept. Not an official or verified website of the business.</p>
          <p>All products, prices, ratings and imagery are fictional demo content. No real orders or payments.</p>
        </div>
      </div>
    </footer>
  )
}
