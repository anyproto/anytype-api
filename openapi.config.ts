import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

export interface OpenApiVersion {
  specPath: string;
  outputDir: string;
  label: string;
  baseUrl: string;
  downloadUrl: string;
}

export interface OpenApiConfig {
  latestVersion: string;
  showVersions: string[];
  versions: Record<string, OpenApiVersion>;
}

/* API v2 is a second major, not another date version of v1. It has no
   `Anytype-Version` parameter on any route, so it has no date axis to select
   from — one spec, one entry, served from its own plugin instance. When v2
   reaches GA and starts minting date versions, this grows a `versions` map of
   its own and `/docs/reference/v2` becomes the latest alias, the same shape v1
   has today. */
export interface OpenApiV2Config {
  specPath: string;
  outputDir: string;
  label: string;
  /* The hand-written landing page, not the generated Introduction — this is
     where the version dropdown sends readers. */
  baseUrl: string;
  downloadUrl: string;
}

export const openApiConfig: OpenApiConfig = {
  latestVersion: "2025-11-08",
  showVersions: ["2025-11-08", "2025-05-20", "2025-04-22"],
  versions: {
    "2025-11-08": {
      specPath: "docs/reference/openapi-2025-11-08.yaml",
      outputDir: "docs/reference/2025-11-08",
      label: "2025-11-08",
      baseUrl: "/docs/reference/2025-11-08/anytype-api",
      downloadUrl: "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/reference/openapi-2025-11-08.yaml",
    },
    "2025-05-20": {
      specPath: "docs/reference/openapi-2025-05-20.yaml",
      outputDir: "docs/reference/2025-05-20",
      label: "2025-05-20",
      baseUrl: "/docs/reference/2025-05-20/anytype-api",
      downloadUrl: "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/reference/openapi-2025-05-20.yaml",
    },
    "2025-04-22": {
      specPath: "docs/reference/openapi-2025-04-22.yaml",
      outputDir: "docs/reference/2025-04-22",
      label: "2025-04-22",
      baseUrl: "/docs/reference/2025-04-22/anytype-api",
      downloadUrl: "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/reference/openapi-2025-04-22.yaml",
    },
    "2025-03-17": {
      specPath: "docs/reference/openapi-2025-03-17.yaml",
      outputDir: "docs/reference/2025-03-17",
      label: "2025-03-17",
      baseUrl: "/docs/reference/2025-03-17/anytype-api",
      downloadUrl: "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/reference/openapi-2025-03-17.yaml",
    },
    "2025-02-12": {
      specPath: "docs/reference/swagger-2025-02-12.yaml",
      outputDir: "docs/reference/2025-02-12",
      label: "2025-02-12",
      baseUrl: "/docs/reference/2025-02-12/anytype-api",
      downloadUrl: "https://raw.githubusercontent.com/anyproto/anytype-api/main/docs/reference/swagger-2025-02-12.yaml",
    },
  },
};

export const openApiV2Config: OpenApiV2Config = {
  specPath: "docs/reference/openapi-v2.yaml",
  outputDir: "docs/reference/v2",
  label: "v2",
  baseUrl: "/docs/reference/v2",
  downloadUrl: "/openapi-v2.yaml",
};

/* One dropdown, two groups. Built here rather than from the plugin-generated
   `docs/reference/versions.json` because that file is a flat array and cannot
   express which major a version belongs to. */
export interface VersionGroupItem {
  /* Stable key used to mark the current entry active. */
  version: string;
  /* Menu text. */
  label: string;
  /* Button text when this entry is the current one. */
  display: string;
  href: string;
}

export interface VersionGroup {
  title: string;
  items: VersionGroupItem[];
}

export function getVersionGroups(): VersionGroup[] {
  const { latestVersion, showVersions, versions } = openApiConfig;

  return [
    {
      title: "API v2 — pre-release",
      items: [
        {
          version: openApiV2Config.label,
          label: openApiV2Config.label,
          display: `${openApiV2Config.label} (pre-release)`,
          href: openApiV2Config.baseUrl,
        },
      ],
    },
    {
      title: "API v1",
      items: showVersions.map((version) => ({
        version,
        label: version === latestVersion ? `${versions[version].label} (latest)` : versions[version].label,
        display: versions[version].label,
        href: versions[version].baseUrl,
      })),
    },
  ];
}

export function getOpenApiPluginConfig(): Plugin.PluginOptions {
  const { latestVersion, showVersions, versions } = openApiConfig;
  const latestVersionConfig = versions[latestVersion];

  const filteredVersions = Object.fromEntries(Object.entries(versions).filter(([version]) => showVersions.includes(version)));

  return {
    anytype: {
      specPath: latestVersionConfig.specPath,
      outputDir: "docs/reference",
      sidebarOptions: {
        groupPathsBy: "tag",
        categoryLinkSource: "tag",
      },
      version: latestVersion,
      label: latestVersionConfig.label,
      baseUrl: latestVersionConfig.baseUrl,
      downloadUrl: latestVersionConfig.downloadUrl,
      versions: filteredVersions,
    } satisfies OpenApiPlugin.Options,
    /* No `version`/`versions`: a non-versioned instance. Its outputDir sits
       inside the v1 instance's, which is safe — the plugin cleans with
       `deep: 1` globs scoped to each instance's own outputDir. */
    anytypeV2: {
      specPath: openApiV2Config.specPath,
      outputDir: openApiV2Config.outputDir,
      sidebarOptions: {
        groupPathsBy: "tag",
        categoryLinkSource: "tag",
      },
      downloadUrl: openApiV2Config.downloadUrl,
    } satisfies OpenApiPlugin.Options,
  } satisfies Plugin.PluginOptions;
}
