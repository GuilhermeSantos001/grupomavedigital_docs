---
sidebar_label: 🔰 Servidor
---

# ⚙️ Variáveis de Ambiente

## 📝 Arquivo (.env)

> Arquivo deve ser criado na raiz do projeto.

:::caution Utilização do arquivo
Esse arquivo é usado sempre que o sistema é executado.
:::

```bash title=".env"
# NODE
NODE_ENV=

# BACKEND
APP_HOST=
APP_PORT=
APP_AUTHORIZATION=
APP_SECRET=
APP_CLUSTER=

# FRONTEND
FRONTEND_HOST=
FRONTEND_PORT=

# CRYPTO - JWT
CRYPTO_PASSWORD=
SIGNED_URL_SECRET=

# Database
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
DB_HERCULES_STORAGE=

# REDIS
REDIS_HOST=
REDIS_PORT=
REDIS_CONNECT_TIMEOUT=

# SMTP
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
```

## 📝 Arquivo (.env.test)

> Arquivo deve ser criado em **/ts/test/**

:::caution Utilização do arquivo
Esse arquivo é usado sempre que os testes são executados.
:::

```bash title=".env.test"
# NODE
NODE_ENV=

# BACKEND
APP_HOST=
APP_PORT=
APP_AUTHORIZATION=
APP_SECRET=
APP_CLUSTER=

# FRONTEND
FRONTEND_HOST=
FRONTEND_PORT=

# CRYPTO - JWT
CRYPTO_PASSWORD=
SIGNED_URL_SECRET=

# Database
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
DB_HERCULES_STORAGE=

# REDIS
REDIS_HOST=
REDIS_PORT=
REDIS_CONNECT_TIMEOUT=

# SMTP
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
```

## 🔏 Chaves

### 🔐 Node

#### 🔑 NODE_ENV

> Pode ser `development` ou `production`.

Define se o ambiente é de desenvolvimento ou produção.

### 🔐 Backend

#### 🔑 APP_HOST

> Endereço do servidor, por exemplo `127.0.0.1`.

#### 🔑 APP_PORT

> Porta do servidor, por exemplo `4000`.

#### 🔑 APP_AUTHORIZATION

> Chave de autorização do servidor, por exemplo `2669efx$458@`.

#### 🔑 APP_SECRET

> Chave secreta do servidor, por exemplo `d5CV458@#`.

#### 🔑 APP_CLUSTER

> Pode ser `true` ou `false`.

Define se o servidor pode ser iniciado em modo cluster.

### 🔐 Frontend

#### 🔑 FRONTEND_HOST

> Endereço do frontend, por exemplo `127.0.0.1`.

#### 🔑 FRONTEND_PORT

> Porta do frontend, por exemplo `3000`.

### 🔐 CRYPTO - JWT

#### 🔑 CRYPTO_PASSWORD

> Chave de criptografia do servidor, por exemplo `py_SP976@$*`.

#### 🔑 SIGNED_URL_SECRET

> Chave de assinatura do servidor, por exemplo `LK$87@#`.

### 🔐 Database

#### 🔑 DB_USERNAME

> Nome do usuário do banco de dados, por exemplo `root`.

#### 🔑 DB_PASSWORD

> Senha do usuário do banco de dados, por exemplo `root`.

#### 🔑 DB_HOST

> Endereço do servidor do banco de dados, por exemplo `127.0.0.1`.

#### 🔑 DB_PORT

> Porta do servidor do banco de dados, por exemplo `27017`.

#### 🔑 DB_NAME

> Nome do banco de dados, por exemplo `grupomavedigital`.

#### 🔑 DB_HERCULES_STORAGE

> Nome do banco de dados do **Hercules**, por exemplo `hercules`.

### 🔐 Redis

#### 🔑 REDIS_HOST

> Endereço do servidor do Redis, por exemplo `127.0.0.1`.

#### 🔑 REDIS_PORT

> Porta do servidor do Redis, por exemplo `6379`.

#### 🔑 REDIS_CONNECT_TIMEOUT

> Tempo de espera para conexão com o servidor do Redis, por exemplo `10000`.

### 🔐 SMTP

#### 🔑 SMTP_USERNAME

> Nome do usuário do servidor de e-mail, por exemplo `grupomavedigital@grupomave.com.br`.

#### 🔑 SMTP_PASSWORD

> Senha do usuário do servidor de e-mail, por exemplo `123456`.

#### 🔑 SMTP_HOST

> Endereço do servidor de e-mail, por exemplo `smtp.grupomave.com.br`.

#### 🔑 SMTP_PORT

> Porta do servidor de e-mail, por exemplo `587`.

#### 🔑 SMTP_SECURE

> Pode ser `true` ou `false`.

Define se o servidor de e-mail usa conexão segura.
