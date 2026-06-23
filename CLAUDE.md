# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The public company website for **add4x.com** (Add4x Inc). A single-page Next.js 16 (App Router) marketing site — React 19, Tailwind CSS v4, TypeScript strict. No backend, no database, no auth, no environment variables. Deploys to Vercel; production domain `add4x.com` with `www.add4x.com` redirect.

This directory sits inside the larger Add4x restaurant platform monorepo-of-repos (see `../CLAUDE.md` for the platform overview), but is fully standalone — it shares no code with the restaurant services.

## Commands

```bash
pnpm dev          # dev server → http://localhost:3000
pnpm build        # production build (also the typecheck gate — Next runs tsc)
pnpm start        # preview the production build
pnpm lint         # eslint (eslint-config-next)
pnpm exec tsc --noEmit   # standalone typecheck without a full build
```

Use **pnpm** only — a repo hook rejects `npm`/`npx`/`yarn`/`bun`. There is no test suite.

## Architecture

**Content is fully separated from presentation.** Every piece of user-facing copy, link, email, nav label, and metadata string lives in `src/content/site.ts` as one exported `site` object (typed `as const`). Components import `site` and read from it — they contain no hardcoded copy. **To change wording, links, or add a data field, edit `site.ts`, not the components.** A component is only touched when the layout/markup itself must change.

**Page composition.** `src/app/page.tsx` simply stacks the section components in order (`Hero`, `TrustStrip`, `Capabilities`, `Products`, `Contact`) between `Header` and `Footer`. There is one route. Sections are anchor-linked via `id` (e.g. `#platform`, `#products`, `#contact`) and nav hrefs in `site.ts` point at those anchors.

**Component layers** under `src/components/`:

- `sections/` — full-width page sections, each reading its slice of `site`
- `ui/` — `Header`, `Footer`, `Button`
- `icons/` — `Logo`
- `decoration/` — `CircuitTraces` and other purely visual SVG/decoration

**Styling system.** Tailwind v4 with no `tailwind.config` — the design system is defined entirely in `src/app/globals.css`:

- Color/font design tokens are declared in the `@theme inline` block as CSS custom properties (e.g. `--color-bg`, `--color-accent`, `--color-ink-muted`). In markup, reference them as `text-[var(--color-ink)]`, `bg-[var(--color-accent)]`, etc. — do **not** introduce raw hex values in components.
- Reusable visual classes live here too: `.eyebrow`, `.display` / `.display-md` (tight headline styles), `.glow`, `.grid-backdrop`, `.card-surface`, `.text-accent-gradient`, `.link-underline`, `.reveal` (intro animation, gated behind `prefers-reduced-motion`).

The visual identity is a deep-navy / magenta-accent "pomelo-style" dark theme. When adding UI, reuse the existing tokens and utility classes above to stay on-brand. The full design intent is documented at `docs/superpowers/specs/2026-05-22-add4x-nextjs-redesign-design.md`.

## Conventions

- Imports use the `@/` alias for `src/` (e.g. `@/content/site`, `@/components/ui/Footer`).
- This is a public, indexable site — content is server-rendered static text. For identity/association data meant to be machine-readable (e.g. business-verification proof), add schema.org microdata (`itemScope` / `itemType` / `itemProp`) as done in `Footer.tsx` for the leadership block.
- A PostToolUse formatter (Prettier-style) may reformat files after edits; re-read before a follow-up edit if you changed a region it might have rewrapped.
