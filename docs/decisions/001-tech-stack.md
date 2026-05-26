# 001 — Tech Stack

**Date:** 2026-05-24  
**Status:** decided

## Context

MAPA needs a web presence covering a public marketing landing at `mapa.hamburg`, a logged-in web app, and an admin dashboard. The MVP expects low traffic and small team — iteration speed trumps scale.

## Decision

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16 (App Router) | File-based routing, RSC, built-in font optimisation, Vercel-ready |
| Language | TypeScript (strict) | Required per CLAUDE.md |
| Styling | Tailwind CSS v4 | Config-in-CSS, co-located utilities, no build step for tokens |
| Primitives | Radix UI | Accessible headless components; no visual opinions to fight |
| Database | Supabase (Postgres + Auth + Storage) | Managed, fast to set up, Row Level Security, realtime later |
| Icons | Lucide React | Matches design spec: 1.5px stroke, outline only |
| Hosting | Vercel (planned) | Zero-config Next.js deploy |

## Alternatives considered

- Vite + React (no SSR / RSC; rejected)
- Prisma + PlanetScale (more setup, same end result; rejected in favour of Supabase which bundles auth)
- styled-components (runtime CSS-in-JS; rejected for bundle size and Tailwind v4 coverage)

## Consequences

- All components must use Tailwind utilities + CSS custom properties from `globals.css`.
- No hardcoded hex values or font names in component files — always reference tokens.
- Supabase types are stubbed in `types/supabase.ts` until schema is finalised; run `npx supabase gen types typescript` to regenerate.
