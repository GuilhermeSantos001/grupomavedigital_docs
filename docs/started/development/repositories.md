---
sidebar_label: 🏷 Repositórios do projeto
---

# 🏷 Como funciona o repositório do projeto?

Estamos utilizando o [git](https://git-scm.com/) para manter o código-fonte do projeto. Caso você não saiba usar o git, você pode ler o [livro](https://git-scm.com/book/pt-br/v2) oficial para entender como usar o git.

## Quais repositórios existem?

Nós dividimos o projeto em três repositórios:

[Grupo Mave Digital](https://github.com/GuilhermeSantos001/grupomavedigital)

- Repositório contendo o código fonte do projeto.

[Grupo Mave Digital - Client](https://github.com/GuilhermeSantos001/grupomavedigital_client)

- Repositório contendo o código que é responsável por renderizar o conteúdo da página. Ele é o responsável por carregar os arquivos de estilo, imagens, scripts, etc.

[Grupo Mave Digital - Docs](https://github.com/GuilhermeSantos001/grupomavedigital_docs)

- Repositório contendo o código que contém toda a nossa documentação sobre o projeto, e também nosso blog.

## Grupo Mave Digital

Os desenvolvedores nesse repositório são responsáveis por desenvolver as tecnologias de base do projeto, que serão integradas com o repositório do cliente. Além disso, eles também são responsáveis por manter o código-fonte do projeto atualizado, criando novas versões e corrigindo bugs, etc.

## Grupo Mave Digital - Client

Os desenvolvedores nesse repositório são responsáveis por desenvolver as integrações com as tecnologias de base do projeto, criando interfaces visuais para o usuário. Eles são focados em assuntos como responsividade, layout, animações, design e etc.

## Grupo Mave Digital - Docs

Os desenvolvedores nesse repositório são responsáveis por desenvolver a documentação do projeto, criando documentações para o usuário e a equipe. Eles são focados em assuntos como documentação, guias, tutoriais e etc. Também são responsáveis por manter o blog do projeto atualizado, criando novas postagens, enquetes, changelogs e etc.

## Como é feito o workflow de desenvolvimento?

Utilizamos o [gitflow](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow) para manter os repositórios do projeto atualizados. O **gitflow** nós ajuda a manter um fluxo de trabalho padronizado, isso ajuda a integrar novos membros mais facilmente ao projeto.

## Exemplo de clonagem de um repositório

Abra o seu **VSCode** e acesso o WSL, e abra o terminal, e digite:

```bash title="Terminal de Comando"
cd /home/guilherme
git clone https://github.com/GuilhermeSantos001/grupomavedigital_docs.git
```

![1° Passo](https://i.imgur.com/Y46Upc6.png)
![2° Passo](https://i.imgur.com/NcRqhOU.png)

Vamos abrir a pasta do repositório

![3° Passo](https://i.imgur.com/GwWpmye.png)

### Instale as dependências do projeto e inicie o servidor

Abra o terminal do vscode e digite:

```bash title="Terminal de Comando (VScode)"
yarn install
yarn start
```

![4° Passo](https://i.imgur.com/tGOKAo7.png)

## Conclusão

Muito bem!, agora você já sabe como instalar o **wsl**, **redis**, **nginx**, **node.js** e etc, também sabe como configura-los, fora outras coisas incriveis que aprendemos até agora. Antes de concluir nossa jornada inicial precisamos instalar o **MongoDB** e **PostgreSQL**.

## Referências

- [Fluxo de trabalho de Gitflow](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow)