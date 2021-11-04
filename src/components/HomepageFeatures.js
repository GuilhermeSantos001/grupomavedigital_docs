import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Aprendizagem',
    Svg: {
      light: require('../../static/img/aprendizagem-light.svg').default,
      dark: require('../../static/img/aprendizagem-dark.svg').default
    },
    description: (
      <>
        Leia a documentação e aprenda a usar nossa plataforma de forma simples e rápida.
      </>
    ),
  },
  {
    title: 'Colaboração',
    Svg: {
      light: require('../../static/img/colaboração-light.svg').default,
      dark: require('../../static/img/colaboração-dark.svg').default
    },
    description: (
      <>
        Você pode nos ajude a melhorar nossa plataforma através de trabalhos mais complexos ou de forma documental.
      </>
    ),
  },
  {
    title: 'Decolagem',
    Svg: {
      light: require('../../static/img/decolagem-light.svg').default,
      dark: require('../../static/img/decolagem-dark.svg').default
    },
    description: (
      <>
        Nós temos o objetivo de ajudar você a começar a produzir o mais rapido possível.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) =>
            document.getElementsByTagName('html').item(0).dataset['theme'] === 'dark' ? (
              <Feature key={idx} {...props} Svg={props.Svg.dark} />
            ) : (
              <Feature key={idx} {...props} Svg={props.Svg.light} />
            ))}
        </div>
      </div>
    </section>
  );
}
