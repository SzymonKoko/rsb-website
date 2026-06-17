export function ContactForm() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <p className="eyebrow">Kontakt</p>
        <h2 id="contact-title">Opowiedz, co ma robić Twoja strona.</h2>
        <p>
          Napisz, czy potrzebujesz strony wizytówkowej, produktowej, marketingu,
          SEO albo pełnego pakietu. Odpowiemy z kierunkiem i zakresem prac.
        </p>
      </div>
      <form className="contact-form">
        <label>
          Imię i firma
          <input name="name" type="text" autoComplete="organization-title" placeholder="Anna, RSB" />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" placeholder="kontakt@firma.pl" />
        </label>
        <label>
          Zakres projektu
          <select name="scope" defaultValue="">
            <option value="" disabled>
              Wybierz zakres
            </option>
            <option>Strona wizytówkowa</option>
            <option>Strona produktowa</option>
            <option>Marketing i SEO</option>
            <option>Kompletny pakiet</option>
          </select>
        </label>
        <label>
          Wiadomość
          <textarea name="message" rows={4} placeholder="Krótko opisz firmę, ofertę i cel strony" />
        </label>
        <button className="button primary" type="submit">
          Poproś o wycenę
        </button>
      </form>
    </section>
  );
}
