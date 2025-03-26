import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/anytype-api",
    },
    {
      type: "category",
      label: "auth",
      items: [
        {
          type: "doc",
          id: "api/start-new-challenge",
          label: "Start new challenge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/retrieve-token",
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
          id: "api/search-objects-across-all-spaces",
          label: "Search objects across all spaces",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/search-objects-within-a-space",
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
          id: "api/list-spaces",
          label: "List spaces",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-space",
          label: "Create space",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-space",
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
          id: "api/get-objects-in-list",
          label: "Get objects in list",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/add-objects-to-list",
          label: "Add objects to list",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/remove-object-from-list",
          label: "Remove object from list",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-list-views",
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
          id: "api/list-members",
          label: "List members",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-member",
          label: "Get member",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/update-member",
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
          id: "api/list-objects",
          label: "List objects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-object",
          label: "Create object",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-object",
          label: "Delete object",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-object",
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
          id: "api/export-object",
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
          id: "api/list-types",
          label: "List types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-type",
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
          id: "api/list-templates",
          label: "List templates",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-template",
          label: "Get template",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
