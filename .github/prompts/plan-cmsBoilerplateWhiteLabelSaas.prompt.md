# Plan: CMS Boilerplate - Standalone White-label SaaS

## TL;DR

Stwórz **jeden reusable template CMS**, deployowany wielokrotnie dla każdego klienta:

- **Jeden repository** zawierający Backend + Admin Panel + deployment config
- **Deploy per klient** = Docker container na serwerze, oddzielna DB PostgreSQL
- **White-label** = każdy klient widzi tylko swój panel, nie wie że template się powtarza
- **Hosting** = Ty deployujesz dla każdego klienta (SaaS model)
- **Frontend** = każda strona klienta ma ENV URL do swojego API

Rezultat: **Repeatable deployment pipeline** — nowy klient = nowy klonowany deployment.

---

## Architektura

```
┌─────────────────────────────────────────────────────────┐
│            CMS Boilerplate (ONE template)               │
│  Backend + Admin + Dockerfile + .env.example            │
└─────────────────────────────────────────────────────────┘
                         ↓
      Deploy wielokrotnie (clone + docker run):

    Klient A                 Klient B                Klient C
    ────────────────────────────────────────────────────────
    api.cms-a.com            api.cms-b.com           api.cms-c.com
    panel-a.cms.com          panel-b.cms.com         panel-c.cms.com
    DB: postgres_a           DB: postgres_b          DB: postgres_c
    │                        │                       │
    └─ Strona A              └─ Strona B             └─ Strona C
       (VITE_API_URL=...)       (VITE_API_URL=...)      (VITE_API_URL=...)
```

---

## Fazy Implementacji

### Faza 1: Backend + Admin Boilerplate (Template)

**Cel**: Jeden repository z kompletnym CMS systemem, gotowy do klonowania

1. **Struktura boilerplate repozytorium**
   ```
   cms-boilerplate/
   ├── backend/               # Node.js + Express + PostgreSQL API
   ├── admin/                 # React dashboard
   ├── docker-compose.yml     # Docker setup dla dev
   ├── Dockerfile             # Multi-stage dla production
   ├── .env.example           # Template zmiennych
   ├── package.json           # Root dependencies (optional, dla workspace)
   ├── DEPLOYMENT.md          # Instrukcja deploymentu per klient
   └── README.md
   ```

2. **Backend implementation** (jak wcześniej, ale z dodatkową konfigą)
   - Express API (TypeScript)
   - PostgreSQL connection string z ENV
   - JWT auth
   - CRUD endpoints: services, portfolio, faqs, submissions
   - Environment variables: `DATABASE_URL`, `JWT_SECRET`, `API_PORT`, `ADMIN_URL`
   - Inicjalizacja bazy danych: seed script lub migrations

3. **Admin Panel** (React)
   - Login page
   - Dashboard z CRUD formami
   - Submissions viewer
   - API URL dynamiczny z ENV (`VITE_API_URL`)

4. **Docker setup** (production-ready)
   - `Dockerfile` — multi-stage build
   - `docker-compose.yml` — dev (backend + admin + postgres)
   - `.dockerignore`
   - Automatyczne migracje bazy danych na startup

5. **Deployment configuration**
   - `.env.example` — template dla każdego klona
   - `deploy.sh` — skrypt do setupu nowego klienta
   - CI/CD ready (GitHub Actions dla automatyzacji)

**Pliki do stworzenia**:
- `/backend/package.json`, `tsconfig.json`, `.env.example`
- `/backend/src/index.ts`, `middleware/`, `controllers/`, `routes/`, `types/`
- `/backend/db/migrations/` — SQL scripts
- `/backend/db/seed.ts` — optional: demo data
- `/admin/package.json`, `vite.config.ts`
- `/admin/src/pages/` (Login, Dashboard, Services, Portfolio, FAQs, Submissions)
- `/admin/src/api/` (client.ts, hooks)
- `Dockerfile` (backend), `Dockerfile.admin` (admin)
- `docker-compose.yml`
- `DEPLOYMENT.md` — instrukcja dla każdego nowego klienta
- `deploy.sh` — automation script

**Weryfikacja**:
- ✅ `docker-compose up` — uruchamia backend + admin + PostgreSQL
- ✅ Admin dostępny na http://localhost:3000
- ✅ Backend na http://localhost:5000
- ✅ Login i CRUD operations pracują
- ✅ Baza danych init automatycznie

---

### Faza 2: Deployment Automation

**Cel**: Proces klonowania i deploymentu dla nowego klienta (powtarzalny, szybki)

1. **Identyfikuj deployment hosting** (gdzie będą żyć instancje klientów)
   - Opcja A: VPS (DigitalOcean, Linode, Hetzner) — pełna kontrola, $5-50/miesiąc
   - Opcja B: Platform-as-a-Service (Railway, Render, Fly.io) — proste, $7-50/miesiąc per app
   - Opcja C: Kubernetes (DigitalOcean/AWS) — skomplikowane, ale skalowalne

   **Rekomendacja**: Start z **Railway lub Render** — super prosty deployment.

2. **Stwórz deployment pipeline** (skrypt lub template)
   - Clone repozytorium
   - Utwórz nową instancję na hostingu (Railway/Render button, lub manual setup)
   - Ustaw zmienne env dla tego klienta (DB credentials, JWT secret, URLs)
   - Deploy i verify

3. **Stwórz admin dashboard** do trackowania klientów (opcjonalnie, v2)
   - Kto jest zalogowany
   - Ile klientów, status deploymentu
   - Link do każdego panelu

**Pliki/procesów**:
- `deploy.sh` — lokalne: clone + ustawienia ENV
- `.github/workflows/deploy.yml` — CI/CD na GitHubie (automatyczny deploy na push)
- `DEPLOYMENT.md` — step-by-step instrukcja

**Weryfikacja**:
- ✅ Nowy klient: uruchamiasz script → dostaje własny API + admin panel
- ✅ Każdy klient ma oddzielną DB i independent deployment
- ✅ Można deployować ręcznie lub automatycznie

---

### Faza 3: Frontend Integration (Per Client)

**Cel**: Każda strona klienta pobiera dane z dedykowanego API

1. **Aktualna strona RSB** (template dla klientów)
   - `/src/api/client.ts` — API wrapper (fetch z `VITE_API_URL`)
   - `/src/types/api.ts` — TypeScript types
   - Komponenty refaktorowane: Features, Portfolio, ContactForm
   - ENV: `VITE_API_URL` = `https://api.cms-klienta.com`

2. **Kopija strony dla każdego klienta**
   - Klonuj RSB website
   - Ustaw `.env.local`: `VITE_API_URL=https://api.klienta-X.com`
   - Deploy na Vercel/Netlify (lub własny serwer)
   - Frontend automatycznie pobiera dane z API klienta

**Weryfikacja**:
- ✅ Frontend pobiera dane z API
- ✅ Edycja w admin panel → zmiana na stronie
- ✅ Contact form wysyła submissions

---

### Faza 4: Documentation & Scaling

**Cel**: Gotowe do mass-deploymentu dla nowych klientów

1. **Dokumentacja**
   - README: Overview, tech stack, architecture
   - DEPLOYMENT.md: Krok po kroku (dla każdego nowego klienta)
   - API docs (Swagger)
   - Admin panel user guide
   - Frontend integration guide

2. **Deployment templates** (ułatwić onboarding)
   - Railway deploy button (jeden klik → deploy dla klienta)
   - GitHub template repository (klient forkuje, dostaje swoją instancję)
   - Docker Hub template (pull image + docker run)

3. **Monitoring & maintenance**
   - Uptime checks
   - Backup automation (per klient)
   - Log aggregation (jeśli wielu klientów)

---

## Relevant Files

**Current Frontend** (do refaktorowania):
- [src/components/Features.tsx](src/components/Features.tsx) — API fetch
- [src/components/Portfolio.tsx](src/components/Portfolio.tsx) — API fetch
- [src/components/ContactForm.tsx](src/components/ContactForm.tsx) — API submit
- Nowy: `/src/api/client.ts`
- Nowy: `/src/types/api.ts`

**Boilerplate Repository** (do stworzenia):
- `/backend/src/index.ts`, `middleware/`, `controllers/`, `routes/`
- `/admin/src/pages/`, `/admin/src/api/`
- `Dockerfile`, `docker-compose.yml`, `.env.example`
- `DEPLOYMENT.md`, `deploy.sh`

---

## Verification

### Phase 1 (Boilerplate)
1. ✅ Docker setup: `docker-compose up` — wszystko działa
2. ✅ Backend API: `localhost:5000/api/services` — zwraca dane
3. ✅ Admin login: `localhost:3000` — działa
4. ✅ CRUD operations — create, read, update, delete
5. ✅ PostgreSQL: baza init automatycznie

### Phase 2 (Deployment)
1. ✅ Clone + deploy skrypt — nowy klient deployed w < 5 minut
2. ✅ Każdy klient ma własne API URL i panel
3. ✅ Każdy klient ma oddzielną bazę danych

### Phase 3 (Frontend)
1. ✅ RSB strona pobiera dane z API
2. ✅ Dla każdego nowego klienta: clone strony + ustaw `VITE_API_URL`
3. ✅ Frontend i admin działają razem

---

## Decisions & Scope

### Included ✅
- Standalone deployment per klient (white-label SaaS)
- Repeatable boilerplate + automation
- Docker ready (production-grade)
- PostgreSQL per klient
- JWT authentication
- React admin dashboard
- REST API
- Frontend integration template

### Excluded (v1) ❌
- Multi-tenant (każdy deployment jest standalone, nie dzielą bazy)
- Media uploads (tylko URL)
- SSO
- Advanced monitoring (v2)
- Email notifications (v2)
- Multilingual support (v2)

---

## Key Advantages of This Model

| Aspekt | Standalone per klient |
|--------|----------------------|
| **Izolacja** | Każdy klient ma własne dane, DB, API — zero wpływu jednego na drugiego |
| **Skalowanie** | Dodaj klienta = dodaj nowy deployment, liniowo |
| **Niezawodność** | Jeśli jedna instancja pada, inne działają |
| **Pricing** | Możesz drażyć za hosting per klient |
| **DevOps** | Proste — klonuj + deploy |
| **Compliance** | Data residency, GDPR — łatwe do spełnienia |

---

## Timeline Estimate

- **Phase 1 (Boilerplate)**: 4-5 dni
- **Phase 2 (Deployment automation)**: 2-3 dni
- **Phase 3 (Frontend integration)**: 1-2 dni
- **Phase 4 (Docs + templates)**: 1-2 dni
- **Total**: ~10-12 dni (solo)

---

## Next Steps (Po Zatwierdzeniu Planu)

1. ✅ Stwórz boilerplate repository (Backend + Admin)
2. ✅ Dockeryzuj
3. ✅ Stwórz deployment scripts
4. ✅ Testuj: deploy boilerplate dla 2-3 "testowych klientów"
5. ✅ Dokumentacja
6. ✅ Refaktor RSB strony na API fetch
7. ✅ Gotowe do sprzedaży/wdrożenia dla klientów
