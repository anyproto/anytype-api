---
sidebar_position: 4
title: "Searching and Filtering Objects"
description: "This guide explains how to search and filter objects through the Anytype API."
keywords: [anytype, api, search, filtering, objects, notes, pages, tasks, content, management]
---

# Searching and Filtering Objects

Anytype's API provides powerful search capabilities to quickly find and access objects within your workspaces. You can perform both global searches across all accessible spaces or more targeted searches within a specific space.

Global search is beneficial when you need to retrieve information without knowing exactly where it's located, while space-specific searches are ideal for focused retrieval in defined contexts. The API supports search queries with filtering by object type, sorting by properties such as last modified date, and pagination, making it suitable for building efficient, user-friendly search interfaces within your applications.

## Global Search

Call the `/search` endpoint to perform a search across all spaces you have access to. You can supply:

- **Pagination parameters:** `offset` and `limit`
- **Search criteria:** A JSON payload with a query string, optional object types, and sorting options.

```bash
curl -X POST "http://localhost:31009/v1/search?offset=0&limit=10" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_API_KEY>" \
-H "Anytype-Version: 2025-05-20" \
-d '{
    "query": "project",
    "types": ["ot-page"],
    "sort": {
        "direction": "desc",
        "property": "last_modified_date"
    }
}'
```

The response returns a paginated list of objects that match your criteria—ideal for implementing live search features.

## Space-Specific Search

To narrow your search to a particular space, use the `/spaces/{space_id}/search` endpoint. Use the same parameters as in the global search to filter and sort results within the specified space.
