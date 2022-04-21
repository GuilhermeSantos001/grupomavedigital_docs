---
sidebar_label: 📝 Instalar o Node.js
---

# 📝 O que é o Node.js?

O [Node.js](https://nodejs.org/en/) é um ambiente de execução do JavaScript criado para a programação do lado do servidor. Ele permite que os desenvolvedores criem funcionalidades de back-ends escaláveis usando o JavaScript, uma linguagem que muitos já estão familiarizados em desenvolvimento Web baseado em navegador.

## Instalar o Node.js no linux

```bash title="Terminal de Comando"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash # Isso instalará o script nvm em sua conta de usuário. Para usá-lo, você deve antes gerar seu arquivo .bashrc:

source ~/.bashrc

nvm list-remote # Lista todas as versões do node.js disponíveis
nvm install v16.13.0 # Instala a versão 16.13.0 do node.js
```

![1° Passo](https://i.imgur.com/UnGGMFA.png)
![2° Passo](https://i.imgur.com/b4YpxZ7.png)


## Instalar o npm no linux

Na maioria dos casos, também será necessário instalar o npm, o gerenciador de pacotes Node.js. Faça isso instalando o pacote npm com o apt:

```bash title="Terminal de Comando"
sudo apt-get install npm
```

## Instalar o yarn no linux

Vamos instalar o yarn, o gerenciador de pacotes Node.js mais moderno:

```bash title="Terminal de Comando"
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update
sudo apt install --no-install-recommends yarn
```

![3° Passo](https://i.imgur.com/5Kic4Yt.png)

## Referências

- [Como instalar o Git no Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04-pt)
- [How to Install Yarn on Ubuntu 20.04](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-20-04/)
- [Why yarn key update failes all the time? GPG error: https://dl.yarnpkg.com/debian stable InRelease: The following signatures couldn't be verified](https://askubuntu.com/questions/1306111/why-yarn-key-update-failes-all-the-time-gpg-error-https-dl-yarnpkg-com-debia)