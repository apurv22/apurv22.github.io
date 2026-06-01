# apurv22.github.io

Personal portfolio site — `https://apurv22.github.io`.

React + Vite + TypeScript + Tailwind + Mermaid. Single-page site with sections for About, Skills, Experience, Projects, Resume, and Contact. Project cards open a modal with a fresh Mermaid architecture diagram for each project.

## Develop locally

```bash
npm install
npm run dev
```

## Build & preview

```bash
npm run build
npm run preview
```

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages.

One-time setup: in repo settings → Pages → Source, pick **GitHub Actions**.

## Project structure

```
src/
  components/   React components (Hero, About, Skills, Experience, Projects, etc.)
  data/         Typed content — profile, skills, experience, projects (with Mermaid)
public/
  resume/       Master SWE resume PDF
```
