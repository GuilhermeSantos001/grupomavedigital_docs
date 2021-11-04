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
  organizationName: "GuilhermeSantos001", // Usually your GitHub org/user name.
  projectName: "grupomavedigital_docs", // Usually your repo name.

  plugins: [
    'docusaurus-plugin-sass'
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/GuilhermeSantos001/grupomavedigital_docs/edit/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/GuilhermeSantos001/grupomavedigital_docs/edit/main/blog/",
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
      hideableSidebar: true,
      id: 'support_us',
      announcementBar: {
        content:
          'A documentação a seguir foi realizada por programadores para programadores. <a target="_blank" rel="noopener noreferrer" href="https://grupomavedigital.com.br">Enviar Feedback</a>',
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
            type: "docsVersionDropdown",
          },
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Começando do Zero",
          },
          {
            to: "/blog",
            label: "Blog",
            position: "right",
          },
          {
            to: "/community",
            label: "Guia da Comunidade",
            position: "right",
          },
          {
            href: "https://github.com/GuilhermeSantos001/grupomavedigital_docs",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        copyright: `Grupo Mave 2020-2021 © Todos direitos reservados. Construído com <a target="_blank" rel="noopener noreferrer" href="https://docusaurus.io/" style="color: green;">Docusaurus</a>. Hospedado por <a target="_blank" rel="noopener noreferrer" href="https://vercel.com/" style="color: blue;">Vercel</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    })
};

module.exports = config;
