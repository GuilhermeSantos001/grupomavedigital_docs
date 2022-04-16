---
sidebar_label: 🖥 Domain Name Service
title: Domain Name Service (DNS)
---

## Introdução

Domain Name Service (DNS) é um serviço de Internet que mapeia endereços IP e nomes de domínio totalmente qualificados (FQDN) uns aos outros. Desta forma, o DNS alivia a necessidade de lembrar os endereços IP. Os computadores que executam DNS são chamados servidores de nomes. O Ubuntu é fornecido com BIND (Berkley Internet Naming Daemon), o programa mais comum utilizado para manter um servidor de nomes no Linux.

## Instalação

Em um prompt de terminal, digite o seguinte comando para instalar o dns:

```cmd
sudo apt install bind9
```

Um pacote muito útil para testar e solucionar problemas de DNS é o pacote dnsutils. Muitas vezes essas ferramentas já estarão instaladas, mas para verificar e/ou instalar o dnsutils digite o seguinte:

```cmd
sudo apt install dnsutils
```

## Configuração

### Servidor de nomes em cache

Primeiro iremos configurar o servidor de nomes em cache

```cmd
sudo nano /etc/bind/named.conf.options
```

```txt
options {
        directory "/var/cache/bind";
        auth-nxdomain no;    # conform to RFC1035

        // If there is a firewall between you and nameservers you want
        // to talk to, you may need to fix the firewall to allow multiple
        // ports to talk.  See http://www.kb.cert.org/vuls/id/800113

        // If your ISP provided one or more IP addresses for stable
        // nameservers, you probably want to use them as forwarders.
        // Uncomment the following block, and insert the addresses replacing
        // the all-0's placeholder.

        // forwarders {
        //      0.0.0.0;
        // };

        //========================================================================
        // If BIND logs error messages about the root key being expired,
        // you will need to update your keys.  See https://www.isc.org/bind-keys
        //========================================================================
        dnssec-validation auto;
        // listen-on-v6 { any; };
        listen-on port 53 { localhost; 192.168.0.0/24; };
        allow-query { localhost; 192.168.0.0/24; };
        forwarders { 8.8.8.8; 8.8.4.4; };
        recursion yes;
};
```

Agora o **servidor** está escutando a **porta 53** e aceitando conexões da nossa **LAN**, e ainda definimos dois servidores que são usados caso nosso DNS não resolva algo ele redireciona para eles, no caso estamos usando os servidores da **Google** (8.8.8.8 e 8.8.4.4).

Após editar o arquivo, salve-o e digite o seguinte comando:

```cmd
sudo systemctl restart bind9.service
```

### DNS Primario

Para adicionar uma zona DNS ao BIND9, transformando o BIND9 em um servidor primário, edite o arquivo a seguir:

```cmd
sudo nano /etc/bind/named.conf.local
```

```txt
//
// Do any local configuration here
//

// Consider adding the 1918 zones here, if they are not used in your
// organization
//include "/etc/bind/zones.rfc1918";

zone "example.com" {
    type master;
    file "/etc/bind/db.example.com";
};
```

Adicionamos o **FQDN** `example.com` a nossa **Zona de DNS**.

Agora criaremos o arquivo da zona do **FQDN**, a partir de um **template**, digite o seguinte comando:

```cmd
sudo cp /etc/bind/db.local /etc/bind/db.example.com
```

```txt
;
; BIND data file for local loopback interface
;
$TTL    604800
@       IN      SOA     example.com. root.example.com. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      ns.example.com.
@       IN      A       192.168.0.200
@       IN      AAAA    ::1
ns      IN      A       192.168.0.200
```

:::danger Atenção!
Sempre que você alterar esse arquivo, lembre-se de incrementar o **Serial** antes de reiniciar o serviço do bind. No exemplo o arquivo criado já terá o **Serial** incrementado para **2**.
:::

Agora que a zona está configurada e resolvendo nomes para endereços IP, uma zona reversa precisa ser adicionada para permitir que o DNS resolva um endereço para um nome.

Vamos editar novamente o arquivo onde adicionamos nossa zona, digite o seguinte comando:

```cmd
sudo nano /etc/bind/named.conf.local
```

```txt
//
// Do any local configuration here
//

// Consider adding the 1918 zones here, if they are not used in your
// organization
//include "/etc/bind/zones.rfc1918";

zone "example.com" {
    type master;
    file "/etc/bind/db.example.com";
};

zone "0.168.192.in-addr.arpa" {
    type master;
    file "/etc/bind/db.192";
};
```

Novamente iremos criar nosso arquivo de zona, utilizando um template, digite o seguinte comando:

```cmd
sudo cp /etc/bind/db.127 /etc/bind/db.192
```

```txt
;
; BIND reverse data file for local loopback interface
;
$TTL    604800
@       IN      SOA     ns.example.com. root.example.com. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      ns.
10      IN      PTR     ns.example.com.
```

Tudo certo, agora só reiniciar o serviço do **Bind**, digite o comando:

```cmd
sudo systemctl restart bind9.service
```

### Testando

Primeiro vamos verificar se está tudo certo, digite o comando:

```cmd
named-checkzone example.com /etc/bind/db.example.com
```

A mensagem deve ser `OK`, sendo diferente, existem problemas a serem solucionados.

Escolhemos o **Windows 10** para efetuar o teste, definimos nosso dns como primario e executamos o comando `ping ns.example.com` no cmd, e o resultado foi como esperado, fomos redirecionados para o `192.168.0.200`.

## Considerações

> Não criamos o servidor secundário, mas é altamente recomendado ter dois servidores DNS, dessa forma mantendo a disponibilidade dos serviços em casos de queda de energia por exemplo. O material oficial apresentado nas **referências** desse documento contém a configuração do servidor secundário.

## Referências

- [Domain Name Service (DNS)](https://www.ubuntu.com/server/docs/service-domain-name-service-dns)
