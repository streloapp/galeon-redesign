# GaleON Home · UI kit

High-fidelity recreation of the GaleON home page. Built with React (Babel-in-browser, UMD) for portability.

## Structure
- `index.html` — single-screen mount; responsive (no design canvas chrome)
- `styles.css` — base tokens + utility classes (`.gl-section`, `.gl-btn`, `.gl-tag`, marquee, motion)
- `hero.jsx` — institutional header, service chip strip, hero variants (Split / Cinema / Statement) and the SERVICES data
- `sections.jsx` — Parceiros strip, Sobre o GaleON (image + 3 stats), Vitrine, FAQ, Jornada, Footer, HomePage composition
- `viagem.jsx` — "Construa sua viagem" interactive timeline (Planejar / Estou no Galeão agora)
- `image-slot.js` — `<image-slot>` web component for drag-and-drop image placeholders
- `assets/footer-riogaleao.png` — RIOgaleão wave divider

## Components exposed on `window`
- `GaleonHomePage({ width, heroVariant })`
- `GaleonHero({ variant, mobile, active, onSelect })`
- `GaleonHeader({ mobile })`
- `GaleonServiceChipsTop({ active, onSelect, mobile })`
- `GaleonViagem({ mobile })`
- `GaleonParceirosStrip({ mobile })`
- `GaleonIcon` (arrow, chevron, menu, plane, star)
- `GaleonServiceIcon` (one per service key)
- `GaleonServices` (data array of 7 services)

## Hero variants
- `split` (default) — full-bleed image with centered title + subline + CTA
- `cinema` — full-bleed image with bottom-left aligned copy
- `statement` — typographic hero with 3-image grid

## Responsive behavior
- A single `mobile = width <= 480` boolean drives all layout switching inside components.
- Typography scales ~55–60 % from desktop to mobile.
- Multi-column grids collapse to single column on mobile (except the "Sobre o GaleON" stats which keep 3 columns at reduced type sizes).
