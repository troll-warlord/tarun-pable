/**
 * tailwind.config.js — Tailwind v4 Edition
 *
 * In Tailwind v4, the design token system lives in CSS, not here.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Token type          │  Where it lives                      │
 * ├─────────────────────────────────────────────────────────────┤
 * │  Colors (themeable)  │  @theme inline  in style.css         │
 * │  Font families       │  @theme         in style.css         │
 * │  Custom text sizes   │  @theme         in style.css         │
 * │  Border radii        │  @theme         in style.css         │
 * │  Runtime CSS vars    │  :root / html.dark  in style.css     │
 * │  Dark mode strategy  │  darkMode below  (still config-land) │
 * └─────────────────────────────────────────────────────────────┘
 *
 * Generated Tailwind utilities from style.css @theme tokens:
 *   bg-primary / text-primary / border-primary
 *   bg-surface / bg-base / bg-panel
 *   border-edge
 *   text-main / text-body / text-muted
 *   font-sans / font-mono
 *   text-nano (9px) / text-code (10px) / text-label (11px)
 *   rounded-card (16px) / rounded-badge (4px)
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  darkMode: 'class', // Toggled by adding/removing class="dark" on <html>
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Theme extension is intentionally empty.
      // All tokens are defined in src/style.css via @theme / @theme inline.
      // This is the Tailwind v4 CSS-first approach.
    },
  },
  plugins: [],
}
