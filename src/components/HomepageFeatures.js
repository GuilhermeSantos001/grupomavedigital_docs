import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

import image1_light from '/img/aprendizagem-light.png';
import image1_dark from '/img/aprendizagem-dark.png';
import image2_light from '/img/colaboração-light.png';
import image2_dark from '/img/colaboração-dark.png';
import image3_light from '/img/decolagem-light.png';
import image3_dark from '/img/decolagem-dark.png';

const FeatureList = [
  {
    title: 'Aprendizagem',
    image: {
      light: image1_light,
      dark: image1_dark
    },
    description: (
      <>
        Leia a documentação e aprenda a usar nossa plataforma de forma simples e rápida.
      </>
    ),
  },
  {
    title: 'Colaboração',
    image: {
      light: image2_light,
      dark: image2_dark
    },
    description: (
      <>
        Você pode nos ajude a melhorar nossa plataforma através de trabalhos mais complexos ou de forma documental.
      </>
    ),
  },
  {
    title: 'Decolagem',
    image: {
      light: image3_light,
      dark: image3_dark
    },
    description: (
      <>
        Nós temos o objetivo de ajudar você a começar a produzir o mais rapido possível.
      </>
    ),
  },
];

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <div key={idx} className={clsx('col col--4')}>
              <div className="text--center">
                <ThemedImage
                  className={styles.featureSvg}
                  alt={props.title}
                  sources={{
                    light: useBaseUrl(props.image.light),
                    dark: useBaseUrl(props.image.dark),
                  }}
                />
              </div>
              <div className="text--center padding-horiz--md">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
