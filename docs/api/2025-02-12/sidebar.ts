import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/2025-02-12/anytype-api",
    },
    {
      type: "category",
      label: "auth",
      items: [
        {
          type: "doc",
          id: "api/2025-02-12/start-new-challenge",
          label: "Start new challenge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-02-12/retrieve-token",
          label: "Retrieve token",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "search",
      items: [
        {
          type: "doc",
          id: "api/2025-02-12/search-objects-across-all-spaces",
          label: "Search objects across all spaces",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-02-12/search-objects-within-a-space",
          label: "Search objects within a space",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "spaces",
      items: [
        {
          type: "doc",
          id: "api/2025-02-12/list-spaces",
          label: "List spaces",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-02-12/create-space",
          label: "Create space",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-02-12/list-members",
          label: "List members",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "objects",
      items: [
        {
          type: "doc",
          id: "api/2025-02-12/list-objects",
          label: "List objects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-02-12/create-object",
          label: "Create object",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-02-12/delete-object",
          label: "Delete object",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-02-12/get-object",
          label: "Get object",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "export",
      items: [
        {
          type: "doc",
          id: "api/2025-02-12/export-object",
          label: "Export object",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "types",
      items: [
        {
          type: "doc",
          id: "api/2025-02-12/list-types",
          label: "List types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-02-12/get-type",
          label: "Get type",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-02-12/list-templates",
          label: "List templates",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-02-12/get-template",
          label: "Get template",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
