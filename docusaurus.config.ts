// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { getOpenApiPluginConfig } from "./openapi.config";
import { openApiConfig } from "./openapi.config";

const config: Config = {
  title: "Anytype API",
  tagline: "The developer portal for extending Anytype through powerful integrations.",
  url: "https://developers.anytype.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.ico",

  organizationName: "anyproto",
  projectName: "anytype-api",

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
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
      { name: "twitter:title", content: "Start building with Anytype's API" },
      { name: "twitter:description", content: "The developer portal for extending Anytype through powerful integrations." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://developers.anytype.io/img/twitter-card.png" },
    ],
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: false,
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
      copyright: `<div class="footer-copyright">
      <div class="footer-copyright-content">
        Made by Any — a Swiss association
        <img src="/img/swiss.svg" alt="Swiss" class="footer-copyright-flag" />
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
        config: getOpenApiPluginConfig(),
      },
    ],
  ],

  themes: [
    "docusaurus-theme-openapi-docs",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        ignoreFiles: [new RegExp(`reference/(?!${openApiConfig.latestVersion}/).*`)],
      },
    ],
  ],
};

export default async function createConfig() {
  return config;
}
