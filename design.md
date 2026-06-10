# GaleON Design System — Documentação

> Fonte de verdade dos valores: `colors_and_type.css` (tokens) e `styles.css`
> (componentes `.gl-*`). Este documento resolve os valores inline para leitura
> autossuficiente — cada valor cita o token de origem; divergência entre doc e CSS
> é bug do doc. Protótipos vivos: `site.html` (Home) e `meet-greet.html` (M&G).

## 1. Visual Theme & Atmosphere

O GaleON opera sobre superfícies claras e neutras-mornas (branco puro como página,
off-white `#F7F7F4` para alternar seções) com o **verde GaleON** (`#9ACA3C`) como acento
singular da marca. O tom é **editorial, calmo, oficial** — mais publicação institucional
de viagem do que app de delivery: a fotografia é o elemento decorativo dominante, a
informação assenta sobre muito respiro e a cor aparece com propósito.

A cor obedece a uma regra estrutural: **a cor segue o serviço**. Cada uma das 7 ofertas
(Meet & Greet, Delivery, Sala VIP, Transportes, Guarda-volume, Câmbio, Personal Shopper)
tem sua cor própria com foreground pareado — CTA, tag, bullet e acento usam o token da
categoria, nunca cor por estética. O verde da marca fica reservado a ações primárias e
micro-acentos (estrela de nota, sinal de "+", checks).

A tipografia é **uma família só** — Plus Jakarta Sans, 400→800 — com papéis definidos
por escala e peso, não por troca de fonte: display com tracking apertado e line-height
curto; corpo com leitura confortável. Números (preços, estatísticas) têm papel próprio,
com `tabular-nums` e tracking fechado.

Texto sobre fotografia ou vídeo nunca confia na imagem: senta sempre num **scrim** —
gradiente do quase-preto morno `#15110D` aplicado com alpha via `color-mix`. Nunca preto
puro, nunca gradiente como decoração.

**Características-chave:**
- Página branca (`--c-background`), seções alternam com off-white morno (`--c-background-soft`)
- Verde GaleON `#9ACA3C` como acento; 7 cores de serviço com foreground pareado
- Uma família tipográfica (Plus Jakarta Sans); escala de 9 degraus, todos pares
- Grid de espaçamento de 4px (`--space-N`, nome do token = valor em px)
- 5 sombras nomeadas **por papel** (não formam escala numérica)
- Radii de 8 a 32px + pílula; cards em 22, hero/showcase em 32
- Scrim warm-black via `color-mix`; texto sobre mídia usa a constante `--c-on-media`
- Motion: 4 durações + 1 easing para interação; animações ambiente com timing próprio
- `prefers-reduced-motion` é contrato em tudo que anima

---

## 2. Color Palette & Roles

### Superfícies
| Token | Hex | Uso |
|---|---|---|
| `--c-background` | `#FFFFFF` | Fundo de página |
| `--c-background-soft` | `#F7F7F4` | Seção alternada, painel suave, hover de ghost |
| `--c-surface-dark` | `#1A1A1A` | Faixa/seção escura (banda "Grupos e empresas") |
| `--c-card` | `#FFFFFF` | Card claro |
| `--c-card-dark` | `#2B2B2B` | Card escuro / cinematográfico |
| `--c-border` | `#E7E6E1` | Hairline universal (borda de card, divisores) |

### Foregrounds (texto pareado por superfície)
| Token | Hex | Senta sobre |
|---|---|---|
| `--c-foreground` | `#0E0F0E` | background / background-soft |
| `--c-muted-foreground` | `#6B6B68` | Texto secundário, legendas, descrições |
| `--c-surface-dark-foreground` | `#FFFFFF` | surface-dark |
| `--c-card-foreground` | `#0E0F0E` | card |
| `--c-card-dark-foreground` | `#FFFFFF` | card-dark |

**Regra:** texto usa sempre o foreground da superfície onde está — nunca um cinza avulso,
nunca `#000`.

### Mídia & Scrim
| Token | Hex | Uso |
|---|---|---|
| `--c-on-media` | `#FFFFFF` | Texto/ícone sobre fotografia ou scrim. **Constante de legibilidade** — não muda em re-temas. Use em vez de `#fff` cru |
| `--c-scrim` | `#15110D` | Base quase-preta **morna** dos scrims. Sempre com alpha via `color-mix(in srgb, var(--c-scrim) N%, transparent)`; a intensidade varia por contexto, a cor não |

Sobre mídia, texto de apoio usa branco translúcido (`rgba(255,255,255,.7–.92)` conforme
hierarquia); títulos usam `--c-on-media` cheio.

### Brand
| Token | Hex | Uso |
|---|---|---|
| `--c-primary` | `#9ACA3C` | Verde GaleON — CTA primário, estrela de nota, "+" de stats, checks |
| `--c-primary-foreground` | `#1F2A0C` | Texto sobre o verde (ink) |

### Paleta de serviços (1 cor por oferta + foreground)
| Serviço | Token | Hex | Foreground |
|---|---|---|---|
| Meet & Greet | `--c-meet-greet` | `#2B2B2B` | `#FFFFFF` |
| Delivery | `--c-delivery` | `#ED1C24` | `#FFFFFF` |
| Sala VIP | `--c-sala-vip` | `#822A85` | `#FFFFFF` |
| Transportes | `--c-transportes` | `#E5A91D` | `#0E0F0E` (dourado → texto escuro) |
| Guarda-volume | `--c-guarda` | `#F58220` | `#FFFFFF` |
| Câmbio | `--c-cambio` | `#009B90` | `#FFFFFF` |
| Personal Shopper | `--c-personal` | `#ED0080` | `#FFFFFF` |

Tints de superfície por serviço (8%) são gerados no call-site:
`color-mix(in srgb, <cor do serviço> 8%, transparent)` — usado nos ícones do dropdown
de navegação.

### Estados
| Token | Valor | Uso |
|---|---|---|
| `--c-ring` | `var(--c-primary)` | Focus ring (renderizado a 50% de alpha) |
| `--c-destructive` | `#DC2626` | Ação destrutiva |
| `--c-destructive-foreground` | `#FFFFFF` | Texto sobre destructive |

### Aliases do Meet & Greet (`mg-styles.css`)
| Alias | Aponta para | Papel |
|---|---|---|
| `--c-mg` | `--c-meet-greet` | Acento grafite do serviço |
| `--c-mg-ink` | `--c-meet-greet-foreground` | Texto sobre o grafite |
| `--c-mg-soft` | `--c-background-soft` | Superfície soft local |
| `--c-mg-surface` | `--c-surface-dark` | Banda escura |
| `--c-ink` | `--c-surface-dark` | Fundos cinematográficos |

**Re-tema local:** para um card escuro em página clara, redefina
`--c-foreground`/`--c-muted-foreground` no escopo do card (ver `.mg-emp-card`) — o
markup interno não muda. Esta é a técnica oficial de "dark mode" pontual.

---

## 3. Typography

### Família
| Token | Família | Papel |
|---|---|---|
| `--font-body` | **Plus Jakarta Sans** (400/500/600/700/800, Google Fonts) | Tudo — display, headings, corpo, labels, numerais |

Não existe segunda família. (Única exceção viva, consciente e isolada: o AwardBadge do
footer preserva a tipografia do selo original.)

Feature settings sempre ativas: `"ss01", "ss02"`; `font-variant-numeric: tabular-nums`
em qualquer número de destaque.

### Escala — 9 degraus, todos pares
| Token | Desktop → Mobile | Line-height | Tracking | Papel |
|---|---|---|---|---|
| `--text-h1` | 80 → 44px | 1.0 | −0.045em | Herói de página |
| `--text-h2` | 56 → 36px | 1.0 | −0.04em | Título de seção |
| `--text-h3` | 44 → 30px | 1.05 | −0.03em | Subhead / título de experiência |
| `--text-h4` | 32 → 26px | 1.1 | −0.025em | Título de card |
| `--text-h5` | 24 → 20px | 1.2 | −0.015em | Bloco menor / pergunta de FAQ |
| `--text-subtitle` | 20 → 18px | 1.45 | −0.01em | Parágrafo de abertura / subtítulo de herói |
| `--text-body` | 16px | 1.5 | −0.005em | Texto corrido |
| `--text-small` | 14px | 1.4 | 0 | Legenda / label secundário |
| `--text-micro` | 12px | — | 0 (eyebrow: +0.06em) | Eyebrow / kicker / meta |

Mobile aplica em ≤720px (helpers `.ds-*`) ou sob `[data-vp="mobile"]` nas páginas.
Pesos: títulos 600; labels/eyebrows 600; corpo 400–500.

### Numerais (papel próprio)
| Token | Valor | Uso |
|---|---|---|
| `--num-stat` | 44px (mobile 32px) | Número grande de prova social |
| `--num-price` | 24px | Preço em destaque |
| `--num-price-sm` | 18px | Preço inline / compacto |

Helper `.ds-num`: peso 600, `tabular-nums`, tracking −0.045em, line-height 0.92.

### Helpers semânticos (`.ds-*` em colors_and_type.css)
`.ds-h1`…`.ds-h5`, `.ds-subtitle`, `.ds-body`, `.ds-small`, `.ds-eyebrow`, `.ds-num` —
carregam família, peso, tamanho, lh e tracking do degrau; trocam pro tamanho mobile em
≤720px.

### Princípios
- **Display é apertado**: tracking negativo forte e line-height ~1.0 acima de 40px;
  `text-wrap: balance` em headlines, `text-wrap: pretty` em parágrafos.
- **Mesmo nível hierárquico = mesmo token** — Home e M&G compartilham a escala.
- **Todos os tamanhos são pares** — nada de 15px, 22px etc.
- **Eyebrow** é a variante uppercase do micro: peso 600, tracking `+0.06em`
  (`--text-eyebrow-tracking`), precedido de régua de 22×1px em `currentColor`.

---

## 4. Spacing

Grid de **4px**. O nome do token é o valor em px (`--space-24` = 24px) — mapeia 1:1
com Tailwind (índice = px ÷ 4). Só os degraus usados pelas páginas são emitidos.

| Token | Valor | Uso típico |
|---|---|---|
| `--space-4` | 4px | Gap mínimo, padding de container de chips |
| `--space-8` | 8px | Gap ícone+texto, gaps inline |
| `--space-12` | 12px | Gap de lista densa, padding compacto |
| `--space-16` | 16px | Gap padrão entre elementos, padding de card pequeno |
| `--space-20` / `--space-24` | 20 / 24px | Padding interno de card (mobile) |
| `--space-28` / `--space-32` | 28 / 32px | Padding interno de card (desktop) |
| `--space-36` → `--space-56` | 36–56px | Margens de bloco, paddings de seção tight |
| `--space-64` | 64px | Padding vertical de seção (mobile) |
| `--space-80` / `--space-88` | 80 / 88px | Separações grandes, gaps de marquee |
| `--space-96` | 96px | Padding vertical de seção (desktop) |
| `--space-104` | 104px | Zonas do M&G |

### Ritmo de seção (aliases)
| Token | Valor | |
|---|---|---|
| `--section-pad-y` × `--section-pad-x` | **96 × 56px** | Desktop (classe `.gl-section`) |
| `--section-pad-y-mobile` × `--section-pad-x-mobile` | **64 × 20px** | Mobile |

---

## 5. Radius

| Token | Valor | Uso |
|---|---|---|
| `--r-sm` | 8px | Itens de menu, ícones quadrados pequenos |
| `--r-md` | 14px | Painéis flutuantes, barra glass de chips |
| `--r-lg` | 22px | **Default de card e botão** (desvio de marca vs. shadcn rounded-md) |
| `--r-xl` | 32px | Hero, showcase, cards grandes |
| `--r-pill` | 999px | Pílulas: tabs, seletor de idioma, dots de galeria |

`999px` é o idioma CSS padrão para pílula (mesma técnica do `rounded-full`/9999px do
Tailwind): o navegador limita o raio à metade da menor dimensão, então o valor "grande
demais" produz pílula perfeita em qualquer largura — `50%` não serve, pois deformaria
cantos de elementos retangulares em elipses.

Bordas: a única espessura do sistema é o **hairline de 1px** em `--c-border`.
Não há escala de border-width.

---

## 6. Elevation & Shadows

Cinco sombras nomeadas **pelo papel**, não por nível — não formam escala progressiva.

| Token | CSS | Papel |
|---|---|---|
| `--shadow-card` | `0 16px 44px rgba(20,17,13,0.06)` | Card em repouso |
| `--shadow-card-hover` | `0 22px 50px rgba(20,17,13,0.10)` | Card no hover (par do lift de −2px) |
| `--shadow-panel` | `0 12px 40px rgba(0,0,0,0.10), 0 0 0 1px var(--c-border)` | Painel flutuante (dropdowns) |
| `--shadow-pop` | `0 18px 48px -18px rgba(20,17,13,0.18)` | Lift de mídia / popover |
| `--shadow-dark` | `0 16px 44px rgba(0,0,0,0.35)` | Card sobre superfície escura |

Note o tom **morno** das sombras de superfície clara (`rgba(20,17,13,…)`) — coerente com
a paleta neutra-morna.

**One-offs literais intencionais** (não tokenizar, não reutilizar fora do contexto):
controles glass sobre o hero (`0 10px 30px rgba(0,0,0,0.22)` + chip `0 8px 24px .18`),
dot da galeria do M&G (`0 1px 3px .25`), hairline inset das bandeiras.

---

## 7. Motion

### Tokens de interação
| Token | Valor | Uso |
|---|---|---|
| `--ease-out` | `cubic-bezier(.2, .7, .3, 1)` | Easing assinatura — cards, reveals, hovers |
| `--dur-fast` | 150ms | Hover de botão/link, troca de cor |
| `--dur-base` | 200ms | Transição padrão (lift de card, fades de painel) |
| `--dur-moderate` | 350ms | Acordeão, rotação de ícone, header esconde/mostra |
| `--dur-slow` | 800ms | Zoom de imagem, scroll-reveal |

### Animações ambiente (timing próprio — fora da escala)
| Animação | Timing | Onde |
|---|---|---|
| Rotator do hero + barra de progresso | **4500ms** linear | Home, chips de serviço |
| Crossfade de conteúdo (`gl-fadein`) | 320ms ease | Troca de serviço no hero |
| Marquee (`gl-marquee`) | 38s desktop / 26s mobile, linear infinite | Parceiros (Home), escudos (M&G) |
| Ken Burns (`mg-kenburns`) | 26–30s ease-in-out alternate | Heros e cartões cinematográficos do M&G |
| Scroll-reveal (`.mg-reveal`) | `--dur-slow` + `--ease-out`, rise de 28px | Blocos do M&G |

### Contratos
- **`prefers-reduced-motion: reduce` desliga tudo**: rotator parado, progress em 0,
  kenburns/crossfade/reveal off — e **nada pode ficar invisível** (o reveal nasce
  visível). Vídeo de fundo também deve pausar (pendência conhecida do protótipo).
- Hover de card é um padrão único: `.gl-card` → lift −2px + `--shadow-card-hover`.

---

## 8. Responsive Behavior

| Token | Valor | Estratégia |
|---|---|---|
| `--bp-mobile` | **720px** | Fronteira mobile canônica |

- Os helpers `.ds-*` e o catálogo trocam por media query em 720px.
- As páginas do protótipo aplicam `[data-vp="mobile"]` via JS — **em implementação
  nova, use media query em 720px**, não JS. (Quirk do protótipo: Home avalia 480px uma
  vez no load; M&G usa 820px com listener — reproduzir a intenção, não o quirk.)
- No mobile: escala tipográfica troca para a coluna mobile, `.gl-section` cai para
  64×20, grids colapsam para coluna única, faixas horizontais ganham scroll + snap.
- Corpo de texto não escala (16/14/12 em qualquer viewport).

---

## 9. Componentes

### 9.1 Button — `.gl-btn`

Modelo [shadcn/ui](https://ui.shadcn.com/docs/components/button): eixo **variante** ×
eixo **tamanho**. Radius `--r-lg` (22px) em todos. Fonte: `--text-small` (14px) peso 600.

**Variantes**
| Classe | Fundo / Texto | Uso |
|---|---|---|
| `--primary` | `--c-primary` / `--c-primary-foreground` | Ação principal da marca. Uma por região |
| `--destructive` | `--c-destructive` / branco | Ações destrutivas (reserva do contrato) |
| `--service` | `--btn-bg` / `--btn-fg` (passados no call-site) | **CTA temática por serviço** — o call-site injeta a cor da oferta |
| `--dark` | `--c-foreground` / branco | Alternativa neutra de alto contraste |
| `--secondary` | `--c-card` + hairline / `--c-card-foreground` | Botão claro sobre superfícies escuras |
| `--outline` | transparente + borda `--c-foreground` | Secundária com borda; hover inverte (fundo escuro) |
| `--ghost` | transparente / `--btn-fg` ou `--c-foreground` | Terciária; hover `--btn-ghost-hover` ou `--c-background-soft` |
| `--link` | transparente / `--c-primary` | Navegação inline; sublinha no hover |

**Tamanhos**
| Classe | Altura | Padding | Uso |
|---|---|---|---|
| `--xs` | 28px | 0 8px | Compacto extremo (fonte cai p/ `--text-micro`) |
| `--sm` | 32px | 0 12px | Espaços densos |
| *(default)* | **36px** | 0 16px | Uso geral |
| `--lg` | 40px | 0 24px | CTA de destaque (hero) |
| `--icon` / `--icon-xs` / `--icon-sm` / `--icon-lg` | 36/28/32/40px quadrado | Só ícone |

**Estados**
- Hover: lift −1px + o fundo desloca via `color-mix` do próprio token (88–94% com
  `#000` nas variantes claras-sobre-escuro e coloridas; a `--dark` clareia com 86% +
  `#fff`) — nunca hex de hover hardcoded.
- Focus: `box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-ring) 50%, transparent)`.
- Disabled: opacidade 0.5, sem eventos.
- Seta interna (`.gl-arrow`): desliza +3px no hover do botão.

**Tokens de componente** (definidos no call-site, nunca no `:root`):
`--btn-bg`, `--btn-fg` (variante service), `--btn-ghost-hover` (ghost em superfície escura).

**Boas práticas**: um `--primary`/`--service` por região; `--ghost`/`--link` para o resto;
a matriz completa é o contrato — não inventar botão novo fora dela.

### 9.2 Tabs — `.gl-tabs` / `.gl-tab`

```
┌──────────────────────────────────────┐
│ ( Delivery ) ( Sala VIP ) ( Transp.) │  ← container pílula, bg-soft + hairline
└──────────────────────────────────────┘
```
- Container: pílula, `--c-background-soft`, hairline, padding `--space-4`, gap 2px.
- Tab: 38px de altura, pílula, `--text-small` peso 500, `--c-muted-foreground`.
- Ativa (`data-active="true"`): fundo `--c-primary` + `--c-primary-foreground`;
  em contexto de serviço (Vitrine), o call-site sobrescreve com a cor da categoria.

### 9.3 Eyebrow — `.gl-eyebrow`

Abertura de toda seção: `──  LABEL`
- `--text-micro`, peso 600, uppercase, tracking `--text-eyebrow-tracking` (+0.06em).
- Régua de **22×1px** em `currentColor` antes do texto (gap `--space-8`).
- Cor por contexto via `color`: padrão `--c-muted-foreground`; cor do serviço em
  zonas temáticas; branco translúcido sobre mídia.

### 9.4 Card hover — `.gl-card`

Contrato único de hover de card: transição `--dur-base`, hover = `translateY(-2px)` +
`--shadow-card-hover`. Aplica-se a qualquer card clicável/destacável (cards de
Experiências da Home). Repouso: cards claros levam hairline `--c-border`; sombra de
repouso (`--shadow-card`) só em cards flutuantes (M&G família).

### 9.5 Service chip — `.gl-svc-top-chip` (+ `--bare`, `.gl-svc-progress`)

Chips do rotator do hero, dentro de uma barra glass escura:

```
┌─[ glass bar · rgba(20,20,18,.32) + blur 22px · r-md ]─────────┐
│  ⚷ Meet & Greet   ⚿ Delivery   ⚿ Sala VIP   …                │
│  ▔▔▔▔▔▔▔ ← progress 2px, --chip-c, 4500ms                     │
└────────────────────────────────────────────────────────────────┘
```
- Chip: `--text-small` 500, texto branco translúcido; ativo = fundo branco a 14–18%,
  peso 700, `--c-on-media`.
- `--bare`: variante sem fundo próprio (vive dentro da barra glass).
- `.gl-svc-progress`: barra de 2px no pé do chip ativo; preenche `scaleX 0→1` em
  **4500ms** linear (token de componente `--chip-c` define a cor); ao completar, o
  rotator avança. Reduced-motion: barra fica em 0 e o rotator não roda.

### 9.6 Marquee — `.gl-marquee-track`

Esteira infinita: lista **duplicada** + `translateX(−50%)` em loop linear
(38s desktop / 26s mobile). O call-site aplica máscara de fade nas bordas
(`mask-image: linear-gradient(90deg, transparent, #000 …, transparent)` — 6% de cada
lado na Home, 8% no M&G).
Variante M&G (escudos): grayscale por padrão, cor no hover, esteira pausa no hover.

### 9.7 Carrossel horizontal — `.gl-hscroll`

Faixa com `overflow-x: auto`, scrollbar oculta, `scroll-snap-type: x mandatory` no
call-site; cards com `scroll-snap-align: start`. Usado na Vitrine da Home.

### 9.8 Crossfade — `.gl-hero-anim`

`@keyframes gl-fadein` 320ms ease, keyframe-driven: dispara por **remontagem** do nó
(no React, `key` novo) — qualquer mecanismo equivalente serve, desde que a animação
re-rode a cada troca de conteúdo.

### 9.9 Moldura de seção — `.gl-section`

Padding `--section-pad-y` × `--section-pad-x` (96×56 desktop; 64×20 mobile via
`[data-vp="mobile"]`). Toda seção de página parte dela.

### Padrões de página (não são átomos — referência viva nas páginas)

| Padrão | Onde ver | Essência |
|---|---|---|
| Topbar glass | `hero.jsx Header` / `mg-hero.jsx MGHeader` | Sticky, branco a 92% + blur 16px; esconde ao rolar p/ baixo (−110%, `--dur-moderate`) |
| Hero inset cinematográfico | `hero.jsx HeroSplit` / `mg-hero.jsx MGHero` | Cartão `--r-xl` em viewport cheia, foto/vídeo + scrim + copy central |
| Scrim de legibilidade | ProvaSocial, heros, M&G | Gradiente de `--c-scrim` (0 até ~78% conforme contexto) sob a copy |
| Stats de prova social | `sections.jsx ProvaSocial` / `mg-trust.jsx` | 3 colunas, `--num-stat`, estrela/"+" no acento, descrição muted |
| Acordeão FAQ | `sections.jsx FAQ` / `mg-trust.jsx` | Pergunta `--text-h5`, disco 34px com "+" girando 45°, corpo via `grid-template-rows 0fr→1fr` |
| Card split família (M&G) | `mg-services.jsx` + `.mg-fam__*` | Card branco flutuando sobre painel de foto (`--shadow-card` / `--shadow-pop`), zigzag |
| Card dark empresas (M&G) | `mg-carousel.jsx` + `.mg-emp-card` | Re-tema local de variáveis, mídia 5/3 com zoom no hover, `--shadow-dark` |

---

## 10. Do's and Don'ts

### Do
- Use o **foreground pareado** da superfície (`--c-foreground` sobre claro,
  `--c-card-dark-foreground` sobre card escuro…) — nunca `#000`/cinza avulso.
- Use `--c-on-media` para texto sobre foto/vídeo — nunca `#fff` hardcoded.
- Todo texto sobre mídia senta num **scrim de `--c-scrim` via `color-mix`**.
- A cor **segue o serviço**: CTA/tag/bullet usam o token da categoria.
- Fique no **grid de 4px** — se o valor não existe na escala, repense o layout.
- Sombras **só pelos 5 tokens de papel** (+ one-offs documentados no §6).
- `tabular-nums` em qualquer número de destaque (use `.ds-num`).
- Hover de fundo via `color-mix` do próprio token — nunca hex de hover novo.
- Focus visível em todo interativo (ring do `.gl-btn` é a referência).
- `text-wrap: balance` em headlines; `text-wrap: pretty` em parágrafos.

### Don't
- Não use gradiente como decoração — gradiente existe **só** como scrim sobre mídia.
- Não use preto puro em scrims ou texto — a base é morna (`#15110D` / `#0E0F0E`).
- Não introduza segunda família tipográfica (exceção isolada: AwardBadge).
- Não use emoji nem ícone multicolorido — iconografia é linha 24×24, stroke 1.6,
  `currentColor`.
- Não misture cores de serviço por estética, nem use o verde como cor de apoio em
  área grande — é cor de ação/acento.
- Não crie variação de botão fora da matriz variante × tamanho.
- Não use tamanhos tipográficos ímpares nem degraus fora da escala.
- Não implemente a fronteira mobile com JS — media query em 720px.

---

## 11. Agent Prompt Guide

### Referência rápida de cores
```
Página:            #FFFFFF  (--c-background)
Seção alternada:   #F7F7F4  (--c-background-soft)
Banda escura:      #1A1A1A  (--c-surface-dark)
Card escuro:       #2B2B2B  (--c-card-dark)
Texto:             #0E0F0E  (--c-foreground)
Texto secundário:  #6B6B68  (--c-muted-foreground)
Hairline:          #E7E6E1  (--c-border)
Verde GaleON:      #9ACA3C  (--c-primary) · ink #1F2A0C
Scrim (base):      #15110D  (--c-scrim, sempre via color-mix)
Sobre mídia:       #FFFFFF  (--c-on-media)
Serviços:          M&G #2B2B2B · Delivery #ED1C24 · Sala VIP #822A85 ·
                   Transportes #E5A91D (texto escuro!) · Guarda #F58220 ·
                   Câmbio #009B90 · Personal #ED0080
```

### Sombras prontas
```css
/* --shadow-card (repouso) */    box-shadow: 0 16px 44px rgba(20,17,13,0.06);
/* --shadow-card-hover */        box-shadow: 0 22px 50px rgba(20,17,13,0.10);
/* --shadow-panel (dropdown) */  box-shadow: 0 12px 40px rgba(0,0,0,0.10), 0 0 0 1px #E7E6E1;
/* --shadow-pop (mídia) */       box-shadow: 0 18px 48px -18px rgba(20,17,13,0.18);
/* --shadow-dark */              box-shadow: 0 16px 44px rgba(0,0,0,0.35);
```

### Prompts de componente
- **Card padrão**: "Fundo #FFFFFF, radius 22px (`--r-lg`), borda 1px #E7E6E1, padding
  28–32px desktop / 20–24px mobile. Título Plus Jakarta 600 32px tracking −0.025em;
  descrição 16px lh 1.5 #6B6B68. Hover: −2px + sombra `0 22px 50px rgba(20,17,13,.10)`,
  200ms."
- **Botão de serviço**: "Altura 40px (`--lg`), radius 22px, padding 0 24px, Plus Jakarta
  600 14px. Fundo = cor do serviço, texto = foreground do serviço (Transportes usa
  #0E0F0E). Hover: −1px + fundo `color-mix(in srgb, <cor> 88%, #000)`. Seta de 14px que
  desliza 3px no hover."
- **Abertura de seção**: "Eyebrow: 12px uppercase 600 tracking +0.06em #6B6B68 com régua
  22×1px antes; 16px abaixo, H2 Plus Jakarta 600 56px lh 1.0 tracking −0.04em
  text-wrap balance; seção com padding 96px 56px."
- **Hero cinematográfico**: "Cartão radius 32px ocupando a viewport, foto full-bleed,
  scrim `linear-gradient` de color-mix(#15110D 55%→0%) sob a copy, headline 80px lh 1.0
  tracking −0.045em em #FFFFFF, subtítulo 20px rgba(255,255,255,.86)."
- **Stat de prova social**: "Número 44px 600 tabular-nums tracking −0.045em lh 0.92;
  '+' ou estrela em #9ACA3C posicionados à esquerda; descrição 16px #6B6B68 embaixo,
  centrado."
- **FAQ accordion**: "Itens separados por hairline #E7E6E1; pergunta 24px 500; disco
  34px com '+' (borda hairline; aberto: fundo #0E0F0E, ícone branco, rotação 45°,
  350ms); corpo 16px #6B6B68 abre via grid-template-rows 0fr→1fr."

### Guia de iteração
1. Página branca; alterne seções com `#F7F7F4` — nunca cinza frio.
2. Fotografia primeiro: cada bloco importante tem foto + scrim; o sistema nunca desenha
   pessoas em SVG.
3. Verde só em ação e micro-acentos; cor de categoria vem da paleta de serviços.
4. Radius 22 em card/botão, 32 em hero; hairline #E7E6E1 em vez de sombra sempre que der.
5. Tipografia: aperte tracking e line-height conforme o tamanho sobe; nunca segunda família.
6. Movimento discreto: 150–350ms nas interações; ambiente lento (rotator 4.5s, marquee
   38s, kenburns 26s+); respeite reduced-motion sempre.

---

## Apêndice — Handoff do protótipo

### A1. Mapa do código
**Portar/reproduzir**: `colors_and_type.css`, `styles.css`, `mg-styles.css`; estrutura
e comportamento de `site.html`+`hero.jsx`+`sections.jsx`+`award-badge.jsx` e
`meet-greet.html`+`mg-*.jsx`. **Consultar**: `design-system.html`+`preview/`,
`mg-data.jsx` (conteúdo), `README.md`, `context/`. **Não portar**: `index.html`,
`app.jsx`, `design-canvas.jsx`, `tweaks-panel.jsx`, `image-slot.js`, `*.state.json`,
`SKILL.md`, scripts unpkg, metas de tooling do meet-greet.html.
**Dormentes**: `viagem.jsx`, `journey-animated.jsx`, `mg-rail.jsx`.

### A2. Status do conteúdo — bloqueadores de publicação
| Item | Status |
|---|---|
| Copy, preços (`mg-data.jsx`, Vitrine) e stats | **Fictícios** — sem aviso visual no protótipo |
| FAQ Home | Lorem ipsum |
| FAQ M&G | Real (adaptado RIOgaleão) — validar tel. +55 21 99793-4907 e cerimonial@riogaleao.com |
| Fotos (todos os `<image-slot>`) | Vazios; estado do workbench não exportável — encomendar |
| Logos parceiros (simpleicons) e escudos de times (espncdn/cbf) | **Sem autorização confirmada — bloqueador** |
| Bandeiras (flagcdn), vídeo `assets/mg-hero.mp4` | Dependência externa / direitos a confirmar |
| AwardBadge "Travel Commerce 2024" | Prêmio aparentemente fictício |
| Dados órfãos: `occasion` (mg-data), `VITRINE_DATA.title/cta/eyebrow` | Decidir: ligar ao layout ou remover |
| Menu mobile sem drawer; idioma não traduz; links `href="#"` | Implementar no destino |
| Naming: "Hospitalidade" (footer M&G) vs "Meet & Greet" (Home) | Unificar |

### A3. Checklist de aceitação
- [ ] Fidelidade lado a lado com `site.html` e `meet-greet.html` (desktop + mobile)
- [ ] Mobile via media query **720px**, sem JS de viewport
- [ ] `prefers-reduced-motion`: nada anima (incl. vídeo), nada fica invisível
- [ ] Focus visível em todo interativo
- [ ] Zero hardcode onde existe token (exceto one-offs do §6)
- [ ] Scrim sob toda copy sobre mídia
- [ ] Sem unpkg/CDNs de terceiros em produção · console limpo
- [ ] Bloqueadores do A2 resolvidos antes de publicar
