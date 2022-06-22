---
sidebar_label: 📝 Rede de containers
---

# 📝 Entenda como fazer um container se comunicar com o outro

Até este ponto, trabalhamos com aplicativos de container único. Mas agora queremos adicionar o MySQL à pilha de aplicativos. A seguinte pergunta geralmente surge - “Onde o MySQL será executado? Instalá-lo no mesmo container ou executá-lo separadamente?” Em geral, cada container deve fazer uma coisa e fazê-lo bem. Alguns motivos:

- Há uma boa chance de você ter que dimensionar APIs e front-ends de maneira diferente dos bancos de dados
- containers separados permitem versão e atualização de versões isoladamente
- Embora você possa usar um container para o banco de dados localmente, talvez queira usar um serviço gerenciado para o banco de dados em produção. Você não deseja enviar seu mecanismo de banco de dados com seu aplicativo.
- A execução de vários processos exigirá um gerenciador de processos (o container inicia apenas um processo), o que adiciona complexidade à inicialização/desligamento do container

:::caution Atenção
Lembre-se que os containers, por padrão, são executados de forma isolada e não sabem nada sobre outros processos ou containers na mesma máquina. Então, como permitimos que um container converse com outro? A resposta é rede . Agora, você não precisa ser um engenheiro de rede (viva!). Apenas lembre-se desta regra...
:::

## Criando nossa rede

- 1. Devemos primeiro criar nossa rede de containers usando o seguinte comando `docker network create ${NETWORK_NAME}`
- 2. Agora devemos iniciar nosso container com a nossa nova rede `docker run -d --network ${NETWORK_NAME} --network-alias ${NETWORK_ALIAS} -v ${VOLUME_NAME}:${VOLUME_PATH} ${IMAGE_ID}`

## Conectando um container a nossa rede

Agora que sabemos que nosso container está funcionando, vamos usá-lo! Mas, a questão é... como? Se executarmos outro container na mesma rede, como encontraremos o container (lembre-se de que cada container tem seu próprio endereço IP)? Para descobrir isso, usaremos o container nicolaka/netshoot , que é fornecido com muitas ferramentas úteis para solucionar ou depurar problemas de rede.

- 1. Inicie um novo container usando a imagem nicolaka/netshoot. Certifique-se de conectá-lo à mesma rede.

```bash
docker run -it --network todo-app nicolaka/netshoot
```

- 2. Dentro do container, vamos usar o comando `dig`, que é uma ferramenta DNS útil. Vamos procurar o endereço IP para o nome do host ${NETWORK_ALIAS}

```bash
dig ${NETWORK_ALIAS}
```

> Você verá uma saída em seu terminal semelhante a essa:

```bash
; <<>> DiG 9.14.1 <<>> ${NETWORK_ALIAS}
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 32162
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;${NETWORK_ALIAS}. IN A

;; ANSWER SECTION:
;${NETWORK_ALIAS}. 600 IN A 172.23.0.2

;; Query time: 0 msec
;; SERVER: 127.0.0.11#53(127.0.0.11)
;; WHEN: Tue Oct 01 23:47:24 UTC 2019
;; MSG SIZE  rcvd: 44
```

Na “SEÇÃO DE RESPOSTAS”, você verá um `registro A` para ${NETWORK_ALIAS} essa resolução `172.23.0.2` (seu endereço IP provavelmente terá um valor diferente). Embora ${NETWORK_ALIAS} normalmente não seja um nome de host válido, o Docker conseguiu resolvê-lo para o endereço IP do contêiner que tinha esse alias de rede (lembra do sinalizador `--network-alias` que usamos anteriormente?).

## Conclusão

Por fim, entendemos o funcionamento básico do docker, esse já o suficiente para qualquer iniciante.

> O resto é com você, boa sorte!

## Referências

- [Docker - Multi Container](https://docs.docker.com/get-started/07_multi_container/)
