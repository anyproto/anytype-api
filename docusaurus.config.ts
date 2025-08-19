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
  favicon: "img/favicon.ico",

  organizationName: "anyproto",
  projectName: "anytype-api",

  future: {
    v4: true,
    experimental_faster: true,
  },

  headTags: [
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Anytype API",
        alternateName: "Anytype Developers",
        url: "https://developers.anytype.io",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://developers.anytype.io/search/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      }),
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Anytype",
        url: "https://anytype.io",
        logo: "https://developers.anytype.io/img/logo.svg",
        sameAs: ["https://github.com/anyproto", "https://x.com/anytypelabs", "https://community.anytype.io"],
      }),
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Guides",
            item: "https://developers.anytype.io/docs/guides",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "API Reference",
            item: "https://developers.anytype.io/docs/reference",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Examples",
            item: "https://developers.anytype.io/docs/examples",
          },
        ],
      }),
    },
  ],

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
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.map((item) => {
              if (item.url === "https://developers.anytype.io/") {
                return { ...item, priority: 1.0 };
              }
              if (item.url.match(/\/(docs\/(guides|reference|examples))\/?$/)) {
                return { ...item, priority: 0.9 };
              }
              if (item.url.includes("/guides/get-started/")) {
                return { ...item, priority: 0.8 };
              }
              if (item.url.includes("/reference/2025-05-20/")) {
                return { ...item, priority: 0.7 };
              }
              if (item.url.match(/\/reference\/\d{4}-\d{2}-\d{2}\//)) {
                return { ...item, priority: 0.2 };
              }
              return item;
            });
          },
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
      { property: "og:title", content: "Start building with Anytype's API" },
      { property: "og:description", content: "The developer portal for extending Anytype through powerful integrations." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://developers.anytype.io" },
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
          to: "/docs/guides/get-started/authentication",
        },
        {
          position: "left",
          label: "Reference",
          to: "/docs/reference",
        },
        {
          position: "left",
          label: "Examples",
          to: "/docs/examples/overview",
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
              to: "/docs/guides/get-started/authentication",
            },
            {
              label: "Reference",
              to: "/docs/reference",
            },
            {
              label: "Examples",
              to: "/docs/examples/overview",
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
