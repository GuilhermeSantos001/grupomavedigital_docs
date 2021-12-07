---
sidebar_label: Instalação
---

# O que é o mongoDB?

MongoDB é um banco de dados relacional, com foco em velocidade e escalabilidade. Nós usamos o mongoDB em diversos módulos no projeto, mas ele não é uma **Bala de Prata**, por isso não encorajamos nossos colaboradores a utiliza-lo em qualquer módulo, isso deve ser analisado e avaliado por todos os membros da equipe.

:::caution Disclaimer
Nós utilizaremos nesse manual o **MongoDB** no **windows 10**, pois estamos simulando o ambiente do **Windows Server**, se você deseja usar o **MongoDB** em um ambiente **Linux**, você precisará buscar por manuais a parte.
:::

## Instalação

### Baixar

Para começar vamos até o site oficial do [MongoDB](https://www.mongodb.com/try/download/community), iremos utilizar a versão **Community Server**.

![1° Passo](https://i.imgur.com/aWEVuiK.png)

:::info MSI
Instalador padrão do **MongoDB Community Server**, indicado quando ainda não se tem o mesmo no computador.
:::

:::info ZIP
Arquivo contendo as pastas essenciais de funcionamento do **MongoDB Community Server**, indicado quando já tem o mesmo no computador.
:::

:::caution Atenção com a sobreposição da pasta bin
Você deve tomar cuidado para não sobrescrever o arquivo(**mongod.cfg**) de configuração do **MongoDB**.
:::

### Executar o instalador

Após baixar o instalador, vamos executá-lo.

![2° Passo](https://i.imgur.com/0fUP6y3.png)
![3° Passo](https://i.imgur.com/c50ctKZ.png)
![4° Passo](https://i.imgur.com/glFo4tU.png)

> Selecione a opção **Custom**.

![5° Passo](https://i.imgur.com/xd974H4.png)
![6° Passo](https://i.imgur.com/sfftAiO.png)

> Se você tiver usando mais de um HD no seu computador, você pode mudar o diretório da data e log.

![7° Passo](https://i.imgur.com/cjgelKL.png)

> Deixe marcada a opção para instalar o [mongoDB Compass](https://www.mongodb.com/try/download/compass).

![8° Passo](https://i.imgur.com/pTfTtzh.png)
![9° Passo](https://i.imgur.com/YfiDJB5.png)
![10° Passo](https://i.imgur.com/SlHHC17.png)
![11° Passo](https://i.imgur.com/Q3FFFep.png)
![12° Passo](https://i.imgur.com/I9LuDnt.png)
![13° Passo](https://i.imgur.com/qVedkDQ.png)

> Instalação concluída.

## Habilitar a autenticação

Após instalar vamos habilitar a autenticação, abra o terminal de comando como administrador.

![14° Passo](https://i.imgur.com/qKycs4j.png)

```bash title="Terminal de Comando"
cd C:\Program Files\MongoDB\Server\5.0\bin
```

![15° Passo](https://i.imgur.com/AIi8CYs.png)

> Execute o comando **cd** para ir até o diretorio **bin** do mongoDB.

Com o mongoDB em execução execute o comando

```bash title="Terminal de Comando"
mongo --port 27017 # Abre o shell do mongoDB
```

![16° Passo](https://i.imgur.com/fzBinde.png)

> Vamos acessar a **database**: **admin**, e criar um novo usuário com privilégios de **admin**.

```bash title="Terminal de Comando"
use admin
db.createUser(
  {
    user: "DIGITE_NOME_DE_USUARIO",
    pwd: "DIGITE_SUA_SENHA",
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" },
      { role: "readWriteAnyDatabase", db: "admin" }
    ]
  }
)
```

![17° Passo](https://i.imgur.com/QTWwthg.png)

:::danger Senhas devem ser difíceis de adivinhar
Não use a senha mostrada na imagem a cima.
:::

Vamos abrir o gerenciador de serviços do **Windows**.

![18° Passo](https://i.imgur.com/MMQCAIs.png)

> Procure pelo **MongoDB Server (MongoDB)** e pare o serviço.

![19° Passo](https://i.imgur.com/BFEQ8Hi.png)

## Configuração

Abra o arquivo **mongod.cfg** de configuração do **MongoDB**.

:::caution Arquivo está alterado
Eu alterei o diretório de dados e log, então o seu arquivo vai está diferente.
:::

:::tip Usar o notepad++
Você pode usar o [notepad++](https://notepad-plus-plus.org/download/) para editar o arquivo.
:::

```conf {28-29} title="/bin/mongod.cfg"
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: E:\mongodb_data\data
  journal:
    enabled: true
#  engine:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path:  E:\mongodb_data\log\mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1


#processManagement:

security:
    authorization: enabled

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:
```
Inicie o serviço do **MongoDB** novamente e acesso o terminal de comando novamente.

![20° Passo](https://i.imgur.com/gHAdgE5.png)

> Agora se acessar o shell do mongo novamente, e tentar deletar o usuário que criamos, ocorrerá uma falha de autenticação.

:::info Acesse usando suas credenciais
Para acessar o shell do mongoDB, você pode executar o comando abaixo.
```bash title="Terminal de Comando"
mongo -u "DIGITE_NOME_DE_USUARIO" -p "DIGITE_SUA_SENHA"
```
:::

## Usando o MongoDB Compass

Se você seguiu o manual então o compass foi instalado, caso contrário baixe e instale [MongoDB Compass](https://www.mongodb.com/try/download/compass).

![21° Passo](https://i.imgur.com/h3x6e9H.png)

> Clique em **Fill in connection fields individually**, você verá uma nova tela para preencher os campos, bem o **Hostname** e **Port** irão se manter, pois são os padrões, e no momento não iremos acessar um servidor remoto do mongoDB, vamos alterar o modo de **Authentication** para **SCRAM-SHA-256**, coloque seu nome de usuário e senha, depois clique em **Connect**.

![22° Passo](https://i.imgur.com/Uh6l8LR.png)
![22° Passo](https://i.imgur.com/czbYsbf.png)

> Perfeito, bem você pode realizar o trivial nas databases usando o compass, como por exemplo: criar novos registro, editar os registros, deletar registros, e etc, inclusive você pode deletar databases, mas as mesmas precisam está sem registros. Nós iremos abordar mais a frente o uso do compass.

## Conclusão

Aprendemos o básico do mongoDB, o próximo passo é realizar uma replicação e fragmentação, que serão essenciais em um ambiente de produção.

## Considerações

### Nossos servidores estão com o Windows Server?

Sim, estamos usando o Windows Server 2019, mas grande parte do nosso ambiente já é híbrido.

## Referências

- [MongoDB Authentication](https://docs.mongodb.com/manual/core/authentication/)
- [MongoDB Enable Access Control](https://docs.mongodb.com/manual/tutorial/enable-authentication/#std-label-enable-access-control)
- [MongoDB Use SCRAM to Authenticate Clients](https://docs.mongodb.com/manual/tutorial/configure-scram-client-authentication/)