import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/2025-04-22/anytype-api",
    },
    {
      type: "category",
      label: "Auth",
      items: [
        {
          type: "doc",
          id: "api/2025-04-22/start-new-challenge",
          label: "Start new challenge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-04-22/solve-challenge",
          label: "Solve challenge",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Search",
      items: [
        {
          type: "doc",
          id: "api/2025-04-22/search-objects-across-all-spaces",
          label: "Search objects across all spaces",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-04-22/search-objects-within-a-space",
          label: "Search objects within a space",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Spaces",
      items: [
        {
          type: "doc",
          id: "api/2025-04-22/list-spaces",
          label: "List spaces",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-04-22/create-space",
          label: "Create space",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-04-22/get-space",
          label: "Get space",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Lists",
      items: [
        {
          type: "doc",
          id: "api/2025-04-22/get-objects-in-list",
          label: "Get objects in list",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-04-22/add-objects-to-list",
          label: "Add objects to list",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-04-22/remove-object-from-list",
          label: "Remove object from list",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-04-22/get-list-views",
          label: "Get list views",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Members",
      items: [
        {
          type: "doc",
          id: "api/2025-04-22/list-members",
          label: "List members",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-04-22/get-member",
          label: "Get member",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Objects",
      items: [
        {
          type: "doc",
          id: "api/2025-04-22/list-objects",
          label: "List objects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-04-22/create-object",
          label: "Create object",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-04-22/delete-object",
          label: "Delete object",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-04-22/get-object",
          label: "Get object",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-04-22/export-object",
          label: "Export object",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Properties",
      items: [
        {
          type: "doc",
          id: "api/2025-04-22/list-properties",
          label: "List properties",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-04-22/get-property",
          label: "Get property",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-04-22/list-property-options",
          label: "List property options",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Types",
      items: [
        {
          type: "doc",
          id: "api/2025-04-22/list-types",
          label: "List types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-04-22/get-type",
          label: "Get type",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Templates",
      items: [
        {
          type: "doc",
          id: "api/2025-04-22/list-templates",
          label: "List templates",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-04-22/get-template",
          label: "Get template",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
