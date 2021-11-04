---
sidebar_label: Redirecionamento de porta
---

:::caution
Só redirecione as portas caso você esteja rodando o servidor de aplicação no windows. Pois o redirecionamento pega todo o trafego que vem da porta informada do windows e transfere para o WSL na porta informada. Se você já está rodando a aplicação no linux, o redirecionamento não é necessário.
:::

# Por qual motivo devo redirecionar as portas?

Basicamente não queremos usar o tradicional **http://localhost:3000**, mas sim **http://localhost**, dessa forma fica mais parecido com o resultado final (**http://grupomavedigital.com.br**).

## Pegar o ip da máquina no WSL

```bash title="Terminal de Comando"
ip addr | grep eth0
```

![1° Passo](https://i.imgur.com/JRzFCZE.png)

## Redirecionar as portas

Vamos abrir como **administrador** o **Windows Powershell** e executar os comandos abaixo:

```powershell title="Powershell"
netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=IP_DA_MAQUINA_WSL
netsh interface portproxy add v4tov4 listenport=8020 listenaddress=0.0.0.0 connectport=8020 connectaddress=IP_DA_MAQUINA_WSL
```

![2° Passo](https://i.imgur.com/68hvJei.png)

Pronto, agora todo o trafego que passar pela porta 80 e 8020 será redirecionado para o WSL.

## Considerações

Sempre que o WSL for reiniciado, a máquina terá outro endereço de IP, então precisaremos remover os redirecionamentos e refazê-los.

### Remover os redirecionamentos

Para remover os redirecionamentos, basta executar os comandos abaixo:

```powershell title="Powershell"
netsh interface portproxy delete v4tov4 listenport=80 listenaddress=0.0.0.0
netsh interface portproxy delete v4tov4 listenport=8020 listenaddress=0.0.0.0
```
