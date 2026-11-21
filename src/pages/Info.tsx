import { Link, useParams } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { DEMO_CONTACT } from '../lib/config'
import { FREE_SHIPPING_OVER, SHIPPING_FLAT, fmtPKR } from '../data/products'
import NotFound from './NotFound'

const PAGES: Record<string, { title: string; intro: string; body: string[] }> = {
  about: {
    title: 'About the Concept',
    intro: 'Crafted for Moments That Matter',
    body: [
      'This website is a portfolio demonstration showing what a professional online storefront could look like for a traditional Pakistani fabric and clothing store.',
      'Every product, price, rating, contact detail and line of brand copy on this site is sample content written for the concept. Nothing here is verified information about the actual business, and no real orders or payments are processed.',
      'If the concept moves forward, the sample content would be replaced with the store’s real catalogue, photography, policies and contact details.',
    ],
  },
  shipping: {
    title: 'Shipping Information',
    intro: 'Demo policy — for illustration only',
    body: [
      `Orders are shown with a demo flat delivery rate of ${fmtPKR(SHIPPING_FLAT)}. Orders above ${fmtPKR(FREE_SHIPPING_OVER)} qualify for free delivery in this concept.`,
      'Estimated delivery in the concept: 3–5 working days for major cities and 5–7 working days elsewhere in Pakistan. Cash on Delivery is shown as an available option.',
      'Real rates, couriers and timelines would be confirmed by the business before launch.',
    ],
  },
  returns: {
    title: 'Returns & Exchanges',
    intro: 'Demo policy — for illustration only',
    body: [
      'In this concept, unstitched and unworn items can be exchanged within 7 days of delivery, with tags and original packaging intact. Cut or stitched fabric and made-to-measure bridal pieces would be final sale.',
      'The real returns policy would be defined by the business.',
    ],
  },
  'size-guide': {
    title: 'Size Guide',
    intro: 'Sample measurements (inches, demo only)',
    body: ['XS — Bust 32, Waist 26, Hip 35', 'S — Bust 34, Waist 28, Hip 37', 'M — Bust 36, Waist 30, Hip 39', 'L — Bust 38, Waist 32, Hip 41', 'XL — Bust 40, Waist 34, Hip 43'],
  },
  care: {
    title: 'Fabric Care',
    intro: 'General guidance',
    body: [
      'Lawn: cold wash, mild detergent, dry in shade. Chiffon & organza: dry clean or gentle hand wash; do not wring. Raw silk, jacquard and bridal: dry clean only.',
      'Store embroidered pieces folded in muslin, away from direct sunlight and moisture.',
    ],
  },
  contact: {
    title: 'Contact Us',
    intro: 'Demo contact information',
    body: [`${DEMO_CONTACT.address}`, `${DEMO_CONTACT.phone}`, `${DEMO_CONTACT.email}`, 'These are placeholder details. They are not the real business’s address, phone number or email.'],
  },
}

export default function Info() {
  const { slug } = useParams()
  const page = slug ? PAGES[slug] : undefined
  useSeo(page?.title ?? 'Page', page?.intro)
  if (!page) return <NotFound />
  return (
    <div className="wrap max-w-3xl py-14 md:py-20">
      <p className="eyebrow">Musfirah Fabrics · Demo</p>
      <h1 className="mt-2 text-5xl md:text-6xl">{page.title}</h1>
      <p className="mt-3 font-serif text-2xl italic text-burgundy">{page.intro}</p>
      <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-charcoal/85">{page.body.map((b, i) => <p key={i}>{b}</p>)}</div>
      <Link to="/shop" className="btn-primary mt-10">Continue shopping</Link>
    </div>
  )
}
