# Proposta Comercial
## Site institucional e showroom multimarcas — Via Shopping Car

**Apresentado a:** Direção do Via Shopping Car
**Apresentado por:** Matheus — desenvolvimento e design web
**Data:** Maio de 2026
**Status do projeto:** Prévia funcional pronta para demonstração

---

## 1. Resumo executivo

O Via Shopping Car é hoje o principal endereço automotivo da Av. Washington Soares,
em Fortaleza, com mix multimarcas, estacionamento, estrutura física consolidada e
fluxo já estabelecido. No ambiente digital, porém, o empreendimento aparece de forma
fragmentada — perfis sociais isolados, Linktree, site institucional simples — sem um
canal único que represente o shopping, dê palco aos lojistas e converta o interesse do
cliente em visita ou negociação.

Esta proposta apresenta um site novo, já em prévia funcional, projetado para:

1. **Posicionar o Via Shopping Car como destino digital**, e não apenas físico.
2. **Dar autonomia e vitrine institucional para cada lojista**, sem que precisem
   manter site próprio.
3. **Encurtar a jornada do cliente** — da busca por um veículo até a conversa direta
   com a loja certa.
4. **Gerar dado e prova social** que aumentam o valor de locação dos boxes e
   fortalecem a marca do shopping.

A prévia atual já está pronta para demonstração e foi construída com foco no pedido
real do shopping e dos lojistas: "algo simples, mas que funcione de verdade".

---

## 2. Diagnóstico atual

| Canal               | Situação hoje                                                                |
| ------------------- | ---------------------------------------------------------------------------- |
| Site oficial        | Página estática, sem estoque, sem busca, sem integração com os lojistas      |
| Linktree            | Cumpre função de atalho, mas não institucionaliza a marca                    |
| Instagram/Facebook  | Ativos, porém sem conversão direta para os lojistas                          |
| Atendimento digital | 100% dependente do WhatsApp pessoal de cada vendedor                         |
| SEO / Google Maps   | Presença básica, sem reforço de conteúdo próprio                             |

**Consequências práticas:**

- O cliente que pesquisa "shopping de carros em Fortaleza" no Google encontra
  concorrentes melhor posicionados.
- Lojistas precisam investir individualmente em marketing, perdendo a força de marca
  coletiva do Via Shopping Car.
- O shopping não captura nenhum dado próprio sobre o público que se interessa pelo
  espaço.

---

## 3. O que já está entregue (prévia funcional)

A prévia já demonstrável contempla:

### 3.1 Home institucional
- Hero com identidade e CTAs claros: "Conhecer o shopping" e "Agendar visita".
- Bloco de busca de veículos por marca, modelo e faixa de ano.
- Métricas de credibilidade: endereço, horário público, estacionamento.

### 3.2 Conheça o shopping
- Apresentação do espaço físico com fotos e descrição.
- Integração com Google Maps e Waze para conversão em visita presencial.
- Reforço da marca institucional já reconhecida nos canais oficiais.

### 3.3 Estoque inteligente
- Vitrine de veículos com filtros por marca, modelo, ano, câmbio, combustível,
  cor e **loja**.
- Ordenação por ano, preço e quilometragem.
- Comparativo lado a lado (até 2 veículos).
- Cada carro mostra sua loja de origem e botão de interesse com mensagem
  personalizada para o WhatsApp do lojista correto.

### 3.4 Vitrine dos lojistas
- As 10 lojas do mix já aparecem listadas, cada uma com:
  - Card clicável que abre o estoque filtrado pela loja.
  - WhatsApp direto da loja (não mais o central).
  - Contagem dinâmica de veículos em destaque.
- Estrutura pronta para evoluir para páginas individuais por loja
  (logo, vitrine, histórico, equipe).

### 3.5 Serviços e canais oficiais
- Financiamento, seguros e localização com CTAs prontos.
- Bloco de canais oficiais (WhatsApp, Instagram, Facebook, site, Maps) unificado.
- Horário comercial detalhado e linha direta com a recepção do shopping.

### 3.6 Captação e LGPD
- Newsletter de promoções com aceite explícito de privacidade.
- Banner de cookies com persistência local.
- Política de privacidade completa, em modal acessível em todas as páginas.

### 3.7 Padrões técnicos
- React 19 + TypeScript + Vite (stack moderna, manutenção facilitada).
- Design responsivo testado em mobile, tablet e desktop.
- Tempo de carregamento otimizado para 3G/4G.
- Estrutura preparada para indexação no Google e compartilhamento em redes
  sociais.

---

## 4. Roadmap de evolução

A prévia atual é o ponto de partida. As próximas fases foram desenhadas para
escalonar o investimento e o retorno.

### Fase 2 — Painel administrativo (CRUD de veículos)
Permite que o shopping (ou cada lojista) cadastre, edite e remova veículos sem
depender do desenvolvedor.
- Cadastro com foto, ficha técnica, preço e tag.
- Login individual por lojista (cada um gerencia o próprio estoque).
- Aprovação central pelo shopping antes de publicar (opcional).
- **Impacto comercial:** transforma o site em um produto vivo e justifica
  mensalidade de manutenção.

### Fase 3 — Provas sociais e autoridade
Reforça a credibilidade institucional do shopping na seção "Sobre".
- Contador de carros vendidos (anual ou histórico).
- Selo "X anos de mercado em Fortaleza".
- Depoimentos reais de clientes (texto + foto).
- Galeria de eventos e ações realizadas no espaço.
- **Impacto comercial:** o cliente que pesquisa o Via Shopping Car encontra
  argumentos de confiança imediatamente.

### Fase 4 — Páginas individuais por lojista
Cada loja ganha uma página dedicada dentro do site do shopping.
- Logo da loja, descrição própria, fotos do showroom.
- Estoque filtrado automaticamente.
- Equipe de vendas com WhatsApp individual de cada vendedor.
- Avaliações e diferenciais da loja.
- **Impacto comercial:** vira argumento direto para retenção e captação de
  lojistas — o shopping passa a oferecer mais que um box físico.

### Fase 5 — Hospedagem profissional + banco de dados (Supabase)
Migração da camada de dados estática atual para infraestrutura escalável.
- Banco de dados Supabase (PostgreSQL gerenciado).
- Upload e armazenamento de imagens de veículos.
- Autenticação dos lojistas.
- Backup automático e ambiente de homologação.
- **Impacto técnico:** o site sai do modo demonstração e passa a operar como
  ativo digital de longo prazo.

### Fase 6 — Captura de leads e integração
- Formulário de proposta direta por veículo (lead vai para a loja correta).
- Painel para o shopping ver estatísticas: visitantes, lojas mais procuradas,
  veículos mais clicados.
- Integração opcional com CRM ou planilhas.
- **Impacto comercial:** o shopping passa a ter dado próprio sobre o
  comportamento do seu público — argumento poderoso para negociação com
  lojistas e parceiros.

### Fase 7 — Performance, SEO local e campanhas
- Otimização para "carros usados em Fortaleza" e variações.
- Reforço da ficha do Google Business.
- Estrutura para campanhas pagas (Google Ads e Meta) com landing pages
  específicas por loja ou campanha.
- **Impacto comercial:** tráfego qualificado e mensurável.

---

## 5. Referência conceitual

A inspiração para o projeto vem do modelo de **AutoShopping** já consolidado em
outras praças (São Paulo, Belo Horizonte, Curitiba), onde polos automotivos
físicos viraram também plataformas digitais multimarcas. O ganho desses casos é
duplo:

- **Para o shopping:** vira marca de referência online, não apenas endereço.
- **Para os lojistas:** ficam dentro de um ecossistema que amplifica cada
  operação individual sem custo isolado.

O Via Shopping Car tem localização, mix e tempo de mercado para ocupar essa
posição em Fortaleza — falta apenas a camada digital correspondente. Esta
proposta entrega exatamente essa camada.

---

## 6. Benefícios consolidados

### Para a direção do shopping
- Posicionamento institucional digital coerente com o porte do empreendimento.
- Maior valor percebido nos boxes (locação fica mais defensável).
- Dado próprio sobre interesse e tráfego — argumento de negociação.
- Marca centralizada, com fluxo claro: pesquisa → site → visita.

### Para os lojistas
- Vitrine 24h por dia, sem custo individual de site próprio.
- Lead chega direto no WhatsApp do vendedor certo, já contextualizado.
- Cada loja pode ter sua identidade dentro do site do shopping (Fase 4).
- Argumento de marca: "veja no site oficial do Via Shopping Car".

### Para o cliente final
- Compara veículos entre lojas sem sair do site.
- Encontra rapidamente o carro e a loja certa.
- Visita o shopping já decidido — taxa de conversão maior em loja.
- Confiança institucional: o shopping endossa as operações.

---

## 7. Investimento (faixas de referência)

As faixas abaixo são estimativas de mercado para o porte e a complexidade do
projeto. Os valores finais são confirmados após alinhamento de escopo.

| Item                                                        | Faixa estimada (R$)          | Modalidade        |
| ----------------------------------------------------------- | ---------------------------- | ----------------- |
| **Fase 1** — Entrega atual (já demonstrável)                | R$ 4.500 – R$ 8.500          | Pagamento único   |
| **Fase 2** — Painel administrativo (CRUD de veículos)       | R$ 3.000 – R$ 6.500          | Pagamento único   |
| **Fase 3** — Provas sociais e seção institucional avançada  | R$ 1.500 – R$ 3.500          | Pagamento único   |
| **Fase 4** — Páginas individuais por loja (até 10 lojas)    | R$ 4.000 – R$ 9.000          | Pagamento único   |
| **Fase 5** — Hospedagem + Supabase (setup)                  | R$ 1.200 – R$ 2.800          | Pagamento único   |
| **Fase 6** — Captura de leads e painel de métricas          | R$ 2.500 – R$ 5.500          | Pagamento único   |
| **Fase 7** — SEO local e estrutura para campanhas           | R$ 1.800 – R$ 4.500          | Pagamento único   |
| **Mensalidade de manutenção e hospedagem**                  | R$ 350 – R$ 800              | Mensal recorrente |

**Observações importantes:**

- A mensalidade cobre hospedagem profissional, domínio, backup, pequenas
  manutenções, ajustes de conteúdo e suporte técnico.
- As fases podem ser contratadas em conjunto (com desconto sobre o pacote
  fechado) ou de forma escalonada conforme prioridade.
- Para a Fase 5, o plano gratuito do Supabase atende ao início da operação;
  custos adicionais de infraestrutura só surgem com volume relevante.

---

## 8. Cronograma sugerido

| Etapa                                | Prazo de execução    |
| ------------------------------------ | -------------------- |
| Aprovação da prévia e ajustes finais | 1 a 2 semanas        |
| Fase 2 — Painel CRUD                 | 3 a 5 semanas        |
| Fase 3 — Provas sociais              | 1 a 2 semanas        |
| Fase 4 — Páginas por loja            | 4 a 7 semanas        |
| Fase 5 — Supabase e hospedagem       | 1 a 2 semanas        |
| Fase 6 — Leads e métricas            | 2 a 4 semanas        |
| Fase 7 — SEO e campanhas             | 2 a 3 semanas        |

Os prazos contemplam desenvolvimento, validação e ajustes. Podem rodar em
paralelo quando o conteúdo dos lojistas estiver disponível.

---

## 9. Próximos passos

1. **Demonstração ao vivo da prévia atual** para a direção do shopping.
2. **Definição do escopo da Fase 2** (CRUD e quem cadastra: shopping
   centralizado ou cada lojista).
3. **Coleta dos dados reais dos lojistas** (logo, fotos do showroom, contato
   WhatsApp dedicado, descrição de cada loja).
4. **Formalização do contrato** com o pacote escolhido.
5. **Início da execução** conforme cronograma aprovado.

---

## 10. Por que agora

O mercado automotivo de Fortaleza está em movimento — feiras digitais,
classificados nacionais e marketplaces estão ganhando o espaço que pertence aos
polos físicos da cidade. O Via Shopping Car tem localização privilegiada, mix
consolidado e marca reconhecida. Falta apenas dar a esse ativo a camada digital
correspondente, antes que os concorrentes ocupem essa narrativa.

A prévia já está pronta. O próximo passo está com a direção do shopping.

---

**Contato para alinhamento:**
Matheus — desenvolvimento e design web

*Documento elaborado com base no escopo atual do projeto e em referências de
mercado. Valores e prazos sujeitos a confirmação por contrato.*
