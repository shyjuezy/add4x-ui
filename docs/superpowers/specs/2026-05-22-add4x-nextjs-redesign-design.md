# Add4x Inc website — Next.js editorial redesign

**Status:** Draft for review
**Date:** 2026-05-22
**Owner:** Shyju Viswambaran

## 1. Goal

Convert the existing static `add4x.com` site (single `index.html` + `styles.css`) into a Next.js application with an editorial, Pomelo-inspired visual identity, while keeping the same scope: a single-page company landing site that positions Add4x Inc and showcases its products.

## 2. Scope

**In scope**
- New Next.js 16 / React 19 / Tailwind 4 / TypeScript app, replacing `index.html` + `styles.css`
- Single-page scroll site with anchor-based navigation
- Editorial visual system: warm cream background, near-black ink, forest-green accent, lime highlight
- Sections: Header, Hero, Trust strip, Capabilities, Products, Contact, Footer
- Typed content configuration (`content/site.ts`) as the single source of truth for copy and links
- Free Google Fonts (Instrument Serif Italic + Inter) — no paid licenses required initially
- Static-export friendly build that deploys to Vercel as a static site (no server runtime)
- Restaurant photography sourced from licensed stock (Unsplash/Pexels) and stored in `public/images/`

**Out of scope**
- Separate routes for products, about, etc. (single page only; code is structured to allow this later)
- CMS integration (copy lives in the typed config)
- Multi-language support
- Authentication, forms beyond a `mailto:` link, analytics dashboards
- A real product shoot (place licensed stock now; commission later)
- POS as a product (omitted from the Products section entirely for v1; can be added later once it is closer to launch)

## 3. Approach (chosen during brainstorming)

**Approach B — Sections + typed content config.**

`app/page.tsx` is a thin composition: it reads from `content/site.ts` and renders section components in order. Each section component takes props derived from the config and renders the JSX. Copy, links, and image paths never live inside JSX. This pays off the first time a headline, photo, or product blurb changes, and pays off again when a second product is ready to ship — adding it is a config edit, not a JSX edit.

## 4. Architecture & stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`. Design tokens declared in `app/globals.css` under `@theme`. No `tailwind.config.js` needed.
- **Language:** TypeScript (strict)
- **Package manager:** pnpm
- **Lint:** ESLint with `eslint-config-next`
- **Fonts:** `next/font/google` for Instrument Serif (italic) and Inter
- **Deployment target:** Static export, hosted on Vercel at `add4x.com` (matches the existing target documented in `README.md`)

This stack mirrors the sibling `muffin-menu` project so that the two share patterns and dependencies.

## 5. File structure

```
add4x/
├── app/
│   ├── layout.tsx          # html shell, font loading, global metadata
│   ├── page.tsx            # composes sections from content/site.ts
│   └── globals.css         # Tailwind import + @theme tokens + base resets
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── Capabilities.tsx
│   │   ├── Products.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   └── Eyebrow.tsx
│   └── icons/
│       └── Logo.tsx
├── content/
│   └── site.ts             # typed config — all copy, links, photo paths
├── public/
│   ├── images/
│   │   ├── hero.jpg
│   │   └── products-band.jpg
│   ├── logo.svg
│   └── favicon.svg
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

The existing `index.html` and `styles.css` at the repo root are deleted as part of the conversion.

## 6. Visual system

### 6.1 Color tokens

Declared once in `app/globals.css` under `@theme`:

```css
@theme {
  --color-bg:           #F6F1E8; /* warm cream — primary page background      */
  --color-bg-alt:       #EDE6D6; /* darker cream for section transitions      */
  --color-ink:          #0F1410; /* near-black — body text                    */
  --color-ink-muted:    #4A524C; /* secondary text, captions                  */
  --color-accent:       #14532D; /* deep forest green — CTAs, links, icons    */
  --color-accent-hover: #0E3D21;
  --color-highlight:    #7CD424; /* lime from logo — sparing use only         */
  --color-line:         rgba(15, 20, 16, 0.12);
}
```

**Usage discipline:**
- Forest-green (`--color-accent`) is the workhorse: buttons, links, icons.
- Lime (`--color-highlight`) is the spark: the logo mark, status dots, a hover edge — never a button fill or a large surface.
- Maroon is dropped entirely. Add4x is green-brand.

### 6.2 Typography

Loaded via `next/font/google` in `app/layout.tsx`, exposed as CSS variables.

```
--font-display: "Instrument Serif", Georgia, serif    /* italic by default in headings */
--font-sans:    "Inter", system-ui, sans-serif
```

Type scale:

| Token       | Use                  | Size (clamp)    | Weight | Tracking | Leading |
|-------------|----------------------|-----------------|--------|----------|---------|
| Display XL  | Hero headline        | 96–128 px       | 400 it | -2%      | 1.02    |
| Display L   | Section headlines    | 64–88 px        | 400 it | -2%      | 1.05    |
| Heading M   | Card titles, sub-h2  | 28–36 px        | 600    | -1%      | 1.20    |
| Body L      | Lead paragraphs      | 18 px           | 400    |  0%      | 1.55    |
| Body        | Body copy            | 17 px           | 400    |  0%      | 1.55    |
| Eyebrow     | Small kickers        | 12 px uppercase | 500    | +8%      | 1.00    |
| Caption     | Footer, meta         | 13 px           | 500    |  0%      | 1.40    |

`Instrument Serif Italic` is the free alternative to Editorial New. Both fonts can be swapped via a single change in `app/layout.tsx` later if a paid license is acquired.

### 6.3 Spacing & layout

- Content max-width: **1200 px** centered, with full-bleed bands (products section) breaking out
- Section vertical rhythm: **120 px desktop, 72 px mobile** between sections
- Horizontal page padding: **24 px mobile, 48 px tablet, 80 px desktop**
- Borders: hairline `1px solid var(--color-line)` only; no box shadows; no rounded "cards" outside the logo mark
- Photography: edge-to-edge or near-edge — never boxed in a styled card

### 6.4 Motion

- 200 ms ease-out transitions for hover/focus on links and buttons
- A one-time CSS keyframe fade-up on hero text on mount, gated by `prefers-reduced-motion: no-preference`
- No scroll-jacking, no parallax, no IntersectionObserver-driven reveals (keeps the editorial feel calm)

## 7. Page sections

### 7.1 Header

- Sticky, ~72 px tall, transparent over cream
- Gains a hairline bottom border (`--color-line`) only after the user scrolls ≥ 12 px
- Left: logo (24 px square SVG with lime mark) + wordmark "Add4x" in `--color-ink`
- Center: nav anchor links — `Platform`, `Products`, `Contact` (15 px sans, hover → forest-green)
- Right: `Contact us` button — forest-green fill, cream text, 13 px sans, 999 px border-radius

### 7.2 Hero

- Minimum height **88 vh** on desktop, **auto** on mobile
- Top ~60 % of the section is a full-bleed restaurant photograph (warm-tone, golden-hour, hands-on cooking — see Photography brief)
- Photo has a subtle bottom-to-cream gradient overlay for legibility on the seam
- Below the photo, on the cream area:
  - Eyebrow: `TECHNOLOGY FOR RESTAURANT OPERATIONS`
  - Headline (Display XL italic):
    > *Restaurant software,*
    > *built without friction.*
  - Lead (Body L, max 640 px): *Add4x Inc creates practical, connected systems for restaurants that need faster ordering, clearer kitchen operations, and dependable business visibility.*
  - CTAs:
    - Primary: `Explore Muffin Menu →` (forest-green fill) — links to `https://www.muffinmenu.com`
    - Secondary: `View capabilities` (ghost — text with underline on hover) — anchor to `#platform`

### 7.3 Trust strip

- ~80 px tall, no borders, sits between Hero and Capabilities
- Three short statements, 14 px sans, color `--color-ink-muted`
- Single row evenly spaced on desktop (CSS grid, 3 equal columns), stacked on mobile
- Copy is the same as the existing site:
  1. *Add4x Inc builds and operates restaurant technology products.*
  2. *Muffin Menu is an Add4x Inc product.*
  3. *Public company site for add4x.com.*

### 7.4 Capabilities (`#platform`)

- Section kicker (left-aligned, max 720 px column):
  - Eyebrow: `MODULAR SYSTEM`
  - Heading (Display L italic): *One company, focused restaurant technology.*
- Below: 2×2 grid (on desktop, 1 column on mobile) of capability cards separated only by hairline rules — no box backgrounds
- Each card:
  - Card number (Display L italic, 40 px): `01` … `04`
  - Title (Heading M): `Ordering workflows`, `Kitchen operations`, `Point of sale`, `Reporting layer`
  - Body (Body): copy carried over from the existing site, edited only for any obvious tightening
  - ~40 px internal padding all around

### 7.5 Products (`#products`)

- Full-bleed band — the page's single dark moment
- Background: `--color-accent` (deep forest-green); text uses `--color-bg` (cream)
- Optional: a low-opacity restaurant photo behind the band for texture (decision deferred to build time)
- Heading (Display L italic, cream): *Featured product.*
- One product card, centered (or anchored left within the max-width with the heading):
  - **Muffin Menu**
    - Mark: square with lime fill, dark text — visually echoes the Add4x logo card
    - Body: *Muffin Menu is a restaurant management platform from Add4x Inc for kitchen display, point of sale, menu management, online ordering, and analytics.*
    - Metadata list (small caps, cream-muted): *Legal owner — Add4x Inc · Category — Restaurant management platform · Website — muffinmenu.com*
    - Link: `Visit muffinmenu.com →` (cream text, underline on hover)
- The section is built to accept additional product cards later; it renders whatever the config supplies (1 card today, N cards tomorrow). Layout flips from "feature" treatment (1 product) to a horizontal row (2+ products) based on item count.

### 7.6 Contact (`#contact`)

- Back to cream
- Centered or left-aligned within max-width
- Eyebrow: `LET'S TALK`
- Heading (Display L italic): *Build the restaurant operation your business needs.*
- Lead: *Contact Add4x Inc for business, product, or account questions.*
- Email rendered as an oversized link: `hello@add4x.com` at ~40 px sans 500, forest-green underline on hover; `mailto:` href

### 7.7 Footer

- Cream background, hairline top border, ~96 px vertical padding
- Three-column layout on desktop, stacked on mobile:
  - Col 1: logo + wordmark + one-line description (*Add4x Inc builds and operates Muffin Menu.*)
  - Col 2: link list — `Platform`, `Products`, `Muffin Menu` (external), `Contact`
  - Col 3: copyright — `© 2026 Add4x Inc. All rights reserved.`

## 8. Content config

`content/site.ts` exports a single typed object. Section components import only their slice. Sketch:

```ts
export const site = {
  meta: {
    title: "Add4x Inc — Restaurant Technology Products",
    description:
      "Add4x Inc builds restaurant technology products, including Muffin Menu, a restaurant management platform for modern food businesses.",
  },
  nav: {
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Products", href: "#products" },
      { label: "Contact",  href: "#contact"  },
    ],
    cta: { label: "Contact us", href: "mailto:hello@add4x.com" },
  },
  hero: {
    eyebrow: "Technology for restaurant operations",
    headline: ["Restaurant software,", "built without friction."],
    lead: "Add4x Inc creates practical, connected systems …",
    image: { src: "/images/hero.jpg", alt: "..." },
    primaryCta:   { label: "Explore Muffin Menu", href: "https://www.muffinmenu.com" },
    secondaryCta: { label: "View capabilities",   href: "#platform" },
  },
  trust: ["...", "...", "..."],
  capabilities: {
    eyebrow: "Modular system",
    heading: "One company, focused restaurant technology.",
    items: [
      { number: "01", title: "Ordering workflows", body: "..." },
      // ...
    ],
  },
  products: {
    heading: "Featured product.",
    items: [
      { name: "Muffin Menu", body: "...", href: "https://www.muffinmenu.com" },
      // Future products go here; the component handles 1 or N items.
    ],
  },
  contact: {
    eyebrow: "Let's talk",
    heading: "Build the restaurant operation your business needs.",
    lead: "Contact Add4x Inc for business, product, or account questions.",
    email: "hello@add4x.com",
  },
  footer: {
    tagline: "Add4x Inc builds and operates Muffin Menu.",
    copyright: "© 2026 Add4x Inc. All rights reserved.",
  },
} as const;
```

Types are inferred from `as const`. Sections accept their slice as props — no global imports inside components.

## 9. Photography

Two images needed for v1, both licensed for commercial use (free tiers of Unsplash and Pexels are sufficient — both grant commercial use without attribution):

1. **`/public/images/hero.jpg`** — warm restaurant scene
   - Subject: hands plating a dish *or* a busy line at service *or* an espresso pour
   - Tone: golden hour, warm temperature, soft natural light
   - Composition: wide-aspect (16:9 or 21:9), uncluttered, room for type below
   - Resolution: ≥ 2400 px wide, optimized to AVIF/WebP via `next/image`

2. **`/public/images/products-band.jpg`** (optional, decided during build)
   - Subject: low-light dining room or kitchen detail
   - Tone: moody, deep greens or warm browns to harmonize with the forest-green band
   - Used at low opacity behind the products band for texture; omit if it muddies the section

A "Photography TODO" note in the spec captures that we plan to commission a proper shoot later and replace these.

## 10. Build & deploy

- `pnpm install`
- `pnpm dev` — local dev on `http://localhost:3000`
- `pnpm build` — Next.js production build
- `pnpm start` — preview production build locally
- Vercel project imports the repo; default Next.js settings; production domain `add4x.com` + redirect from `www.add4x.com`
- No environment variables required

## 11. Accessibility

- All interactive elements reachable by keyboard, with visible 2 px forest-green focus rings
- Color contrast: ink-on-cream and cream-on-forest combinations all clear WCAG AA at body sizes
- `<picture>`/`next/image` `alt` text required for all photography; decorative-only images use empty `alt`
- Heading order strictly h1 → h2 → h3 with no skips
- The hero text-fade animation is gated behind `prefers-reduced-motion: no-preference`

## 12. SEO & metadata

- `<title>` and `<meta name="description">` driven from `content/site.ts`
- Open Graph image generated via `next/og` from the hero photo + headline (deferred to a follow-up; v1 ships with a static OG image)
- `lang="en"` on `<html>`
- A single `<h1>` per page (the hero headline)

## 13. Migration / cleanup

After the new app builds and renders the same content as the legacy site:

- Delete `/index.html` and `/styles.css` at the repo root
- Update `README.md` to describe the Next.js dev/build workflow (replacing the current static-site instructions)
- Optionally copy the reference design images from the sibling `muffin-menu` project (`add4x-homepage.png`, `add4x-pomelo-inspired-*.png`, `pomelo-reference.png`) into `docs/` here for future reference

## 14. Out of scope / future

- Per-product routes (`/products/muffin-menu`, `/products/pos`)
- A blog or changelog
- Lead-capture form replacing the `mailto:` link
- Analytics (PostHog, Plausible)
- Commissioned photography to replace stock
- Editorial New / Pangram Pangram licensed type swap
- Internationalization

## 15. Open questions

- Final hero photo selection — to be reviewed during build
- Whether the products band uses a background photo at low opacity or stays as a flat forest-green plane
