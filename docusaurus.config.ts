// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "Anytype API",
  tagline: "The developer portal for Anytype API",
  url: "https://api.anytype.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
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
        width: 80,
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Guides",
        },
        {
          label: "Reference",
          position: "left",
          to: "/docs/api/anytype-api",
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
          title: "Docs",
          items: [
            {
              label: "Guides",
              to: "/docs/intro",
            },
            {
              label: "Reference",
              to: "/docs/api/anytype-api",
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
        highlight: "python",
        language: "python",
        logoClass: "python",
      },
      {
        highlight: "bash",
        language: "curl",
        logoClass: "curl",
      },
      {
        highlight: "csharp",
        language: "csharp",
        logoClass: "csharp",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
      },
      {
        highlight: "ruby",
        language: "ruby",
        logoClass: "ruby",
      },
      {
        highlight: "php",
        language: "php",
        logoClass: "php",
      },
      {
        highlight: "java",
        language: "java",
        logoClass: "java",
        variant: "unirest",
      },
      {
        highlight: "powershell",
        language: "powershell",
        logoClass: "powershell",
      },
      {
        highlight: "dart",
        language: "dart",
        logoClass: "dart",
      },
      {
        highlight: "javascript",
        language: "javascript",
        logoClass: "javascript",
      },
      {
        highlight: "c",
        language: "c",
        logoClass: "c",
      },
      {
        highlight: "objective-c",
        language: "objective-c",
        logoClass: "objective-c",
      },
      {
        highlight: "ocaml",
        language: "ocaml",
        logoClass: "ocaml",
      },
      {
        highlight: "r",
        language: "r",
        logoClass: "r",
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
      {
        highlight: "rust",
        language: "rust",
        logoClass: "rust",
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
            specPath: "docs/api/swagger.yaml",
            outputDir: "docs/api",
            downloadUrl: "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/api/swagger.yaml",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        } satisfies Plugin.PluginOptions,
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],
};

export default async function createConfig() {
  return config;
}
