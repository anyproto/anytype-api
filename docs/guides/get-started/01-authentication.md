---
sidebar_position: 1
title: "Authentication"
description: "This guide explains how to authenticate to the Anytype API."
keywords: [anytype, api, authentication, bearer token, desktop app, pairing flow]
---

# Authentication

Before you begin, make sure you have:

- The Anytype desktop app installed (v0.46.6 or later) and running with a logged-in account.
- Basic knowledge of JSON and HTTP methods.

## API Key Generation

There are two ways to generate an API key for authentication:

### 1. Desktop Client Settings

The simplest way to generate an API key is through the Anytype desktop client (available in v0.46.6 or later):

1. Open the Anytype desktop app
2. Go to Settings
3. Navigate to the `API Keys` section
4. Click "Create new API key" and give it a meaningful name
5. Copy the generated API key

This method is recommended if you need to supply an API key to a third-party integration or need a straightforward way to generate an API key.

### 2. Programmatic Authentication Flow

The challenge-based authentication flow is available in two versions:

- **v0.46.6 and later:** Uses the current endpoint schema as described below
- **Earlier versions:** Uses a different endpoint schema, that will be deprecated in the future. See the [2025-04-22 API Auth reference](https://developers.anytype.io/docs/reference/2025-04-22/create-auth-challenge) for previous details

Current version (v0.46.6+) implementation:

1. **Create a Challenge:**
   This endpoint initiates an authentication challenge. You supply an app name in the request body, and the server returns a `challenge_id`. In the Anytype desktop application, it will display a 4‑digit code to the user.

   **Request**:

   ```bash
   curl -X POST "http://localhost:31009/v1/auth/challenges" \
        -H "Content-Type: application/json" \
        -H "Anytype-Version: 2025-05-20" \
        -d '{"app_name": "my_awesome_app"}'
   ```

   **Response**:

   ```json
   {
     "challenge_id": "67647f5ecda913e9a2e11b26"
   }
   ```

2. **Create an API Key:**
   Once you have a `challenge_id` from the previous step, and the user has retrieved a **4‑digit** code from the Anytype desktop app, call this to exchange them for an API key.

   **Request**:

   ```bash
   curl -X POST "http://localhost:31009/v1/auth/api_keys" \
        -H "Content-Type: application/json" \
        -H "Anytype-Version: 2025-05-20" \
        -d '{
          "challenge_id": "67647f5ecda913e9a2e11b26",
          "code": "1234"
        }'
   ```

   **Response**:

   ```json
   {
     "api_key": "zhSG/zQRmgADyilWPtgdnfo1qD60oK02/SVgi1GaFt6="
   }
   ```

Now you need to pass the `api_key` as a Bearer token in future requests:

```bash
Authorization: Bearer zhSG/zQRmgAD...
```

Once authenticated, you're ready to explore spaces, objects, and more.
