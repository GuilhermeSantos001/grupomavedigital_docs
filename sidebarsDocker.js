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
      id: "installation",
    },
    {
      type: "doc",
      id: "persist-data",
    },
    {
      type: "doc",
      id: "bind-mount",
    },
    {
      "type": "doc",
      id: "networking",
    }
  ],
};

module.exports = sidebars;
