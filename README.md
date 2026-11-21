# Musfirah Fabrics — storefront concept (demo)
React 18 + TypeScript + Tailwind 3 + Lucide + React Router (HashRouter). Frontend-only; all data is fictional.

    npm install
    npm run dev                # develop
    npm run build              # normal build -> dist/
    SINGLE=1 npm run build     # one self-contained HTML file

Photography: the demo uses generated textile artwork. To use real photos, add licensed images to public/images and
list them in src/lib/config.ts (PRODUCT_PHOTOS, SITE_PHOTOS). Missing/broken images fall back automatically.
Demo values: shipping flat PKR 250, free over PKR 15,000 (src/data/products.ts).
