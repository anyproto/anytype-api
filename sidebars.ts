// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import { getVersionGroups, openApiConfig, openApiV2Config } from "./openapi.config";

/* Single combined version dropdown: button shows the current version
   inline, menu lists all versions grouped by major with the current one
   marked active. Replaces the plugin's split versionSelector + versionCrumb
   pair. Groups come from openapi.config rather than the plugin-generated
   docs/reference/versions.json, which is a flat array and cannot say which
   major a version belongs to. */
function versionDropdown(currentVersion: string) {
  const groups = getVersionGroups();
  const current = groups.flatMap((group) => group.items).find((v) => v.version === currentVersion);

  const items = groups
    .map((group) => {
      const links = group.items
        .map((v) => {
          const active = v.version === currentVersion ? " dropdown__link--active" : "";
          return `<li><a class="dropdown__link${active}" href="${v.href}">${v.label}</a></li>`;
        })
        .join("");
      /* Group titles are plain list items, not dropdown__link — not focusable,
         not clickable. */
      return `<li class="version-dropdown__group">${group.title}</li>${links}`;
    })
    .join("");

  return `<div class="dropdown dropdown--hoverable dropdown--right">
  <button class="button button--block button--sm button--secondary">
    <span>API Version: <strong>${current?.display ?? currentVersion}</strong></span>
  </button>
  <ul class="dropdown__menu">${items}</ul>
</div>`;
}
import guidesSidebar from "./docs/guides/sidebar";
import examplesSidebar from "./docs/examples/sidebar";
import referenceSidebar20250212 from "./docs/reference/2025-02-12/sidebar";
import referenceSidebar20250317 from "./docs/reference/2025-03-17/sidebar";
import referenceSidebar20250422 from "./docs/reference/2025-04-22/sidebar";
import referenceSidebar20250520 from "./docs/reference/2025-05-20/sidebar";
import referenceSidebar20251108 from "./docs/reference/2025-11-08/sidebar";
import referenceSidebarV2 from "./docs/reference/v2/sidebar";

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

if (!referenceSidebarV2 || referenceSidebarV2.length === 0) {
  throw new Error(
    `Missing reference sidebar for API v2. Run 'bun run make-reference' to generate ` +
      `'./docs/reference/v2/sidebar.ts'.`
  );
}

function buildApiSidebar(version: string) {
  return [
    {
      type: "html",
      defaultStyle: true,
      value: versionDropdown(version),
      className: "version-button",
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

/* v2 differs from v1 in one place: the Reference category links to a
   hand-written landing page rather than a generated-index, because a
   pre-release needs framing the spec description cannot give it. */
function buildV2Sidebar(): SidebarsConfig[string] {
  return [
    {
      type: "html",
      defaultStyle: true,
      value: versionDropdown(openApiV2Config.label),
      className: "version-button",
    },
    {
      type: "category",
      label: "Reference",
      link: {
        type: "doc",
        id: "reference/v2-overview",
      },
      items: referenceSidebarV2,
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
  openApiSidebarV2: buildV2Sidebar(),
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
