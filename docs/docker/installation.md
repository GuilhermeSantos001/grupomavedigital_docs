---
sidebar_label: 📝 Instalação
---

# 📝 O que é Docker?

> O Docker é uma plataforma aberta para desenvolvimento, envio e execução de aplicativos. O Docker permite que você separe seus aplicativos de sua infraestrutura para que você possa entregar software rapidamente. Com o Docker, você pode gerenciar sua infraestrutura da mesma forma que gerencia seus aplicativos.

## Diferença entre Docker e maquinas virtuais

Normalmente associamos o docker a um software de hypervisor, como o VirtualBox, Hyper-V e Proxmox. Mas, existe uma diferença na arquitetura do Docker e da arquitetura de máquinas virtuais.

![Ref](/img/docker/vm_x_docker.png)

> A diferença fica clara na abstração de máquinas virtuais para a abstração do docker. Enquanto comumente nossa aplicação fica sobre um sistema operacional, sendo executado dentro de uma virtualização, o docker permite rodar nossa aplicação sobre um contexto isolado dentro do mesmo sistema operacional, usando a engine de containers, o docker consegue responder aos requisitos de execução dos aplicativos, por exemplo, nosso aplicativo pode perguntar ao sistema quanto tem de memória disponível, o docker consegue responder a isso, diferente de uma virtualização tipica onde os recursos são limitados e isolados no contexto da virtualização, o docker dinamicamente sem configurações previas, responde as necessidades de execução do aplicativo.

:::info Você está pronto!
Agora que entendermos o conceito básico do docker, vamos entender como instalar o docker no nosso sistema.
:::

## Instalando o Docker

Vá até o [site oficial](https://docs.docker.com/engine/install/) e escolha o manual de instalação do seu sistema operacional, em nosso caso, o [Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntu/).

:::caution Atenção
Iremos pular o primeiro passo, pois não temos nenhuma versão do docker instalada previamente.
:::

- 1. Configurar o repositório do docker
  - 1.1. Atualize o índice de pacotes do apt e instale os pacotes para permitir que o apt use um repositório sobre HTTPS:

  ```bash
  sudo apt-get update
  sudo apt-get install \
      ca-certificates \
      curl \
      gnupg \
      lsb-release
  ```

  - 1.2. Adicione a chave GPG oficial do Docker:

  ```bash
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  ```

  - 1.3. Use o seguinte comando para configurar o repositório:

  ```bash
  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  ```

- 2. Instalar a engine do docker
  - 2.1. Atualize o índice do pacote apt e instale a versão mais recente do Docker Engine, containerd e Docker Compose ou vá para a próxima etapa para instalar uma versão específica:

  ```bash
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
  ```

- 3. Adicionar um usuário ao grupo do docker

> Para executar a os comandos do docker, você precisa ser um usuário do grupo docker. Para isso, use o comando:

```bash
sudo usermod -aG docker $USER
```

:::tip Dica
Se você quiser ver os grupos do sistema no linux use o seguinte comando:

```bash
cat /etc/group
```

:::

## Conhecendo o `Dockerfile`

O arquivo `Dockerfile` é um arquivo de configuração que define o que será executado no container.

Veja o seguinte exemplo:

```dockerfile
FROM ubuntu:22.04

# Print welcome message
RUN echo "\033[1;42m\033[40mWelcome to team \"Lack Zillions Over\" \n\rThis process can take several minutes, please do not close this window or turn off your computer.\n\r"

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Set debconf to run non-interactively
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Install base dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
        apt-transport-https \
        apt-utils \
        build-essential \
        ca-certificates \
        curl \
        git \
        libssl-dev \
        wget \
        gnupg2 \
        lsb-release \
        software-properties-common \
    && rm -rf /var/lib/apt/lists/*

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 16.15.1

# Install the latest version of Node.js
RUN mkdir $NVM_DIR
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

# Install the latest version of Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor -o /usr/share/keyrings/pubkey.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/pubkey.gpg] https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/pubkey.list
RUN apt-get update; apt-get install --no-install-recommends yarn

# Install the latest version of NPM
RUN apt-get install -y npm

# Install the latest version of Node-GYP
RUN npm install -g node-gyp

# Install the latest version of Python
RUN apt-get update; apt-get install -y python3-pip

# Set path of python
RUN npm config set python /usr/bin/pydoc3.10

# Install the latest version of FFMPEG
RUN apt-get install -y ffmpeg

# Go to location ~/app
WORKDIR /app

# Define the environments variables
ENV NODE_ENV development

# Copy the necessary's paths and files
COPY . .

# Install dependencies of project
RUN yarn install

# Run code after start container
CMD ["yarn", "dev"]
```

Vamos entender mais a fundo cada comando apresentado.

- 1. `FROM`
O docker parte de um principio ou seja uma base, a arquitetura inicial seja ela um ubuntu 22.04 sem modificações ou um ubuntu 22.04 com nginx já instalado, o from indica qual a imagem estamos nos baseando.

- 2. `RUN`
Esse comando permite executar `Comandos` que por padrão serão executados no `sh`ou em `bash`, e sim estamos falando de executar comandos no terminal do container.

- 3. `ENV`
Usamos esse comando para definir variaveis de ambiente, que serão usadas pelo container e em nosso arquivo de configuração(`Dockerfile`).

- 4. `WORKDIR`
Esse comando define o diretório de trabalho do container, ou seja, o diretório onde o container vai executar os comandos subsequentes.

- 5. `COPY`
Esse comando permite copiar arquivos ou diretórios de um diretório do host para o diretório do container.

- 6. `CMD`
Esse comando define o comando que será executado no container após o início do mesmo.

:::danger Cuidado
Preste muita atenção a ordem de execução dos comandos, por exemplo, se você quiser executar comandos como um `ls` ou`mkdir`, você precisa primeiro definir o diretorio que esses comandos serão refletidos no container. O comando para definir o diretorio é o `WORKDIR`.
:::

O exemplo apresentado a cima faz parte do projeto de teste que você pode [baixar aqui](https://1drv.ms/u/s!AjlK2NQ2IQgmi7c0Vuq_5Lle0YEsSg?e=9hAq1F).

## Conhecendo o `.dockerignore`

Esse arquivo tem a mesma função de um `.gitignore` e é usado para definir quais arquivos e pastas serão ignorados pelo docker.

Veja o seguinte exemplo:

```.dockerignore
node_modules/
.git
.gitignore
```

## O que é `Registry`?

Registry é um repositório de imagens que é responsável por armazenar as imagens que serão usadas no docker, eles podem ser públicos ou privados. Por exemplo, se você quiser usar uma imagem do [docker hub](https://hub.docker.com/), você precisa baixar a imagem do docker hub e colocar no seu repositório de imagens local.

### Docker Hub

Registry público oficial do docker, lá você encontra uma grande quantidade de imagens oficiais para usar no seu docker, por exemplo, node, ubuntu, nginx, mysql, mongodb e etc.

## Comandos fundamentais do Docker

- 1. `docker images`
Lista as imagens locais que estão no seu computador.
- 2. `docker ps`
Lista os containers que estão sendo executados.
  - 2.1. `docker ps -a`
  Lista todos os containers incluindo os que não estão sendo executados.
- 3. `docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERFILE_PATH} --rm`
Comando usado para montar a imagem no docker.
- 4. `docker run -dp ${PORT}:${PORT} ${IMAGE_ID}`
Executa o container com a imagem ${IMAGE_ID}, escutando a porta ${PORT}
- 5. `docker logs ${CONTAINER_ID} -f`
Mostra o log do container ${CONTAINER_ID} em tempo real.
- 6. `docker exec ${CONTAINER_ID} ${command}`
Executa o comando ${command} no container ${CONTAINER_ID}.
  - 6.1 `docker exec -it ${CONTAINER_ID} bash`
  Acessa o container ${CONTAINER_ID} pelo terminal, semelhante a um `ssh`.
- 7. `docker ps -a -q --filter ancestor=${IMAGE_NAME}:${IMAGE_TAG}`
Exibe todos os IDs dos containers filtrados pela imagem ${IMAGE_NAME}:${IMAGE_TAG}.
- 8. `docker rm $(docker stop $(docker ps -a -q --filter ancestor=${IMAGE_NAME}:${IMAGE_TAG} --format="{{.ID}}"))`
Encadeia os comandos `docker rm` usado para remover um container, `docker stop` usado para parar a execução do container e `docker ps -a -q --filter ancestor=${IMAGE_NAME}:${IMAGE_TAG} --format="{{.ID}}"` para obter o ID dos containers filtrados pela imagem ${IMAGE_NAME}:${IMAGE_TAG}.

:::tip Dica
Encorajamos você a estudar os comandos mais a fundo e efetuar os exercícios de forma apropriada.
Segue a documentação oficial dos comandos [aqui](https://docs.docker.com/engine/reference/commandline/cli/).
:::

## Conclusão

Agora você entende o básico do `Docker` e tem condições para começar a usar o mesmo. O proximo passado é entender como persistir dados em um container.

## Referências

- [@Mateus Muller - TUDO O QUE VOCÊ PRECISA SABER PARA COMEÇAR COM DOCKER](https://youtu.be/RE31GWJGkwA)
