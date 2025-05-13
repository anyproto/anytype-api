import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/2025-05-20/anytype-api",
    },
    {
      type: "category",
      label: "Auth",
      items: [
        {
          type: "doc",
          id: "api/2025-05-20/create-auth-challenge",
          label: "Start new challenge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-05-20/solve-auth-challenge",
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
          id: "api/2025-05-20/search-global",
          label: "Search objects across all spaces",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-05-20/search-space",
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
          id: "api/2025-05-20/list-spaces",
          label: "List spaces",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/create-space",
          label: "Create space",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-05-20/get-space",
          label: "Get space",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/update-space",
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
          id: "api/2025-05-20/add-list-objects",
          label: "Add objects to list",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-05-20/remove-list-object",
          label: "Remove object from list",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-05-20/get-list-views",
          label: "Get list views",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/get-list-objects",
          label: "Get objects in list",
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
          id: "api/2025-05-20/list-members",
          label: "List members",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/get-member",
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
          id: "api/2025-05-20/list-objects",
          label: "List objects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/create-object",
          label: "Create object",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-05-20/delete-object",
          label: "Delete object",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-05-20/get-object",
          label: "Get object",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/update-object",
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
          id: "api/2025-05-20/list-properties",
          label: "List properties",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/create-property",
          label: "Create property",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-05-20/delete-property",
          label: "Delete property",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-05-20/get-property",
          label: "Get property",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/update-property",
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
          id: "api/2025-05-20/list-tags",
          label: "List tags",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/create-tag",
          label: "Create tag",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-05-20/delete-tag",
          label: "Delete tag",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-05-20/get-tag",
          label: "Get tag",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/update-tag",
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
          id: "api/2025-05-20/list-types",
          label: "List types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/create-type",
          label: "Create type",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/2025-05-20/delete-type",
          label: "Delete type",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/2025-05-20/get-type",
          label: "Get type",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/update-type",
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
          id: "api/2025-05-20/list-templates",
          label: "List templates",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/2025-05-20/get-template",
          label: "Get template",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
