import React from 'react';
import Layout from '@theme/Layout';
import styles from './community.module.scss';

export default function Home() {
    return (
        <Layout
            title={`Comunidade`}
            description="Guia da Comunidade">
            <main className={styles.main}>
                <section>
                    <div>
                        <h1>Guia da Comunidade</h1>
                        <p>
                            Nossa comunidade é um grupo de usuários que compartilham o mesmo interesse em tecnologia.
                            Somos uma comunidade de desenvolvedores, designers, programadores, entusiastas de tecnologia,
                            e etc, o que melhor descreve a comunidade é a união.
                        </p>
                        <h2>Regras</h2>
                        <p>
                            <ul>
                                <li>
                                    Seja respeitoso, estamos tentando criar um ambiente amigavel por aqui.
                                </li>
                                <li>
                                    Não seja um ditador, não seja um troll, não seja um idiota, sempre respeite os outros e suas liberdades.
                                </li>
                                <li>
                                    Utilizou algum conteúdo de terceiro? Seja gentil e compartilhe a fonte!
                                </li>
                                <li>
                                    Não trapaceie, não abuse de linguagem, não faça spam, não faça comentários de baixo nível.
                                </li>
                                <li>
                                    Não poste conteúdo que possa prejudicar a comunidade, como:
                                    <ul>
                                        <li>Violência</li>
                                        <li>Pornografia</li>
                                        <li>Pedofilia</li>
                                        <li>Necromancia</li>
                                        <li>Drogas</li>
                                        <li>Sexo</li>
                                        <li>Darkweb</li>
                                        <li>Racismo</li>
                                        <li>Xenofobia</li>
                                        <li>Homofobia</li>
                                    </ul>
                                    E qualquer outro conteúdo que possa ser identificado como prejudicial.
                                </li>
                                <li>
                                    Não crie conteúdo duplicado, veja se já não existe um conteúdo similar.
                                </li>
                                <li>
                                    Não poste conteúdo inacabado, finalize todo o material antes de postar.
                                </li>
                                <li>
                                    Não poste conteúdo contendo dados sensíveis, como:
                                    <ul>
                                        <li>CPF</li>
                                        <li>RG</li>
                                        <li>Endereço</li>
                                        <li>E-mail</li>
                                        <li>Senha</li>
                                        <li>Número de Cartão de crédito</li>
                                        <li>Número de Cartão de débito</li>
                                        <li>Número de Número de telefone</li>
                                        <li>Chaves de API</li>
                                        <li>Endereços de IP públicos, prefira usar o DNS ou Proxy</li>
                                    </ul>
                                </li>
                            </ul>
                        </p>
                        <h2>Punições</h2>
                        <p>
                            Caso você venha a desrespeitar as regras acima, você poderá ser punido de acordo com o veredito
                            dos nossos administradores. Uma vez aplicada a punição, você será banido permanentemente.
                            A consequência disso é que você não poderá mais colaborar com o projeto, pois entrará em nossa
                            blacklist.
                        </p>
                        <h2>Acesso a comunidade</h2>
                        <p>
                            Consideramos o todo como nossa comunidade, cada repositório, commit, post, tudo, é parte de nossa comunidade.
                            Então tome cuidado, pois em qualquer lugar você pode estar ajudando ou prejudicando a comunidade.
                        </p>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
