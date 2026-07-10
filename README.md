# Portfolio — Marcin Pawlak

Student informatyki na Politechnice Warszawskiej. Sześć lat doświadczenia w montażu wideo, dwa lata w programowaniu. Dokładność i terminowość.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Podgląd buildu produkcyjnego (bez prefiksu GitHub Pages):

```bash
npm run build
npx serve out
```

## GitHub Pages

Strona jest budowana jako statyczny export Next.js i wdrażana przez GitHub Actions.

**Jednorazowa konfiguracja na GitHubie:**

1. Wejdź w repozytorium → **Settings** → **Pages**
2. W **Build and deployment** ustaw **Source** na **GitHub Actions**
3. Wypchnij zmiany na branch `main` — workflow `.github/workflows/deploy.yml` zbuduje i opublikuje stronę

Po udanym deployu strona będzie dostępna pod adresem:

**https://marcinekCoding.github.io/portfolio/**

> Repozytorium `portfolio` wymaga `basePath: /portfolio` (ustawiane automatycznie w CI przez `NEXT_PUBLIC_BASE_PATH`). Dla strony użytkownika (`username.github.io`) usuń tę zmienną z workflow.
