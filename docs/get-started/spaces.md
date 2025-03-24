---
sidebar_position: 3
title: "Working with Spaces"
---

# Working with Spaces

Spaces are workspaces where you organize your objects. With the Anytype API, you can create a new space quickly.

## Create a Space

Send a `POST` request to the `/spaces` endpoint with a JSON payload that includes the space name. For example:

```json
{
  "name": "My Workspace"
}
```

On success, the API returns detailed metadata (space ID, name, icon, etc.) that you can use to switch contexts and start managing objects.

Be sure to handle errors such as rate limits or invalid inputs.
