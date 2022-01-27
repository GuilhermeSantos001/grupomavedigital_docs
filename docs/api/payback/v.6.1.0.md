---
sidebar_label: 🧪 v6.1.3 - Instável
---

# 🧪 v6.1.3 - Instável

## Changelog

- Componente de **Alerting** corrigido.
- Pagina de registro operacional corrigida.
- Corrigido erro de **File not found for id**, esse erro ocorria sempre que o espelho de ponto era alterado, quando já existia um espelho de ponto anexado. Esse erro ocorre, devido ao frontend enviar uma requisição para remover o arquivo do banco de dados, mas o arquivo não existia mais, porque o sistema sempre percorre os arquivos temporários e se os mesmos estiverem expirados ele os remove, dessa forma o arquivo já estava deletado. Para resolver, retiramos a necessidade do frontend enviar uma requisição para remover o arquivo do banco de dados.
- Corrigido tempo de expiração dos arquivos temporários, agora são expirados após 1 dia.

### Notas de Design

- Nova janela para apurar os lançamentos operacionais adicionada.
