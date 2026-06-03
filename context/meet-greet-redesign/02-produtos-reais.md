# Produtos reais da Hospitalidade

Os produtos aparecem como cards na seção "Conheça nossos Serviços Premium de Hospitalidade disponíveis" da página `/hospitalidade/`. Existe um carrossel horizontal com mais de 3 cards visíveis ao mesmo tempo (setas ◀ ▶).

Cada card tem: foto editorial · nome · preço · modelo de cobrança · botão "Reserve Agora" · lista de bullets com comodidades.

URL dos produtos: `/servico/hospitalidade/<id>/`

## B2C — Indivíduos e famílias

| Produto | URL ID | Preço | Modelo | Bullets reais |
|---|---|---|---|---|
| **Atendimento Fast Track** | `632c61169dd56bf919799b5c` | ? | Por pessoa (provável) | A confirmar |
| **Atendimento para Conexões** | ? | **R$ 999 / pessoa** | Doméstico e internacional | Receptivo embarque/desembarque · Suporte na jornada · Acessos diferenciados · Serviço maleiro |
| **Experiência VIP** | `632c61169dd56bf919799b89` | ? | Por pessoa (provável) | A confirmar |
| **Experiência VIP Plus** | `65e72c7e87409b973521ee37` | ? | Por pessoa (provável) | A confirmar |

## B2B — Empresas, grupos e eventos

| Produto | URL ID | Preço | Modelo | Bullets reais |
|---|---|---|---|---|
| **Atendimento para Aviação Executiva** | ? | **R$ 8.000** | Doméstico, até 20 pessoas | Receptivo embarque/desembarque · Transporte da aeronave até área exclusiva · Área exclusiva e segregada · Vaga pick-up/drop-off |
| **Atendimento para Grupos** | `684aea3c0f8ac730adbf3da9` | ? | Por grupo (provável) | A confirmar — delegações esportivas/comitivas |
| **Locação do Espaço RIOgaleão Exclusive** | `68483624749c955bf69a1d33` | **R$ 8.000** | A partir de 10 pessoas | Localização estratégica · Acesso fácil · Espaço coberto p/ montagem · Buffet e estrutura própria · Eventos sob medida |

## ⚠️ Hipótese inicial REFUTADA

**Hipótese antiga**: Fast Track → Experiência VIP → Experiência VIP Plus formam uma escada de upgrade do mesmo serviço.

**Realidade observada**: Os produtos têm **modelos de pricing fundamentalmente diferentes** (por pessoa vs grupo fechado vs evento) e **bullets de comodidades distintas** — cada um fala a língua do próprio produto. Não é escada, é catálogo de produtos paralelos.

Isso significa que a estrutura final NÃO deve ser uma escada vertical de upgrade, e sim uma organização em camadas por **natureza do produto** (B2C individual / B2B operacional / B2B evento).

## Insights críticos da estrutura atual dos cards

1. **Cada card tem estrutura visual idêntica** (foto + nome + preço + CTA + bullets) — bom padrão a manter/refinar
2. **Bullets são genuinamente diferentes entre produtos** — não dá impressão de comparação forçada, mas o layout em grid igualitário esconde isso
3. **Já existe banco de fotos editoriais bom** (agente com tablet "RODRIGO", executivo no jato, equipe na sala) — viabiliza o estilo BTG-style
4. **Bug atual**: bullets têm slots fixos com "-" vazios quando o produto tem menos itens. Corrigir no redesign.

## Problemas de naming

- **"Fast Track"** é jargão técnico de aeroporto — passageiro brasileiro casual não entende
- **"Experiência VIP"** se confunde com o produto separado "Sala VIP" (`/sala-vip/`)
- **"Experiência VIP Plus"** vs **"Assessoria a executivos"** — podem ser o mesmo produto com 2 nomes diferentes (search retornou os 2 títulos pro mesmo ID)
- **"Aviação Executiva"** vs **"Atendimento para Grupos"** — confirmar a diferença operacional (provável: Aviação Executiva é pra jatos/aviões privados; Grupos é pra delegações em voos comerciais)
- O nome **"Meet & Greet"** não aparece em nenhum produto — apenas no URL `/meet-e-greet/`

## Campos do formulário de reserva

Confirmado: Data, Adultos.
Locação de Espaço também pede: Duração do evento.
(Demais campos a confirmar com a operação.)

## Pendências

- Confirmar URLs/IDs de Conexões e Aviação Executiva (não estavam na busca)
- Pode estar faltando 1 produto ainda — Letícia mencionou "faltou 3" e identifiquei 2 novos
- Confirmar preços dos demais B2C (Fast Track, VIP, VIP Plus)
- Confirmar bullets reais dos demais produtos
