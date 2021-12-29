/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // But you can create a sidebar manually
  docusaurusSidebar: [
    {
      type: "doc",
      id: "introduction",
    },
    {
      type: "category",
      label: "📝 Iniciando",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "development/introduction"
        },
        {
          type: "doc",
          id: "development/nginx-portproxy"
        }
      ]
    },
    {
      type: "category",
      label: "📝 Visual Studio Code",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "development/vscode/introduction"
        },
        {
          type: "doc",
          id: "development/vscode/configuration"
        },
        {
          type: "doc",
          id: "development/vscode/remote"
        },
      ]
    },
    {
      type: "doc",
      id: "development/nodejs",
    },
    {
      type: "doc",
      id: "development/node-gyp"
    },
    {
      type: "doc",
      id: "development/ffmpeg"
    },
    {
      type: "doc",
      id: "development/repositories"
    },
    {
      type: "category",
      label: "📝 MongoDB",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "development/mongodb/introduction"
        },
        {
          type: "doc",
          id: "development/mongodb/replication"
        },
        {
          type: "doc",
          id: "development/mongodb/sharding"
        }
      ]
    },
    {
      type: "doc",
      id: "development/postgresql"
    },
    {
      type: "doc",
      id: "development/congratulations"
    }
  ],
};

module.exports = sidebars;
