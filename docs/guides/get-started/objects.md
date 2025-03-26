---
sidebar_position: 4
title: "Working with Objects"
---

# Working with Objects

Objects are the building blocks of your work—whether they’re notes, tasks, or pages. The Anytype API lets you create, view, update, and delete objects.

## Create an Object

To create an object, send a `POST` request to `/spaces/{space_id}/objects` with a payload containing details like:

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

## Retrieve, Update & Delete

- Retrieve an Object:
`GET /spaces/{space_id}/objects/{object_id}`
<!-- - Update an Object:
  `PATCH /spaces/{space_id}/objects/{object_id}` with the fields you want to change. -->
- Delete an Object:
  `DELETE /spaces/{space_id}/objects/{object_id}`
  (This marks the object as archived.)

These endpoints allow you to build dynamic interfaces for creating and editing your content.
