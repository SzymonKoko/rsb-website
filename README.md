# Rozwiń Swój Biznes (RSB)

Premium static website for Rozwiń Swój Biznes (RSB): strony internetowe, strony wizytówkowe, strony produktowe, marketing internetowy i SEO lokalne.

## Setup

```bash
npm install
npm run dev
```

Use Node 22.12+:

```bash
nvm use
```

## CMS API

The website can read content from an external CMS API module. The CMS is not part of this repository. Copy `.env.example` to `.env.local` and set values when the external module exists:

```env
VITE_SITE_URL=https://rozwinswojbiznes.pl
VITE_API_URL=
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
npm run install:post-commit-hook
```

`npm run build` generates production `robots.txt` and `sitemap.xml` from `VITE_SITE_URL`.

`npm run install:post-commit-hook` installs a local `.git/hooks/post-commit` hook. After every commit, the hook runs `npm run build` and, when Docker Compose is available, rebuilds/reloads the `app` service with `docker compose up -d --build app`. Set `RSB_SKIP_POST_COMMIT_RELOAD=1` to skip it for a single commit command.

## SEO

The project includes:

- title, description, canonical URL generated from `VITE_SITE_URL`
- Open Graph and Twitter metadata
- `ProfessionalService`, `WebSite`, `Service`, and `FAQPage` JSON-LD
- `public/robots.txt`
- `public/sitemap.xml`
- `public/assets/og-image.jpg`

Before production, set the final production domain in `VITE_SITE_URL`.

## Security Headers

`public/_headers` contains static-hosting security headers for platforms that support this file format, including:

- `Content-Security-Policy`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

For Vercel, Apache, nginx, or another host, copy the same header policy into that platform's configuration.

For production, replace the CMS API placeholder in `public/_headers` with the exact external CMS API origin.

## Notes

The contact form submits to the external CMS API when `VITE_API_URL` is configured. Without that variable, it stays in safe fallback mode and does not send data anywhere.
