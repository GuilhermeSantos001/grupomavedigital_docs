---
sidebar_label: 📝 Montagem de ligação
---

# 📝 Entenda como funciona as ligações

No capítulo anterior, falamos e usamos um volume nomeado para persistir os dados em nosso banco de dados. Volumes nomeados são ótimos se simplesmente queremos armazenar dados, pois não precisamos nos preocupar com onde os dados são armazenados.

Com bind mounts , controlamos o ponto de montagem exato no host. Podemos usar isso para persistir dados, mas geralmente é usado para fornecer dados adicionais em container. Ao trabalhar em um aplicativo, podemos usar uma montagem de ligação para montar nosso código-fonte no container para permitir que ele veja as alterações de código, responda e veja as alterações imediatamente.

Para aplicativos baseados em Node, o [nodemon](https://npmjs.com/package/nodemon) é uma ótima ferramenta para observar as alterações de arquivos e, em seguida, reiniciar o aplicativo. Existem ferramentas equivalentes na maioria das outras linguagens e frameworks.

![Ref](/img/docker/bind_mount.png)

## Criando um `Bind Mount`

> Execute o seguinte comando para iniciar o seu container

```bash
docker run -dp ${PORT_HOST}:${PORT_CONTAINER} -v ${PATH_TO_DATA_HOST}:${PATH_TO_DATA_CONTAINER} ${IMAGE_ID}
```

## Conclusão

Entendemos como ligar um diretorio do nosso computador a um container. Isso é útil para containers de ambiente de desenvolvimento, onde estamos alterando o código fonte o tempo todo e queremos ver em tempo real as alterações.

## Referências

- [Docker - Use bind mounts](https://docs.docker.com/get-started/06_bind_mounts/)
