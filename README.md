# Tix Arena — Client

React 19 + Vite + TypeScript + Tailwind CSS v4.

Full project documentation (architecture, API reference, env vars, deployment) lives in the [root README](../README.md). This file is just the quick-start for this app.

## Quick start

```bash
npm install
cp .env.example .env   # fill in VITE_API_URL and VITE_GOOGLE_CLIENT_ID
npm run dev
```

## Scripts

| Script | Does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `tsc -b && vite build` — use this (or `tsc -b` alone) to typecheck; `tsc --noEmit` is a no-op here since the root `tsconfig.json` only holds project references |
| `npm run lint` | ESLint over the whole app |
| `npm run preview` | Serve the production build locally |
