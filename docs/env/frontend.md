---
sidebar_label: 💎 Cliente
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

# LOCAL
SIGNED_URL_SECRET=

# PUBLIC
NEXT_PUBLIC_GRAPHQL_HOST=
NEXT_PUBLIC_EXPRESS_HOST=
NEXT_PUBLIC_EXPRESS_AUTHORIZATION=
NEXT_PUBLIC_WEBSOCKET_HOST=
```

## 📝 Arquivo (.env.test)

> Arquivo deve ser criado em **/test/**

:::caution Utilização do arquivo
Esse arquivo é usado sempre que os testes são executados.
:::

```bash title=".env.test"
# NODE
NODE_ENV=

# LOCAL
SIGNED_URL_SECRET=

# PUBLIC
NEXT_PUBLIC_GRAPHQL_HOST=
NEXT_PUBLIC_EXPRESS_HOST=
NEXT_PUBLIC_EXPRESS_AUTHORIZATION=
NEXT_PUBLIC_WEBSOCKET_HOST=
```

## 📝 Arquivo (.cypress.env.json)

> Arquivo deve ser criado na raiz do projeto.

:::caution Utilização do arquivo
Esse arquivo é usado sempre que os testes do cypress são executados.
:::

:::danger Testes sendo Escritos
Ainda não há testes homologados no cypress.
:::

```json title=".cypress.env.json"
{}
```

## 📝 Arquivo (cypress/config/cache.spec.json)

> Arquivo deve ser criado na pasta /cypress/config

:::caution Utilização do arquivo
Esse arquivo é usado sempre que os testes do cypress são executados.
:::

```json title="cache.spec.json"
{
  "browserDatabase": "IndexedDB"
}
```

## 🔏 Chaves

### 🔐 Node

#### 🔑 NODE_ENV

> Pode ser `development` ou `production`.

Define se o ambiente é de desenvolvimento ou produção.

### 🔐 Privadas

#### 🔑 SIGNED_URL_SECRET

> Chave de assinatura do servidor, por exemplo `LK$87@#`.

### 🔐 Públicas

#### 🔑 NEXT_PUBLIC_GRAPHQL_HOST

> Endereço do servidor GraphQL, por exemplo `http://localhost:4000/graphql`.

#### 🔑 NEXT_PUBLIC_GRAPHQL_HOST

> Endereço do servidor GraphQL, por exemplo `http://localhost:4000/express`.

#### 🔑 NEXT_PUBLIC_EXPRESS_AUTHORIZATION

> Chave de autorização do servidor, por exemplo `2669efx$458@`.

#### 🔑 NEXT_PUBLIC_WEBSOCKET_HOST

> Endereço do servidor WebSocket, por exemplo `ws://localhost:8020`.
