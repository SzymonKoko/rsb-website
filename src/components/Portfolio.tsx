import { useEffect, useState } from 'react';
import { getPortfolio, hasCmsApi } from '../api/client';
import { usePageContent } from '../content/pageContentContext';

type ProjectTone = 'warm' | 'fresh' | 'clear' | 'signal';

type PortfolioProject = {
  index: string;
  type: string;
  title: string;
  text: string;
  results: string[];
  tone: ProjectTone;
  imageUrl?: string | null;
  projectUrl?: string | null;
};

const tones: ProjectTone[] = ['warm', 'fresh', 'clear', 'signal'];

const fallbackProjects: PortfolioProject[] = [
  {
    index: '01',
    type: 'Strona wizytówkowa',
    title: 'Lokalna firma usługowa',
    text: 'Miejsce na projekt dla firmy, która potrzebuje jasnej oferty, wiarygodności i kontaktu z klientem z Google.',
    results: ['Oferta', 'Kontakt', 'SEO lokalne'],
    tone: 'warm',
  },
  {
    index: '02',
    type: 'Landing page',
    title: 'Produkt lub usługa online',
    text: 'Placeholder na stronę sprzedażową prowadzącą użytkownika od argumentów do jednej konkretnej akcji.',
    results: ['CTA', 'Analityka', 'Konwersja'],
    tone: 'fresh',
  },
  {
    index: '03',
    type: 'Marka osobista',
    title: 'Specjalista i konsultant',
    text: 'Miejsce na realizację dla eksperta, który sprzedaje zaufanie, wiedzę i dobrze opisany proces współpracy.',
    results: ['Pozycjonowanie', 'Copy', 'Lead'],
    tone: 'clear',
  },
  {
    index: '04',
    type: 'SEO i marketing',
    title: 'Rozbudowa widoczności',
    text: 'Placeholder na projekt, w którym strona staje się bazą pod treści, kampanie i mierzalny rozwój widoczności.',
    results: ['Treści', 'Schema', 'Kampanie'],
    tone: 'signal',
  },
];

export function Portfolio() {
  const content = usePageContent();
  const [projectItems, setProjectItems] = useState<PortfolioProject[]>(fallbackProjects);

  useEffect(() => {
    if (!hasCmsApi()) {
      return;
    }

    let isMounted = true;

    getPortfolio()
      .then((response) => {
        const projects = Array.isArray(response.data) ? response.data : [];

        if (!isMounted || !projects.length) {
          return;
        }

        setProjectItems(
          projects.map((project, index) => {
            const tags = Array.isArray(project.tags) ? project.tags : [];

            return {
              index: String(index + 1).padStart(2, '0'),
              type: project.category,
              title: project.title,
              text: project.description,
              results: tags.length ? tags : [project.category],
              tone: tones[index % tones.length],
              imageUrl: project.imageUrl,
              projectUrl: project.projectUrl,
            };
          }),
        );
      })
      .catch(() => {
        // Portfolio placeholders stay visible when the CMS is not configured or unavailable.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section portfolio" id="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio-head">
        <div className="section-heading compact-heading">
          <p className="eyebrow">{content.portfolioEyebrow}</p>
          <h2 id="portfolio-title">{content.portfolioTitle}</h2>
        </div>
        <p>{content.portfolioText}</p>
      </div>

      <div className="portfolio-grid">
        {projectItems.map((project) => (
          <article className={`portfolio-card lift-card ${project.tone}`} key={project.index}>
            <div className="portfolio-preview" aria-hidden="true">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt="" loading="lazy" decoding="async" />
              ) : (
                <>
                  <span />
                  <span />
                  <span />
                  <div />
                </>
              )}
            </div>
            <div className="portfolio-meta">
              <span>{project.index}</span>
              <span>{project.type}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.text}</p>
            {project.projectUrl && (
              <a className="portfolio-link" href={project.projectUrl} target="_blank" rel="noreferrer">
                Zobacz projekt
              </a>
            )}
            <ul aria-label={`Zakres: ${project.title}`}>
              {project.results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
