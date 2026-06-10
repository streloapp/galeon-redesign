# Plano — auditoria bidirecional → curadoria do DS → design.md de handoff

> **Para retomar em sessão/conta nova:** este arquivo é autossuficiente. Leia também
> `context/meet-greet-redesign/` (decisões de produto) e `context/briefing-conteudo-home.md`.
> Aprovado pela Letícia em 2026-06-10. Comece pela **Etapa 0a** (Home).

## Estado atual (2026-06-10, fim do dia)

- **Já commitado** (`2250073`): DS alinhado — `colors_and_type.css` em 3 camadas
  (PRIMITIVO/SEMÂNTICO/COMPONENTE), spacing grid 4px (`--space-N`, N=px), tokens de motion
  (`--ease-out`, `--dur-fast/base/moderate/slow`), elevação por papel (5 `--shadow-*`),
  `--c-scrim` via color-mix, tints de serviço; páginas migradas pra esses tokens;
  `design-system.html` reagrupado por nível com tiles Motion/Elevation.
- **TODAS as etapas abaixo foram executadas** (working tree com as mudanças, SEM commit,
  aguardando revisão da Letícia). Checkpoint da Home aprovado por ela em 2026-06-10 com
  10 decisões registradas em `context/auditoria-home-etapa0.md`; achados do M&G em
  `context/auditoria-mg-etapa0d.md`. `design.md` entregue como **draft** na raiz;
  `README.md` reescrito. Pendências: revisão dela do design.md + smoke visual nas
  duas páginas (rotator, kenburns, marquee, galeria, acordeões; console limpo).
- Correções relevantes à matriz original: HeroCinema/Statement já não existiam;
  ~450 linhas mortas em sections.jsx (9 componentes); MGRail nunca renderizado
  (script removido do meet-greet.html; arquivo dormente); 38 seletores mortos no
  mg-styles.css; tints + `--c-border-strong` + `gl-tag/gl-divider/gl-section--tight`
  removidos; bug `26px`→`26s` do marquee; scrims da Home migrados pra `--c-scrim`;
  hover de card unificado em `.gl-card`; radial decorativo removido; AwardBadge mantido
  como exceção (com reduced-motion); tiles brand-wave/card-compact removidos; previews
  tabs/service-chip/colors-usage/eyebrow refeitos consumindo styles.css real.

## Restrições estabelecidas (feedback da Letícia — NÃO violar)

1. As seções do M&G (e da Home) **não são átomos de DS** — documentar **em prosa contra a
   página viva + código** (anatomia/comportamento/conteúdo/tokens). **Nunca** redesenhar como
   tiles/previews esquemáticos (foi tentado e rejeitado: nascem em drift).
2. `design.md` só é considerado pronto **após revisão dela**; entregar como draft.
3. Relatórios de subagente não são confiáveis sem verificação direta (caso Georgia: agente
   classificou como vivo o que era CSS morto). Toda alegação vivo/órfão exige grep/script próprio.

## Decisões fechadas

- Handoff **agnóstico de stack** (CSS custom properties puras + prosa; sem mapeamento Tailwind).
- **Limpar** código morto (não só desreferenciar).
- design.md = **documento único**, PT-BR, na raiz do repo.
- Papéis sem competição: *trabalhar dentro do protótipo → README.md · reproduzir fora →
  design.md · valores → só no CSS.*

---

## Etapa 0 — Auditoria bidirecional (Home como piloto)

Motivação: o DS pode documentar o que não existe mais nas páginas, e as páginas podem ter
padrões que não constam no DS. A verdade ancora na **página renderizada**.

- **0a. Inventário da Home** (`site.html` → `hero.jsx`, `sections.jsx`, `styles.css`):
  percorrer seção a seção e listar o que a página REALMENTE possui — seções, componentes,
  padrões (header glass, rotator de serviços, marquee, cards, FAQ accordion, footer/wave…),
  classes e tokens usados. Output: tabela-inventário (vira o §6 do design.md).
- **0b. Páginas → DS (cobertura):** cada item do inventário está no DS? (token · classe ·
  tile no design-system.html · regra no README). Gaps → **ENTRA**.
- **0c. DS → páginas (veracidade):** cada um dos 25 previews, cada classe `.gl-*`, cada claim
  do README que toque a Home — exigir match no markup vivo via script exaustivo. Exemplos a
  checar: RIOgaleão wave, Compact card. Órfãos → **SAI** (ou "reserva intencional" explícita,
  como `--bp-mobile`).
- **✋ CHECKPOINT:** apresentar tabela de achados da Home pra Letícia validar método/decisões.
- **0d. Repetir 0a–0c para o M&G** (`meet-greet.html` → `mg-*.jsx`, `mg-styles.css`).

---

## Matriz fica/sai/entra — itens JÁ VERIFICADOS diretamente (etapa 0 completa/corrige)

### ✅ FICA
- `colors_and_type.css` (3 camadas) — fonte de verdade dos valores.
- `styles.css` + `mg-styles.css` + `design-system.html`/`preview/` — sujeitos à etapa 0c.
- `--bp-mobile` (referência documentada por design; runtime troca via `[data-vp]` em JS).
- Sombras one-off literais documentadas (chip/glass do hero, dot da galeria, hairlines).
- Tooling do protótipo (`index.html`, `app.jsx`, `tweaks-panel.jsx`, `design-canvas.jsx`,
  `image-slot.js`) — fica no repo, fora do handoff (design.md §2 marca "não portar").
- `viagem.jsx` + `journey-animated.jsx` como arquivos (feature dormente; git preserva).
- `assets/`, `context/`, estados `.json`.

### ❌ SAI (cada item verificado por grep direto)
- `ui_kits/galeon-home/` — apagar (nada carrega).
- `<script>` de `viagem.jsx` e `journey-animated.jsx` no **site.html** — nunca renderizam
  (`GaleonViagem` comentado em `sections.jsx:1422`; `GaleonJourneyAnimated` sem consumidor).
  `index.html` (workbench) mantém os seus.
- Variantes `HeroCinema`/`HeroStatement` em `hero.jsx` (guard: confirmar zero refs antes).
- Referência ao `ui_kits/` no `SKILL.md`.
- **CSS morto** em `mg-styles.css`: bloco `.mg-moment*` (linhas ~174–187) e `.mg-occasion b`
  (~242) — nenhum JSX renderiza essas classes (são as 2 únicas regras com Georgia).
- Dado morto `MG_MOMENT` (`mg-data.jsx:~241–248`, sem consumidor).
- Tokens mortos: `--text-micro-lh`, `--font-serif-italic` (zero uso vivo com as regras acima fora).
- Claims stale do `README.md`: "no drop shadows by default", botão pill 52px (real: shadcn
  36px + sizes), scrim `rgba(0,0,0,.55)` (real: `--c-scrim` color-mix), motion cru (real:
  tokens), sem grid 4px, acento serif-itálico, índice apontando pro ui_kits.
- (+ o que a etapa 0c encontrar.)

### ➕ ENTRA
- `README.md` reescrito = doc interno do protótipo (estado real do sistema; como trabalhar no
  workbench; índice limpo).
- **`design.md`** (novo, único, PT-BR, raiz) = handoff pra fora.
- (+ padrões vivos sem documentação que a etapa 0b encontrar.)

---

## Execução (ordem com dependências)

1. **Etapa 0** — auditoria bidirecional (checkpoint após a Home).
2. **Etapa 1 — Limpeza** (com a matriz corrigida): `rm -rf ui_kits/` · site.html −2 scripts ·
   variantes mortas do hero.jsx (guard) · SKILL.md · CSS/dados mortos do M&G · + achados da 0.
3. **Etapa 2 — Tokens**: remover `--text-micro-lh` e `--font-serif-italic` · + achados.
   (Campo `occasion` do `mg-data.jsx` aparenta não ser renderizado — **fica** por ser
   conteúdo; sinalizar no §8 do design.md como dado órfão a decidir.)
4. **Etapa 3 — README.md** reescrito (descreve o estado pós-limpeza).
5. **Etapa 4 — design.md** (por último, autocontido; §6/§7 nascem do inventário da etapa 0).

### ToC do design.md
Formato: prosa de intenção + ponteiro arquivo/seletor; valor cru só quando load-bearing
(ex.: 720px, 4500ms do rotator).

- **§0 Como ler** — "doc aponta, código manda"; aviso: TODO conteúdo é draft (ver §8).
- **§1 Produto e as duas páginas** — GaleON, tom editorial/calmo/oficial.
- **§2 Mapa do código** — todo arquivo do root: portar / consultar / **não portar** (tooling).
- **§3 Fundações (tokens)** — regras que o CSS não expressa sozinho (grid 4px, pareamento
  surface/foreground, `--c-on-media`, scrim via color-mix, one-offs intencionais). Sem listar valores.
- **§4 Componentes gl-*** — anatomia, matriz variant×size do botão, estados, contrato de
  tokens de componente; ponteiro p/ seletor + preview.
- **§5 Contratos transversais** — `[data-vp]`→**media query 720px** no destino;
  `prefers-reduced-motion` é contrato; scroll-reveal; motion tokens vs animações ambiente
  (kenburns/marquee/progress 4500ms têm timing próprio).
- **§6 Home** e **§7 M&G** seção a seção — prosa contra a página viva + código, fonte citada.
- **§8 Status do conteúdo** — slot a slot: copy/preços fictícios (`mg-data.jsx` tem ribbon de
  draft), briefing da home vazio, FAQ lorem, fotos `<image-slot>` (estado em JSON local, NÃO
  exportável — listar aspect-ratios p/ encomenda), logos simpleicons **sem autorização
  confirmada** (bloqueador de publicação), vídeo `assets/mg-hero.mp4`, campo `occasion` órfão.
- **§9 Checklist de aceitação** — fidelidade lado a lado, 720px via media query,
  reduced-motion, focus-visible, zero hardcode onde há token.
- **§10 O que o sistema NÃO é** — atualizado (sombras: só pelos 5 tokens de papel) + quirks.

## Verificação

1. **Etapa 0:** toda alegação vivo/órfão sustentada por grep/script próprio; tabelas de
   achados apresentadas nos checkpoints.
2. **Limpeza:** `site.html`, `meet-greet.html`, `design-system.html` abrem com console limpo;
   smoke visual (rotator, rail, carrossel, marquee, kenburns). Greps `ui_kits|HeroCinema|
   HeroStatement|mg-moment|mg-occasion|MG_MOMENT|Georgia|font-serif-italic|text-micro-lh`
   → zero; `viagem|journey` fora do site.html.
3. **README:** sem claims stale; responde "qual token p/ X?" sozinho.
4. **design.md:** cobertura (toda seção visível das 2 páginas tem entrada) · portão (todo
   arquivo do root tem veredito no §2) · conteúdo (todo slot tem status+ação no §8) ·
   contratos do §5 com frase "no destino, faça X".
5. **Sem commit até revisão da Letícia**; design.md entregue como **draft**.

## Fora de escopo

- Mapeamento Tailwind/shadcn (stack indefinida — possível adendo futuro).
- Conteúdo real (copy/preços/fotos) — processo com stakeholders.
- Apagar `viagem.jsx`/`journey-animated.jsx` (ficam dormentes no repo).
