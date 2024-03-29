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
      type: "doc",
      id: "server"
    },
    {
      type: 'category',
      label: "📦 API v1.0.0",
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "v1.0.0/changelog"
        },
        {
          type: "doc",
          id: "v1.0.0/costCenter"
        },
        {
          type: "doc",
          id: "v1.0.0/scale"
        }
      ]
    },
    {
      type: "category",
      label: "⚗ Hercules -> Changelog",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'hercules/v0.8.4'
        },
        {
          type: 'doc',
          id: 'hercules/v0.8.1'
        },
        {
          type: 'doc',
          id: 'hercules/v0.6.4'
        },
        {
          type: 'doc',
          id: 'hercules/v0.4.7'
        },
        {
          type: 'doc',
          id: 'hercules/v0.3.4'
        },
        {
          type: 'doc',
          id: 'hercules/v0.2.4'
        },
        {
          type: 'doc',
          id: 'hercules/v0.1.0'
        }
      ]
    },
    {
      type: "category",
      label: "⚗ Payback -> Changelog",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'payback/v6.0.0'
        },
        {
          type: 'doc',
          id: 'payback/v5.0.0'
        },
        {
          type: 'doc',
          id: 'payback/v3.8.8'
        },
        {
          type: 'doc',
          id: 'payback/v3.4.6'
        },
        {
          type: 'doc',
          id: 'payback/v2.9.4'
        },
        {
          type: 'doc',
          id: 'payback/v0.8.5'
        },
        {
          type: 'doc',
          id: 'payback/v0.1.0'
        }
      ]
    }
  ],
};

module.exports = sidebars;
