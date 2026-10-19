# Meus dividendos

Aplicação web simples para registrar proventos e compras de ativos e acompanhar os resultados em um painel.

## Funcionalidades

- Dashboard com valores recebidos, valores a receber e média mensal.
- Gráficos de proventos por mês, tipo e ativo.
- Cadastro e exclusão de proventos e compras.
- Acompanhamento da posição e do yield on cost.
- Calendário com proventos registrados e estimativas futuras.

> As estimativas do calendário são projeções baseadas em pagamentos anteriores, não garantias de recebimento.

## Tecnologias

- HTML
- CSS
- JavaScript
- Chart.js

## Como executar

1. Baixe ou clone este repositório.
2. Abra `index.html` no navegador.
3. Para uma experiência mais consistente, você também pode usar uma extensão como Live Server no VS Code.

Os gráficos usam Chart.js por CDN, então precisam de conexão com a internet para carregar.

## Armazenamento dos dados

Os dados ficam salvos no armazenamento local do navegador (`localStorage`). Não há servidor ou sincronização entre dispositivos. Os dados iniciais estão definidos no código e podem ser substituídos pelos registros feitos na aplicação.

## Observações

- Os ativos e suas classificações estão definidos no código da aplicação.
- O yield on cost depende de que as compras estejam registradas corretamente.
- Este projeto é para organização e aprendizado; não oferece recomendação de investimento.
