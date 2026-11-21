/**
 * PHOTOGRAPHY
 * -----------
 * This demo ships with generated textile artwork (see components/Art.tsx) so it never shows a broken image.
 * To use real photography, put licensed images in /public/images and list them here. Anything left empty
 * automatically falls back to the generated artwork, and any image that fails to load does the same.
 *
 *   PRODUCT_PHOTOS['gul-e-bahar-embroidered-lawn'] = ['images/gul-1.jpg', 'images/gul-2.jpg', 'images/gul-3.jpg', 'images/gul-4.jpg']
 */
export const PRODUCT_PHOTOS: Record<string, string[]> = {}

export const SITE_PHOTOS: { hero: string; story: string; promo: string } = { hero: '', story: '', promo: '' }

export const BRAND = 'Musfirah Fabrics'
export const DEMO_CONTACT = {
  email: 'hello@example.com',
  phone: '+92 300 0000000',
  address: 'Sample Bazaar Road, Your City, Pakistan',
}
