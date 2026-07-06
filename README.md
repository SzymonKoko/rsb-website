# Rozwiń Swój Biznes (RSB)

Premium static website for Rozwiń Swój Biznes (RSB): strony internetowe, strony wizytówkowe, strony produktowe, marketing internetowy i SEO lokalne.

## Setup

```bash
npm install
npm run dev
```

Use Node 22.13+:

```bash
nvm use
```

## CMS API

The website can read content from an external CMS API module. The CMS is not part of this repository. Copy `.env.example` to `.env.local` and set values when the external module exists:

```env
VITE_SITE_URL=https://rozwinswojbiznes.pl
VITE_API_URL=
VITE_WEB3FORMS_ACCESS_KEY=5c782e60-0928-42d7-8637-1153bd72780d
```

When `VITE_API_URL` is missing or the API is unavailable, the page keeps using built-in fallback content. Contact submissions can still go to email through Web3Forms when `VITE_WEB3FORMS_ACCESS_KEY` is configured.

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

`npm run install:post-commit-hook` installs a local `.git/hooks/post-commit` hook. After every commit, the hook rebuilds/reloads the `app` service with `docker compose up -d --build app` when Docker Compose is available. Without Docker Compose, it falls back to `npm run build`. Set `RSB_SKIP_POST_COMMIT_RELOAD=1` to skip it for a single commit command.

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

The contact form submits to the external CMS API when `VITE_API_URL` is configured. Without CMS, it submits to Web3Forms and sends email to the address connected with `VITE_WEB3FORMS_ACCESS_KEY`. Without either variable, it stays in safe fallback mode and does not send data anywhere.
