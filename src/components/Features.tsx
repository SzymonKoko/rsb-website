const services = [
  {
    title: 'Strony wizytówkowe',
    text: 'Struktura, copy i projekt dla lokalnych firm, które chcą szybko pokazać ofertę, zbudować zaufanie i zbierać zapytania z Google.',
  },
  {
    title: 'Strony produktowe',
    text: 'Landing pages dla usług, produktów i kampanii. Prowadzimy użytkownika od pierwszego argumentu do jasnej decyzji.',
  },
  {
    title: 'Marketing i SEO',
    text: 'Treści, techniczne SEO, analityka i kampanie planowane razem ze stroną, żeby projekt od początku pracował na widoczność.',
  },
];

const audiences = [
  {
    label: 'Lokalna firma',
    title: 'Gdy klient ma szybko zrozumieć, czym się zajmujesz.',
    text: 'Dla salonów, usług lokalnych, kancelarii, gabinetów, ekip i firm, które potrzebują wiarygodnej strony internetowej.',
  },
  {
    label: 'Specjalista',
    title: 'Gdy sprzedajesz wiedzę, usługę albo zaufanie.',
    text: 'Dla ekspertów, konsultantów i marek osobistych, które potrzebują jasnego pozycjonowania i profesjonalnej prezentacji.',
  },
  {
    label: 'Produkt online',
    title: 'Gdy jedna strona ma prowadzić do konkretnej akcji.',
    text: 'Dla ofert, premier, kursów, aplikacji i kampanii, gdzie liczy się argumentacja, CTA i mierzalna konwersja.',
  },
];

const metrics = [
  {
    value: '20+',
    label: 'projektów i wdrożeń',
    text: 'Strony wizytówkowe, landing pages i materiały online prowadzone od strategii do publikacji.',
  },
  {
    value: '99%',
    label: 'nacisku na zadowolenie',
    text: 'Proces oparty na jasnym briefie, komunikacji i decyzjach, które klient rozumie.',
  },
  {
    value: '3 s',
    label: 'cel ładowania',
    text: 'Lekka struktura, gotowe assety i kontrola wydajności przed oddaniem strony.',
  },
  {
    value: 'SEO',
    label: 'od pierwszego szkicu',
    text: 'Frazy, nagłówki, schema i treści usługowe planowane razem z projektem interfejsu.',
  },
];

const process = [
  {
    step: '01',
    title: 'Strategia',
    text: 'Ustalamy ofertę, odbiorców, frazy SEO i najważniejszą akcję na stronie.',
  },
  {
    step: '02',
    title: 'Projekt',
    text: 'Tworzymy strukturę, copy i interfejs premium dopasowany do branży oraz celu sprzedażowego.',
  },
  {
    step: '03',
    title: 'Wdrożenie',
    text: 'Budujemy szybką stronę w React/Vite, pilnując dostępności, mobile i jakości technicznej.',
  },
  {
    step: '04',
    title: 'SEO i marketing',
    text: 'Dopinamy metadane, schema, treści usługowe, analitykę i kierunek dalszych kampanii.',
  },
];

const faqs = [
  {
    question: 'Czy RSB tworzy strony internetowe dla lokalnych firm?',
    answer:
      'Tak. Rozwiń Swój Biznes projektuje strony wizytówkowe i produktowe dla firm usługowych, lokalnych marek i specjalistów.',
  },
  {
    question: 'Czy SEO jest częścią projektu strony?',
    answer:
      'Tak. Struktura nagłówków, treści usługowe, metadane, schema i techniczne podstawy SEO są planowane już na etapie strategii.',
  },
  {
    question: 'Czym różni się strona produktowa od wizytówkowej?',
    answer:
      'Strona wizytówkowa buduje wiarygodność firmy, a produktowa prowadzi użytkownika do jednej konkretnej akcji, np. zapytania lub zakupu.',
  },
  {
    question: 'Czy strona będzie szybka i responsywna?',
    answer:
      'Tak. Projekt jest tworzony mobile-first, z lekkimi assetami, jasną strukturą i kontrolą wydajności przed publikacją.',
  },
  {
    question: 'Czy można później rozbudować stronę o marketing?',
    answer:
      'Tak. Strona może być bazą pod kampanie, analitykę, landing pages, content SEO oraz dalszą optymalizację konwersji.',
  },
];

export function Features() {
  return (
    <section className="section offer" id="offer" aria-labelledby="offer-title">
      <div className="section-heading premium-heading">
        <p className="eyebrow">Oferta</p>
        <h2 id="offer-title">Strona internetowa jako narzędzie sprzedaży, nie folder online.</h2>
        <p>
          Rozwiń Swój Biznes łączy projektowanie stron, marketing internetowy i SEO lokalne
          w jednym procesie. Efekt: witryna, która wygląda premium, jasno tłumaczy ofertę
          i pomaga zdobywać zapytania.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card lift-card" key={service.title}>
            <span className="card-kicker">RSB</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>

      <div className="audience-block" aria-labelledby="audience-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Dla kogo</p>
          <h2 id="audience-title">Dla firm, które chcą wyglądać dojrzale zanim klient zadzwoni.</h2>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => (
            <article className="audience-card lift-card" key={audience.label}>
              <span>{audience.label}</span>
              <h3>{audience.title}</h3>
              <p>{audience.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="metrics-panel" aria-labelledby="metrics-title">
        <div>
          <p className="eyebrow">Dowód pracy</p>
          <h2 id="metrics-title">Liczby, które mają wspierać zaufanie, nie robić hałas.</h2>
        </div>
        <div className="metrics-grid">
          {metrics.map((metric) => (
            <article className="metric-card lift-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <p>{metric.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="process-panel" aria-labelledby="process-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Proces</p>
          <h2 id="process-title">Od oferty do gotowej strony bez zgadywania.</h2>
        </div>
        <div className="process-band" aria-label="Proces współpracy">
          {process.map((item) => (
            <article className="process-step lift-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="faq-block" aria-labelledby="faq-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title">Najczęstsze pytania przed startem projektu.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item lift-card" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
