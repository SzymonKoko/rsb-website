const briefItems = [
  'Jaki typ strony chcesz zbudować?',
  'Kto ma być głównym odbiorcą?',
  'Jakie zapytania lub sprzedaż ma generować strona?',
  'Czy potrzebujesz SEO, marketingu albo analityki?',
];

export function ContactForm() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <p className="eyebrow">Kontakt</p>
        <h2 id="contact-title">Zacznij od krótkiego briefu. Resztę uporządkujemy.</h2>
        <p>
          Na tym etapie strona nie wysyła danych do backendu. Formularz działa jako bezpieczny
          brief pomocniczy; docelowy mail, CRM lub endpoint można podłączyć przy wdrożeniu.
        </p>
      </div>

      <div className="contact-layout">
        <div className="brief-card">
          <span className="card-kicker">Brief</span>
          <h3>Co przygotować przed rozmową?</h3>
          <ul>
            {briefItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Imię i firma
            <input name="name" type="text" autoComplete="organization-title" placeholder="Anna, lokalna marka" />
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
            <textarea name="message" rows={4} placeholder="Opisz firmę, ofertę i cel strony" />
          </label>
          <p className="form-note" role="note">
            Dane nie są nigdzie wysyłane, dopóki nie zostanie podłączony docelowy kanał kontaktu.
          </p>
          <button className="button primary" type="button">
            Przygotuj brief do wysłania
          </button>
        </form>
      </div>
    </section>
  );
}
