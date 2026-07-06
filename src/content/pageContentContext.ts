import { createContext, useContext } from 'react';
import type { PageContent } from '../types/api';

export const fallbackPageContent: PageContent = {
  brandName: 'RSB',
  brandTagline: 'Rozwiń Swój Biznes',
  navHome: 'Główna',
  navOffer: 'Oferta',
  navPortfolio: 'Portfolio',
  navContact: 'Kontakt',
  headerCta: 'Bezpłatna wycena',
  heroEyebrow: 'Strony, marketing, SEO',
  heroTitle: 'Rozwiń Swój Biznes online.',
  heroText:
    'RSB tworzy strony wizytówkowe i produktowe, które wspierają sprzedaż, marketing oraz widoczność w Google.',
  heroPrimaryCta: 'Zaplanuj stronę',
  heroSecondaryCta: 'Zobacz ofertę',
  offerEyebrow: 'Oferta',
  offerTitle: 'Strona internetowa jako narzędzie sprzedaży, nie folder online.',
  offerText:
    'Rozwiń Swój Biznes łączy projektowanie stron, marketing internetowy i SEO lokalne w jednym procesie. Efekt: witryna, która wygląda premium, jasno tłumaczy ofertę i pomaga zdobywać zapytania.',
  audienceEyebrow: 'Dla kogo',
  audienceTitle: 'Dla firm, które chcą wyglądać dojrzale zanim klient zadzwoni.',
  metricsEyebrow: 'Dowód pracy',
  metricsTitle: 'Liczby, które mają wspierać zaufanie, nie robić hałas.',
  processEyebrow: 'Proces',
  processTitle: 'Od oferty do gotowej strony bez zgadywania.',
  faqEyebrow: 'FAQ',
  faqTitle: 'Najczęstsze pytania przed startem projektu.',
  portfolioEyebrow: 'Portfolio',
  portfolioTitle: 'Miejsce na realizacje, które pokażą styl pracy RSB.',
  portfolioText:
    'Na start zostają eleganckie placeholdery. Później wystarczy podmienić tytuł, opis, link i miniaturę, żeby każda karta stała się pełnym case study.',
  contactEyebrow: 'Kontakt',
  contactTitle: 'Zacznij od krótkiego briefu. Resztę uporządkujemy.',
  contactText:
    'Formularz jest gotowy pod zewnętrzny moduł CMS. Dopóki API nie jest skonfigurowane, strona działa jako bezpieczny brief pomocniczy.',
  briefKicker: 'Brief',
  briefTitle: 'Co przygotować przed rozmową?',
  briefItems: [
    'Jaki typ strony chcesz zbudować?',
    'Kto ma być głównym odbiorcą?',
    'Jakie zapytania lub sprzedaż ma generować strona?',
    'Czy potrzebujesz SEO, marketingu albo analityki?',
  ],
  formNameLabel: 'Imię i firma',
  formNamePlaceholder: 'Anna, lokalna marka',
  formEmailLabel: 'Email',
  formEmailPlaceholder: 'kontakt@firma.pl',
  formScopeLabel: 'Zakres projektu',
  formScopePlaceholder: 'Wybierz zakres',
  formMessageLabel: 'Wiadomość',
  formMessagePlaceholder: 'Opisz firmę, ofertę i cel strony',
  formIdleNote: 'Po podpięciu zewnętrznego modułu CMS zgłoszenie będzie wysyłane jako nowy lead.',
  formOfflineNote: 'Zewnętrzne API formularza nie jest jeszcze skonfigurowane. Dodaj VITE_API_URL, gdy moduł CMS będzie gotowy.',
  formErrorNote: 'Nie udało się wysłać zgłoszenia. Sprawdź dane i spróbuj ponownie.',
  formSuccessNote: 'Dzięki. Zgłoszenie zostało wysłane.',
  formSendingNote: 'Wysyłanie zgłoszenia...',
  formSubmitLabel: 'Wyślij brief',
  formSendingLabel: 'Wysyłanie...',
  footerText: '© 2026 Rozwiń Swój Biznes (RSB). Strony internetowe, marketing i SEO lokalne.',
};

export const PageContentContext = createContext<PageContent>(fallbackPageContent);

export function usePageContent() {
  return useContext(PageContentContext);
}
