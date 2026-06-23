const links = [
  { href: '#home', label: 'Główna' },
  { href: '#offer', label: 'Oferta' },
  { href: '#contact', label: 'Kontakt' },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Rozwiń Swój Biznes - strona główna">
        <img
          className="brand-logo"
          src="/assets/logo_rsb_tekst.png"
          alt="Rozwiń Swój Biznes (RSB)"
          decoding="async"
          fetchPriority="high"
        />
      </a>
      <nav aria-label="Główna nawigacja">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#contact">
        Bezpłatna wycena
      </a>
    </header>
  );
}
