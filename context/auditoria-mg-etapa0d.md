# Etapa 0d — Auditoria bidirecional do Meet & Greet (achados)

> Executada em 2026-06-10, mesmo método da Home (`context/auditoria-home-etapa0.md`):
> greps próprios, sem subagente. Decisões do checkpoint da Home (10 itens) aprovadas pela
> Letícia e aplicadas por extensão aqui.

## Inventário (vira §7 do design.md)

Ordem real de render (`mg-app.jsx:54-70`). Breakpoint: `window.innerWidth < 820` **com**
resize listener (mg-app.jsx:11-16). Página rola de verdade (sem canvas); `html` tem
`scroll-behavior: smooth`.

| # | Seção | Fonte | Observações |
|---|---|---|---|
| 1 | MGHeader (glass sticky) | mg-hero.jsx:134–186 | mesmo padrão da Home; classe `mg-home-topbar` é só hook de JS (sem regra CSS); dropdown via `MG_NAV`; idiomas via flagcdn + fallback `__resources`; menu mobile inerte |
| 2 | MGHero (card inset cinematográfico) | mg-hero.jsx:189–229 | poster image-slot + kenburns 26s + **vídeo `assets/mg-hero.mp4`** por cima; scrim inline `--c-scrim` color-mix ✓; `calc(100dvh−100px)`; kenburns respeita reduced-motion, **o vídeo não** (autoplay loop sempre) |
| 3 | Zona "Para você e sua família" | mg-services.jsx:205–243 + mg-data | stack vertical zigzag; variante aprovada `overlap` (outras 3 via TweaksPanel = tooling); `mg-fam__card` (shadow-card) sobre `mg-fam__media` (shadow-pop); galeria com dots — **comentário "auto-advancing" é stale: não há timer, só clique**; equalização de altura via JS; preço "A partir de" menor tier (`ds-num`/`--num-price`); CTA `gl-btn--service` com `--c-mg` |
| 4 | Zona "Grupos e empresas" | mg-carousel.jsx | **nome "Carousel" é stale — virou grid fixo 3 col**; banda escura `.mg-emp` (`--c-mg-surface`); cards dark `.mg-emp-card` com **re-tema local** (redefine `--c-foreground`/`--c-muted-foreground` no escopo do card — padrão de sistema a documentar no §3); hover zoom ✓ vivo; CTA `gl-btn--secondary` |
| 5 | Delegações Esportivas | mg-delegacoes.jsx | card hero 72vh + kenburns 30s; scrim 2 gradientes `--c-scrim`; marquee de escudos reusa `.gl-marquee-track` (grayscale→cor no hover, pausa no hover); **logos via espncdn.com + cbf.svg — autorização de marcas esportivas não confirmada (§8 blocker)**; wrapper `mg-reveal` estável (comentário explica) |
| 6 | MGTrust + FAQ | mg-trust.jsx | credencial 21/8 (4/5 mobile) + scrim token ✓; stats com **estrela/+ em `--c-mg` (grafite) — Home usa `--c-primary` (verde): divergência intencional? documentar**; FAQ com **conteúdo real** (telefone +55 21 99793-4907, e-mail cerimonial@riogaleao.com — validar antes de publicar, §8) |
| 7 | MGFooter | mg-trust.jsx:162–222 | igual ao da Home menos o selo strelo; AwardBadge de novo; coluna diz "Hospitalidade" onde a Home diz "Meet & Greet" (naming inconsistente, §8) |

Transversais: `mg-reveal` scroll-reveal (IO + fallback + timeout 1600ms); TweaksPanel
embutido na página (tooling, não portar); `ext-resource-dependency` + `__bundler_thumbnail`
no head (tooling); aliases `--c-mg/--c-mg-ink/--c-mg-soft/--c-mg-surface/--c-ink` vivos.

## Correções à matriz do plano (verificadas por grep)

1. **`.mg-moment*` morto ✓** (mg-styles 173–187) e **`MG_MOMENT` morto ✓** (mg-data 241–248)
   — confirma o plano.
2. **`.mg-occasion` morto POR INTEIRO** (238–242), não só a regra `b` — nenhum JSX usa a
   classe. Campo `occasion` nos dados: confirmado órfão (fica, conteúdo §8).
3. **`MGRail` nunca é renderizado** — `mg-app.jsx` não o monta; zero consumidores. O plano
   esperava o rail no smoke test. Tratamento análogo ao viagem.jsx: **arquivo fica dormente,
   script tag sai do meet-greet.html, regras CSS do rail saem** (`.mg-rail*`, `.mg-chips`,
   `.mg-chip*`; recuperáveis no git). Referência `--fill` sai do comentário COMPONENTE.
4. **38 seletores mortos** no mg-styles.css (gerações anteriores do layout): além de
   moment/occasion — `.mg-topbar/.mg-navlink` (header antigo transparente), `.mg-hero`,
   `.mg-hero-scrim/.mg-hero-play` (scrim virou inline; play sumiu), `.mg-seqzone*`,
   `.mg-seq-intro`, `.mg-exp*` + `.mg-exp-cinema*` + `.mg-incl-menu*` + `.mg-exp-cta`
   (sequência editorial), `.mg-svc__*` + `.mg-incl` + `.mg-incl-2col` (padrão Experiências),
   `.mg-car-slide/.mg-car-arrow` (carrossel virou grid), `.mg-card`, `.mg-price-unit`,
   `.mg-footer`, `.mg-zone--soft`, `.mg-fam-link`, `.mg-draft-note`, `.mg-page .gl-tag`,
   `.gl-card:hover .mg-svc__imgwrap…`.
5. **O ribbon de draft NÃO renderiza** — `.mg-draft-note` existe só no CSS; o §8 do plano
   assumia "mg-data.jsx tem ribbon de draft". Correção: preços fictícios aparecem **sem
   aviso visual**. design.md §8 deve registrar isso.
6. Comentários stale: "Auto-advancing gallery" (sem timer), "Carousel" (é grid).

## Gaps M&G → DS (entram no design.md)

- Padrão **re-tema local por redefinição de variável** (mg-emp-card) → §3.
- **Vídeo do hero ignora reduced-motion** → contrato no §5/§9 ("no destino, pausar/ocultar
  o vídeo sob prefers-reduced-motion").
- Kenburns 26s/30s = animação ambiente com timing próprio ✓ (já previsto §5).
- Dependências externas: flagcdn, espncdn (escudos), unpkg → §8.
- Estrela/+ dos stats: `--c-mg` no M&G vs `--c-primary` na Home → documentar a divergência.
