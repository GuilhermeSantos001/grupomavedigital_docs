---
sidebar_label: 📝 Persistência de dados
---

# 📝 Entenda como são tradados os dados em um container

Cada container começa a partir da definição da imagem toda vez que é iniciado. Embora os containeres possam criar, atualizar e excluir arquivos, essas alterações são perdidas quando o container é removido e todas as alterações são isoladas nesse container.

![Ref](/img/docker/shared_persist_data_with_volume.png)

## Criando um `Volume`

Pense em um volume nomeado simplesmente como um bucket de dados. O Docker mantém a localização física no disco e você só precisa lembrar o nome do volume. Toda vez que você usar o volume, o Docker garantirá que os dados corretos sejam fornecidos.

- 1. Crie um volume usando o comando

```bash
docker volume create ${VOLUME_NAME}
```

- 2. Inicie o container usando o comando

```bash
docker run -dp ${PORT_HOST}:${PORT_DOCKER} -v ${VOLUME_NAME}:${VOLUME_PATH} ${IMAGE_ID}
```

:::caution Atenção
Embora volumes nomeados e montagens de ligação sejam os dois principais tipos de volumes suportados por uma instalação padrão do mecanismo Docker, há muitos plug-ins de driver de volume disponíveis para oferecer suporte a NFS, SFTP, NetApp e muito mais! Isso será especialmente importante quando você começar a executar containers em vários hosts em um ambiente clusterizado com Swarm, Kubernetes, etc.
:::

## Conclusão

Entendemos como os dados são persistidos em um container e a importância dos volumes.

## Referências

- [Docker - Persisting Data](https://docs.docker.com/get-started/05_persisting_data/)
- [@LINUXtips - TUDO O QUE VOCÊ PRECISA SABER SOBRE DOCKER EM 2022](https://youtu.be/MeFyp4VnNx0)
