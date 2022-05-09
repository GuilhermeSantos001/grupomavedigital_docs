---
sidebar_label: 💡 Instalação
---

# 💡 O que é o mongoDB?

MongoDB é um banco de dados orientado a documentos, com foco em velocidade e escalabilidade. Nós usamos o mongoDB em diversos módulos no projeto, mas ele não é uma **Bala de Prata**, por isso não encorajamos nossos engenheiros a utiliza-lo em qualquer módulo, isso deve ser analisado e avaliado por todos os membros da equipe.

## Instalação

### Baixar

Seguiremos os [passos oficiais](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) de instalação do mongoDB no Ubuntu.

```bash title="Terminal de Comando"
sudo apt-get install gnupg
```

```bash title="Terminal de Comando"
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
```

```bash title="Terminal de Comando"
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
```

```bash title="Terminal de Comando"
sudo apt-get update
```

```bash title="Terminal de Comando"
sudo apt-get install -y mongodb-org
```

Após instalar o mongoDB, você pode gerenciar o serviço com os comandos:

```bash title="Terminal de Comando"
sudo systemctl start mongod
```

> Para iniciar o serviço

```bash title="Terminal de Comando"
sudo systemctl status mongod
```

> Para verificar se o serviço está ativo

```bash title="Terminal de Comando"
sudo systemctl restart mongod
```

> Para reiniciar o serviço

```bash title="Terminal de Comando"
sudo systemctl stop mongod
```

> Para parar o serviço

## Habilitar a autenticação

Após instalar vamos habilitar a autenticação, abra o terminal e siga os passos a seguir.

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

Vamos parar o serviço do mongodb.

```bash title="Terminal de Comando"
sudo systemctl stop mongod
```

## Configuração

Abra o arquivo **mongod.cfg** de configuração do **MongoDB**.

```bash title="Terminal de Comando"
sudo nano /etc/mongod.conf
```

```conf {27-28} title="/bin/mongod.cfg"
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

```bash title="Terminal de Comando"
sudo systemctl stop mongod
```

> Agora se acessar o shell do mongo novamente, e tentar deletar o usuário que criamos, ocorrerá uma falha de autenticação.

![20° Passo](https://i.imgur.com/gHAdgE5.png)

:::info Acesse usando suas credenciais
Para acessar o shell do mongoDB, você pode executar o comando abaixo.

```bash title="Terminal de Comando"
mongo -u "DIGITE_NOME_DE_USUARIO" -p "DIGITE_SUA_SENHA"
```

:::

## Usando o MongoDB Compass

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

- [MongoDB Install on Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

- [MongoDB Authentication](https://docs.mongodb.com/manual/core/authentication/)

- [MongoDB Enable Access Control](https://docs.mongodb.com/manual/tutorial/enable-authentication/#std-label-enable-access-control)

- [MongoDB Use SCRAM to Authenticate Clients](https://docs.mongodb.com/manual/tutorial/configure-scram-client-authentication/)