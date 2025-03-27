---
sidebar_position: 3
title: "Working with Objects"
---

# Working with Objects

Objects in Anytype represent individual content pieces like notes, pages and tasks. They are fundamental units that store your data, structured around customizable properties and rich content fields.

Using the Anytype API, you can easily create new objects within a specified space, update existing ones, or archive them when they're no longer actively needed. Every object can include properties like a name, description, icon, and body content that supports Markdown formatting. This flexibility allows developers to automate content creation and management, building dynamic applications that leverage Anytype’s content structure.

Objects are the building blocks of your work—whether they’re notes, tasks, or pages. The Anytype API lets you create, view, update, and delete objects.

## Create an Object

To create an object, send a `POST` request to `/spaces/{space_id}/objects` with a payload containing the following fields:

- **name:** The title of your object.
- **icon:** Information about the icon (for example, an emoji).
- **description:** A brief description.
- **body:** The main content (supports Markdown).

Example payload:

```json
{
  "name": "Project Plan",
  "icon": {
    "emoji": "📄"
  },
  "description": "Outline for the new project",
  "body": "## Introduction\nThis project will..."
}
```

## Retrieve & Delete

- Retrieve an Object:
  `GET /spaces/{space_id}/objects/{object_id}`
- Delete an Object:
  `DELETE /spaces/{space_id}/objects/{object_id}`
  (This marks the object as archived.)

Archiving moves the object out of active views but retains the ability to restore it later.
