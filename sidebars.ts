// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import apiVersions from "./docs/api/versions.json";
import { versionCrumb, versionSelector } from "docusaurus-plugin-openapi-docs/lib/sidebars/utils";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "category",
      label: "Guides",
      link: {
        type: "generated-index",
        title: "Guides",
        description: "Explore a collection of guides that provide step-by-step instructions and best practices for using the Anytype API.",
        slug: "/guides",
      },
      items: require("./docs/guides/sidebar.ts"),
    },
  ],
  openApiSidebar20250422: [
    {
      type: "html",
      defaultStyle: true,
      value: versionSelector(apiVersions),
      className: "version-button",
    },
    {
      type: "html",
      defaultStyle: true,
      value: versionCrumb(`2025-04-22`),
    },
    {
      type: "category",
      label: "Reference",
      link: {
        type: "generated-index",
        title: "Reference",
        description:
          "Access a detailed guide to the Anytype API. Learn how to query, retrieve, and update spaces, objects, properties, types, and templates to build powerful extensions.",
        slug: "/reference",
      },
      items: require("./docs/api/2025-04-22/sidebar.ts"),
    },
  ],
  openApiSidebar20250317: [
    {
      type: "html",
      defaultStyle: true,
      value: versionSelector(apiVersions),
      className: "version-button",
    },
    {
      type: "html",
      defaultStyle: true,
      value: versionCrumb(`2025-03-17`),
    },
    {
      type: "category",
      label: "Reference",
      link: {
        type: "generated-index",
        title: "Reference",
        description:
          "Access a detailed guide to the Anytype API. Learn how to query, retrieve, and update spaces, objects, types, and templates to build powerful extensions.",
        slug: "/reference/2025-03-17",
      },
      items: require("./docs/api/2025-03-17/sidebar.ts"),
    },
  ],
  openApiSidebar20250212: [
    {
      type: "html",
      defaultStyle: true,
      value: versionSelector(apiVersions),
      className: "version-button",
    },
    {
      type: "html",
      defaultStyle: true,
      value: versionCrumb(`2025-02-12`),
    },
    {
      type: "category",
      label: "Anytype API",
      link: {
        type: "generated-index",
        title: "Reference",
        description:
          "Access a detailed guide to the Anytype API. Learn how to query, retrieve, and update spaces, objects, types, and templates to build powerful extensions.",
        slug: "/reference/2025-02-12",
      },
      items: require("./docs/api/2025-02-12/sidebar.ts"),
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
        slug: "/examples",
      },
      items: require("./docs/examples/sidebar.ts"),
    },
  ],
};

export default sidebars;
