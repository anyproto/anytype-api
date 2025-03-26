// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Guides",
      link: {
        type: "generated-index",
        title: "Guides",
        description: "Explore a collection of guides that provide step-by-step instructions and best practices for using the Anytype API.",
        slug: "/category/guides",
      },
      items: require("./docs/guides/sidebar.ts"),
    },
  ],
  openApiSidebar: [
    {
      type: "category",
      label: "Anytype API",
      link: {
        type: "generated-index",
        title: "API Reference",
        description:
          "Access a detailed guide to the Anytype API. Learn how to query, retrieve, and update spaces, objects, types, and templates to build powerful extensions.",
        slug: "/category/reference",
      },
      items: require("./docs/api/sidebar.ts"),
    },
  ],
  exampleSidebar: [
    {
      type: "category",
      label: "Examples",
      link: {
        type: "generated-index",
        title: "Examples",
        description:
          "Browse real-world examples that showcase the potential of the Anytype API. Get inspired to create custom integrations and workflows.",
        slug: "/category/examples",
      },
      items: require("./docs/examples/sidebar.ts"),
    },
  ],
};

export default sidebars;
