// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import apiVersions from "./docs/reference/versions.json";
import { versionCrumb, versionSelector } from "docusaurus-plugin-openapi-docs/lib/sidebars/utils";
import { openApiConfig } from "./openapi.config";
import guidesSidebar from "./docs/guides/sidebar";
import examplesSidebar from "./docs/examples/sidebar";
import referenceSidebar20250212 from "./docs/reference/2025-02-12/sidebar";
import referenceSidebar20250317 from "./docs/reference/2025-03-17/sidebar";
import referenceSidebar20250422 from "./docs/reference/2025-04-22/sidebar";
import referenceSidebar20250520 from "./docs/reference/2025-05-20/sidebar";
import referenceSidebar20251108 from "./docs/reference/2025-11-08/sidebar";

const { latestVersion, showVersions, versions } = openApiConfig;

const referenceSidebarsByVersion: Record<string, SidebarsConfig[string]> = {
  "2025-02-12": referenceSidebar20250212,
  "2025-03-17": referenceSidebar20250317,
  "2025-04-22": referenceSidebar20250422,
  "2025-05-20": referenceSidebar20250520,
  "2025-11-08": referenceSidebar20251108,
};

const missingReferenceSidebars = showVersions.filter((v) => !referenceSidebarsByVersion[v]);
if (missingReferenceSidebars.length > 0) {
  throw new Error(
    `Missing reference sidebars for versions: ${missingReferenceSidebars.join(", ")}. ` +
      `Add './docs/reference/<version>/sidebar.ts' and import it in 'sidebars.ts'.`
  );
}

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
      items: referenceSidebarsByVersion[version] ?? [],
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
      items: guidesSidebar,
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
      items: examplesSidebar,
    },
  ],
};

export default sidebars;
