# Sudarshan Naik | Portfolio

React 19 + TypeScript + Framer Motion. Project cards read live repository data from the GitHub REST API.

## Run locally
```
npm install
npm start
```

## Edit your content
Everything you'd change lives in `src/data/profile.ts` (summary, skills, projects).
Each project has `repoKeys`: fragments of the repo name used to find its GitHub repo automatically.

## Deploy
Pushing to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`.
In the repo, open Settings, then Pages, and set Source to "GitHub Actions" once.

live link: https://sudarshan-g-naik.vercel.app/
