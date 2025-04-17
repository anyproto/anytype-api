---
sidebar_position: 2
title: "Working with Spaces"
description: "This guide explains how to work with spaces through the Anytype API."
keywords: [anytype, api, spaces, workspace, organization, management]
---

# Working with Spaces

Spaces are containers that help you organize and manage objects within Anytype. Each space acts as an isolated workspace, allowing you to group related content and tasks. Using the Anytype API, you can programmatically create spaces, retrieve information about them, and manage their properties, making it easy to integrate Anytype into your existing workflows or build custom tools around it.

## Get your Spaces

To get a list of spaces, send a `GET` request to the `/spaces` endpoint.

```bash
curl -X GET "http://localhost:31009/v1/spaces" \
     -H "Authorization: Bearer <YOUR_BEARER_TOKEN>"
```

The API returns an array of space objects, each containing metadata such as the space ID, name, icon, and other properties.

## Create a Space

To create a new space, send a `POST` request to the `/spaces` endpoint with a JSON payload containing space details such as the name and description.

```bash
curl -X POST "http://localhost:31009/v1/spaces" \
  -H "Authorization: Bearer <YOUR_BEARER_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Space",
    "description": "This is a new space for my project"
  }'
```

On success, the API returns detailed metadata (space ID, name, icon, etc.) that you can use to switch contexts and start managing objects.

Be sure to handle errors such as rate limits or invalid inputs.
