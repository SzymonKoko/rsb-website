import { usePageContent } from '../content/pageContentContext';

export function Footer() {
  const content = usePageContent();

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <p>{content.footerText}</p>
      </div>
      <div className="footer-links" aria-label="Linki kontaktowe">
        <a href="#home">{content.navHome}</a>
        <a href="#offer">{content.navOffer}</a>
        <a href="#portfolio">{content.navPortfolio}</a>
        <a href="#contact">{content.navContact}</a>
      </div>
    </footer>
  );
}
