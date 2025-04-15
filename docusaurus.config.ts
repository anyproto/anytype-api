// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "Anytype API",
  tagline: "The developer portal for extending Anytype through powerful integrations.",
  url: "https://developers.anytype.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",

  organizationName: "anyproto",
  projectName: "anytype-api",

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/anyproto/anytype-api/tree/main/",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/twitter-card.png",
    metadata: [
      { name: "twitter:title", content: "Start building with the Anytype API" },
      { name: "twitter:description", content: "The developer portal for extending Anytype through powerful integrations." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: "Developers",
      logo: {
        alt: "Anytype",
        src: "img/logo.svg",
        srcDark: "img/logo@dark.svg",
      },
      items: [
        {
          position: "left",
          label: "Guides",
          to: "/docs/guides",
        },
        {
          position: "left",
          label: "Reference",
          to: "/docs/reference",
        },
        {
          position: "left",
          label: "Examples",
          to: "/docs/examples",
        },
        {
          href: "https://github.com/anyproto/anytype-api",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Developers",
          items: [
            {
              label: "Guides",
              to: "/docs/guides",
            },
            {
              label: "Reference",
              to: "/docs/reference",
            },
            {
              label: "Examples",
              to: "/docs/examples",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Community",
              href: "https://community.anytype.io",
            },
            {
              label: "Docs",
              href: "https://docs.anytype.io",
            },
            {
              label: "X",
              href: "https://x.com/anytypelabs",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/anyproto/anytype-api",
            },
            {
              label: "Blog",
              href: "https://blog.anytype.io",
            },
          ],
        },
      ],
      copyright: `<div style="display: flex; flex-direction: column-reverse; gap: 1rem;">
      <div style="display: flex; align-items: center; justify-content: center; color: #9ca3af;">
        Made by Any — a Swiss association
        <img src="/img/swiss.svg" alt="Swiss" style="margin-left: 0.25rem; height: 1em; display: inline-block; vertical-align: text-bottom;" />
      </div>
    </div>`,
    },
    prism: {
      additionalLanguages: ["ruby", "csharp", "php", "java", "powershell", "json", "bash", "dart", "objectivec", "r"],
    },
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "curl",
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
      },
      {
        highlight: "javascript",
        language: "javascript",
        logoClass: "javascript",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "rust",
        language: "rust",
        logoClass: "rust",
      },
      {
        highlight: "c",
        language: "c",
        logoClass: "c",
      },
      {
        highlight: "swift",
        language: "swift",
        logoClass: "swift",
      },
      {
        highlight: "kotlin",
        language: "kotlin",
        logoClass: "kotlin",
      },
    ],
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          anytype: {
            specPath: "docs/api/swagger-2025-03-17.yaml",
            outputDir: "docs/api",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
            version: "2025-03-17",
            label: "2025-03-17",
            baseUrl: "/api/2025-03-17",
            downloadUrl: "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/api/swagger-2025-03-17.yaml",
            versions: {
              "2025-02-12": {
                specPath: "docs/api/swagger-2025-02-12.yaml",
                outputDir: "docs/api/2025-02-12",
                label: "2025-02-12",
                baseUrl: "/docs/api/2025-02-12/anytype-api",
                downloadUrl: "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/api/swagger-2025-02-12.yaml",
              },
              "2025-03-17": {
                specPath: "docs/api/swagger-2025-03-17.yaml",
                outputDir: "docs/api/2025-03-17",
                label: "2025-03-17",
                baseUrl: "/docs/api/2025-03-17/anytype-api",
                downloadUrl: "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/api/swagger-2025-03-17.yaml",
              },
            },
          } satisfies OpenApiPlugin.Options,
        } satisfies Plugin.PluginOptions,
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs", "@easyops-cn/docusaurus-search-local"],
};

export default async function createConfig() {
  return config;
}
