export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img
          className="footer-logo"
          src="/assets/logo_rsb.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          loading="lazy"
        />
        <p>© 2026 Rozwiń Swój Biznes (RSB). Strony internetowe, marketing i SEO lokalne.</p>
      </div>
      <div className="footer-links" aria-label="Linki kontaktowe">
        <a href="#home">Główna</a>
        <a href="#offer">Oferta</a>
        <a href="#contact">Kontakt</a>
      </div>
    </footer>
  );
}
