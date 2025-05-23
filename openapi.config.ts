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

export const openApiConfig: OpenApiConfig = {
  latestVersion: "2025-05-20",
  showVersions: ["2025-05-20", "2025-04-22", "2025-03-17"],
  versions: {
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

export function getOpenApiPluginConfig(): Plugin.PluginOptions {
  const { latestVersion, showVersions, versions } = openApiConfig;
  const latestVersionConfig = versions[latestVersion];

  const filteredVersions = Object.fromEntries(Object.entries(versions).filter(([version]) => showVersions.includes(version)));

  return {
    anytype: {
      specPath: latestVersionConfig.specPath,
      outputDir: "docs/api",
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
  } satisfies Plugin.PluginOptions;
}
