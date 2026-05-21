# GaleON Design System

A visual design system for the **GaleON** app — the digital front door for services inside Aeroporto Internacional do Rio de Janeiro (RIOgaleão).

This file describes the foundations and visual rules. Component cards live in `preview/` and are registered for the **Design System tab**.

---

## Product context

GaleON lets a passenger reserve everything offered inside the Galeão terminal — Hospitalidade (concierge), Delivery (food at your gate), Sala VIP, Transportes (taxi/transfer), Guarda-volume, Câmbio, and Personal Shopper — before or during the airport visit.

Tone of voice (visual): **editorial, calm, oficial.** Not a startup. Not a marketplace. It feels closer to an institutional travel publication than a delivery app.

**Source of truth** for this system: the GaleON web prototype in this same project (`index.html`, `hero.jsx`, `sections.jsx`, `viagem.jsx`, `styles.css`). All tokens are extracted from there.

---

## Index

- `README.md` — this file
- `colors_and_type.css` — the canonical CSS variables (colors, type, radii)
- `assets/` — brand graphics (e.g. `footer-riogaleao.png`, the RIOgaleão multi-color wave divider)
- `preview/` — small HTML cards consumed by the Design System tab
- `ui_kits/galeon-home/` — high-fidelity recreation of the GaleON home page
- `SKILL.md` — agent-skill manifest

---

## Visual Foundations

### Color
- One brand primary: **GaleON green `#9ACA3C`** on dark ink `#1f2a0c`. Used for the primary CTA, key accents (CSAT star), brand mark.
- Neutrals are **warm-leaning**: page bg `#FFFFFF`, soft bg `#F7F7F4`, foreground `#0E0F0E`, muted `#6B6B68`, border `#E7E6E1`. Avoids cold blue-grays — the brand sits closer to off-white than to pure white.
- A **functional palette of 7 service colors**, one per offering. Each service drives the hero CTA color, the chip dot, the card accent. Never mixed gratuitously — a color = a service.
  - Hospitalidade `#2B2B2B` · Delivery `#ED1C24` · Sala VIP `#822A85` · Transportes `#C58200` · Guarda-volume `#F58220` · Câmbio `#009B90` · Personal Shopper `#ED0080`
- **No gradients as decoration.** Gradients exist only as **legibility scrims** over photography (top/bottom dark overlays on hero & banner images).

### Type
- Single typeface: **Plus Jakarta Sans**, weights 400/500/600/700/800. Loaded from Google Fonts.
- Display copy uses tight tracking (`letter-spacing: -0.035em` to `-0.05em` at large sizes) and short line-height (`0.92`–`1.0`). `text-wrap: balance` on headlines.
- Body uses `text-wrap: pretty`, line-height ~1.45.
- Feature settings always on: `ss01, ss02`, plus `font-variant-numeric: tabular-nums` for any stat.
- One italic-serif accent: partner marquees use **Georgia italic** as a visual contrast against the otherwise sans-serif system. (Now superseded by real B&W brand logos in the partners strip; serif italic stays as a fallback option.)
- Eyebrows: 12 px, uppercase, letter-spacing `0.06em`, with a 22 px lead-in rule before the text.

### Spacing & radii
- Radii: `--r-sm 8` · `--r-md 14` · `--r-lg 22` · `--r-xl 32`. Cards default to `--r-lg`; hero / showcase to `--r-xl`; chips & buttons are fully pill (`999`).
- Section padding: **desktop `96px 56px`**, **mobile `64px 20px`**. A tight variant (`--tight`) drops vertical to 64/48.
- Internal card padding is generous: mobile 22 px, desktop 28–32 px.

### Buttons
- Pill (`border-radius: 999`), height 52 desktop / 48 mobile, internal padding 22.
- Variants: `primary` (brand green on green-ink), `dark` (black on white), `ghost` (transparent with black outline), and a contextual **service-tinted** variant used in the hero (CTA bg = active service color, text white).
- Hover state: `translateY(-1px)`; the inline `gl-arrow` translates right `3px`.

### Cards
- Default card: white bg, `1px solid var(--c-border)`, `var(--r-lg)` radius, subtle hover lift (`translateY(-3px)`).
- Showcase cards (hero, service cards) use `var(--r-xl)` and a darker/colored background with photography behind a legibility scrim.
- No drop shadows by default — depth comes from radius + border + lift.
- A single full-bleed image inside a card uses `aspect-ratio` to lock proportion (4/3, 4/5, 16/7, 21/8 depending on layout role).

### Imagery
- Photography is the dominant decorative element. Used full-bleed in hero, as the moment in "Sobre o GaleON", as the visual of each service card.
- Always paired with a **scrim** when copy sits on top: a radial dim, or a directional `linear-gradient` from `rgba(0,0,0,0.55)` to transparent.
- Image-slots are placeholder shells the user fills with real photos; the system never draws people via SVG.

### Motion
- Crossfade only on content swap (`@keyframes gl-fadein`, 320 ms ease).
- Marquee: linear infinite, 38 s desktop / 26 s mobile.
- Service-chip progress bar: 4500 ms linear scaleX(0 → 1), drives auto-rotate of the hero.
- Card hover: `transform .35s cubic-bezier(.2,.7,.3,1)`.
- All animations respect `prefers-reduced-motion: reduce` — animations disabled, progress bar held at 0.

### Layout patterns
- Sticky institutional header with a glass background (`rgba(255,255,255,0.92) + backdrop-filter: blur(16px) saturate(180%)`).
- Sections are full-page wide with internal max-widths on text (e.g. 720 for headers, 540 for hero subline).
- Two-column desktop layouts (1.35fr 1fr / 0.9fr 1.3fr) typical for benefit + image and FAQ.
- Mobile collapses to single column; small details (gaps, type) scale to ~55–60 % of desktop.

### Iconography
- All product iconography is hand-rolled **line SVG**, 24×24 viewBox, stroke `currentColor`, stroke-width `1.6`, round line caps + joins. See `hero.jsx` (`Icon`, `ServiceIcon`). Each service has its own glyph (concierge bell, takeout container, lounge sofa, car, locker, currency arrows, shopping bag).
- Arrow icon (`Icon.arrow`) is the universal "go" cue; it lives inside buttons and on card top-right corners.
- Brand logos (partners marquee): real third-party SVGs served from `cdn.simpleicons.org/{slug}/000000`, displayed monochrome with `filter: brightness(0)` + `opacity: 0.7` for a unified ink-on-paper feel.
- No emoji. No unicode glyphs as UI.

### What this system is NOT
- No drop shadows by default.
- No purple/blue gradients.
- No emoji.
- No multi-color icon system.
- No big visual flourishes beyond photography and the green primary.
