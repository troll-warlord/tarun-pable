# TARUN_PABLE — Cloud Architect Portfolio

> *"Architecting the silence between 100 million requests."*

A high-performance, terminal-aesthetic developer portfolio built with Vue 3, Tailwind CSS v4, and GSAP. Features a full dual light/dark theme system, smooth-scroll orchestration, and a decoupled CSS-variable design architecture.

**Live →** [troll-warlord.github.io/tarun-pable](https://troll-warlord.github.io/tarun-pable/)
**Repo →** [github.com/troll-warlord/tarun-pable](https://github.com/troll-warlord/tarun-pable/)

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Animations | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis (`@studio-freight/lenis`) |
| State | Pinia |
| Routing | Vue Router 5 |
| Utilities | VueUse |
| Linting | ESLint + Prettier |

---

## Design System

All design tokens live in `src/style.css` as a single source of truth.

### CSS Architecture

```bash
@theme            → Static build-time tokens (fonts, custom type scale, radii)
@theme inline     → Runtime color aliases mapping Tailwind utilities to CSS vars
@layer base       → :root (light) + html.dark (dark) theme definitions
@layer components → Global classes used by 2+ components
<style scoped>    → Single-component skin classes
```

### Color Tokens

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `--clr-primary` | `#047857` emerald-700 | `#10b981` emerald-500 | Accent, CTAs |
| `--clr-bg-base` | `#d4d4d8` zinc-300 | `#09090b` zinc-950 | Page background |
| `--clr-bg-surface` | `#c8c8ce` | `#18181b` zinc-900 | Cards, panels |
| `--clr-edge` | `#a1a1aa` zinc-400 | `rgba(255,255,255,0.08)` | Borders |
| `--clr-text-main` | `#09090b` zinc-950 | `#f4f4f5` zinc-100 | Headings |
| `--clr-text-body` | `#27272a` zinc-800 | `#d4d4d8` zinc-300 | Body copy |
| `--clr-text-muted` | `#52525b` zinc-600 | `#71717a` zinc-500 | Labels |

### Custom Type Scale

| Token | Size | Usage |
| --- | --- | --- |
| `--text-nano` | 9px | SVG labels, micro text |
| `--text-code` | 10px | Mono badges, button labels |
| `--text-label` | 11px | Section labels, pill text |

### Tailwind Utilities (mapped to CSS vars)

`bg-base` `bg-surface` `bg-panel` `bg-primary` `bg-primary-subtle` `border-edge` `border-primary` `text-main` `text-body` `text-muted` `text-primary`

---

## Theme Switching

Dark mode is toggled via the `html.dark` class. The `useThemeStore` Pinia store manages state with `localStorage` persistence — defaults to dark on first visit.

```js
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
themeStore.toggleTheme()  // toggle
themeStore.isDark          // boolean ref
```

The navbar includes a sun/moon icon button on desktop and a `// LIGHT_MODE` / `// DARK_MODE` link in the mobile drawer.

---

## Content Management

All site content is data-driven via JSON. No component edits needed for content updates:

| File | Controls |
| --- | --- |
| `data/techStack.json` | Tech console categories + items, certifications |
| `data/experience.json` | Work history cards |
| `data/projects.json` | Project cards |
| `data/photography.json` | Photography grid |
| `data/footer.json` | Social links, system specs |
| `utils/constants.js` | Section headings and descriptions |

### Adding a tech category

In `techStack.json`, add the key to `categories` and a matching `{ label, items }` object:

```json
"categories": ["cloud_platforms", "your_new_category"],
"your_new_category": {
  "label": "Label",
  "items": [{ "name": "Tool", "slug": "tool-slug" }]
}
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

### Lint & Format

```bash
npm run lint       # ESLint (auto-fix)
npm run format     # Prettier
```

---

## Deployment

Configured for GitHub Pages at the `/tarun-pable/` base path (`vite.config.js`).

```bash
npm run build
# deploy contents of dist/ to gh-pages branch
```

---

## Font Setup

Self-hosted via `public/fonts/`. Required files:

```bash
public/fonts/
├── inter-v20-latin-300.woff2
├── inter-v20-latin-regular.woff2
├── inter-v20-latin-600.woff2
├── inter-v20-latin-700.woff2
├── inter-v20-latin-900.woff2
├── roboto-v50-latin-regular.woff2
└── roboto-v50-latin-500.woff2
```

---

## License

MIT — feel free to use as a template with attribution.
