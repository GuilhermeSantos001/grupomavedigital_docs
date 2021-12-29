---
sidebar_label: 💡 Acessar o WSL
---

# 💡 Acesso direto ao WSL

O vscode permite acessar remotamente o WSL, o que facilita muito o desenvolvimento e os testes no linux.

## Acessar

Abra o vscode e navegue para a aba de **"Explorador Remoto"** e clique com o botão direito em **"Ubuntu"** e selecione **"Connect to WSL"**

![1° Passo](https://i.imgur.com/inqhkvr.png)

Será aberto outra janela do vscode com o WSL já conectado, você deverá esperar a conexão ser estabelecida.

## Extensões

Você deve instalar as extensões para o WSL.

![2° Passo](https://i.imgur.com/yRemls6.png)

## Configure o GIT

O git já está instalado no seu WSL, para conferir a versão do git use o comando:

Abra o terminal no vscode usando: **Ctrl + J**

```bash title="Terminal de Comando (VSCode)"
git --version
```

![3° Passo](https://i.imgur.com/vykDD2N.png)

Agora você deve passar seu nome e e-mail para que o git possa usa-los em commits.

```bash title="Terminal de Comando (VSCode)"
git config --global user.name "Nome do usuário"
git config --global user.email "youremail@domain.com"
```

![4° Passo](https://i.imgur.com/sE7IFGT.png)

A informação que digitou está armazenada no seu arquivo de configuração do Git, que você pode editar manualmente de maneira opcional com um editor de texto como este (usaremos o nano):

```bash title="Terminal de Comando (VSCode)"
nano ~/.gitconfig
```

![5° Passo](https://i.imgur.com/SkNq1h2.png)

Pressione CTRL e X, em seguida Y e então ENTER para sair do editor de texto.

Há muitas outras opções que é possível definir, mas essas duas são necessárias. Se pular este passo, provavelmente verá avisos quando colocar o Git em funcionamento.

## Considerações

### Posso continuar somente no windows?

Você pode continuar o desenvolvimento somente no windows ou no linux, como mencionamos anteriormente, estamos trabalhando para produzir materiais que sejam uteis para ambos.