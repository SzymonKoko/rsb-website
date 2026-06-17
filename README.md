# Rozwiń Swój Biznes (RSB)

Premium static website for Rozwiń Swój Biznes (RSB): strony internetowe, strony wizytówkowe, strony produktowe, marketing internetowy i SEO lokalne.

## Setup

```bash
npm install
npm run dev
```

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

## Notes

The contact form is intentionally frontend-only. It prevents default submission and does not send data anywhere until a real email, CRM, or API endpoint is selected.
