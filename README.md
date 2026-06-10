# GaleON — protótipo + design system

Protótipo navegável do **GaleON** (porta de entrada digital dos serviços do Aeroporto
Internacional do Rio de Janeiro / RIOgaleão): duas páginas vivas, um design system
tokenizado e um workbench de design.

**Papéis dos documentos:** trabalhar *dentro* do protótipo → este README ·
reproduzir *fora* (handoff) → `design.md` · valores → só no CSS (`colors_and_type.css`).

---

## Índice

| Caminho | Papel |
|---|---|
| `site.html` | **Home** (página viva; abre direto no navegador) |
| `meet-greet.html` | **Meet & Greet** (página viva) |
| `colors_and_type.css` | **Fonte de verdade dos tokens** (3 camadas) + helpers `.ds-*` |
| `styles.css` | Componentes `.gl-*` compartilhados (importa colors_and_type) |
| `mg-styles.css` | Estilos específicos do M&G (`.mg-*`; importados só pelo meet-greet) |
| `design-system.html` + `preview/` | Catálogo visual do sistema (tiles consomem o CSS real) |
| `hero.jsx`, `sections.jsx`, `award-badge.jsx` | Seções da Home |
| `mg-data.jsx`, `mg-hero.jsx`, `mg-services.jsx`, `mg-carousel.jsx`, `mg-delegacoes.jsx`, `mg-trust.jsx`, `mg-app.jsx` | Seções e dados do M&G |
| `index.html`, `app.jsx`, `design-canvas.jsx`, `tweaks-panel.jsx`, `image-slot.js` | **Workbench/tooling** (não portar pra produção) |
| `viagem.jsx`, `journey-animated.jsx`, `mg-rail.jsx` | **Dormentes** — nenhum HTML os carrega; ficam no repo como referência |
| `assets/`, `uploads/` | Mídia (vídeo do hero M&G, escudo CBF, imagens coladas) |
| `context/` | Discovery, decisões e auditorias do projeto |
| `design.md` | Handoff agnóstico de stack (draft) |
| `SKILL.md` | Manifesto de agent-skill da marca |

## Como trabalhar

- Abra `site.html` / `meet-greet.html` direto, ou `index.html` para o canvas com
  artboards desktop+mobile da Home.
- **Imagens**: todos os blocos cinza são `<image-slot>` — arraste fotos reais por cima;
  o estado persiste em `.image-slots.state.json` (local, **não** exportável).
- **Tweaks**: o painel flutuante (no canvas e no M&G) alterna variantes de layout;
  o default aprovado do M&G é `overlap`.
- React/Babel chegam via unpkg em builds de desenvolvimento — bom pra protótipo,
  inviável pra produção (ver `design.md` §2).

## Fundações (estado real)

### Tokens em 3 camadas (`colors_and_type.css`)
- **PRIMITIVO** — valor cru, nomeado pelo valor (`--space-24`, `--r-lg`, `--dur-base`…).
- **SEMÂNTICO** — nomeado pelo uso (`--c-background`, `--c-primary`, `--shadow-card`…).
- **COMPONENTE** — escopado, definido no call-site (`--btn-bg/--btn-fg`,
  `--btn-ghost-hover`, `--chip-c`).

### Cor
- Toda superfície tem seu `-foreground` pareado (modelo shadcn).
- `--c-on-media` `#FFFFFF`: texto/ícone sobre fotografia ou scrim — constante de
  legibilidade, não muda com re-tema.
- **Scrim**: `--c-scrim` `#15110D` (quase-preto morno), sempre aplicado com alpha via
  `color-mix`. Nunca preto puro, nunca gradiente decorativo.
- **Brand**: `--c-primary` `#9ACA3C` + ink `#1F2A0C`.
- **Serviços**: 7 cores, uma por oferta, cada uma com `-foreground` (Transportes é a
  única com texto escuro). A cor segue o serviço — não mistura por estética.

### Tipo
- Uma família: **Plus Jakarta Sans** 400–800 (exceção consciente: o AwardBadge do
  footer mantém o visual do selo original).
- Escala de 9 degraus, todos pares (`--text-h1` 80→44 … `--text-micro` 12); cada degrau
  carrega tamanho desktop/mobile, line-height e tracking. Home e M&G compartilham a escala.
- Numerais (`--num-stat`, `--num-price`, `--num-price-sm`) com `tabular-nums` + `ss01/ss02`
  (helper `.ds-num`).

### Espaço, raio, sombra, movimento
- **Grid 4px**: `--space-N` onde N = px (4→104). Ritmo de seção: `--section-pad-*`
  (desktop 96×56, mobile 64×20) via `.gl-section`.
- **Radii**: sm 8 · md 14 · lg 22 (cards, botões) · xl 32 (hero/showcase) · pill 999.
- **Sombras por papel** (não formam escala): `--shadow-card`, `--shadow-card-hover`,
  `--shadow-panel`, `--shadow-pop`, `--shadow-dark`. One-offs literais intencionais:
  glass do hero (`0 10px 30px …22`), dot da galeria M&G, hairlines inset.
- **Motion**: `--ease-out` + `--dur-fast/base/moderate/slow` para interações.
  Animações **ambiente** têm timing próprio, fora da escala: rotator/progresso do hero
  4500ms, marquee 38s (26s mobile), kenburns 26–30s, crossfade `gl-fadein` 320ms.
  Tudo respeita `prefers-reduced-motion` (exceção conhecida: o vídeo do hero M&G —
  ver `design.md` §5).

### Breakpoint
- Token de referência: `--bp-mobile: 720px` (usado pelas media queries dos helpers
  `.ds-*` e do catálogo). Em runtime as páginas trocam via `[data-vp="mobile"]`:
  a Home decide em `width <= 480` (uma vez, no load); o M&G em `< 820` com listener.
  A divergência é um quirk documentado — no handoff a fronteira canônica é 720
  (`design.md` §5).

## Componentes (`.gl-*` em styles.css)

- **Botão `.gl-btn`** — modelo shadcn: eixo variante × eixo tamanho. Default 36px,
  radius `--r-lg` (desvio de marca vs. rounded-md). Variantes: `--primary`,
  `--destructive`, `--service` (passa `--btn-bg/--btn-fg`), `--dark`, `--secondary`,
  `--outline`, `--ghost`, `--link`. Tamanhos: `--xs/--sm/(default)/--lg` + `--icon[-xs/-sm/-lg]`.
  A matriz completa é o contrato do componente; hoje as páginas usam `--service`,
  `--ghost`, `--secondary` e `--icon` (as demais vivem nos previews).
- **`.gl-section`** — moldura de seção (ritmo 96×56 / 64×20).
- **`.gl-eyebrow`** — abertura de seção: 12px uppercase + régua 22px.
- **`.gl-tabs` / `.gl-tab`** — pill de tabs; ativa = `--c-primary`, e na Vitrine a cor
  do serviço sobrescreve via style inline.
- **`.gl-card`** — hover padrão de card: lift −2px + `--shadow-card-hover`.
- **`.gl-svc-top-chip`(+`--bare`) / `.gl-svc-progress`** — chips do rotator do hero
  (glass bar), barra de progresso 4500ms via `--chip-c`.
- **`.gl-marquee-track`** — esteira infinita (parceiros na Home, escudos no M&G).
- **`.gl-hscroll`** — carrossel horizontal com scroll-snap (Vitrine).
- **`.gl-hero-anim`** — crossfade de conteúdo (320ms, keyframe-driven).
- **`body.gl-is-dragging`** — pausa animações enquanto se arrasta arquivo (tooling).

Os `.mg-*` do M&G são estilos de página (seções), não átomos do sistema — anatomia e
comportamento documentados em prosa no `design.md` §7.

## O que este sistema NÃO é

- Sem sombras fora dos 5 tokens de papel (+ one-offs documentados).
- Sem gradiente decorativo — gradiente só como scrim de legibilidade sobre foto.
- Sem emoji; sem ícone multicolorido (linha 24×24, stroke 1.6).
- Sem segunda família tipográfica (exceção: AwardBadge).
- Sem roxo/azul gratuito; fora da paleta de serviço, o acento é o verde GaleON.

## Estado do conteúdo

Copy, preços, fotos, logos e o prêmio do footer são **draft/fictícios** — status slot a
slot e bloqueadores de publicação no `design.md` §8.
