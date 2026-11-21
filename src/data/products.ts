// All products are FICTIONAL demo products created for a portfolio concept.
export type Category = 'Unstitched Lawn' | 'Chiffon' | 'Organza' | 'Luxury Pret' | 'Formal Wear' | 'Bridal'
export type Motif = 'floral' | 'paisley' | 'geometric' | 'zari' | 'vine' | 'bloom'
export type Occasion = 'Casual' | 'Festive' | 'Formal' | 'Eid' | 'Wedding'

export interface Product {
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number
  category: Category
  fabric: string
  colour: string
  colourHex: string
  motif: Motif
  occasion: Occasion
  description: string
  available: boolean
  addedDaysAgo: number // lower = newer
  bestSeller?: boolean
  rating: number // DEMO rating
  ratingCount: number // DEMO count
  includes: string
}

export const CATEGORIES: Category[] = ['Unstitched Lawn', 'Chiffon', 'Organza', 'Luxury Pret', 'Formal Wear', 'Bridal']
export const OCCASIONS: Occasion[] = ['Casual', 'Festive', 'Eid', 'Formal', 'Wedding']
export const SHIPPING_FLAT = 250 // demo flat rate (PKR)
export const FREE_SHIPPING_OVER = 15000 // demo threshold (PKR)
export const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export const fmtPKR = (n: number) => 'PKR ' + n.toLocaleString('en-PK')

const P = (
  id: number, name: string, price: number, category: Category, fabric: string, colour: string, colourHex: string,
  motif: Motif, occasion: Occasion, description: string, includes: string, rating: number, ratingCount: number,
  addedDaysAgo: number, extra: Partial<Product> = {},
): Product => ({
  id, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), name, price, category, fabric, colour,
  colourHex, motif, occasion, description, includes, rating, ratingCount, addedDaysAgo, available: true, ...extra,
})

export const PRODUCTS: Product[] = [
  P(1, 'Gul-e-Bahar Embroidered Lawn', 4200, 'Unstitched Lawn', 'Premium Lawn', 'Dusty Pink', '#D9A5A8', 'floral', 'Casual',
    'An elegant embroidered lawn ensemble with delicate floral detailing along the neckline, finished with a soft printed dupatta.',
    '3-piece unstitched: embroidered shirt front (1.25m), back & sleeves (2.5m), dyed trouser (2.5m), printed dupatta (2.5m)', 4.7, 128, 6, { bestSeller: true }),
  P(2, 'Noor-e-Chiffon', 8500, 'Chiffon', 'Pure Chiffon', 'Powder Blue', '#AEC3D6', 'vine', 'Formal',
    'Featherlight chiffon with hand-finished vine embroidery and a delicate scalloped border. Falls beautifully for evening gatherings.',
    '3-piece unstitched: embroidered chiffon shirt (3m), raw-silk trouser (2.5m), embroidered chiffon dupatta (2.5m)', 4.8, 94, 2),
  P(3, 'Mehr Embroidered Suit', 6800, 'Unstitched Lawn', 'Premium Lawn', 'Mehndi Green', '#7C8A55', 'paisley', 'Festive',
    'A rich mehndi-green suit with tonal paisley embroidery and a gold-tinted organza border. Made for mehndi week and Eid mornings.',
    '3-piece unstitched: embroidered shirt (3m), dyed trouser (2.5m), jacquard dupatta (2.5m)', 4.6, 76, 3, { bestSeller: true }),
  P(4, 'Zari Festive Edit', 12500, 'Organza', 'Pure Organza', 'Champagne Gold', '#D8C49A', 'zari', 'Festive',
    'Champagne organza woven with metallic zari threads and sequin accents. A statement piece for dawats and milaad nights.',
    '3-piece unstitched: zari organza shirt (3m), silk trouser (2.5m), zari organza dupatta (2.5m)', 4.9, 51, 1, { bestSeller: true }),
  P(5, 'Rosewood Luxury Pret', 9800, 'Luxury Pret', 'Raw Silk', 'Rosewood', '#8E4A4F', 'bloom', 'Formal',
    'Ready-to-wear raw silk kurta in deep rosewood with bloom embroidery across the yoke, paired with a straight cigarette trouser.',
    '2-piece ready to wear: embroidered raw-silk kurta, cigarette trouser', 4.7, 63, 4),
  P(6, 'Ivory Bloom Collection', 7200, 'Organza', 'Pure Organza', 'Ivory', '#F1EADB', 'bloom', 'Eid',
    'Pearl-ivory organza with tone-on-tone bloom embroidery. Quietly luminous — a classic for Eid and nikkah guests.',
    '3-piece unstitched: embroidered organza shirt (3m), silk trouser (2.5m), organza dupatta (2.5m)', 4.8, 112, 5, { originalPrice: 8400, bestSeller: true }),
  P(7, 'Shehr-e-Gul Printed Lawn', 3600, 'Unstitched Lawn', 'Printed Lawn', 'Ocean Teal', '#3E7C82', 'vine', 'Casual',
    'Easy everyday lawn in deep ocean teal with a hand-drawn vine print, pre-washed for a soft, breathable feel.',
    '3-piece unstitched: printed shirt (3m), dyed trouser (2.5m), printed voile dupatta (2.5m)', 4.4, 203, 12),
  P(8, 'Mahtab Chiffon', 9200, 'Chiffon', 'Pure Chiffon', 'Midnight Navy', '#26324D', 'zari', 'Formal',
    'Midnight-navy chiffon with fine zari borders — understated, sophisticated, and made to catch the light after dark.',
    '3-piece unstitched: zari-bordered chiffon shirt (3m), silk trouser (2.5m), chiffon dupatta (2.5m)', 4.6, 58, 9),
  P(9, 'Nargis Printed Lawn', 3200, 'Unstitched Lawn', 'Printed Lawn', 'Sunshine Yellow', '#E4BE5C', 'floral', 'Casual',
    'A cheerful sunshine lawn with oversized narcissus print. Lightweight, bright and perfect for the warmer months.',
    '3-piece unstitched: printed shirt (3m), dyed trouser (2.5m), printed dupatta (2.5m)', 4.3, 241, 20, { originalPrice: 3900 }),
  P(10, 'Aabroo Organza', 11800, 'Organza', 'Pure Organza', 'Blush Rose', '#E7BDB8', 'geometric', 'Wedding',
    'Blush organza with geometric jaali-inspired embroidery and pearl detailing. A soft, modern take on the wedding guest outfit.',
    '3-piece unstitched: embroidered organza shirt (3m), raw-silk trouser (2.5m), net dupatta (2.5m)', 4.8, 39, 7),
  P(11, 'Sehar Luxury Pret', 8400, 'Luxury Pret', 'Cotton Satin', 'Mint', '#A9C9B6', 'vine', 'Eid',
    'Mint cotton-satin kurta with a delicate hand-guided vine border and mother-of-pearl buttons. Ready to wear, ready to impress.',
    '2-piece ready to wear: embroidered kurta, straight trouser', 4.5, 47, 8),
  P(12, 'Dilkash Formal', 14500, 'Formal Wear', 'Raw Silk', 'Emerald', '#1F5A47', 'zari', 'Formal',
    'Emerald raw silk with zardozi-inspired embroidery on the daaman and sleeves. A formal ensemble with a heritage feel.',
    '3-piece ready to wear: embroidered shirt, silk trouser, net dupatta', 4.9, 33, 11),
  P(13, 'Anarkali Jamawar', 13200, 'Formal Wear', 'Banarsi Jacquard', 'Burgundy', '#7A2540', 'paisley', 'Wedding',
    'A flowing anarkali in woven jamawar-style jacquard, with gold paisley motifs and a statement flared hem.',
    '2-piece ready to wear: anarkali frock, churidar pajama', 4.7, 28, 10),
  P(14, 'Gulabo Bridal Lehenga', 68500, 'Bridal', 'Net & Tissue', 'Crimson', '#8F1D2C', 'bloom', 'Wedding',
    'A heavily embellished crimson bridal lehenga with dabka, nakshi and sequin work. Includes a matching choli and net dupatta.',
    '3-piece ready to wear: embellished choli, lehenga, net dupatta (made to measure on request)', 5.0, 12, 14, { originalPrice: 76000 }),
  P(15, 'Noor Mahal Bridal Gharara', 74500, 'Bridal', 'Raw Silk', 'Ivory Gold', '#E4D3AD', 'geometric', 'Wedding',
    'Ivory-gold raw silk gharara with geometric tilla work and a scalloped hem — a regal choice for walima and nikkah.',
    '3-piece ready to wear: embellished kameez, gharara, tissue dupatta', 4.9, 9, 15),
  P(16, 'Shabnam Bridal Peshwas', 58900, 'Bridal', 'Net & Tissue', 'Dusty Mauve', '#B58A98', 'floral', 'Wedding',
    'A dusty-mauve peshwas with floral thread work and crystal accents, finished with a hand-embroidered border dupatta.',
    '3-piece ready to wear: peshwas, sharara, embroidered dupatta', 4.8, 14, 18),
  P(17, 'Rang-e-Hina Lawn', 4800, 'Unstitched Lawn', 'Premium Lawn', 'Terracotta', '#C0694A', 'paisley', 'Festive',
    'Terracotta lawn with warm paisley embroidery on the neck and sleeves. An earthy, handcrafted-feeling festive pick.',
    '3-piece unstitched: embroidered shirt (3m), dyed trouser (2.5m), printed dupatta (2.5m)', 4.5, 88, 13),
  P(18, 'Chandni Chiffon', 7800, 'Chiffon', 'Pure Chiffon', 'Pearl Grey', '#C9C6C1', 'vine', 'Eid',
    'Pearl-grey chiffon with silvery vine embroidery that shimmers softly in the light. A refined Eid favourite.',
    '3-piece unstitched: embroidered chiffon shirt (3m), silk trouser (2.5m), chiffon dupatta (2.5m)', 4.6, 71, 16, { available: false }),
  P(19, 'Resham Luxury Pret', 10500, 'Luxury Pret', 'Raw Silk', 'Plum', '#5E2B4D', 'geometric', 'Formal',
    'Plum raw-silk kurta with resham geometric embroidery and an asymmetrical hem. Contemporary, structured, and effortlessly formal.',
    '2-piece ready to wear: embroidered kurta, straight trouser', 4.7, 36, 21),
  P(20, 'Pari Organza', 9400, 'Organza', 'Pure Organza', 'Lilac', '#B9A4CC', 'floral', 'Eid',
    'Lilac organza with scattered floral sprigs and a hand-finished picot edge. Light, airy and unmistakably feminine.',
    '3-piece unstitched: embroidered organza shirt (3m), silk trouser (2.5m), organza dupatta (2.5m)', 4.6, 44, 0),
  P(21, 'Zarqa Formal Edit', 16800, 'Formal Wear', 'Net & Tissue', 'Peacock Blue', '#1E5F74', 'zari', 'Wedding',
    'Peacock-blue net with zari and sequin embroidery, paired with a silk trouser. A jewel-toned choice for formal wedding events.',
    '3-piece ready to wear: embroidered shirt, silk trouser, net dupatta', 4.8, 22, 19),
]

export const FABRICS = Array.from(new Set(PRODUCTS.map(p => p.fabric))).sort()

export const getProduct = (slug?: string) => PRODUCTS.find(p => p.slug === slug)
export const byId = (id: number) => PRODUCTS.find(p => p.id === id)
export const needsSize = (p: Product) => p.category === 'Luxury Pret' || p.category === 'Formal Wear' || p.category === 'Bridal'
export const isSale = (p: Product) => !!p.originalPrice && p.originalPrice > p.price
export const discountPct = (p: Product) => (p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0)

const POOL: { name: string; hex: string }[] = [
  { name: 'Dusty Pink', hex: '#D9A5A8' }, { name: 'Powder Blue', hex: '#AEC3D6' }, { name: 'Mehndi Green', hex: '#7C8A55' },
  { name: 'Champagne', hex: '#D8C49A' }, { name: 'Rosewood', hex: '#8E4A4F' }, { name: 'Ivory', hex: '#F1EADB' },
  { name: 'Ocean Teal', hex: '#3E7C82' }, { name: 'Midnight Navy', hex: '#26324D' }, { name: 'Blush Rose', hex: '#E7BDB8' },
  { name: 'Mint', hex: '#A9C9B6' }, { name: 'Emerald', hex: '#1F5A47' }, { name: 'Plum', hex: '#5E2B4D' }, { name: 'Lilac', hex: '#B9A4CC' },
  { name: 'Terracotta', hex: '#C0694A' }, { name: 'Pearl Grey', hex: '#C9C6C1' },
]
/** The product's own colour plus two demo colourways. */
export function colourways(p: Product) {
  const out = [{ name: p.colour, hex: p.colourHex }]
  let i = p.id * 3
  while (out.length < 3) {
    const c = POOL[i % POOL.length]; i += 4
    if (!out.some(o => o.name === c.name)) out.push(c)
  }
  return out
}
export const hexForColour = (p: Product, name: string) => colourways(p).find(c => c.name === name)?.hex ?? p.colourHex

export function searchProducts(q: string, list: Product[] = PRODUCTS) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return list
  return list.filter(p => {
    const hay = `${p.name} ${p.category} ${p.fabric} ${p.colour} ${p.occasion}`.toLowerCase()
    return terms.every(t => hay.includes(t))
  })
}
