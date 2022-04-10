---
sidebar_label: 🖥 Hyper-V
title: Hyper-V
---

## Introdução

Microsoft Hyper-V, codinome Viridian e anteriormente conhecido como Virtualização no Windows Server, é uma tecnologia de virtualização baseada em Hipervisor nativo.

## Download

Você pode baixar o [Hyper-V Server 2019](https://www.microsoft.com/pt-br/evalcenter/evaluate-hyper-v-server-2019) e utilizar o [Rufus](https://rufus.ie/pt_BR/d) para montar o pendrive bootavel. A instalação é semelhante a do Windows Server 2019.

## Configurar o Acesso Remoto

Presumimos que você já tenha efetuado as configurações básicas do Hyper-V.

Abra uma janela do terminal no hyper-v e executar o comando:

```cmd title="Troque o modo do terminal para powershell"
powershell
```

```powershell title="Habilite o acesso remoto"
Enable-PSRemoting
```

```powershell title="Habilite a autenticação CredSSP (CredSSP)"
Enable-WSManCredSSP -Role server
```

---

Finalizados os passos acima, você deve configurar um computador que esteja usando **Windows Server 2019** ou **Windows 10 (Profissional)** para controlar remotamente o Hyper-V.

### Ative o serviço do Hyper-V no seu computador

<details>
  <summary>Caso esteja utilizando o Windows 10 siga os passos abaixo, clique para abrir/fechar.</summary>
  <div>
    <img src="https://imgur.com/ThfA6OU.png" />
    <img src="https://imgur.com/w7QSyBJ.png" />
    <img src="https://imgur.com/neFKO1S.png" />
  </div>
</details>

### Abra uma janela do Powershell como administrador

:::danger Atenção!
Antes de executar os comandos a baixo, verique se o seu perfil é **Administrador** local da maquina, caso contrário, você não poderá executar os comandos. Testamos usando um perfil de administrador da rede, mas os comandos não foram executados corretamente, se estiver em um domínio saia para concluir o manual, depois você pode ingressar nele novamente.
:::

```powershell title="Get-NetConnectionProfile obtém um perfil de conexão associado a um ou mais adaptadores de rede físicos"
Get-NetConnectionProfile
```

```powershell title="Set-NetConnectionProfile altera o perfil de conexão associado a um ou mais adaptadores de rede físicos"
Set-NetConnectionProfile -InterfaceIndex YOUR-InterfaceIndex -NetworkCategory Private
```

```powershell title="Cria um hostname para o Hyper-V"
Add-Content -Path C:\Windows\System32\drivers\etc\hosts -Value "`nSERVERLOCALIP`tSERVER-NAME"
```

```powershell title="Define que não será verificado o perfil de conexão nas conexões remotas"
Set-WSManQuickConfig -SkipNetworkProfileCheck
```

```powershell title="Define o Hyper-V como um host confiável"
Set-Item -Path WSMan:\localhost\Client\TrustedHosts -Value "SERVER-NAME"
```

```powershell title="Delega as credenciais do computador com o Hyper-V"
Enable-WSManCredSSP -Role Client -DelegateComputer "SERVER-NAME"
```

```powershell title="Cria a credencial do Hyper-V"
cmdkey /add:hyper-v /user:SERVERADMINUSERNAME /pass:SERVERADMINPASSWORD
```

---

Pronto, você pode já pode conectar remotamente com o **Hyper-V**.

### Gerenciando o Hyper-V remotamente

![ref](https://imgur.com/s5RtWdk.png)
![ref](https://imgur.com/p49DJ4U.png)
![ref](https://imgur.com/KLCsCOx.png)

## Referências

- [Microsoft Hyper-V Server: Remotely manage by Window Admin Center and Hyper-V Manager](https://www.youtube.com/watch?v=k_O2YOPcHtQ&t=56s)
- [Get-NetConnectionProfile](https://docs.microsoft.com/en-us/powershell/module/netconnection/get-netconnectionprofile?view=windowsserver2022-ps#:~:text=The%20Get%2DNetConnectionProfile%20cmdlet%20gets,profile%20represents%20a%20network%20connection.)
- [Set-NetConnectionProfile](https://docs.microsoft.com/en-us/powershell/module/netconnection/set-netconnectionprofile?view=windowsserver2022-ps)
- [Set-WSManQuickConfig](https://docs.microsoft.com/en-us/powershell/module/microsoft.wsman.management/set-wsmanquickconfig?view=powershell-7.2)
- [Enable-WSManCredSSP](https://docs.microsoft.com/en-us/powershell/module/microsoft.wsman.management/enable-wsmancredssp?view=powershell-7.2)