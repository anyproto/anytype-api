// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import apiVersions from "./docs/reference/versions.json";
import { versionCrumb, versionSelector } from "docusaurus-plugin-openapi-docs/lib/sidebars/utils";
import { openApiConfig } from "./openapi.config";

const { latestVersion, showVersions, versions } = openApiConfig;

function buildApiSidebar(version: string) {
  return [
    {
      type: "html",
      defaultStyle: true,
      value: versionSelector(apiVersions),
      className: "version-button",
    },
    {
      type: "html",
      defaultStyle: true,
      value: versionCrumb(version),
    },
    {
      type: "category",
      label: "Reference",
      link: {
        type: "generated-index",
        title: "Reference",
        description:
          "Access a detailed guide to the Anytype API. Learn how to query, retrieve, and update spaces, objects, properties, types, and templates to build powerful extensions.",
        slug: version === latestVersion ? "/reference" : `/reference/${version}`,
      },
      items: require(`./docs/reference/${version}/sidebar.ts`),
    },
    {
      type: "ref",
      label: "Changelog",
      id: "reference/changelog",
    },
  ];
}

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
  ...Object.fromEntries(
    Object.keys(versions).map((version) => [
      `openApiSidebar${version.replace(/-/g, "")}`,
      showVersions.includes(version) ? buildApiSidebar(version) : [],
    ])
  ),
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
