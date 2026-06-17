const services = [
  {
    title: 'Strony wizytówkowe',
    text: 'Czytelna prezentacja firmy, oferty, realizacji i kontaktu. Bez chaosu, z mocnym pierwszym wrażeniem.',
  },
  {
    title: 'Strony produktowe',
    text: 'Landing pages i mikroserwisy prowadzące użytkownika od potrzeby do zapytania, zakupu albo rozmowy.',
  },
  {
    title: 'Marketing i SEO',
    text: 'Treści, struktura, techniczne SEO i kampanie przygotowane tak, żeby strona nie była tylko wizytówką.',
  },
];

const process = [
  'Strategia i architektura treści',
  'Projekt jasnego, responsywnego interfejsu',
  'Wdrożenie, optymalizacja i analityka',
];

export function Features() {
  return (
    <section className="section offer" id="offer" aria-labelledby="offer-title">
      <div className="section-heading">
        <p className="eyebrow">Oferta</p>
        <h2 id="offer-title">Projektujemy obecność online, nie tylko ładne ekrany.</h2>
        <p>
          Rozwiń Swój Biznes łączy design, development, marketing i SEO w jednym procesie,
          dzięki czemu strona od początku ma jasny cel biznesowy.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>

      <div className="process-band" aria-label="Proces współpracy">
        {process.map((item, index) => (
          <div className="process-step" key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
