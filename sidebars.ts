// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import apiVersions from "./docs/api/versions.json";
import { versionCrumb, versionSelector } from "docusaurus-plugin-openapi-docs/lib/sidebars/utils";
import { openApiConfig } from "./openapi.config";

const { latestVersion, showVersions } = openApiConfig;

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
  openApiSidebar20250520: showVersions.includes("2025-05-20")
    ? [
        {
          type: "html",
          defaultStyle: true,
          value: versionSelector(apiVersions),
          className: "version-button",
        },
        {
          type: "html",
          defaultStyle: true,
          value: versionCrumb(`2025-05-20`),
        },
        {
          type: "category",
          label: "Reference",
          link: {
            type: "generated-index",
            title: "Reference",
            description:
              "Access a detailed guide to the Anytype API. Learn how to query, retrieve, and update spaces, objects, properties, types, and templates to build powerful extensions.",
            slug: "2025-05-20" === latestVersion ? "/reference" : "/reference/2025-05-20",
          },
          items: require("./docs/api/2025-05-20/sidebar.ts"),
        },
      ]
    : [],
  openApiSidebar20250422: showVersions.includes("2025-04-22")
    ? [
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
            slug: "2025-04-22" === latestVersion ? "/reference" : "/reference/2025-04-22",
          },
          items: require("./docs/api/2025-04-22/sidebar.ts"),
        },
      ]
    : [],
  openApiSidebar20250317: showVersions.includes("2025-03-17")
    ? [
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
              "Access a detailed guide to the Anytype API. Learn how to query, retrieve, and update spaces, objects, properties, types, and templates to build powerful extensions.",
            slug: "2025-03-17" === latestVersion ? "/reference" : "/reference/2025-03-17",
          },
          items: require("./docs/api/2025-03-17/sidebar.ts"),
        },
      ]
    : [],
  openApiSidebar20250212: showVersions.includes("2025-02-12")
    ? [
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
          label: "Reference",
          link: {
            type: "generated-index",
            title: "Reference",
            description:
              "Access a detailed guide to the Anytype API. Learn how to query, retrieve, and update spaces, objects, properties, types, and templates to build powerful extensions.",
            slug: "2025-02-12" === latestVersion ? "/reference" : "/reference/2025-02-12",
          },
          items: require("./docs/api/2025-02-12/sidebar.ts"),
        },
      ]
    : [],
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
