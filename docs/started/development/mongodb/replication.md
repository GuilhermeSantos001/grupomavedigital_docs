---
sidebar_label: 💡 Replicação
---

# 💡 Implementando um conjunto de replicação

:::caution DISCLAIMER
Esse manual é indicado só para fins de estudo, você não precisa montar uma infraestrutura de produção para usar o **mongoDB**. Nós recomendamos a leitura para entender o funcionamento e o poder do **mongoDB**.
:::

Em um ambiente de desenvolvimento geralmente usamos apenas uma instância do **mongoDB**. Porém, para aplicações mais complexas, podemos usar um cluster de replicação. Os nós de replicação são conectados ao nó primário, que é o nó que é o ponto de partida para a replicação. Para entender o motivo para se usar um cluster de replicação, vamos começar com um exemplo simples, você precisa manter os dados sempre disponíveis e seus clientes não pode sofrer perda de dados por motivos de falhas no servidor, por exemplo, quedas de energia, falha de rede e etc. Então você monta uma infraestrutura com mais de um servidor, e agora você tem dois servidores que precisam se comunicar e compartilhar dos mesmos dados, pois se acontecer qualquer coisa um ou o outro pode assumir a responsabilidade e continuar o trabalho com os dados, isso é obrigatório quando falamos de infraestrutura de produção, mas depende do investimento da empresa, na maioria dos casos vamos encontrar estrutura com apenas um servidor, pois a empresa assumi o risco com a perda de dados. Agora você deve está se perguntando, "Ta entendi, então vou precisar de dois servidores e eles por logica, precisam está isolados um do outro, ou seja, em infraestruturas diferentes, mas ainda sim precisam se comunicar? Como eu faço isso?" Isso mesmo, os dois precisam está isolados, mas se comunicando, nessa parte entra DNS, VPN e outras coisas que podem ser mais complexas, por esse motivo, sempre vem a pergunta, estamos falando de redes locais, ou redes remotas? lembrando que redes remotas tem oscilação e não são indicadas para implementar servidores de banco de dados, que precisam de baixa latência, pois os dados não podem ser perdidos por conta do ping entre os dois servidores, por esse fator, essa é uma infraestrutura muito cara e complexa, porem temos uma alternativa que são os servidores **cloud**, eles fornecem exatamente isso por um custo fixo ao mês, então você pergunta, por quê devo usar um servidor local? Depende do orçamento da empresa, estamos falando de um custo variável ao mês, pois depende da escalabilidade do servidor, ou seja, se o servidor for muito grande, o custo será mais alto, mas se for muito pequeno, o custo será mais baixo, então imagine a infraestrutura do **Facebook**, **Google**, **Linkedin**, **Youtube**, entre outros grandes nomes do mercado, posso dizer que seria um custo ao mês de muitos milhões, o que faria a empresa ter todo seu orçamento voltado a **TI**, logico que essas empresa optam por infraestruturas locais, podemos ver os datacenters gigantescos que atendem as vezes continentes inteiros.

Agora que entendemos o motivo de usar replicação, iniciamos nossos estudos. Usaremos uma rede local simples, poderíamos até usar máquinas virtuais, mas como não queremos ser levianos, e não abordaremos máquinas virtuais nesse manual, usaremos a mesma máquina com 3 instâncias do **mongoDB**, lembrando que 3 instâncias é o recomendado no **mongoDB**, mas isoladas em outro hardware.

## Instando o openssl

Iremos precisar do **openssl** para gerar um **arquivo-chave** que será usado para autenticação com as instâncias do mongo.

:::caution DISCLAIMER
Como estamos em um ambiente windows 10, usaremos o openssl que vem junto ao git.
:::

Abra o **Git Bash**, e escolha um diretório para salvar o arquivo.

![1° Passo](https://i.imgur.com/bahKnUO.png)

> Eu escolhi criar uma pasta para o openssl nos documentos

```bash title="Git Bash"
$ cd Documents/
$ mkdir openssl
$ cd openssl/
```

![2° Passo](https://i.imgur.com/r5SpsG7.png)

Vamos criar a chave usando o comando:

```bash title="Git Bash"
$ openssl rand -base64 756 > mongoDBKey
```

> Para ver o conteúdo do arquivo, use o nano.

```bash title="Git Bash"
$ nano mongoDBKey
```

![3° Passo](https://i.imgur.com/coyDsh2.png)

> Para sair do nano use o comando: **Ctrl + X**.

:::info Arquivo Chave
Você precisará do arquivo chave para autenticar as instâncias do mongoDB, ou seja, é preciso que todas as instâncias tenham uma copia do arquivo.
:::

## Criando as pastas de dados

Cada instância do mongo utilizará um local diferente para salvar os dados, então vamos criá-los.

> Eu criei uma pasta chamada **mongodb_replication** e criei 3 pastas chamadas **db_1**, **db_2** e **db_3**, dessa forma fica muito fácil saber qual instância usa cada pasta.

![4° Passo](https://i.imgur.com/urxTVFR.png)

## Iniciando as instâncias

Agora que já temos tudo o que vamos precisar, vamos iniciar as instância do mongo.

:::danger Pare o serviço do mongoDB
Antes de começar, pare o serviço do mongoDB, pois ele pode estar rodando, e essa instância padrão não será usada, mas ficará consumindo recursos de hardware.
:::

> Para abrir a aba de serviços no windows, use o comando: **Ctrl + R** e digite **services.msc**.

![5° Passo](https://i.imgur.com/ZWDPmLK.png)

Com o mongoDB parado, vamos iniciar as instâncias, precisamos abrir um terminal para cada instância, ou seja, serão três terminais abertos.

:::tip Abra os terminais como administrador
Para evitar problemas abra os terminais como administrador.
:::

:::tip Abra em uma área de trabalho separada
O windows 10 tem um recurso onde podemos trabalhar com diversas abas de trabalho, para abrir uma nova aba de trabalho, use o comando: **Ctrl + Windows + D**.
:::

> Você pode navegar fácilmente entre as abas de trabalho usando o comando: **Ctrl + Windows + Setas(Direita, Esquerda**), para fechar a aba use o comando: **Ctrl + Windows + F4**.

![6° Passo](https://i.imgur.com/aD8dhkj.png)

> Deixe todos os terminais apontando para o caminho **bin** do **MongoDB**.

![7° Passo](https://i.imgur.com/18z7wMg.png)

No primeiro terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --replSet rs0 --port 27017 --bind_ip localhost --dbpath E:\mongodb_replication\db_1 --oplogSize 128
```

No segundo terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --replSet rs0 --port 27018 --bind_ip localhost --dbpath E:\mongodb_replication\db_2 --oplogSize 128
```

No terceiro terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --replSet rs0 --port 27019 --bind_ip localhost --dbpath E:\mongodb_replication\db_3 --oplogSize 128
```

![8° Passo](https://i.imgur.com/Xv5RqEI.png)

Agora vamos abrir outro terminal para acessar nosso cluster, ele deve está apontando para a pasta **bin** do **MongoDB**.

> Abra a primeira instância do mongo com o comando:

```bash title="Terminal de Comando"
$ mongo --port 27017
```

![9° Passo](https://i.imgur.com/9LyUJx4.png)

Agora vamos iniciar nossa replicação com o seguinte comando:

```bash title="Terminal de Comando"
$ rs.initiate({
  _id: "rs0",
  members: [
    {
     _id: 0,
     host: "localhost:27017"
    },
    {
     _id: 1,
     host: "localhost:27018"
    },
    {
     _id: 2,
     host: "localhost:27019"
    }
   ]
})
```

:::caution Configuração básica
Nós não passamos nenhuma configuração adicional a nossas instancias, ou seja, elas ficarão com as configurações padrões. O mongoDB fornece um [conjunto de configurações avançadas](https://docs.mongodb.com/manual/reference/replica-configuration/#mongodb-rsconf-rsconf.members-n-.votes) em sua documentação, recomendamos a leitura dessas configurações, é possivel realizar muitas coisas legais!
:::

![10° Passo](https://i.imgur.com/LFRhg9z.png)

Você pode ver a configuração do servidor de replicação usando o comando:

```bash title="Terminal de Comando"
$ rs.conf()
```

![11° Passo](https://i.imgur.com/745M8mh.png)

Certo, já temos nosso cluster funcionando, agora vamos acessar pelo **MongoDB Compass**.

## Acessar o conjunto de replicas

> Para acessar o seu conjunto de replicas use a **uri**: **mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0**

![12° Passo](https://i.imgur.com/kfQoyOM.png)

Perfeito, agora iremos adicionar uma segurança a nosso cluster.

## Adicionando uma segurança

Desligue as instância do mongoDB, teremos que inicia-las usando um novo comando **--keyFile**.

> Para desligar a instância do mongoDB, use o comando: **Ctrl + C** e aguarde até que a mesma encerre, não fique apertando varias vezes o **Ctrl + C**, pois o mongo executa algumas tarefas antes de desligar os membros do cluster.

:::danger Encerramento forçado
Com exceção do último membro restante do cluster que talvez precise ser fechado de forma forçada, os outros membros do cluster devem ser encerrados normalmente, eles não demoram mais que 10 segundos para encerrar, após dar o comando **Ctrl + C**.
:::

:::info Arquivo Chave
Lembra do nosso arquivo chave que criamos com openssl? Então vamos usa-lo agora!
:::

Suba-as instâncias novamente com o comando:

No primeiro terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --keyFile C:\Users\administrator\Documents\openssl\mongoDBKey --replSet rs0 --port 27017 --bind_ip localhost --dbpath E:\mongodb_replication\db_1 --oplogSize 128
```

No segundo terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --keyFile C:\Users\administrator\Documents\openssl\mongoDBKey --replSet rs0 --port 27018 --bind_ip localhost --dbpath E:\mongodb_replication\db_2 --oplogSize 128
```

No terceiro terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --keyFile C:\Users\administrator\Documents\openssl\mongoDBKey --replSet rs0 --port 27019 --bind_ip localhost --dbpath E:\mongodb_replication\db_3 --oplogSize 128
```

![13° Passo](https://i.imgur.com/nFEOQd1.png)

Abra o terminal e acesse o mongo com o comando:

```bash title="Terminal de Comando"
$ mongo --port 27017
```

Agora precisamos descobrir quem é o membro primario do cluster, para isso vamos usar o comando:

```bash title="Terminal de Comando"
$ rs.status()
```

![14° Passo](https://i.imgur.com/tpKOzbn.png)

> No meu caso é a instância da porta: 27018

:::tip DICA
Para sair do mongo use o comando: **exit**
:::

Vamos acessar o membro primario do cluster, para isso vamos usar o comando:

```bash title="Terminal de Comando"
$ mongo --port PORTA
```

Para criar um usuario no cluster, use o comando:

```
$ admin = db.getSiblingDB("admin")
$ admin.createUser(
  {
    user: "guilherme",
    pwd: "123@456#",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

![15° Passo](https://i.imgur.com/8Dwt79T.png)

:::caution
Crie senhas longas e dificeis de adivinhar, pois elas serão usadas para acessar o mongoDB. Não use a senha usada nesse manual.
:::

Assim que o primeiro usuario for criado o mongo, tornará as operações autenticadas, então você pode logar com seu usuario com o comando:

```bash title="Terminal de Comando"
$ db.getSiblingDB("admin").auth("guilherme", "123@456#")
$ show dbs # Operação que exige autenticação
```

![16° Passo](https://i.imgur.com/ehzUcgf.png)

> Se você foi esperto e tentou usar comandos de replicação percebeu o seguinte retorno:

![17° Passo](https://i.imgur.com/u2y4vNo.png)

Isso porque o mongo exige que o usuario tenha privilegios de **clusterAdmin**, então vamos criar outro usuario só que dessa vez, um que tenha os privilegios de **clusterAdmin**.

:::tip
Você pode alterar os privilegios do usuario que criamos, leia mais [aqui](https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/).
:::

```bash title="Terminal de Comando"
$ db.getSiblingDB("admin").createUser(
  {
    "user" : "clusterMaster",
    "pwd" : "123",
    roles: [ { "role" : "clusterAdmin", "db" : "admin" } ]
  }
)
```

![18° Passo](https://i.imgur.com/3yeR6yF.png)

Agora só logar com o usuario **clusterMaster** e usar os comandos de replicação.

![19° Passo](https://i.imgur.com/nVWcn1r.png)

## Conclusão

Parabéns, você conseguiu criar um cluster de replicação com mongoDB! Antes de encerrar, vamos acessar o nosso cluster com o **MongoDB Compass**. Recomendamos que você leia a documentação do **MongoDB** para aprender mais sobre seus recursos.

:::caution URL Encode
Como o **MongoDB** utiliza urls de conexão iremos precisar converter caracteres especiais de nossas senhas, para isso use o site [urlencode](https://www.urlencoder.org/).
:::

![20° Passo](https://i.imgur.com/1ObogTJ.png)

Use a url abaixo para acessar o nosso cluster:

> **mongodb://guilherme:123%40456%23@localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0**

![21° Passo](https://i.imgur.com/WLdEdhe.png)

:::caution Atenção
Algumas funções do **MongoDB Compass** exigem autenticação com o usuario que tenha privilegios de **clusterAdmin**.
:::

## Referências

- [Como instalar o OpenSSL no windows 10?](https://qastack.com.br/programming/50625283/how-to-install-openssl-in-windows-10)
- [Implantar conjunto de réplicas com autenticação de arquivo de chave](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-with-keyfile-access-control/#std-label-deploy-repl-set-with-auth)
- [Implantar um conjunto de réplicas para produção](https://docs.mongodb.com/manual/tutorial/deploy-replica-set/)
- [Implantar um conjunto de réplicas para teste e desenvolvimento](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-for-testing/)
- [Solução de problemas de conjuntos de réplicas](https://docs.mongodb.com/manual/tutorial/troubleshoot-replica-sets/#std-label-replica-set-troubleshooting-check-connection)
- [Configuração do conjunto de réplicas](https://docs.mongodb.com/manual/reference/replica-configuration/#mongodb-rsconf-rsconf.members-n-.votes)
- [Configurar membro do conjunto de réplicas sem direito a voto](https://docs.mongodb.com/manual/tutorial/configure-a-non-voting-replica-set-member/)
- [Tutoriais de implantação do conjunto de réplicas](https://docs.mongodb.com/manual/administration/replica-set-deployment/)
- [Connection String URI Format](https://docs.mongodb.com/manual/reference/connection-string/#connection-string-uri-format)
- [URL Enconde/Decode](https://www.urlencoder.org/)
