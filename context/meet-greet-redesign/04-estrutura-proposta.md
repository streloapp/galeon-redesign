# Estrutura proposta da nova página Meet & Greet

Inspirada na referência Terminal BTG Pactual, traduzida para o contexto e produtos do RIOgaleão.

## Esqueleto da página

```
┌─────────────────────────────────────────────────────────────┐
│  HERO editorial                                              │
│   Foto grande horizontal (agente real recebendo no portão)  │
│   Label minúsculo: "Sua chegada começa antes de aterrissar" │
│   Headline em caps espaçado:                                │
│   "DA PORTA DO AVIÃO À PORTA DO CARRO,                      │
│    A GENTE ANDA COM VOCÊ"                                   │
├─────────────────────────────────────────────────────────────┤
│  COMO FUNCIONA                                               │
│   3 passos visuais: Reserva · Encontro · Acompanhamento     │
├─────────────────────────────────────────────────────────────┤
│  [Fundo claro / bege]                                        │
│                                                              │
│  CAMADA 1 — Serviços principais B2C                          │
│  Cards editoriais sobrepostos em fotos grandes              │
│  Alternando lado esquerdo/direito                            │
│                                                              │
│  ┌─ FAST TRACK ──────┐    [foto grande direita]              │
│  │ R$ XXX             │                                       │
│  │ Pitch curto        │                                       │
│  │ ✓ Receptivo        │                                       │
│  │ ✓ Acessos prior.   │                                       │
│  │ ✓ Acompanhamento   │                                       │
│  │ [Reservar →]       │                                       │
│  └────────────────────┘                                       │
│                                                              │
│       [foto grande esquerda]   ┌─ EXPERIÊNCIA VIP ────┐      │
│                                │ R$ XXX                 │      │
│                                │ Tudo do Fast Track +  │      │
│                                │ ✓ Sala VIP            │      │
│                                │ ✓ Maleiro             │      │
│                                │ [Reservar →]          │      │
│                                └───────────────────────┘      │
│                                                              │
│  ┌─ EXPERIÊNCIA VIP PLUS ─┐  [foto grande direita]            │
│  │ R$ XXX                  │                                   │
│  │ Tudo da VIP +           │                                   │
│  │ ✓ Assessoria personal.  │                                   │
│  │ ✓ Carrinho elétrico     │                                   │
│  │ [Reservar →]            │                                   │
│  └─────────────────────────┘                                   │
├─────────────────────────────────────────────────────────────┤
│  CONFIANÇA                                                   │
│  40+ anos · idiomas atendidos · equipe própria · depoimentos │
├─────────────────────────────────────────────────────────────┤
│  [Fundo distinto / escuro]                                   │
│  BLOCO B2B                                                   │
│  "Para grupos, delegações e eventos"                         │
│                                                              │
│  ┌─ Atendimento p/ Grupos ─┐  ┌─ Espaço Exclusive ──┐        │
│  │ Delegações esportivas,   │  │ Locação de espaço   │        │
│  │ comitivas, grupos grandes│  │ para eventos        │        │
│  │ [Solicitar cotação →]    │  │ [Saiba mais →]      │        │
│  └──────────────────────────┘  └─────────────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  FAQ                                                         │
│  Só dúvidas operacionais (cancelamento, atraso, criança)    │
├─────────────────────────────────────────────────────────────┤
│  CTA FINAL                                                   │
└─────────────────────────────────────────────────────────────┘
```

## Mapeamento de cada seção

| Seção | Função | Conteúdo crítico |
|---|---|---|
| Hero | Captar atenção, fazer promessa concreta | Foto real + headline editorial + 1 CTA |
| Como funciona | Desmistificar o serviço para quem nunca usou | 3 passos com ícone/ilustração |
| Camada 1 (B2C) | Mostrar a escada de produtos e permitir escolha direta | 3 cards completos (Fast Track, VIP, VIP Plus) |
| Confiança | Quebrar objeção, mostrar credibilidade | 40 anos, idiomas, equipe própria |
| Bloco B2B | Atender o público B2B sem competir com B2C | 2 cards de cotação (Grupos, Espaço Exclusive) |
| FAQ | Resolver dúvidas operacionais residuais | Só o que importa pra fechar compra |
| CTA final | Última chance de conversão | Reservar / falar com a gente |

## Princípios de design herdados do BTG

1. **Curadoria > catálogo**: poucos cards principais com peso visual alto
2. **Editorial > grid**: cards sobrepostos a fotos grandes
3. **Hierarquia visual = categorização**: fundo de cor diferente substitui filtro/aba
4. **Card auto-suficiente**: tudo que importa pra decidir está no card, sem precisar clicar pra ver mais
5. **Sem comparação injusta**: B2B e complementos têm tratamento visual distinto
6. **Foto carrega 50% do peso visual**: requer fotos próprias e bem produzidas

## O que esta estrutura resolve

| Problema atual | Como resolve |
|---|---|
| Categorização sem sentido | Sem aba/filtro. Hierarquia visual faz o trabalho |
| Página pouco explicativa | Hero editorial + cards completos. Sem etapa intermediária |
| Comparação injusta | Só compara Fast Track ↔ VIP ↔ VIP Plus (são comparáveis). B2B fica fora |
| Sala VIP fora de escopo | Aparece só como "incluso" em VIP e VIP Plus. Seção dedicada removida |
| Funil de 5 níveis | Vira 3 níveis (Home → M&G → Serviço) |
