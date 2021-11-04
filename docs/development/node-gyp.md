---
sidebar_label: Instalar o node-gyp
---

# O que é node-gyp?

node-gyp é uma ferramenta de linha de comando de plataforma cruzada escrita em Node.js para compilar módulos addon nativos para Node.js. Ele contém uma cópia vendida do projeto gyp-next que foi usado anteriormente pela equipe do Chromium, estendido para oferecer suporte ao desenvolvimento de complementos nativos do Node.js.

Observe que o node-gyp não é usado para construir o próprio Node.js.

Várias versões de destino do Node.js são suportadas (ou seja, 0,8, ..., 4, 5, 6, etc.), independentemente de qual versão do Node.js está realmente instalada em seu sistema (node-gyp baixa os arquivos de desenvolvimento necessários ou cabeçalhos para a versão de destino).

## Instalar o node-gyp no linux

Abra seu terminal do ubuntu e digite:

```bash title="Terminal de Comando"
npm install -g node-gyp
```

## Instalar o Python no linux

```bash title="Terminal de Comando"
sudo apt-get update
sudo apt-get install python3-pip
python3 -V
```

## Instalar o G++ the C++ compiler no linux

```bash title="Terminal de Comando"
sudo apt-get install build-essential
g++ --version
```

## Definir caminho do executavel do python para o npm

```bash title="Terminal de Comando"
npm config set python /usr/bin/pydoc3.8
```

## Referências

- [Como Instalar Python no Ubuntu 18.04 Com a Ferramenta Pip](https://www.hostinger.com.br/tutoriais/como-instalar-python-ubuntu?ppc_campaign=google_performance_max&gclid=Cj0KCQjw_fiLBhDOARIsAF4khR11KPDn3hrxeucNHPhWAhuqfSyJIsJEnTGaJ1Zw809dNxyRZfRhkqAaAj3WEALw_wcB)
- [How to install G++ the C++ compiler on Ubuntu 20.04 LTS Focal Fossa Linux](https://linuxconfig.org/how-to-install-g-the-c-compiler-on-ubuntu-20-04-lts-focal-fossa-linux)