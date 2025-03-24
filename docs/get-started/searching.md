---
sidebar_position: 5
title: "Searching and Filtering Objects"
---

# Searching and Filtering Objects

The API provides robust search functionality to help you quickly locate objects.

## Global Search

Call the `/search` endpoint to perform a search across all spaces you have access to. You can supply:

- **Pagination parameters:** `offset` and `limit`
- **Search criteria:** A JSON payload with a query string, optional object types, and sorting options.

## Space-Specific Search

For a focused search within one space, use the `/spaces/{space_id}/search` endpoint.

## Example Search Request

```json
{
  "query": "meeting notes",
  "types": ["ot-note"],
  "sort": {
    "property": "last_modified_date",
    "direction": "desc"
  }
}
```

The response returns a paginated list of objects that match your criteria—ideal for implementing live search features.
