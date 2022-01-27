---
sidebar_label: 🌐 Rota -> Escala de Trabalho
---

# 🌐 Rotas

## 📂 Criar

:::caution Método HTTP: POST
/api/v1/scale
:::

:::danger Header: Content-Type
application/json
:::

:::danger Header: KEY
{chave_de_api}
:::

```json title="Corpo da Requisição"
{
  "value": "Valor da Escala de Trabalho"
}
```

```json title="Resposta (Sucesso)"
{
  "success": true,
  "data": {
    "id": "ID da Escala de Trabalho",
    "value": "Valor da Escala de Trabalho",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  }
}
```

```json title="Resposta (Erro)"
{
  "success": false,
  "message": "Não foi possível criar a escala de trabalho.",
  "error": { ... }
}
```

## 📂 Atualizar

:::caution Método HTTP: PUT
/api/v1/scale/{id}
:::

:::danger Header: Content-Type
application/json
:::

:::danger Header: KEY
{chave_de_api}
:::

```json title="Corpo da Requisição"
{
  "value": "Valor da escala de trabalho"
}
```

```json title="Resposta (Sucesso)"
{
  "success": true,
  "data": {
    "id": "ID da Escala de Trabalho",
    "value": "Valor da Escala de Trabalho",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  }
}
```

```json title="Resposta (Erro)"
{
  "success": false,
  "message": "Não foi possível atualizar a escala de trabalho.",
  "error": { ... }
}
```

## 📂 Procurar

:::caution Método HTTP: GET
/api/v1/scale/{id}
:::

:::danger Header: KEY
{chave_de_api}
:::

```json title="Resposta (Sucesso)"
{
  "success": true,
  "data": {
    "id": "ID da Escala de Trabalho",
    "value": "Valor da Escala de Trabalho",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  }
}
```

```json title="Resposta (Erro)"
{
  "success": false,
  "message": "Não foi possível retornar a escala de trabalho.",
  "error": { ... }
}
```

## 📂 Listar

:::caution Método HTTP: GET
/api/v1/scales

/api/v1/scales/{limit}

/api/v1/scales/{skip}/{limit}
:::

:::danger Header: KEY
{chave_de_api}
:::

```json title="Resposta (Sucesso)"
{
  "success": true,
  "data": [
    {
      "id": "ID da Escala de Trabalho",
      "value": "Valor da Escala de Trabalho",
      "createdAt": "Data de Criação",
      "updatedAt": "Data de Atualização"
    }
  ]
}
```

```json title="Resposta (Erro)"
{
  "success": false,
  "message": "Não foi possível retornar as escalas de trabalho.",
  "error": { ... }
}
```

## 📂 Deletar

:::caution Método HTTP: DELETE
/api/v1/scale/{id}
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
  "message": "Não foi possível deletar a escala de trabalho.",
  "error": { ... }
}
```
