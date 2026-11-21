import { useId, useState } from 'react'
import type { Motif, Product } from '../data/products'
import { PRODUCT_PHOTOS } from '../lib/config'

/* ---------- colour helpers ---------- */
const toRgb = (h: string) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255] }
const toHex = (r: number[]) => '#' + r.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
export const shade = (hex: string, amt: number) => {
  const t = amt < 0 ? 0 : 255, p = Math.abs(amt)
  return toHex(toRgb(hex).map(c => c + (t - c) * p))
}
const lum = (hex: string) => { const [r, g, b] = toRgb(hex); return (0.299 * r + 0.587 * g + 0.114 * b) / 255 }
const accentFor = (hex: string, motif: Motif) => {
  const l = lum(hex)
  if (motif === 'zari') return l > 0.6 ? '#9C7A3E' : '#E6D3A3'
  if (l > 0.62) return shade(hex, -0.38)
  if (l > 0.38) return '#F6ECD8'
  return '#DCC796'
}

/* ---------- 60×60 embroidery tiles ---------- */
function tile(m: Motif, a: string, g: string) {
  switch (m) {
    case 'floral':
      return (<>
        {[0, 72, 144, 216, 288].map(r => <ellipse key={r} cx="30" cy="20" rx="5" ry="10" transform={`rotate(${r} 30 30)`} fill={a} opacity=".92" />)}
        <circle cx="30" cy="30" r="4" fill={g} />
        {[[0, 0], [60, 0], [0, 60], [60, 60]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4" fill={a} opacity=".8" />)}
        <path d="M14 14 q4 6 10 4 M46 46 q-4-6-10-4" stroke={g} strokeWidth="1.4" fill="none" />
      </>)
    case 'paisley':
      return (<>
        <path d="M30 6 C48 12 52 36 38 48 C28 55 16 48 20 38 C23 30 33 32 31 40" stroke={a} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M30 14 C42 20 43 34 35 41" stroke={g} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx="30" cy="38" r="2.4" fill={g} /><circle cx="6" cy="8" r="2" fill={a} /><circle cx="54" cy="54" r="2" fill={a} />
      </>)
    case 'geometric':
      return (<>
        <path d="M30 3 L57 30 L30 57 L3 30Z" stroke={a} strokeWidth="2" fill="none" />
        <path d="M30 15 L45 30 L30 45 L15 30Z" stroke={g} strokeWidth="1.6" fill="none" />
        <circle cx="30" cy="30" r="3" fill={a} /><circle cx="0" cy="0" r="3" fill={g} /><circle cx="60" cy="60" r="3" fill={g} />
      </>)
    case 'zari':
      return (<>
        {[0, 20, 40].map(y => <path key={y} d={`M0 ${y + 10} L60 ${y + 10}`} stroke={a} strokeWidth="1" opacity=".6" />)}
        {[10, 30, 50].map(x => <circle key={x} cx={x} cy="30" r="3.4" fill={a} />)}
        <path d="M8 6 l6 6 l-6 6 M38 42 l6 6 l-6 6" stroke={g} strokeWidth="1.6" fill="none" />
        <circle cx="30" cy="8" r="2" fill={g} /><circle cx="30" cy="52" r="2" fill={g} />
      </>)
    case 'vine':
      return (<>
        <path d="M-2 30 C14 6 30 54 62 30" stroke={a} strokeWidth="2.2" fill="none" />
        <ellipse cx="16" cy="19" rx="3.5" ry="8" transform="rotate(-40 16 19)" fill={a} opacity=".9" />
        <ellipse cx="44" cy="41" rx="3.5" ry="8" transform="rotate(-40 44 41)" fill={a} opacity=".9" />
        <circle cx="30" cy="30" r="3" fill={g} /><circle cx="30" cy="8" r="1.8" fill={g} /><circle cx="30" cy="54" r="1.8" fill={g} />
      </>)
    case 'bloom':
    default:
      return (<>
        <circle cx="30" cy="30" r="5" fill={g} />
        {[0, 60, 120, 180, 240, 300].map(r => <ellipse key={r} cx="30" cy="17" rx="4.2" ry="8" transform={`rotate(${r} 30 30)`} fill={a} opacity=".9" />)}
        <circle cx="30" cy="30" r="15" stroke={g} strokeWidth="1" fill="none" />
        {[[0, 0], [60, 0], [0, 60], [60, 60]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5" stroke={a} strokeWidth="1.6" fill="none" />)}
      </>)
  }
}

type ArtProduct = Pick<Product, 'id' | 'name' | 'motif' | 'colourHex'>

/** Generated textile artwork — 4 variants (drape, embroidery close-up, weave, border detail). */
export function Art({ product, hex, variant = 0, label }: { product: ArtProduct; hex?: string; variant?: number; label?: string }) {
  const uid = useId().replace(/:/g, '')
  const base = hex ?? product.colourHex
  const acc = accentFor(base, product.motif)
  const gold = lum(base) > 0.6 ? '#A8864A' : '#D4BA85'
  const light = shade(base, 0.22), dark = shade(base, -0.28), deep = shade(base, -0.5)
  const v = variant % 4
  const scale = [0.9, 2.5, 0.5, 1.1][v]

  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full block" role="img" aria-label={label ?? `${product.name} — ${product.colourHex} fabric (illustration)`}>
      <defs>
        <linearGradient id={`b${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={light} /><stop offset=".55" stopColor={base} /><stop offset="1" stopColor={dark} /></linearGradient>
        <linearGradient id={`f${uid}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".26" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <linearGradient id={`d${uid}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset=".5" stopColor="#000" stopOpacity=".2" /><stop offset="1" stopColor="#000" stopOpacity="0" /></linearGradient>
        <radialGradient id={`v${uid}`} cx=".5" cy=".5" r=".75"><stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".45" /></radialGradient>
        <pattern id={`m${uid}`} width={60 * scale} height={60 * scale} patternUnits="userSpaceOnUse"><g transform={`scale(${scale})`}>{tile(product.motif, acc, gold)}</g></pattern>
        <pattern id={`w${uid}`} width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="3" fill="#fff" opacity=".13" /><rect width="3" height="6" fill="#000" opacity=".1" /></pattern>
        <pattern id={`bd${uid}`} width="40" height="40" patternUnits="userSpaceOnUse"><g transform="scale(.667)">{tile(product.motif, acc, gold)}</g></pattern>
      </defs>
      <rect width="400" height="500" fill={`url(#b${uid})`} />

      {v === 0 && (<>
        <rect width="400" height="500" fill={`url(#m${uid})`} opacity=".28" />
        <path d="M40 0 C110 150 -10 300 70 500 L150 500 C80 300 190 150 120 0Z" fill={`url(#f${uid})`} />
        <path d="M230 0 C300 170 190 330 280 500 L360 500 C270 330 390 170 320 0Z" fill={`url(#d${uid})`} />
        <path d="M150 0 C200 160 120 320 190 500 L240 500 C180 320 260 160 200 0Z" fill={`url(#f${uid})`} opacity=".6" />
        <rect y="392" width="400" height="108" fill={deep} opacity=".35" />
        <rect y="396" width="400" height="104" fill={`url(#bd${uid})`} />
        <rect y="390" width="400" height="2.5" fill={gold} /><rect y="402" width="400" height="1" fill={gold} opacity=".7" />
        <rect width="400" height="500" fill={`url(#v${uid})`} opacity=".5" />
      </>)}
      {v === 1 && (<>
        <rect width="400" height="500" fill={`url(#m${uid})`} />
        <path d="M-20 140 C120 90 260 190 420 120 L420 150 C260 220 120 120 -20 170Z" fill="#fff" opacity=".12" />
        <rect width="400" height="500" fill={`url(#v${uid})`} />
      </>)}
      {v === 2 && (<>
        <rect width="400" height="500" fill={`url(#w${uid})`} />
        <path d="M0 80 C120 30 260 140 400 70 L400 200 C260 270 120 160 0 230Z" fill={`url(#f${uid})`} />
        <path d="M0 300 C140 250 250 360 400 290 L400 420 C250 490 140 380 0 450Z" fill={`url(#d${uid})`} />
        <rect width="400" height="500" fill={`url(#v${uid})`} opacity=".6" />
      </>)}
      {v === 3 && (<>
        <path d="M60 0 C130 140 30 260 100 400 L180 400 C110 260 210 140 140 0Z" fill={`url(#f${uid})`} />
        <rect y="255" width="400" height="245" fill={deep} opacity=".25" />
        <rect y="262" width="400" height="190" fill={`url(#bd${uid})`} />
        <rect y="256" width="400" height="3" fill={gold} /><rect y="268" width="400" height="1" fill={gold} opacity=".6" />
        <path d={`M0 452 ${Array.from({ length: 10 }, (_, i) => `q20 28 40 0`).join(' ')}`} fill={gold} opacity=".9" />
        {Array.from({ length: 20 }, (_, i) => <line key={i} x1={10 + i * 20} y1="468" x2={10 + i * 20} y2="500" stroke={gold} strokeWidth="2" opacity=".85" />)}
        <rect width="400" height="500" fill={`url(#v${uid})`} opacity=".45" />
      </>)}
    </svg>
  )
}

/** Wide editorial hero artwork used when no hero photograph is configured. */
export function HeroArt() {
  const arches = [0, 1, 2, 3, 4]
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMaxYMid slice" className="h-full w-full block" aria-hidden="true">
      <defs>
        <linearGradient id="hbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4A1424" /><stop offset=".6" stopColor="#641E32" /><stop offset="1" stopColor="#7D2A43" /></linearGradient>
        <linearGradient id="hdr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F4EBDD" /><stop offset=".5" stopColor="#E6D5BC" /><stop offset="1" stopColor="#CDB58F" /></linearGradient>
        <pattern id="hlat" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M32 4 L60 32 L32 60 L4 32Z" fill="none" stroke="#B99A63" strokeWidth="1" /><circle cx="32" cy="32" r="2" fill="#B99A63" /></pattern>
      </defs>
      <rect width="1600" height="900" fill="url(#hbg)" />
      <rect width="1600" height="900" fill="url(#hlat)" opacity=".16" />
      {arches.map(i => {
        const w = 360 - i * 52, top = 90 + i * 34, cx = 1130
        return <path key={i} d={`M${cx - w} 900 V${top + w} A${w} ${w} 0 0 1 ${cx + w} ${top + w} V900`} fill={i === 4 ? '#3A0F1C' : 'none'} stroke="#B99A63" strokeWidth={i === 0 ? 3 : 1.6} opacity={0.95 - i * 0.13} />
      })}
      {/* medallion */}
      <g transform="translate(1130 360)">
        {[0, 30, 60, 90, 120, 150].map(r => <ellipse key={r} rx="14" ry="78" transform={`rotate(${r})`} fill="none" stroke="#D9C49B" strokeWidth="1.4" />)}
        <circle r="26" fill="#B99A63" /><circle r="46" fill="none" stroke="#B99A63" strokeWidth="1.5" /><circle r="94" fill="none" stroke="#B99A63" strokeWidth="1" strokeDasharray="2 8" />
      </g>
      {/* draped dupatta */}
      <path d="M1000 900 C940 700 1180 640 1120 470 C1090 380 1230 300 1330 330 C1470 370 1420 600 1360 700 C1320 780 1400 840 1420 900Z" fill="url(#hdr)" opacity=".94" />
      <path d="M1000 900 C940 700 1180 640 1120 470 C1090 380 1230 300 1330 330" fill="none" stroke="#B99A63" strokeWidth="3" />
      <path d="M1040 900 C990 730 1200 670 1150 500" fill="none" stroke="#B99A63" strokeWidth="1" opacity=".8" />
      <g opacity=".5" stroke="#8C6B34" strokeWidth="1.4" fill="none">
        <path d="M1180 560 q40-30 80 0 t80 0" /><path d="M1200 620 q40-30 80 0 t80 0" /><path d="M1230 680 q30-24 60 0 t60 0" />
      </g>
      <circle cx="1130" cy="840" r="3" fill="#B99A63" />
    </svg>
  )
}

/** Product photo if one is configured and loads; otherwise generated artwork. */
export function ProductImage({ product, index = 0, hex, className = '' }: { product: Product; index?: number; hex?: string; className?: string }) {
  const photos = PRODUCT_PHOTOS[product.slug]
  const [failed, setFailed] = useState(false)
  const src = photos?.[index % (photos?.length || 1)]
  return (
    <div className={`overflow-hidden bg-beige ${className}`}>
      {src && !failed
        ? <img src={src} alt={`${product.name} — view ${index + 1}`} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
        : <Art product={product} hex={hex} variant={index} label={`${product.name} in ${product.colour} — illustrative view ${index + 1}`} />}
    </div>
  )
}
