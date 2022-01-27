---
sidebar_label: 🌐 Rota -> Centro de Custo
---

# 🌐 Rotas

## 📂 Criar

:::caution Método HTTP: POST
/api/v1/costCenter
:::

:::danger Header: Content-Type
application/json
:::

:::danger Header: KEY
{chave_de_api}
:::

```json title="Corpo da Requisição"
{
  "title": "Nome do Centro de Custo"
}
```

```json title="Resposta (Sucesso)"
{
  "success": true,
  "data": {
    "id": "ID do Centro de Custo",
    "title": "Nome do Centro de Custo",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  }
}
```

```json title="Resposta (Erro)"
{
  "success": false,
  "message": "Não foi possível criar o centro de custo.",
  "error": { ... }
}
```

## 📂 Atualizar

:::caution Método HTTP: PUT
/api/v1/costCenter/{id}
:::

:::danger Header: Content-Type
application/json
:::

:::danger Header: KEY
{chave_de_api}
:::

```json title="Corpo da Requisição"
{
  "title": "Nome do Centro de Custo"
}
```

```json title="Resposta (Sucesso)"
{
  "success": true,
  "data": {
    "id": "ID do Centro de Custo",
    "title": "Nome do Centro de Custo",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  }
}
```

```json title="Resposta (Erro)"
{
  "success": false,
  "message": "Não foi possível atualizar o centro de custo.",
  "error": { ... }
}
```

## 📂 Procurar

:::caution Método HTTP: GET
/api/v1/costCenter/{id}
:::

:::danger Header: KEY
{chave_de_api}
:::

```json title="Resposta (Sucesso)"
{
  "success": true,
  "data": {
    "id": "ID do Centro de Custo",
    "title": "Nome do Centro de Custo",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  }
}
```

```json title="Resposta (Erro)"
{
  "success": false,
  "message": "Não foi possível retornar o centro de custo.",
  "error": { ... }
}
```

## 📂 Listar

:::caution Método HTTP: GET
/api/v1/costCenters

/api/v1/costCenters/{limit}

/api/v1/costCenters/{skip}/{limit}
:::

:::danger Header: KEY
{chave_de_api}
:::

```json title="Resposta (Sucesso)"
{
  "success": true,
  "data": [
    {
      "id": "ID do Centro de Custo",
      "title": "Nome do Centro de Custo",
      "createdAt": "Data de Criação",
      "updatedAt": "Data de Atualização"
    }
  ]
}
```

```json title="Resposta (Erro)"
{
  "success": false,
  "message": "Não foi possível retornar os centros de custo.",
  "error": { ... }
}
```

## 📂 Deletar

:::caution Método HTTP: DELETE
/api/v1/costCenter/{id}
:::

:::danger Header: KEY
{chave_de_api}
:::

```json title="Resposta (Sucesso)"
{ "success": true }
```

```json title="Resposta (Erro)"
{
  "success": false,
  "message": "Não foi possível deletar o centro de custo.",
  "error": { ... }
}
```
