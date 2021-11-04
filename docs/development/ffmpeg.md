---
sidebar_label: Instalar o ffmpeg
---

# O que é ffmpeg?

O FFMPEG é um conjunto de ferramentas de código aberto para conversão de vídeo, audio e imagem. Ele foi desenvolvido para ser usado em aplicativos de vídeo, como o [GStreamer](http://gstreamer.freedesktop.org/).

## Instalar o ffmpeg no linux

```bash title="Terminal de Comando"
sudo add-apt-repository ppa:savoury1/ffmpeg4
sudo add-apt-repository ppa:savoury1/graphics
sudo add-apt-repository ppa:savoury1/multimedia

sudo apt-get update
sudo apt-get full-upgrade

sudo apt-get install ffmpeg
ffmpeg -version
```

![1° Passo](https://i.imgur.com/AdQIR6z.png)

## Referências

- [Como instalar o FFMPEG 4.4 via PPA no Ubuntu 20.04, 18.04 e 21.04](https://www.edivaldobrito.com.br/como-instalar-o-ffmpeg-4-4-via-ppa-no-ubuntu-20-04-18-04-e-21-04/)