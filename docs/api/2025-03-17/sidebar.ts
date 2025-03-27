import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/2025-03-17/anytype-api",
    },
    {
      type: "category",
      label: "auth",
      items: [
        {
          type: "doc",
          id: "api/2025-03-17/start-new-challenge",
          label: "Start new challenge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-03-17/retrieve-token",
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
          id: "api/2025-03-17/search-objects-across-all-spaces",
          label: "Search objects across all spaces",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-03-17/search-objects-within-a-space",
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
          id: "api/2025-03-17/list-spaces",
          label: "List spaces",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-03-17/create-space",
          label: "Create space",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-03-17/get-space",
          label: "Get space",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "lists",
      items: [
        {
          type: "doc",
          id: "api/2025-03-17/get-objects-in-list",
          label: "Get objects in list",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-03-17/add-objects-to-list",
          label: "Add objects to list",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-03-17/remove-object-from-list",
          label: "Remove object from list",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-03-17/get-list-views",
          label: "Get list views",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "members",
      items: [
        {
          type: "doc",
          id: "api/2025-03-17/list-members",
          label: "List members",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-03-17/get-member",
          label: "Get member",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-03-17/update-member",
          label: "Update member",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "objects",
      items: [
        {
          type: "doc",
          id: "api/2025-03-17/list-objects",
          label: "List objects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-03-17/create-object",
          label: "Create object",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-03-17/delete-object",
          label: "Delete object",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-03-17/get-object",
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
          id: "api/2025-03-17/export-object",
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
          id: "api/2025-03-17/list-types",
          label: "List types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-03-17/get-type",
          label: "Get type",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "templates",
      items: [
        {
          type: "doc",
          id: "api/2025-03-17/list-templates",
          label: "List templates",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-03-17/get-template",
          label: "Get template",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
