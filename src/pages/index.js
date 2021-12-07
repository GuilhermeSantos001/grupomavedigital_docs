import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import BrowserOnly from '@docusaurus/BrowserOnly';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 style={{ color: 'white', textAlign: 'center' }}>{siteConfig.title}</h1>
        <p style={{ color: 'white', textAlign: 'center' }}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={`Documentação`}
      description="Aprenda e Colabore">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
