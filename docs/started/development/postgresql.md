---
sidebar_label: 🧾 PostgreSQL
---

# 💡 O que é o PostgreSQL?

PostgreSQL é um gerenciador de banco de dados relacionados que otimiza muito o trabalho de quem precisa administrar informações nesses níveis. A ferramenta é de fácil instalação e de uso prático, proporcionando uma série de vantagens, especialmente com o uso de extensões.

## Baixar

:::caution Escolha do Ambiente
O PostgreSQL tem uma configuração simples, que pode ser usada em qualquer ambiente, em nosso manual usaremos o windows 10.
:::

Primeiro devemos baixar o [instalador](https://content-www.enterprisedb.com/downloads/postgres-postgresql-downloads).

## Instalar

Para instalar o PostgreSQL, primeiro atualize o índice de pacotes local do seu servidor:

```bash title="Terminal de Comando"
sudo apt update
```

Então, instale o pacote Postgres jutamente com um pacote -contrib que adiciona alguns serviços e funcionalidade adicionais:

```bash title="Terminal de Comando"
sudo apt install postgresql postgresql-contrib
```

Por padrão, o Postgres usa um conceito chamado “roles” para lidar com a autenticação e autorização. Elas são semelhantes aos usuários e grupos convencionais de estilo Unix.

Após a instalação, o Postgres é configurado para usar a autenticação ident, o que significa que ele associa os roles com uma conta do sistema Unix/Linux que combine. Se um role existe no Postgres, um nome de usuário Unix/Linux com o mesmo nome é capaz de fazer login como aquele role.

O procedimento de instalação criou uma conta de usuário chamada postgres que está associada ao role padrão do Postgres. Existem algumas maneiras de utilizar essa conta para acessar o Postgres. Uma maneira é trocar para a conta postgres em seu servidor digitando:

```bash title="Terminal de Comando"
sudo -i -u postgres
```

Em seguida, você pode acessar o prompt do Postgres digitando:

```bash title="Terminal de Comando"
psql
```

Isso irá logar você no prompt do PostgreSQL, e daqui você está livre para interagir com o sistema de gerenciamento de banco de dados imediatamente.

Para sair do prompt do PostgreSQL, execute o seguinte:

```bash title="Terminal de Comando"
\q
```

Isso irá trazer você de volta ao prompt de comando do Linux postgres.

Você também pode executar o comando que quiser com a conta postgres diretamente com o sudo:

```bash title="Terminal de Comando"
sudo -u postgres psql
```

Isso irá logar você diretamente no Postgres sem o shell bash intermediário.

```bash title="Terminal de Comando"
ALTER USER postgres ENCRYPTED PASSWORD 'minha_senha';
```

> Isso irá criptografar a senha da conta postgres, e assim, não será mais possível acessar o Postgres com a senha padrão. A senha será solicitada automaticamente.

Novamente, você pode sair da sessão interativa Postgres digitando:

```bash title="Terminal de Comando"
\q
```

## Conclusão

Parabéns o PostgreSQL foi instalado com sucesso, existem vários plugins e configurações adicionais, recomendamos a leitura detalhada da documentação. Agora já podemos usar o postgreSQL no projeto.

## Referências

- [O que é o PostgreSQL](https://rockcontent.com/br/blog/postgresql/)
- [PostgreSQL](https://www.postgresql.org/)
- [How to install Postgresql on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart-pt)
- [Alterando ou recuperando a senha do Postgres](https://ajuda.sischef.com/article/alterando-ou-recuperando-a-senha-do-postgres/#:~:text=Conectado%20no%20psql%20execute%20o,alterar%20novamente%20o%20arquivo%20pg_hba.)
