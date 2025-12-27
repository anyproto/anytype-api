---
sidebar_position: 2
title: "Status Codes"
description: "HTTP status codes returned by the Anytype API."
keywords: [anytype, api, status codes, errors, http]
---

# Status Codes

The Anytype API uses standard HTTP status codes to indicate the success or failure of requests.

## Success Codes

| HTTP Status | Description |
|:------------|:------------|
| 200 | The request was successful. |
| 201 | A new resource was created. |

## Error Codes

Error responses include a JSON body with additional details:

```json
{
  "code": "error_code",
  "message": "Human-readable error message",
  "object": "error",
  "status": 400
}
```

| HTTP Status | `code` | Description |
|:------------|:-------|:------------|
| 400 | `bad_request` | The request body is invalid or malformed. |
| 401 | `unauthorized` | The API key is missing or invalid. |
| 403 | `forbidden` | The API key doesn't have permission for this operation. |
| 404 | `object_not_found` | The requested resource does not exist. |
| 410 | `resource_gone` | The resource has been deleted. |
| 429 | `rate_limit_exceeded` | Too many requests. See [Rate Limits](./rate-limits.md). |
| 500 | `internal_server_error` | An unexpected error occurred. |
