---
sidebar_label: 🧪 Jully
---

# 🧪 Jully

## Grande Atualização de Segurança

Essa atualização muda completamente o mecanismo de segurança do sistema. Buscamos sempre a melhor forma de segurança possível, e isso é uma tarefa extremamente difícil, por isso a cada atualização, tentamos implementar melhores práticas de segurança e melhorar a segurança já existente.

## Changelog

- Corrigido módulo **StringEx**.
- Refatoração da comunicação com o servidor **Socket.io** no frontend.
- Refatoração do servidor **Socket.io** no backend.
- Refatoração no mecanismo de **Jobs**.
- Mudança na captura de erros, alteramos de **TypeError** para **Error**.

### Notas de Design

- Refatoração no componente dos cartões
- Refatoração no componente das pessoas
- Refatoração no componente dos locais de trabalho
- Refatoração no componente das cidades
- Refatoração no componente dos bairros
- Refatoração no componente dos estados
- Refatoração no componente dos motivos de falta
- Refatoração no componente das escalas de trabalho
- Refatoração no componente dos serviços
- Correção no **Layout**.
- Correção no componente de **Alerting**.
- CorreçÃo na pagina de **Ajuda**.
- Correção nos componentes, após atualização no frontend.
- Inserido uma barra de loading na parte superior da pagina sempre que ocorrer uma mudança de pagina.

### Notas de Implementação

- Adicionado o middleware de acesso ao painel de exibição dos jobs, em "/admin/queues"
- [Mailtrap](https://mailtrap.io/) configurado.
