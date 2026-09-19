import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "reference/v2/anytype-api",
    },
    {
      type: "category",
      label: "Auth",
      link: {
        type: "doc",
        id: "reference/v2/auth",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/create-api-key",
          label: "Create an API key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/create-auth-challenge",
          label: "Create a challenge",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/auth-whoami",
          label: "Get API key details",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Spaces",
      link: {
        type: "doc",
        id: "reference/v2/spaces",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/list-spaces",
          label: "List spaces",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/create-space",
          label: "Create a space",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/get-space",
          label: "Get a space",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/update-space",
          label: "Update a space",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Objects",
      link: {
        type: "doc",
        id: "reference/v2/objects",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/list-objects",
          label: "List objects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/create-object",
          label: "Create an object",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/delete-object",
          label: "Delete an object",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/v2/get-object",
          label: "Get an object",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/patch-object",
          label: "Update an object",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Search",
      link: {
        type: "doc",
        id: "reference/v2/search",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/search-global",
          label: "Search objects across spaces",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/search-space",
          label: "Search objects in a space",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Types",
      link: {
        type: "doc",
        id: "reference/v2/types",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/list-types",
          label: "List types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/create-type",
          label: "Create a type",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/delete-type",
          label: "Delete a type",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/v2/get-type",
          label: "Get a type",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/update-type",
          label: "Update a type",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Properties",
      link: {
        type: "doc",
        id: "reference/v2/properties",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/list-properties",
          label: "List properties",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/create-property",
          label: "Create a property",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/delete-property",
          label: "Delete a property",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/v2/update-property",
          label: "Update a property",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "reference/v2/list-property-options",
          label: "List property options",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Lists",
      link: {
        type: "doc",
        id: "reference/v2/lists",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/create-collection",
          label: "Create a collection",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/get-collection-objects",
          label: "List collection objects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/get-collection-views",
          label: "List collection views",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/create-query",
          label: "Create a query",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/get-query-objects",
          label: "List query results",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/get-query-views",
          label: "List query views",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Chat",
      link: {
        type: "doc",
        id: "reference/v2/chat",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/list-chats",
          label: "List chats",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/create-chat",
          label: "Create a chat",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/get-chat-messages",
          label: "List chat messages",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/add-chat-message",
          label: "Send a chat message",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/delete-chat-message",
          label: "Delete a chat message",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/v2/edit-chat-message",
          label: "Update chat message text",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "reference/v2/toggle-chat-reaction",
          label: "Toggle a chat reaction",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/stream-chat-messages",
          label: "Stream chat messages",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/read-chat",
          label: "Mark chat activity as read",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Members",
      link: {
        type: "doc",
        id: "reference/v2/members",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/list-members",
          label: "List members",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/get-member-me",
          label: "Get the current member",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Files",
      link: {
        type: "doc",
        id: "reference/v2/files",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/upload-file",
          label: "Upload a file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/v2/download-file",
          label: "Get file content",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/head-file",
          label: "Get file headers",
          className: "api-method head",
        },
      ],
    },
    {
      type: "category",
      label: "Templates",
      link: {
        type: "doc",
        id: "reference/v2/templates",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/create-template",
          label: "Create a template",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      link: {
        type: "doc",
        id: "reference/v2/schemas",
      },
      items: [
        {
          type: "doc",
          id: "reference/v2/list-schemas",
          label: "List schemas",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/get-schema",
          label: "Get a schema",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/get-op-schema",
          label: "Get an edit operation schema",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/v2/validate",
          label: "Validate an AnyBlock document",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
