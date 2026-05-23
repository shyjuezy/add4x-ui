# Add4x Inc Website

Company site for [add4x.com](https://add4x.com). Built with Next.js 16, React 19, and Tailwind CSS v4.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`), design tokens in `src/app/globals.css`
- **Language:** TypeScript (strict)
- **Package manager:** pnpm

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # preview production build
pnpm lint
```

## Structure

```
src/
├── app/
│   ├── layout.tsx       # html shell, fonts, global metadata
│   ├── page.tsx         # composes sections
│   └── globals.css      # Tailwind + @theme tokens
├── components/
│   ├── sections/        # Hero, TrustStrip, Capabilities, Products, Contact
│   ├── ui/              # Header, Footer, Button
│   └── icons/           # Logo
└── content/
    └── site.ts          # all copy, links, metadata (single source of truth)
```

All site copy lives in `src/content/site.ts`. Edits to the page typically only require editing that one file.

## Deploy

Imports cleanly into Vercel as a Next.js project. No environment variables required. Production domains: `add4x.com` (with `www.add4x.com` redirect).

## Design spec

The design intent and visual system are captured in:
`docs/superpowers/specs/2026-05-22-add4x-nextjs-redesign-design.md`
