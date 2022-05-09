---
sidebar_label: 💡 Configurar o Ubuntu
---

# 📜 Baixe e Instale o Ubuntu

> link de download: [ubuntu-22.04-desktop-amd64.iso](https://ubuntu.com/download/desktop/thank-you?version=22.04&architecture=amd64)

## Nginx

### Instalação

Vamos seguir os [passos oficiais](https://nginx.org/en/linux_packages.html#Ubuntu) do **nginx** para instalar no **ubuntu**.

```bash title="Terminal de Comando"
sudo apt-get install curl gnupg2 ca-certificates lsb-release ubuntu-keyring

curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
    | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

gpg --dry-run --quiet --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list

echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
    | sudo tee /etc/apt/preferences.d/99nginx

sudo apt-get update
sudo apt-get install nginx
```

![1° Passo](https://i.imgur.com/Q5NCis9.png)
![2° Passo](https://i.imgur.com/1TE1etW.png)
![3° Passo](https://i.imgur.com/tovbvVw.png)
![4° Passo](https://i.imgur.com/4Te2Fsg.png)
![5° Passo](https://i.imgur.com/jYWU6wg.png)
![6° Passo](https://i.imgur.com/yDnwGxC.png)

### Configurando o nginx

Após instalar o nginx, vamos configurar:

```bash title="Terminal de Comando"
sudo nano /etc/nginx/nginx.conf
```

Nesse arquivo vamos adicionar dentro de http, o seguinte:

```conf title="/etc/nginx/nginx.conf"
# Define para 50 MB máximo de upload
client_max_body_size 50M;

log_format main '$remote_addr - $remote_user [$time_local] "request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$http_x_forwarded_for"';

log_format speciallog '$remote_addr forwarded for $http_x_real_ip - $remote_user [$time_local] '
                        '"$request" $status $body_bytes_sent '
                        '"$http_referer" "$http_user_agent"';

access_log /var/log/nginx/access-special.log speciallog;
access_log /var/log/nginx/access.log main;
error_log /var/log/nginx/error.log;
```

![1° Passo](https://i.imgur.com/gOdFp0L.png)

Em seguida vamos configurar o arquivo padrão.

```bash title="Terminal de Comando"
sudo nano /etc/nginx/conf.d/default.conf
```

Esse arquivo ficara da seguinte forma:

```conf title="/etc/nginx/conf.d/default.conf"
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

upstream socket_nodes {
    ip_hash;
    # weight - Define a proporção do tráfego direcionado ao servidor
    server localhost:5000 weight=5;
    # server other-ip:port;
}

server {
   listen       80;
   server_name  grupomavedigital;

   proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;

   # access_log /var/log/nginx/host.access.log main;

   location / {
       proxy_pass http://localhost:3000/;
   }

   location /socket.io/ {
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_pass http://socket_nodes;
   }

   location /glpi {
       proxy_pass http://localhost/glpi;
   }

   location /app {
       proxy_pass http://localhost:4000/api/v1;
   }

   location /graphql {
       proxy_pass http://localhost:4000/graphql/;
   }

   location  /express {
      rewrite /express/(.*) /$1  break;
      proxy_pass         http://localhost:4000;
      proxy_redirect     off;
      proxy_set_header   Host $host;
   }

   location /_next/webpack-hmr {
      proxy_pass http://localhost:3000/_next/webpack-hmr;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
   }

   # error_page 404  /404.html;
   error_page 400 402 403 404 /40x.html;
   location = /40x.html {
       root /usr/share/nginx/html;
   }

   # redirect server error pages to the static page /50x.html
   #
   error_page 500 502 503 504 /50x.html;
   location = /50x.html  {
       root /usr/share/nginx/html;
   }

   # proxy the PHP scripts to Apache listening on localhost:80
   #
   # location ~ \.php$ {
   #    proxy_pass   http://127.0.0.1;
   # }

   # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
   #
   # location ~ \.php$ {
   #    root           html;
   #    fastcgi_pass   127.0.0.1:9000;
   #    fastcgi_index  index.php;
   #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
   #    include        fastcgi_params;
   # }

   # deny access to .htaccess files, if Apache's document root
   # concurs with nginx's one
   #
   # location ~ /\.ht {
   #    deny  all;
   # }
}
```

Arquivo usado nos erros 400, 402, 403 e 404.

```html title="/usr/share/nginx/html/40x.html"
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
  <head>
    <title>Pagina não encontrada!</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style type="text/css">
      /*<![CDATA[*/
      body {
        background-color: #fff;
        color: #000;
        font-size: 0.9em;
        font-family: sans-serif, helvetica;
        margin: 0;
        padding: 0;
      }
      :link {
        color: #c00;
      }
      :visited {
        color: #c00;
      }
      a:hover {
        color: #f50;
      }
      h1 {
        text-align: center;
        margin: 0;
        padding: 0.6em 2em 0.4em;
        background-color: #294172;
        color: #fff;
        font-weight: normal;
        font-size: 1.75em;
        border-bottom: 2px solid #000;
      }
      h1 strong {
        font-weight: bold;
        font-size: 1.5em;
      }
      h2 {
        text-align: center;
        background-color: #3c6eb4;
        font-size: 1.1em;
        font-weight: bold;
        color: #fff;
        margin: 0;
        padding: 0.5em;
        border-bottom: 2px solid #294172;
      }
      h3 {
        text-align: center;
        background-color: #ff0000;
        padding: 0.5em;
        color: #fff;
      }
      hr {
        display: none;
      }
      .content {
        padding: 1em 5em;
      }
      .alert {
        border: 2px solid #000;
      }

      img {
        border: 2px solid #fff;
        padding: 2px;
        margin: 2px;
      }
      a:hover img {
        border: 2px solid #294172;
      }
      .logos {
        margin: 1em;
        text-align: center;
      }
      /*]]>*/
    </style>
  </head>

  <body>
    <h1><strong>Atenção!</strong></h1>

    <div class="content">
      <h3>
        A pagina que você está procurando não foi encontrada, tente outra
        pagina...
      </h3>

    <div class="content">
      <h3>Nosso sistema está em manutenção. Tente novamente, mais tarde!</h3>

      <div class="alert">
        <h2>Administração</h2>
        <div class="content">
          <p>
            Entre em contato com nossa equipe de suporte:
            suporte@grupomave.com.br
          </p>
        </div>
      </div>

      <div class="logos">
       <a href="http://nginx.net/"
          ><img
            src="https://imgur.com/9Z1zl8k.png"
            title="Powered by nginx"
            alt="[ Powered by nginx ]"
            width="42"
            height="42"
        /></a>

        <a href="http://grupomave.com.br/"
          ><img
            src="https://imgur.com/W8tUHSd.png"
            title="Powered by Grupo Mave"
            alt="[ Powered by Grupo Mave ]"
            width="48"
            height="42"
        /></a>
      </div>
    </div>
  </body>
</html>
```

Arquivo usado nos erros 500, 502, 503 e 504.

```html title="/usr/share/nginx/html/50x.html"
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
  <head>
    <title>Sistema em manutenção</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style type="text/css">
      /*<![CDATA[*/
      body {
        background-color: #fff;
        color: #000;
        font-size: 0.9em;
        font-family: sans-serif, helvetica;
        margin: 0;
        padding: 0;
      }
      :link {
        color: #c00;
      }
      :visited {
        color: #c00;
      }
      a:hover {
        color: #f50;
      }
      h1 {
        text-align: center;
        margin: 0;
        padding: 0.6em 2em 0.4em;
        background-color: #294172;
        color: #fff;
        font-weight: normal;
        font-size: 1.75em;
        border-bottom: 2px solid #000;
      }
      h1 strong {
        font-weight: bold;
        font-size: 1.5em;
      }
      h2 {
        text-align: center;
        background-color: #3c6eb4;
        font-size: 1.1em;
        font-weight: bold;
        color: #fff;
        margin: 0;
        padding: 0.5em;
        border-bottom: 2px solid #294172;
      }
      h3 {
        text-align: center;
        background-color: #ff0000;
        padding: 0.5em;
        color: #fff;
      }
      hr {
        display: none;
      }
      .content {
        padding: 1em 5em;
      }
      .alert {
        border: 2px solid #000;
      }

      img {
        border: 2px solid #fff;
        padding: 2px;
        margin: 2px;
      }
      a:hover img {
        border: 2px solid #294172;
      }
      .logos {
        margin: 1em;
        text-align: center;
      }
      /*]]>*/
    </style>
  </head>

  <body>
    <h1><strong>Atenção!</strong></h1>

    <div class="content">
      <h3>Nosso sistema está em manutenção. Tente novamente, mais tarde!</h3>

      <div class="alert">
        <h2>Administração</h2>
        <div class="content">
          <p>
            Entre em contato com nossa equipe de suporte:
            suporte@grupomave.com.br
          </p>
        </div>
      </div>

      <div class="logos">
        <a href="http://nginx.net/"
          ><img
            src="https://imgur.com/9Z1zl8k.png"
            title="Powered by nginx"
            alt="[ Powered by nginx ]"
            width="42"
            height="42"
        /></a>

        <a href="http://grupomave.com.br/"
          ><img
            src="https://imgur.com/W8tUHSd.png"
            title="Powered by Grupo Mave"
            alt="[ Powered by Grupo Mave ]"
            width="48"
            height="42"
        /></a>
      </div>
    </div>
  </body>
</html>
```

![2° Passo](https://i.imgur.com/KOEwSkM.png)

Por fim, vamos iniciar o nginx.

```bash title="Terminal de Comando"
sudo service nginx start
sudo service nginx status // * nginx is running
```

- Não iremos configurar um SSL neste momento, mas fique a vontade para fazer isso.

## Instalando o Redis

Para abrir o terminal do ubuntu, você deve iniciar ele como um programa normal do seu windows, basta abrir a barra de pesquisa e procurar por ubuntu e abri-lo normalmente. O ubuntu instalado vem sem a interface gráfica, então utilizaremos somente a linha de comando.

```bash title="Terminal de Comando"
sudo apt-get update // Atualização do sistema
sudo apt-get upgrade // Atualização dos pacotes

sudo apt-get install redis-server // Instalação do redis

sudo service redis-server start // Inicia o serviço do redis
sudo service redis-server status // Verifica se o serviço está rodando
```

![1° Passo](https://i.imgur.com/SYBnfTV.png)
![2° Passo](https://i.imgur.com/aXEdsO9.png)
![3° Passo](https://i.imgur.com/fiHT6bw.png)
![4° Passo](https://i.imgur.com/t0X0H6D.png)

### Definindo uma senha no redis

Precisamos definir uma senha de acesso no redis, para isso abra o arquivo de configuração do redis e siga os passos a seguir:

:::tip Dica
Para procurar por alguma palavra usando o **nano** você pode usar o comando **Ctrl+W**.
:::

```bash title="Terminal de Comando"
sudo nano /etc/redis/redis.conf
```

- Procure por **# requirepass** e substitua por: **requirepass 123456**(por exemplo), é importante que você remova o **# (cerquilha)** do inicio da linha.

Após salvar as mudanças reinice o redis, use o comando:

```bash title="Terminal de Comando"
sudo service redis-server restart
```

- Se você quiser existem configurações adicionais que podem ser aplicadas ao redis, mas não é necessário para um ambiente de desenvolvimento, as configurações padrões já são o suficiente.

## Referências

- [Install nginx for ubuntu](https://nginx.org/en/linux_packages.html#Ubuntu)

- [How to set password for redis](https://stackoverflow.com/questions/7537905/how-to-set-password-for-redis)

- [Github/pantheon-systems/nginx](https://github.com/pantheon-systems/nginx)

- [nginx: Linux packages](https://nginx.org/en/linux_packages.html#Ubuntu)

- [Using NGINX and NGINX Plus with Node.js and Socket.IO, the WebSocket API](https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/)

- [Serving Static Content](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/)

- [Nginx -- static file serving confusion with root & alias](https://stackoverflow.com/questions/10631933/nginx-static-file-serving-confusion-with-root-alias)

- [Serving multiple proxy endpoints under location in Nginx](https://serverfault.com/questions/650117/serving-multiple-proxy-endpoints-under-location-in-nginx)

- [Configurando SSL com Nginx](https://www.organicadigital.com/blog/configurando-ssl-com-nginx/)

- [ERROR: Could not find a profile matching 'Nginx Full'](https://stackoverflow.com/questions/57924093/error-could-not-find-a-profile-matching-nginx-full)

- [Get user real ip in nginx behind nginx reverse proxy](https://ypereirareis.github.io/blog/2017/02/15/nginx-real-ip-behind-nginx-reverse-proxy/)
