import { usePageContent } from '../content/pageContentContext';

export function Header() {
  const content = usePageContent();
  const links = [
    { href: '#home', label: content.navHome },
    { href: '#offer', label: content.navOffer },
    { href: '#portfolio', label: content.navPortfolio },
    { href: '#contact', label: content.navContact },
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label={`${content.brandTagline} - strona główna`}>
        <span className="brand-mark" aria-hidden="true">
          <img src="/assets/rsb-brand-mark.png" alt="" decoding="async" fetchPriority="high" />
        </span>
        <span className="brand-copy">
          <span className="brand-name">{content.brandName}</span>
          <span className="brand-tagline">{content.brandTagline}</span>
        </span>
      </a>
      <nav className="site-nav" aria-label="Główna nawigacja">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#contact">
        {content.headerCta}
      </a>
    </header>
  );
}
