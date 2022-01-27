---
sidebar_label: 🧪 Jully
---

# 🧪 Jully

## Changelog

- Refatoração da comunicação com o servidor **Socket.io** no frontend.
- Refatoração do servidor **Socket.io** no backend.
- Refatoração no mecanismo de **Jobs**.
- Mudança na captura de erros, alteramos de **TypeError** para **Error**.

### Notas de Design

- Correção no componente de **Alerting**.
- CorreçÃo na pagina de **Ajuda**.
- Correção nos componentes, após atualização no frontend.
- Inserido uma barra de loading na parte superior da pagina sempre que ocorrer uma mudança de pagina.

### Notas de Implementação

- Adicionado o middleware de acesso ao painel de exibição dos jobs, em "/admin/queues"
- [Mailtrap](https://mailtrap.io/) configurado.
