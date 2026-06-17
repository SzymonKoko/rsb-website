const links = [
  { href: '#home', label: 'Główna' },
  { href: '#offer', label: 'Oferta' },
  { href: '#contact', label: 'Kontakt' },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Rozwiń Swój Biznes - strona główna">
        <span className="brand-mark" aria-hidden="true">
          R
        </span>
        <span>Rozwiń Swój Biznes</span>
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
