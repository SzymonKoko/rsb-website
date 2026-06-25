# Rozwiń Swój Biznes (RSB)

Premium static website for Rozwiń Swój Biznes (RSB): strony internetowe, strony wizytówkowe, strony produktowe, marketing internetowy i SEO lokalne.

## Setup

```bash
npm install
npm run dev
```

## CMS API

The website can read content from the CMSsaas API. Copy `.env.example` to `.env.local` and set:

```env
VITE_API_URL=http://localhost:5000
```

When `VITE_API_URL` is missing or the API is unavailable, the page keeps using built-in fallback content.

CMS-backed sections:

- services in `Features`
- FAQs in `Features`
- portfolio in `Portfolio`
- contact form submissions in `ContactForm`

## Scripts

```bash
npm run lint
npm run build
npm run preview
```

## SEO

The project includes:

- title, description, canonical placeholder
- Open Graph and Twitter metadata
- `ProfessionalService`, `WebSite`, `Service`, and `FAQPage` JSON-LD
- `public/robots.txt`
- `public/sitemap.xml`
- `public/assets/og-image.jpg`

Before production, replace every `https://example.com/` placeholder in:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

## Security Headers

`public/_headers` contains static-hosting security headers for platforms that support this file format, including:

- `Content-Security-Policy`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

For Vercel, Apache, nginx, or another host, copy the same header policy into that platform's configuration.

For production, replace the broad `connect-src https:` placeholder in `public/_headers` with the exact CMS API origin, for example `https://api-client.example.com`.

## Notes

The contact form submits to the CMS API when `VITE_API_URL` is configured. Without that variable, it stays in safe fallback mode and does not send data anywhere.
