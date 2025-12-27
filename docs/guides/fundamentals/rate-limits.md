---
sidebar_position: 1
title: "Rate Limits"
description: "Understanding rate limits and how to handle them when using the Anytype API."
keywords: [anytype, api, rate limits, throttling, best practices]
---

# Rate Limits

The Anytype API implements rate limiting as a guardrail to protect your local Anytype instance from being overwhelmed by too many requests. Since the API runs on your own resources, these limits help ensure stable operation.

## Rate Limit Configuration

The API uses **burst rate limiting**:

| Parameter | Value |
|-----------|-------|
| Sustained rate | 1 request per second |
| Burst size | 60 requests |

This means you can send up to 60 requests in quick succession (burst), after which requests are limited to 1 per second until the burst capacity recovers.

## Disabling Rate Limits

You can disable rate limiting by setting the following environment variable before starting Anytype:

```bash
ANYTYPE_API_DISABLE_RATE_LIMIT=1
```

## Rate Limit Errors

When you exceed the rate limit, the API returns a `429` status code with the following response:

```json
{
  "code": "rate_limit_exceeded",
  "message": "Rate limit exceeded",
  "object": "error",
  "status": 429
}
```
