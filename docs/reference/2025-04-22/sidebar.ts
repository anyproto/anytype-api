import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "reference/2025-04-22/anytype-api",
    },
    {
      type: "category",
      label: "Auth",
      items: [
        {
          type: "doc",
          id: "reference/2025-04-22/create-auth-challenge",
          label: "Start new challenge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/solve-auth-challenge",
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
          id: "reference/2025-04-22/search-global",
          label: "Search objects across all spaces",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/search-space",
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
          id: "reference/2025-04-22/list-spaces",
          label: "List spaces",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/create-space",
          label: "Create space",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/get-space",
          label: "Get space",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/update-space",
          label: "Update space",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Lists",
      items: [
        {
          type: "doc",
          id: "reference/2025-04-22/get-list-objects",
          label: "Get objects in list",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/add-list-objects",
          label: "Add objects to list",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/remove-list-object",
          label: "Remove object from list",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/get-list-views",
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
          id: "reference/2025-04-22/list-members",
          label: "List members",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/get-member",
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
          id: "reference/2025-04-22/list-objects",
          label: "List objects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/create-object",
          label: "Create object",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/delete-object",
          label: "Delete object",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/get-object",
          label: "Get object",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/update-object",
          label: "Update object",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Properties",
      items: [
        {
          type: "doc",
          id: "reference/2025-04-22/list-properties",
          label: "List properties",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/create-property",
          label: "Create property",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/delete-property",
          label: "Delete property",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/get-property",
          label: "Get property",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/update-property",
          label: "Update property",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Tags",
      items: [
        {
          type: "doc",
          id: "reference/2025-04-22/list-tags",
          label: "List tags",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/create-tag",
          label: "Create tag",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/delete-tag",
          label: "Delete tag",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/get-tag",
          label: "Get tag",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/update-tag",
          label: "Update tag",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Types",
      items: [
        {
          type: "doc",
          id: "reference/2025-04-22/list-types",
          label: "List types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/create-type",
          label: "Create type",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/delete-type",
          label: "Delete type",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/get-type",
          label: "Get type",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/update-type",
          label: "Update type",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Templates",
      items: [
        {
          type: "doc",
          id: "reference/2025-04-22/list-templates",
          label: "List templates",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/2025-04-22/get-template",
          label: "Get template",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
