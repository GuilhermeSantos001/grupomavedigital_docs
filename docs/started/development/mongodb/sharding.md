---
sidebar_label: 💡 Fragmentação
---

# 💡 Implementando uma solução de dados fragmentados.

:::caution DISCLAIMER
Esse manual é indicado só para fins de estudo, você não precisa montar uma infraestrutura de produção para usar o **mongoDB**. Nós recomendamos a leitura para entender o funcionamento e o poder do **mongoDB**.
:::

Diferente da replicação, a fragmentação no **MongoDB** consiste em dividir a carga de trabalho em vários servidores, potencialmente fornecendo melhor eficiência do que um único servidor de alta velocidade e alta capacidade.

## Chave de Fragmento

### Cardinalidade

Precisamos entender a cardinalidade, pois em um cluster fragmentado precisamos declarar a **Chave de Fragmento** que sera usada para distribuição uniforme dos documentos por todo o cluster, ao mesmo tempo que facilita os padrões de consulta comuns.

Na matemática, a cardinalidade de um conjunto é uma medida do "número de elementos do conjunto". Por exemplo, o conjunto A={2,4,6} contém 3 elementos e por isso possui cardinalidade 3.

Considere um conjunto de dados que contém dados do usuário com um campo chamado **Continent**, a chave de fragmento teria uma cardinalidade de **7** (Continent={**Ásia**, **América**, **África**, **Antártida**, **Europa**, **Oceania**, **Zelândia**}). Uma cardinalidade de **7** significa que não pode haver mais do que **7** fragmentos dentro do cluster, cada um armazenando um valor de chave de fragmento exclusivo. Isso restringe o número de **shards** efetivos no cluster, adicionar mais de sete **shards** não traria nenhum benefício.

A imagem a seguir ilustra um cluster fragmentado usando o campo X como a chave de fragmento. Se X tiver baixa cardinalidade, a distribuição das inserções pode ser semelhante à seguinte:

![Ref](/img/mongodb/mongo_sharded_cluster_ref1.png)

> Como podemos ver na imagem, o **Shard A** não teve uso, devido a baixa cardinalidade da chave de fragmentação, que no exemplo é **X**.

:::caution Atenção
Uma chave de fragmentação com alta cardinalidade não garante, por si só, uma distribuição uniforme de dados no cluster fragmentado.
:::

Antes de continuar vamos abordar as duas variaveis: **minKey** e **maxKey**. O **MongoDB** divide o menor valor, o valor medio e o maior valor de uma chave de fragmento:

minKey = -1

maxKey = 127

Shard A = minKey <= X < 1

Shard B = 1 <= X < 2

Shard C = 2 <= X < maxKey

---

Voltando no exemplo de continentes, o **Shard A** terá tudo que tiver a chave **Ásia**, o **Shard B** terá tudo que tiver a chave **América**, **Shard C** terá tudo que tiver a chave **África**, o **Shard D** terá tudo que tiver a chave **Antártida**, **Shard E** terá tudo que tiver a chave **Europa**, **Shard F** terá tudo que tiver a chave **Oceania**, **Shard G** terá tudo que tiver a chave **Zelândia**, contabilizando um total de **7** shards, que são nossos servidores, mais do que isso é desnecessário. Dessa forma o mongo consegue distribuir os dados de forma uniforme, ou seja, cada shard terá uma porcentagem de dados igual.

### Frequência

A frequência da chave de fragmentação representa a frequência com que um determinado valor da chave de fragmentação ocorre nos dados. Se a maioria dos documentos contiver apenas um subconjunto dos valores de chave de shard possíveis, os blocos que armazenam os documentos com esses valores podem se tornar um gargalo dentro do cluster. Além disso, à medida que esses pedaços crescem, eles podem se tornar pedaços indivisíveis, pois não podem mais ser divididos. Isso reduz a eficácia do dimensionamento horizontal dentro do cluster.

A imagem a seguir ilustra um cluster fragmentado usando o campo X como a chave de fragmento. Se um subconjunto de valores para X ocorrer com alta frequência, a distribuição de inserções pode ser semelhante à seguinte:

![Ref](/img/mongodb/mongo_sharded_cluster_ref2.png)

:::caution Atenção
Uma chave de fragmentação com baixa frequência não garante, por si só, uma distribuição uniforme de dados no cluster fragmentado.
:::

Percebemos que a alta frequencia do mesmo valor da chave de fragmentação pode causar o mesmo efeito da baixa cardinalidade, um shard ficará sem dados, ou seja, sem utilidade, isso é péssimo para a performance do cluster.

Voltando ao exemplo dos continentes, se ocorrer de muitos documentos serem por exemplo da **África** então nosso cluster ficará desequilibrado, e pode ocorrer uma sobrecarga no bloco de armazenamento dos documentos, fazendo com que esses pedaços se tornem indivisíveis.

O MongoDB divide a extensão de valores de chave de fragmento (ou valores de chave de fragmento com hash) em intervalos não sobrepostos de valores de chave de fragmento (ou valores de chave de fragmento com hash). Cada faixa é associada com um bloco, e o mongo tenta distribuir os pedaços uniformemente entre os shards do cluster.

![Ref](/img/mongodb/mongo_sharded_cluster_ref3.png)

Podemos ver na imagem a cima que o bloco: **maior que 25 e menor ou igual 175** tem a maior porcentagem de dados comparado aos outros blocos.

### Mudança Monotonicamente

Uma chave de fragmento em um valor que aumenta ou diminui monotonicamente tem mais probabilidade de distribuir inserções em um único fragmento dentro do cluster.

Isso ocorre porque cada cluster possui um fragmento que captura um intervalo com um limite superior de **maxKey**. **maxKey** sempre compara como mais alto do que todos os outros valores. Da mesma forma, há um fragmento que captura um intervalo com um limite inferior de **minKey**. **minKey** sempre compara como inferior a todos os outros valores.

Se o valor da chave do fragmento está sempre aumentando, todas as novas inserções são roteadas para o fragmento com **maxKey** o limite superior. Se o valor da chave do fragmento estiver sempre diminuindo, todas as novas inserções serão roteadas para o fragmento com **minKey** o limite inferior. O shard que contém esse pedaço acaba ficando sobrecarregado e deixará as operações de escrita mais lentas.

A imagem a seguir ilustra um cluster fragmentado usando o campo X como a chave de fragmento. Se os valores de X estão aumentando monotonicamente, a distribuição das inserções pode ser semelhante à seguinte:

:::info Monotonicamente
Em matemática, uma função entre dois conjuntos ordenados é monótona quando ela preserva a relação de ordem. Quando a função preserva a relação, ela é chamada de função crescente. Quando ela inverte a relação, ela é chamada de função decrescente.
:::

![Ref](/img/mongodb/mongo_sharded_cluster_ref4.png)

Se o valor da chave do shard diminuísse monotonicamente, todas as inserções seriam roteadas para **Shard A**.

:::caution Atenção
Uma chave de shard que não muda monotonicamente não garante, por si só, uma distribuição uniforme de dados no cluster fragmentado. A cardinalidade e a frequência da chave de fragmento também contribuem para a distribuição dos dados.
:::

### Padrões de consulta de fragmentação

A chave de fragmentação ideal distribui os dados uniformemente no cluster fragmentado, ao mesmo tempo que facilita os padrões de consulta comuns. Ao escolher uma chave de fragmentação, considere seus padrões de consulta mais comuns e se uma determinada chave de fragmentação os cobre.

Ao efetuar consultas em um cluster fragmentado utilizando a chave de fragmentação, o mongo irá executar o roteamento para os shards que contenham os dados relevantes. Quando as consultas não possuem a chave de fragmentação, elas são transmitidas a todos os shards para avaliação. Esses tipos de consultas são chamados de consultas de coleta dispersa. As consultas que envolvem vários shards para cada solicitação são menos eficientes e não são escalonadas linearmente quando mais shards são incluídos no cluster. Isso não se aplica a consultas de agregação que operam em uma grande quantidade de dados. Nesses casos, a coleta de dispersão pode ser uma abordagem útil que permite que a consulta seja executada em paralelo em todos os fragmentos.

## Criando as pastas de dados

Cada instância do mongo utilizará um local diferente para salvar os dados, então vamos criá-los.

> Eu criei uma pasta chamada **mongodb_sharding** e criei 3 pastas chamadas **db_1**, **db_2** e **db_3**, dessa forma fica muito fácil saber qual instância usa cada pasta.

![4° Passo](https://i.imgur.com/urxTVFR.png)

## Iniciando as instâncias do servidor de configuração

Agora que já temos tudo o que vamos precisar, vamos iniciar as instância do mongo.

:::danger Pare o serviço do mongoDB
Antes de começar, pare o serviço do mongoDB, pois ele pode estar rodando, e essa instância padrão não será usada, mas ficará consumindo recursos de hardware.
:::

> Para abrir a aba de serviços no windows, use o comando: **Ctrl + R** e digite **services.msc**.

![5° Passo](https://i.imgur.com/ZWDPmLK.png)

Com o mongoDB parado, vamos iniciar as instâncias, precisamos abrir um terminal para cada instância, ou seja, serão três terminais abertos.

:::tip Abra os terminais como administrador
Para evitar problemas abra os terminais como administrador.
:::

:::tip Abra em uma área de trabalho separada
O windows 10 tem um recurso onde podemos trabalhar com diversas abas de trabalho, para abrir uma nova aba de trabalho, use o comando: **Ctrl + Windows + D**.
:::

> Você pode navegar fácilmente entre as abas de trabalho usando o comando: **Ctrl + Windows + Setas(Direita, Esquerda**), para fechar a aba use o comando: **Ctrl + Windows + F4**.

![6° Passo](https://i.imgur.com/aD8dhkj.png)

> Deixe todos os terminais apontando para o caminho **bin** do **MongoDB**.

![7° Passo](https://i.imgur.com/18z7wMg.png)

No primeiro terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --configsvr --replSet sh0 --port 27017 --bind_ip localhost --dbpath E:\mongodb_sharding\db_1 --oplogSize 128
```

No segundo terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --configsvr --replSet sh0 --port 27018 --bind_ip localhost --dbpath E:\mongodb_sharding\db_2 --oplogSize 128
```

No terceiro terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --configsvr --replSet sh0 --port 27019 --bind_ip localhost --dbpath E:\mongodb_sharding\db_3 --oplogSize 128
```

![8° Passo](https://i.imgur.com/ATYR80Q.png)

Agora vamos abrir outro terminal para acessar nosso cluster, ele deve está apontando para a pasta **bin** do **MongoDB**.

> Abra a primeira instância do mongo com o comando:

```bash title="Terminal de Comando"
$ mongo --port 27017
```

![9° Passo](https://i.imgur.com/9LyUJx4.png)

Agora vamos iniciar nossa replicação com o seguinte comando:

```bash title="Terminal de Comando"
$ rs.initiate({
  _id: "sh0",
  configsvr: true,
  members: [
    {
     _id: 0,
     host: "localhost:27017"
    },
    {
     _id: 1,
     host: "localhost:27018"
    },
    {
     _id: 2,
     host: "localhost:27019"
    }
   ]
})
```

:::caution Configuração básica
Nós não passamos nenhuma configuração adicional a nossas instancias, ou seja, elas ficarão com as configurações padrões. O mongoDB fornece um [conjunto de configurações avançadas](https://docs.mongodb.com/manual/reference/replica-configuration/) em sua documentação, recomendamos a leitura dessas configurações, é possivel realizar muitas coisas legais!
:::

![10° Passo](https://i.imgur.com/rN2eleh.png)

## Iniciando as instâncias do servidor de fragmentação

> Abra outra área de trabalho com 3 terminais e deixe-os apontando para o caminho **bin** do **MongoDB**.

:::caution Atenção
Os conjuntos de réplicas de shard não devem usar o mesmo nome que o conjunto de réplicas do servidor de configuração.
:::

:::info
Crie uma pasta chamada **shard** dentro da pasta **mongodb_sharding**, dentro da pasta **shard** crie as pastas: **db_1**, **db_2** e **db_3**, para que possamos salvar os dados das nossas instâncias.
:::

No primeiro terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --shardsvr --replSet sh0-1 --port 27020 --bind_ip localhost --dbpath E:\mongodb_sharding\shard\db_1 --oplogSize 128
```

No segundo terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --shardsvr --replSet sh0-1 --port 27021 --bind_ip localhost --dbpath E:\mongodb_sharding\shard\db_2 --oplogSize 128
```

No terceiro terminal use o comando:

```bash title="Terminal de Comando"
$ mongod --shardsvr --replSet sh0-1 --port 27022 --bind_ip localhost --dbpath E:\mongodb_sharding\shard\db_3 --oplogSize 128
```

![11° Passo](https://i.imgur.com/ATYR80Q.png)

Agora vamos abrir outro terminal para acessar nosso cluster, ele deve está apontando para a pasta **bin** do **MongoDB**.

> Abra a primeira instância do mongo com o comando:

```bash title="Terminal de Comando"
$ mongo --port 27020
```

![12° Passo](https://i.imgur.com/15dNDiL.png)

Agora vamos iniciar nossa replicação com o seguinte comando:

```bash title="Terminal de Comando"
$ rs.initiate({
   _id : "sh0-1",
   members: [
     {
        _id : 0,
        host : "localhost:27020"
     },
     {
        _id : 1,
        host : "localhost:27021"
     },
     {
        _id : 2,
        host : "localhost:27022"
     }
   ]
})
```

:::caution Configuração básica
Nós não passamos nenhuma configuração adicional a nossas instancias, ou seja, elas ficarão com as configurações padrões. O mongoDB fornece um [conjunto de configurações avançadas](https://docs.mongodb.com/manual/reference/replica-configuration/) em sua documentação, recomendamos a leitura dessas configurações, é possivel realizar muitas coisas legais!
:::

![13° Passo](https://i.imgur.com/XlgMCXi.png)

> Certo, acabamos de criar um servidor de configuração e subimos nossos shards, agora precisamos iniciar nosso cluster de fragmentação.

## Iniciando nosso cluster de fragmentação

Como você percebeu o mongo divide o trabalho em dois servidores, um servidor fica responsável pela configuração e interação com os clientes mongos, e outro servidor são os shards, que são responsáveis por armazenar os dados.

> Abra outra área de trabalho com 1 terminal e deixe-o apontando para o caminho **bin** do **MongoDB**.

No terminal use o comando:

```bash title="Terminal de Comando"
$ mongos --configdb sh0/localhost:27017,localhost:27018,localhost:27019 --bind_ip localhost --port 27023
```

![14° Passo](https://i.imgur.com/NgibART.png)

Após iniciar nosso cluster, vamos nos conectar a ele, abra outro terminal e use o seguinte comando:

```bash title="Terminal de Comando"
$ mongo --host localhost --port 27023
```

Agora que estamos conectados a nosso cluster, iremos adicionar nossos shards, para isso vamos usar o comando:

```bash title="Terminal de Comando"
$ sh.addShard("sh0-1/localhost:27020,localhost:27021,localhost:27022")
```

![15° Passo](https://i.imgur.com/O7AqjhC.png)

:::info
Repita essas etapas até que o cluster inclua todos os shards desejados.
:::

## Habilitar a fragmentação em um banco de dados

Antes de usar uma coleção fragmentada, é preciso habilitar a fragmentação no banco de dados, para isso vamos conectar em nosso cluster e usar o comando:

```bash title="Terminal de Comando"
$ sh.enableSharding("NOME_DO_BANCO_DE_DADOS")
```

![16° Passo](https://i.imgur.com/FyCnjRv.png)

:::caution Atenção
Se a coleção já contiver dados, você deve criar um índice que suporte a chave de fragmentação antes de fragmentar a coleção. Se a coleção estiver vazia, o MongoDB criará o índice como parte de sh.shardCollection().
:::

Mas antes de fragmentar a coleção, vamos entender a **fragmentação de hash** e a **fragmentação baseada em intervalo**.

### Fragmentação Hashed

A fragmentação de hash usa um índice de hash de campo único ou um índice de hash composto, como a chave de fragmentação para particionar dados em seu cluster.

#### Fragmentação em um Índice Hashed de Campo Único

A fragmentação de hash fornece uma distribuição de dados mais uniforme em todo o cluster fragmentado ao custo de reduzir as operações direcionadas versus as operações de transmissão. Após o hash, os documentos com valores de chave de fragmento "próximos" provavelmente não estarão no mesmo pedaço ou shard, mais provável que realizem operações de transmissão para preencher uma determinada consulta de intervalo. o mongo pode direcionar consultas com correspondências de igualdade para um único fragmento.

![Ref](/img/mongodb/mongo_sharded_cluster_ref5.png)

Os índices de hash calculam o valor hash de um único campo como o valor do índice; este valor é usado como sua chave de fragmento.

#### Fragmentação em um índice composto de hash

O MongoDB adiciona suporte para a criação de índices compostos com um único campo hash. Para criar um índice hash composto, especifique hashed como o valor de qualquer chave de índice única ao criar o índice.

O índice de hash composto calcula o valor de hash de um único campo no índice composto; este valor é usado junto com os outros campos no índice como sua chave de fragmentação.

A fragmentação de hash composto oferece suporte a recursos como fragmentação de zona, onde o prefixo (ou seja, o primeiro) campo ou campos sem hash oferecem suporte a intervalos de zona, enquanto o campo com hash suporta uma distribuição mais uniforme dos dados fragmentados. A fragmentação de hash composto também oferece suporte a chaves de fragmentação com um prefixo de hash para resolver problemas de distribuição de dados relacionados a campos monotonicamente crescentes.

:::caution Atenção
O MongoDB calcula automaticamente os hashes ao resolver consultas usando índices hash. Os aplicativos não precisam computar hashes.
:::

:::danger Aviso
Os índices de hashed do MongoDB truncam os números de ponto flutuante em inteiros de 64 bits antes de fazer o hash. Para evitar colisões, não use um índice de hashed para números de ponto flutuante que não possam ser convertidos de forma confiável em inteiros de 64 bits (e depois de volta ao ponto flutuante). Os índices de hashed do MongoDB não oferecem suporte a valores de ponto flutuante maiores que 2&#x2075;&#x00B3;.

Para ver qual seria o valor de hash para uma chave, consulte [convertShardKeyToHashed()](https://docs.mongodb.com/manual/reference/method/convertShardKeyToHashed/#mongodb-method-convertShardKeyToHashed).
:::

#### Chave de Fragmento de Hashed

O campo que você escolher como sua chave de fragmentação com hash deve ter uma boa cardinalidade ou um grande número de valores diferentes. Chaves com hash são ideais para chaves de fragmentação com campos que mudam monotonicamente, como valores de [ObjectId](https://docs.mongodb.com/manual/reference/glossary/#std-term-ObjectId) ou data/hora. Um bom exemplo disso é o campo **\_id** padrão, supondo que ele contenha apenas valores ObjectId.

A imagem a seguir mostra como ficaria a distribuição dos dados de forma monotonicamente crescente.

![Ref](/img/mongodb/mongo_sharded_cluster_ref6.png)

> Diferente da fragmentação baseada em intervalo, fazendo com que o bloco com um limite superior de **maxKey** receba a maioria das gravações de entrada, na fragmentação de hash o mongo executa uma distribuição uniforme dos dados.

### Fragmentação Baseada em Intervalo

A fragmentação baseada em intervalo envolve a divisão de dados em intervalos contíguos determinados pelos valores-chave de shard. Neste modelo, os documentos com os mesmos valores da chave de fragmentação são susceptíveis de está no mesmo pedaço ou shard. Isso permite consultas eficientes onde lê documentos de destino dentro de um intervalo contíguo. No entanto, o desempenho de leitura e gravação pode diminuir com uma criação ruim da chave de fragmento.

![Ref](/img/mongodb/mongo_sharded_cluster_ref3.png)

A fragmentação baseada em intervalo é a metodologia de fragmentação padrão sem nenhuma outra opção, como as necessárias para fragmentação de hash ou zonas.

---

Agora que sabemos como funciona as duas estratégias para fragmentar coleções, iremos utilizar a baseada em intervalo e utilizaremos um campo unico.

> Conectado ao cluster de shard, podemos fragmentar a coleção com o comando:

```bash title="Terminal de Comando"
$ sh.shardCollection("<database>.<collection>", { <shard key field> : 1 } )
```

![17° Passo](https://i.imgur.com/aSaE7YM.png)

Perfeito, nossa coleção está fragmentada.

## Conclusão

O mongoDB fornece duas estratégias de fragmentação, ambas com suas vantagens e desvantagens. Em nosso manual escolhemos a padrão baseada em intervalo, criamos um banco de dados chamado **sharding_db** e uma coleção fragmentada chamada **users** e definimos a chave de fragmentação como **\_shkey**, dessa forma todo documento salvo deverá ter um valor de **\_shkey**, se não passarmos o valor o mongo defini automaticamente como **null**. Recomendamos a leitura detalhada da documentação para executar a fragmentação. Como o manual ficou muito extenso deixamos o link nas referências para implementar segurança no seu cluster.

## Referências

- [Como instalar o OpenSSL no windows 10?](https://qastack.com.br/programming/50625283/how-to-install-openssl-in-windows-10)
- [Implantar cluster fragmentado com autenticação de arquivo de chave](https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-with-keyfile-access-control/#deploy-sharded-cluster-with-keyfile-authentication)
- [Cluster Fragmentado](https://docs.mongodb.com/manual/sharding/#sharded-cluster)
- [Chave de Fragmentação](https://docs.mongodb.com/manual/core/sharding-shard-key/)
- [Escolhendo uma Chave de Fragmentação](https://docs.mongodb.com/manual/core/sharding-choose-a-shard-key/#std-label-sharding-shard-key-selection)
- [Glossário](https://docs.mongodb.com/manual/reference/glossary/#std-term-chunk) -[Consultas distribuídas](https://docs.mongodb.com/manual/core/distributed-queries/#std-label-read-operations-sharded-clusters)
- [Implantar cluster fragmentado com autenticação de arquivo de chave](https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-with-keyfile-access-control/)
- [Fragmentação de hash](https://docs.mongodb.com/manual/core/hashed-sharding/)
- [Fragmentação baseada em intervalo](https://docs.mongodb.com/manual/core/ranged-sharding/#std-label-sharding-ranged)
