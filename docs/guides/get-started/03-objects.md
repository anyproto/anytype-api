---
sidebar_position: 3
title: "Working with Objects"
description: "This guide explains how to work with objects through the Anytype API."
keywords: [anytype, api, objects, notes, pages, tasks, content, management]
---

# Working with Objects

Objects in Anytype represent individual content pieces like notes, pages and tasks. They are fundamental units that store your data, structured around customizable properties and rich content fields.

Using the Anytype API, you can easily create new objects within a specified space, update existing ones, or archive them when they're no longer needed. Every object can have a name, icon, properties and body content that supports Markdown formatting. This flexibility allows developers to automate content creation and management, building dynamic applications that leverage Anytype’s content structure.

Objects are the building blocks of your work - whether they’re notes, tasks, or pages. The Anytype API lets you create, view, update, and delete objects.

## Create an Object

To create an object, send a `POST` request to `/spaces/{space_id}/objects` with a payload containing the following fields:

- **name:** The title of your object.
- **icon:** Information about the icon (for example, an emoji).
- **body:** The main content (supports Markdown).
- **type_key:** The type of object to create.
- **properties:** A list of properties to include in the object.

Example payload:

```json
{
  "name": "Project Plan",
  "icon": {
    "emoji": "📄",
    "format": "emoji"
  },
  "body": "## Introduction\nThis project will...",
  "type_key": "page",
  "properties": [
    {
      "key": "description",
      "text": "Outline for the new project"
    },
    {
      "key": "done",
      "checkbox": true
    }
  ]
}
```

## Retrieve, Update & Delete

- Retrieve an Object:
  `GET /spaces/{space_id}/objects/{object_id}`

- Update an Object:
  `PUT /spaces/{space_id}/objects/{object_id}`

- Delete an Object:
  `DELETE /spaces/{space_id}/objects/{object_id}`
  (This marks the object as archived.)

Archiving moves the object out of active views but retains the ability to restore it later.
