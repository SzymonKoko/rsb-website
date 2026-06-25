import { useEffect, useState } from 'react';
import { getFaqs, getServices, hasCmsApi } from '../api/client';
import { usePageContent } from '../content/pageContentContext';

type ServiceCard = {
  title: string;
  text: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const fallbackServices: ServiceCard[] = [
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

const fallbackFaqs: FaqItem[] = [
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
  const content = usePageContent();
  const [serviceItems, setServiceItems] = useState<ServiceCard[]>(fallbackServices);
  const [faqItems, setFaqItems] = useState<FaqItem[]>(fallbackFaqs);

  useEffect(() => {
    if (!hasCmsApi()) {
      return;
    }

    let isMounted = true;

    Promise.all([getServices(), getFaqs()])
      .then(([servicesResponse, faqsResponse]) => {
        if (!isMounted) {
          return;
        }

        if (servicesResponse.data.length) {
          setServiceItems(
            servicesResponse.data.map((service) => ({
              title: service.title,
              text: service.description,
            })),
          );
        }

        if (faqsResponse.data.length) {
          setFaqItems(
            faqsResponse.data.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            })),
          );
        }
      })
      .catch(() => {
        // Static fallback keeps the marketing page available if the CMS is offline.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section offer" id="offer" aria-labelledby="offer-title">
      <div className="section-heading premium-heading">
        <p className="eyebrow">{content.offerEyebrow}</p>
        <h2 id="offer-title">{content.offerTitle}</h2>
        <p>{content.offerText}</p>
      </div>

      <div className="service-grid">
        {serviceItems.map((service) => (
          <article className="service-card lift-card" key={service.title}>
            <span className="card-kicker">RSB</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>

      <div className="audience-block" aria-labelledby="audience-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">{content.audienceEyebrow}</p>
          <h2 id="audience-title">{content.audienceTitle}</h2>
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
          <p className="eyebrow">{content.metricsEyebrow}</p>
          <h2 id="metrics-title">{content.metricsTitle}</h2>
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
          <p className="eyebrow">{content.processEyebrow}</p>
          <h2 id="process-title">{content.processTitle}</h2>
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
          <p className="eyebrow">{content.faqEyebrow}</p>
          <h2 id="faq-title">{content.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((faq) => (
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
