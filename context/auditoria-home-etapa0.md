# Etapa 0 — Auditoria bidirecional da Home (achados)

> Executada em 2026-06-10 conforme `context/plano-handoff-design-md.md`. Toda alegação
> vivo/órfão abaixo foi verificada por grep/script direto (sem subagente). Método: cópia
> "viva" de `sections.jsx` (sem os blocos mortos) para que uso em código morto não conte
> como uso vivo. **Status: aguardando validação da Letícia (checkpoint) antes da 0d (M&G).**

## Achado estrutural nº 1 — ~450 linhas de JSX morto em sections.jsx

A `HomePage` (sections.jsx:1411–1424) renderiza só 9 blocos. Estão definidos mas **nunca
renderizados** (zero consumidores em todo o repo, verificado por grep nome a nome):

| Componente | Linhas (sections.jsx) | Arrasta consigo |
|---|---|---|
| `ServicosOverview` | 5–56 | — |
| `Servicos` (showcase) | 58–119 | único consumidor dos 5 cards abaixo |
| `ServiceCardBase` | 121–148 | único uso vivo de `--c-border-strong` |
| `HospitalidadeCard` | 150–193 | único `gl-btn--primary` "em página" |
| `DeliveryCard` | 195–234 | `gl-btn--dark` |
| `SalaVipCard` | 236–274 | únicos usos de `--c-sala-vip-tint(-border)` |
| `TransportesCard` | 276–314 | únicos usos de `--c-transportes-tint(-border)/-strong` |
| `CompactCard` | 316–342 | o que o preview `card-compact.html` documenta |
| `Jornada` | 1193–1278 | — |
| `FinalCTA` | 1280–1303 | `gl-btn--dark`/`--outline` |

Correção à matriz do plano: **`HeroCinema`/`HeroStatement` já não existem** em hero.jsx
(zero refs no repo; post-it do app.jsx confirma remoção) — o item SAI vira no-op.

## 0a — Inventário da Home (vira §6 do design.md)

Ordem real de render (`HomePage`, sections.jsx:1411–1424). Breakpoint real: `width <= 480`
(sections.jsx:1369), calculado **uma vez** no load (site.html:32, sem resize listener).

| # | Seção | Fonte | Componentes/classes | Tokens-chave | One-offs / observações |
|---|---|---|---|---|---|
| 1 | Header sticky glass | hero.jsx:131–193 | `ServicesDropdown` (305), `LanguageSelector` (230), logo `image-slot` | space-*, r-sm/md/pill, shadow-panel, dur-* | glass `rgba(255,255,255,.92)+blur(16px)`; hide-on-scroll `translateY(-110%)`; bandeiras via **flagcdn.com**; menu mobile não abre nada |
| 2 | Hero split + rotator | hero.jsx:368–521 + SERVICES 62–125 | `gl-hero-anim`, `gl-svc-top-chip(--bare)`, `gl-svc-progress`, `gl-btn--service --lg` | text-h1/subtitle, c-on-media, r-xl, surface-dark; componente: `--chip-c/--btn-bg/--btn-fg` | rotator 4500ms; crossfade 320ms; glass bar `rgba(20,20,18,.32)+blur(22px)` + sombra literal `0 10px 30px .22`; scrim **rgba cru** radial .25/.45; `calc(100dvh−97px)`, pad 120px, minH 560/620; pausa em drag; reduced-motion ✓ |
| 3 | Parceiros (marquee) | sections.jsx:462–507 | `gl-marquee-track` | space-48/56/80/88 | logos **simpleicons.org** (sem autorização confirmada); máscara 6%/94%; 38s desktop; **BUG styles.css:115 `animation-duration: 26px`** (inválido → mobile roda em 38s) |
| 4 | ProvaSocial "Sobre" | sections.jsx:914–1076 | `#sobre`, stats | num-stat(-mobile), text-h3, c-primary (estrela/+) | `aspectRatio 21/8` **e** `height:480px` hardcode conflitantes; scrim rgba cru .72/.55→0; stats fictícios |
| 5 | Hospitalidade feature | sections.jsx:778–912 | `#hospitalidade-feature`, `gl-eyebrow`, `gl-btn--ghost` | c-meet-greet(-foreground), c-primary (checks); componente: `--btn-fg/--btn-ghost-hover` | **radial decorativo `rgba(120,119,198,.3)`** — viola "no gradients as decoration" do README; hairline `rgba(255,255,255,.18)`; lista 7 includes |
| 6 | Experiencias | sections.jsx:509–776 | card grande + 2 `ExpFeatureCard` + 3 `ExpMiniCard`, `gl-btn--ghost` | bg-soft, text-h4, shadow-card-hover | hover via **inline handlers** `translateY(-2px)` + shadow-card-hover (NÃO usa `.gl-card`, que é −3px); `marginLeft:-16` óptico; scrims rgba cru |
| 7 | Vitrine | sections.jsx:344–451 | `#vitrine`, `gl-tabs/gl-tab`, `gl-hscroll`, `VitrineCard` | r-lg, text-*, c-delivery/sala-vip/transportes | tab ativa sobrescrita inline por cor de serviço (o verde-primário do DS nunca aparece); colunas 78%/300/380px; `VITRINE_DATA.title/cta/eyebrow` **órfãos** — título fixo "Mais pedidos" mesmo nas tabs Sala VIP/Transportes; preços fictícios |
| 8 | FAQ | sections.jsx:1078–1191 | `#faq`, accordion grid-rows | bg-soft, text-h5, dur-moderate | padding override `96/56/0`; sticky top 120; lorem ipsum ×6; comentário stale sobre "wave divider" (1186–1188) que não existe mais |
| 9 | Footer | sections.jsx:1305–1365 + award-badge.jsx | logo slot 208×52, `AwardBadge`, colunas de links | c-border, text-small/micro | **AwardBadge fora do DS**: Helvetica, `#ddd/#666/#bbb`, animação 5s infinita **sem** reduced-motion; links `href="#"`; `uploads/desenvolvido-pelo-strelo.webp` |

Transversais: `.galeao` (reset, ss01/ss02), `data-vp` 480 estático, `gl-is-dragging`,
React/Babel dev via unpkg (não portar), body do site.html com `#f0eee9` hardcoded (não-token,
só visível pré-React).

## 0b — Home → DS (gaps = ENTRA)

1. **AwardBadge** — padrão vivo sem nenhuma entrada no DS, e violando 3 regras (tipografia
   única, cores token, reduced-motion). Documentar no §6 + decidir manter/retirar/retemar.
2. **Scrims da Home em rgba cru** — `--c-scrim` existe e o M&G usa 24×; a Home usa 0×.
   Migrar Home pro token (etapa 2) ou documentar exceção.
3. **Dois padrões de hover-lift concorrentes** — `.gl-card` (−3px, dur-moderate) vs inline
   handlers (−2px + shadow-card-hover) usados pela página viva. Unificar ou documentar.
4. **Glass não documentado como padrão** — header claro (blur 16) vs hero escuro (blur 22):
   README só cita o header. Documentar os dois como one-offs intencionais no §3.
5. **Breakpoint triplo** — token `--bp-mobile: 720` · Home `<=480` estático · M&G `<820`
   com listener. O §5 do plano ("720px no destino") não bate com nenhuma página viva.
6. **flagcdn.com** — dependência externa do LanguageSelector não documentada (§8, mesmo
   bucket do simpleicons).
7. **Radial decorativo roxo** na Hospitalidade contradiz o §10 ("no gradients as decoration").
8. **gl-tabs**: estado ativo do DS (verde primário) nunca renderiza — Vitrine sempre
   sobrescreve por serviço. Atualizar contrato do componente.
9. Bug `26px` do marquee mobile (consertar p/ `26s` na etapa 1).
10. Dados órfãos `VITRINE_DATA.title/cta/eyebrow` + título que não segue a tab → §8.

## 0c — DS → Home (veracidade dos 25 previews + classes + tokens + README)

### Previews

| Veredito | Previews |
|---|---|
| ✓ Fiéis (linkam styles.css ou só tokens) | btn-primary, btn-dark-ghost, btn-service-tinted, type-family, type-scale, type-numerals, spacing-scale, radii, motion, elevation, colors-primary, colors-neutrals, colors-services, brand-wordmark, marquee, scrim (fiel ao M&G; Home não usa o token) |
| ⚠️ Drift no render | **tabs** (CSS embutido stale: ativa preta vs verde/serviço real), **eyebrow-tag** (tag com padding/fonte stale + padrão `gl-tag` sem uso vivo), **service-chip** (esquemático: `✦`, pill, cores stale — real é r-md com ícones), **colors-usage** (botões pill 46px stale), **spacing-section** (claim "content max-width 1280" — não existe na página), **card-vitrine** (esquemático, paddings divergem) |
| ❌ Órfãos | **card-compact** (componente morto), **brand-wave** (asset sem nenhum uso em página), metade tints de **colors-tints** (tokens só em código morto) |

7 previews carregam boilerplate `<style>` com o **botão pill 52px antigo** embutido
(card-vitrine, card-compact, marquee, eyebrow-tag, service-chip, scrim, tabs) — morto em 5,
**ativo e enganando o render** em tabs/eyebrow-tag.

### Classes (styles.css) sem uso vivo

| Classe | Situação | Proposta |
|---|---|---|
| `gl-divider` | zero uso no repo inteiro | SAI |
| `gl-section--tight` | zero uso (README cita a variante) | SAI |
| `gl-card` | zero na Home viva; M&G só em seletor CSS sem markup (confirmar na 0d) | decidir c/ item hover-lift |
| `gl-tag` | zero na Home viva; M&G idem | SAI ou volta ao markup |
| `gl-btn--primary/--dark/--outline/--destructive/--link/--xs/--sm/--icon-xs/sm/lg` | zero em páginas (previews exercitam) | **manter como matriz/contrato do componente** (explicitar no design.md §4) |

### Tokens

| Token | Situação | Proposta |
|---|---|---|
| `--font-serif-italic`, `--text-micro-lh` | mortos (confirma plano) | SAI |
| `--c-border-strong` | só em código morto; README cita | SAI (novo) |
| `--c-sala-vip-tint(-border)`, `--c-transportes-tint(-border)`, `--c-transportes-strong` | só código morto + preview colors-tints | SAI ou reserva explícita (novo) |
| `--bp-mobile` | zero uso (reserva documentada — confirma plano) | FICA, mas resolver decisão do breakpoint |
| Todos os demais 80+ tokens | uso vivo verificado (Home e/ou M&G) | FICA |

### Claims do README sem match no código vivo (além dos já listados no plano)

- "Source of truth: … `viagem.jsx`" — dormente; lista omite `colors_and_type.css` e mg-*.
- Layouts "1.35fr 1fr" — inexistente (vivos: 1.3fr/0.85fr, 1.05fr/1fr, 0.9fr/1.3fr).
- "Internal card padding … 22px" — valor fora do grid 4px; vivos: 20/24/28/32.
- Aspect-ratios "4/5, 16/7" — inexistentes na Home (vivos: 4/3, 21/8+480px, 1/1).
- "Marquee 26s mobile" — o código tem `26px` (bug); intenção certa, código errado.
- Variante "tight" de seção — classe morta.
- Ícones "stroke 1.6" — utilitários arrow/chevron/menu usam 1.8.
- "No gradients as decoration" — violado pela seção Hospitalidade.
- (já no plano: pill 52px, no-drop-shadows, scrim rgba .55, motion cru, sem grid 4px,
  serif-itálico, índice ui_kits.)

### Assets

- `assets/wave-gig.png` — **zero referências** no repo (nem preview). Órfão de assets/.
- `assets/footer-riogaleao.png` — só README + preview brand-wave; nenhuma página usa.
- `uploads/footer-riogaleao.png` — duplicata sem referência.

## Decisões pendentes pro checkpoint (Letícia)

1. Apagar as ~450 linhas mortas de sections.jsx na etapa 1? (recomendo sim)
2. Matriz completa do botão fica como contrato mesmo sem uso em página? (recomendo sim)
3. Tints + `--c-border-strong`: SAI ou reserva intencional? (recomendo SAI; recriáveis)
4. `gl-card`/`gl-tag`/`gl-divider`/`gl-section--tight`: SAI? E o hover-lift vivo: adotar
   `.gl-card` no markup ou tokenizar o padrão inline? (recomendo SAI + unificar via .gl-card)
5. Scrims da Home → migrar pra `--c-scrim` (recomendo) ou exceção documentada?
6. Breakpoint canônico do handoff: 720 (token/DS) vs 480/820 vivos. (recomendo declarar 720
   no design.md §5 e registrar a divergência como quirk; harmonizar páginas é escopo extra)
7. Previews em drift (tabs, eyebrow-tag, service-chip, colors-usage): refazer consumindo
   styles.css real (como os btn-*) ou remover? (recomendo refazer tabs/service-chip; remover
   a metade gl-tag do eyebrow-tag se a classe sair)
8. AwardBadge: mantém como exceção documentada, retema ou sai?
9. Radial decorativo da Hospitalidade: remover do código ou abrir exceção no §10?
10. brand-wave tile: SAI, ou a wave entra de verdade no Footer?
