# Decisões tomadas até agora

## Naming

- **Nome público do serviço**: "Meet & Greet"
- "Hospitalidade" pode continuar como URL legada (`/hospitalidade/`) com redirect futuro

## Estrutura de páginas

**Funil alvo** (3 níveis até checkout):
```
GaleON Home → Página Meet & Greet → Página do serviço (configuração+checkout)
```

A Página Meet & Greet acumula 3 funções que hoje são páginas separadas:
1. Explicar o serviço
2. Listar/comparar os produtos
3. Permitir escolha e direcionar para checkout

Elimina-se:
- A página intermediária explicativa
- A página de categoria (Passageiros vs Executivos vs Delegações)

## Filtros e categorização

- **Não haverá filtro/aba no topo da página** — toda a navegação por hierarquia visual
- Categorização atual "Passageiros / Meet & Greet / Executivos / Delegações" será descartada
- A única bifurcação real é **B2C (indivíduos/famílias) vs B2B (grupos/delegações)**, e acontece visualmente dentro da página — não como filtro do topo

## Sala VIP

- **Não terá seção dedicada** na página Meet & Greet
- Aparece apenas como "incluso" em produtos específicos (Experiência VIP, Experiência VIP Plus)
- A seção "Conheça nossas salas VIPs Plaza Premium Lounge" é REMOVIDA da página M&G — vira link discreto ou some completamente
- Existe um produto separado "Sala VIP" em outra parte do site (`/sala-vip/`) — esse mantém-se intocado

## Tratamento B2B

- Manter B2B na mesma página, mas **visualmente separado** (bloco com fundo/cor diferente)
- B2B inclui:
  - Atendimento para Grupos (delegações esportivas, comitivas)
  - Locação do Espaço RIOgaleão Exclusive (eventos)
- B2B usa **CTA de cotação**, não checkout direto

## Referência de design

**Terminal BTG Pactual — Experiences** (https://terminal.btgpactual.com/pt-BR/experiences)

PDF da referência salvo em: `/Users/leticiasaibel/Downloads/screencapture-terminal-btgpactual-pt-BR-experiences-2026-05-22-17_07_59.pdf`

Padrões aplicáveis identificados:
1. **Hierarquia em camadas visuais** (fundo claro → preto → cards menores) em vez de grid igualitário
2. **Cards editoriais sobrepostos** em fotos grandes (alternando esquerda/direita) — não grid de catálogo
3. **Cards completos** com foto, nome, preço, comodidades, CTA Reservar — sem etapa intermediária explicativa
4. **Quebra de cor de fundo** sinaliza patamar de produto (substitui filtro/aba)
5. **Complementos com tag visual própria** ("+ COMPLEMENTO") em cards menores
6. **Curadoria > catálogo** — poucos produtos por camada, com fotos grandes

## Próximos passos (pendente decisão da Letícia)

1. ~~Confirmar lista de 5 produtos~~ → Identificados 7 (faltam confirmar IDs de Conexões/Aviação Executiva e 1 que ainda não vi)
2. ~~Confirmar hipótese da escada B2C~~ → **Refutada**: produtos têm pricing e propósito fundamentalmente diferentes, não formam escada
3. Decidir naming dos produtos:
   - Manter "Fast Track" ou renomear? (jargão de aeroporto, brasileiro casual não entende)
   - Resolver confusão "Experiência VIP" vs "Sala VIP" (produtos diferentes)
   - Distinguir claramente "Aviação Executiva" vs "Grupos"
4. ~~Confirmar disponibilidade de fotos próprias~~ → **Confirmado**: banco editorial existe e é bom
5. Detalhar o que cada produto inclui — bullets já são distintas por produto (positivo)
6. Pensar agrupamento visual: B2C individual / B2B operacional (aviação executiva) / B2B grupos / B2B eventos — são 3-4 camadas, não 2

## Atualização da camada B2B

A bifurcação "B2C vs B2B" é simples demais. A realidade tem 3 sub-categorias B2B:
- **Aviação Executiva** — operação em jato privado, grupo de até 20
- **Atendimento para Grupos** — delegações, comitivas em voos comerciais
- **Locação de Espaço** — evento no aeroporto

Isso pode virar **3 cards menores em grid horizontal dentro do bloco B2B** (estilo "Complementos" do BTG), ou **uma escada própria de B2B** se há sobreposição entre eles.
