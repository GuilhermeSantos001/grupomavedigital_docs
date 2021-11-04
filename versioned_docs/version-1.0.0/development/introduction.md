---
sidebar_label: Configurar WSL (Subsistema Windows para Linux)
---

# O que é WSL?

**Subsistema Windows para Linux** é um módulo do sistema operacional **Windows 10**, que visa a disponibilizar um ambiente Linux compatível no sistema da Microsoft, de forma que se possam executar programas nativos dos sistemas GNU/Linux dentro do próprio Windows sem a necessidade de emuladores ou do uso de máquinas virtuais.

## Como funciona?

O WSL é um subsistema do sistema operacional Windows 10, que permite a execução de programas nativos do sistema GNU/Linux dentro do Windows, ou seja, sem a necessidade de emuladores ou do uso de máquinas virtuais. Você só precisa configurar e manter uma unica máquina de desenvolvimento, isso é extremamente vantajoso para o desenvolvimento de software, pois manter varias máquinas de desenvolvimento é um processo muito pesado e difícil de dar manutenção.

## Instalação

A microsoft disponibilizou um documento para configurar o WSL de forma simples, você pode acompanhar o tutorial [aqui](https://docs.microsoft.com/pt-br/windows/wsl/install).

## Configuração

Após instalado o WSL, vamos instalar o **redis** e o **nginx**. Provavelmente após seguir o tutorial, você já terá instalado o ubuntu como sua distribuição linux, mas se você não tiver, você pode fazer isso agora, basta abir a **Microsoft Store** e procurar por **Ubuntu**, instale a versão 20.04 LTS.

### Instalando redis

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

Se você quiser existem configurações adicionais que podem ser aplicadas ao redis, mas não é necessário para um ambiente de desenvolvimento, as configurações padrões já são o suficiente.

### Instalando nginx

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

## Configurando o nginx

Após instalar o nginx, vamos configurar:

```bash title="Terminal de Comando"
sudo nano /etc/nginx/nginx.conf
```

Nesse arquivo vamos adicionar dentro de http, o seguinte:

```conf title="/etc/nginx/nginx.conf"
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
    server 192.168.0.130:4000 weight=5;
    # server other-ip:port;
}

server {
   listen       80;
   server_name  grupomavedigital;

   proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;

   # access_log /var/log/nginx/host.access.log main;

   location / {
       proxy_pass http://192.168.0.130:3000/;
   }

   location /graphql {
       proxy_pass http://192.168.0.130:4000/graphql/;
   }

   # error_page 404  /404.html;

   # redirect server error pages to the static page /50x.html
   #
   error_page 500 502 503 504 /50x.html;
   location = /50x.html  {
       root /usr/share/nginx/html;
   }

   # proxy the PHP scripts to Apache listening on 127.0.0.1:80
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

server {
   listen 8020;
   server_name socketio;

   location / {
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_http_version 1.1;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header Host $host;
       proxy_pass http://socket_nodes;
    }
}
```

![2° Passo](https://i.imgur.com/KOEwSkM.png)

Por fim, vamos iniciar o nginx.

```bash title="Terminal de Comando"
sudo service nginx start
sudo service nginx status // * nginx is running
```

## Considerações

### Por que não usar somente o linux?

Temos conhecimento de que muitos usuários não querem usar o WSL, pois preferem usar somente o linux, mas devido a outras ferramentas de trabalho, acabamos usando o windows e por esse motivo mantemos nossos treinamentos usando o WSL. Mas se você tem total certeza que não quer usar o WSL, você pode usar o linux diretamente.

### Se eu escolher usar o linux, ainda posso realizar os treinamentos?

Sim nós tentamos ao maximo produzir materiais que são uteis para quem usa o WSL e para quem usa somente o linux.

## Referências

- [Instalar o WSL](https://docs.microsoft.com/pt-br/windows/wsl/install)
- [nginx: Linux packages](https://nginx.org/en/linux_packages.html#Ubuntu)
- [Using NGINX and NGINX Plus with Node.js and Socket.IO, the WebSocket API](https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/)
- [Serving Static Content](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/)
- [Nginx -- static file serving confusion with root & alias](https://stackoverflow.com/questions/10631933/nginx-static-file-serving-confusion-with-root-alias)
- [Serving multiple proxy endpoints under location in Nginx](https://serverfault.com/questions/650117/serving-multiple-proxy-endpoints-under-location-in-nginx)
- [Configurando SSL com Nginx](https://www.organicadigital.com/blog/configurando-ssl-com-nginx/)
- [ERROR: Could not find a profile matching 'Nginx Full'](https://stackoverflow.com/questions/57924093/error-could-not-find-a-profile-matching-nginx-full)
- [Get user real ip in nginx behind nginx reverse proxy](https://ypereirareis.github.io/blog/2017/02/15/nginx-real-ip-behind-nginx-reverse-proxy/)