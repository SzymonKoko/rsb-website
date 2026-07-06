import { ContactForm } from '../components/ContactForm';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Portfolio } from '../components/Portfolio';
import { PageContentProvider } from '../content/pageContent';

export function HomePage() {
  return (
    <PageContentProvider>
      <Header />
      <main>
        <Hero />
        <Features />
        <Portfolio />
        <ContactForm />
      </main>
      <Footer />
    </PageContentProvider>
  );
}
