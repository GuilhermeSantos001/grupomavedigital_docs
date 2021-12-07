---
sidebar_label: Changelog
---

# Atualizações

Saiba tudo sobre as atualizações do **Grupo Mave Digital**.

:::danger Atenção
Estamos trabalhando em uma versão estável, por enquanto o sistema poderá apresentar erros.
:::

## Versão 0.2.4 - Instável

## Melhorias #1

- Agora os arquivos são exibidos na pagina.
- Agora os arquivos e pastas da pasta são retornados do backend.

## Notas de Design #1

- Correção no efeito de fade-in/fade-out do componente **DropZone**.
- Correção do icone da lixeira do componente **DropZone**.
- Adicionada nova classe para o componente de **Arquivos**.

## Correções #1

- Corrigido bug de duplicação de itens do componente **DropZone**.

## v0.1.0 - Instável

### Novos arquivos de teste

> Agora o sistema possui novos testes unitários, para que os desenvolvedores possam testar as funcionalidades do sistema com mais facilidade, e para que possam identificar erros, antes de lançar a versão estável.

### Notas de Design #2

- Melhoria no design do menu lateral
- Melhoria no tempo de animação global
- Agora os itens do menu lateral podem ser desativados

### Correções #2

- Corrigido erro no servidor **Socket.io**.
- Corrigido erro de **RegExp** dos caracteres especiais.
- Aumentado o limite para **100 MB** dos arquivos recebidos pelo **graphqlUploadExpress**.
- Corrigido erro de responsividade no componente **Alerta**.
- Corrigido erro de responsividade no componente **DropZone**.

### Segurança

- Agora o usuário pode alterar a senha da sua conta.
- Agora o usuário pode ativar a verificação de duas etapas, para logar no sistema.
- Mecanismo de **Refresh Token** implementado, agora as conexões podem durar até 7 dias.
- Sessões dos usuários expiram automaticamente após 15 minutos.
- Os tokens agora estão amarrados ao **Endereço de IP** do usuário.
- Novo mecanismo de **Assinatura** implementado na conta dos usuários. Essa assinatura é gerada automaticamente e é usada para validar os tokens de acesso, os refresh tokens entre outros recursos, que precisarão ser validados.
- Um limite de 4 conexões por usuário foi implementado.
- O usuario pode se conectar usando qualquer tipo de dispositivo.

### Notificações

- Agora o usuário pode receber notificações ao entrar em um **Endereço de IP** novo.
- Agora o usuário pode receber notificações para confirmação da conta.
- Agora o usuário pode receber notificações para recuperação da conta.
- Agora o usuário pode receber notificações para troca de senha.

### Sessões dos usuários

> Após a adição dos **Refresh Tokens**, as sessões dos usuários estavam apresentando problemas, quando uma conexão estava aberta e outra era aberta, a primeira conexão era fechada, agora o problema foi resolvido. Também refatoramos algumas partes do código, para melhorar o algoritmo.

### Mecanismo de Jobs

> O sistema agora possui um mecanismo de jobs, que são processos executados automaticamente em background. Mas esse é um recurso experimental, e que pode ser alterado a qualquer momento. Inicialmente, esse recurso foi pensado para ajudar no envio de e-mails, mas pode ser usado para qualquer tipo de processo futuro.
