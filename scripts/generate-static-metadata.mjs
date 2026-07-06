import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const DEFAULT_SITE_URL = 'https://rozwinswojbiznes.pl';

function readEnvValue(name) {
  const files = ['.env.local', '.env.production', '.env'];

  for (const file of files) {
    try {
      const content = readFileSync(resolve(projectRoot, file), 'utf8');
      const line = content
        .split(/\r?\n/)
        .map((item) => item.trim())
        .find((item) => item.startsWith(`${name}=`));

      if (line) {
        return line.slice(name.length + 1).replace(/^["']|["']$/g, '');
      }
    } catch {
      // Missing env files are expected in local development.
    }
  }

  return process.env[name];
}

function normalizeSiteUrl(value) {
  const rawUrl = (value || DEFAULT_SITE_URL).trim().replace(/\/+$/, '');

  try {
    return new URL(rawUrl).origin;
  } catch {
    throw new Error(`Invalid VITE_SITE_URL: ${rawUrl}`);
  }
}

const siteUrl = normalizeSiteUrl(readEnvValue('VITE_SITE_URL'));
let existingLastmod = '';

try {
  existingLastmod =
    readFileSync(resolve(projectRoot, 'public/sitemap.xml'), 'utf8').match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] || '';
} catch {
  // The sitemap is created below when it does not exist yet.
}

const lastmod = process.env.SITEMAP_LASTMOD || existingLastmod || new Date().toISOString().slice(0, 10);

const indexPath = resolve(projectRoot, 'index.html');
const indexHtml = readFileSync(indexPath, 'utf8')
  .replace(/https:\/\/(?:example\.com|rozwinswojbiznes\.pl)\/?/g, `${siteUrl}/`)
  .replace(/"url": "https:\/\/[^"]+\/"/g, `"url": "${siteUrl}/"`)
  .replace(/"@id": "https:\/\/[^"]+#/g, `"@id": "${siteUrl}/#`)
  .replace(/"publisher": \{ "@id": "https:\/\/[^"]+#business" \}/g, `"publisher": { "@id": "${siteUrl}/#business" }`)
  .replace(/"provider": \{ "@id": "https:\/\/[^"]+#business" \}/g, `"provider": { "@id": "${siteUrl}/#business" }`);

writeFileSync(indexPath, indexHtml);

writeFileSync(
  resolve(projectRoot, 'public/robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);

writeFileSync(
  resolve(projectRoot, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
);
