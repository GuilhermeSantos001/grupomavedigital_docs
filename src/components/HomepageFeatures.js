import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import useThemeContext from '@theme/hooks/useThemeContext';

import image1_light from '@site/static/img/aprendizagem-light.png';
import image1_dark from '@site/static/img/aprendizagem-dark.png';
import image2_light from '@site/static/img/colaboração-light.png';
import image2_dark from '@site/static/img/colaboração-dark.png';
import image3_light from '@site/static/img/decolagem-light.png';
import image3_dark from '@site/static/img/decolagem-dark.png';

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

function Feature({ image, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  const { isDarkTheme } = useThemeContext();

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) =>
            isDarkTheme ? (
              <Feature key={idx} {...props} image={props.image.dark} />
            ) : (
              <Feature key={idx} {...props} image={props.image.light} />
            ))}
        </div>
      </div>
    </section>
  );
}
