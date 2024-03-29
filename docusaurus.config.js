// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/oceanicNext");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Grupo Mave Digital",
  tagline: "Ambiente Digital Interativo",
  url: "https://grupomavedigital.com.br",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "GuilhermeSantos001",
  projectName: "grupomavedigital_docs",

  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'docs/api',
        routeBasePath: 'docs/api',
        sidebarPath: require.resolve('./sidebarsAPI.js'),
        editUrl: "https://github.com/GuilhermeSantos001/grupomavedigital_docs/edit/main/",
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'it',
        path: 'docs/it',
        routeBasePath: 'docs/it',
        sidebarPath: require.resolve('./sidebarsIT.js'),
        editUrl: "https://github.com/GuilhermeSantos001/grupomavedigital_docs/edit/main/",
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docker',
        path: 'docs/docker',
        routeBasePath: 'docs/docker',
        sidebarPath: require.resolve('./sidebarsDocker.js'),
        editUrl: "https://github.com/GuilhermeSantos001/grupomavedigital_docs/edit/main/",
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'env',
        path: 'docs/env',
        routeBasePath: 'docs/env',
        sidebarPath: require.resolve('./sidebarsEnv.js'),
        editUrl: "https://github.com/GuilhermeSantos001/grupomavedigital_docs/edit/main/",
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'changelog',
        path: 'docs/updates',
        routeBasePath: 'docs/updates',
        sidebarPath: require.resolve('./sidebarsChangelog.js'),
        editUrl: "https://github.com/GuilhermeSantos001/grupomavedigital_docs/edit/main/",
      },
    ],
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs/started',
          routeBasePath: 'docs/started',
          sidebarPath: require.resolve('./sidebarsStarted.js'),
          editUrl: "https://github.com/GuilhermeSantos001/grupomavedigital_docs/edit/main/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/GuilhermeSantos001/grupomavedigital_docs/edit/main/blog/",
          blogTitle: 'GMD Blog',
          blogDescription: 'Blog oficial do Grupo Mave Digital'
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        }
      },
      id: 'support_us',
      announcementBar: {
        content: 'Documentação realizada pela equipe Lack Zillions Over. <a target="_blank" rel="noopener noreferrer" href="mailto:luizgp120@hotmail.com?subject=Lack Zillions Over - Feedback da Documentação&body=Olá, me chamo ... e gostaria de expressar minha opinião sobre a documentação.">Enviar Feedback</a>',
        backgroundColor: '#fafbfc',
        textColor: '#004a6e',
        isCloseable: false
      },
      navbar: {
        title: "Digital",
        logo: {
          alt: "Grupo Mave",
          src: "img/logo-light.png",
          srcDark: "img/logo-dark.png"
        },
        items: [
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "API",
            docsPluginId: 'api',
          },
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "TI",
            docsPluginId: 'it',
          },
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Docker",
            docsPluginId: 'docker',
          },
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Começando do Zero"
          },
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: ".ENV",
            docsPluginId: 'env',
          },
          {
            type: "doc",
            docId: "introduction",
            position: "right",
            label: "Atualizações",
            docsPluginId: 'changelog',
          },
          {
            type: 'dropdown',
            label: 'Comunidade',
            position: "right",
            items: [
              {
                to: "/community",
                label: "Guia da Comunidade",
              },
              {
                to: "/blog",
                label: "Blog",
              },
              {
                href: "https://github.com/GuilhermeSantos001/grupomavedigital_docs",
                label: "GitHub",
              },
            ],
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Grupo Mave 2020-2022 © Todos direitos reservados. Construído com <a target="_blank" rel="noopener noreferrer" href="https://docusaurus.io/" style="color: green;">Docusaurus</a>. Hospedado por <a target="_blank" rel="noopener noreferrer" href="https://vercel.com/" style="color: green;">Vercel</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          'powershell',
        ],
      },
    })
};

module.exports = config;
