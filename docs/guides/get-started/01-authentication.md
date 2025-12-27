---
sidebar_position: 1
title: "Authentication"
description: "This guide explains how to authenticate to the Anytype API."
keywords: [anytype, api, authentication, bearer token, desktop app, pairing flow]
---

# Authentication

Before you begin, make sure you have:

- The latest Anytype desktop app installed and running with a logged-in account.
- Basic knowledge of JSON and HTTP methods.

## API Key Generation

There are two ways to generate an API key for authentication:

### 1. Desktop Client Settings

The simplest way to generate an API key is through the Anytype desktop client:

1. Open the Anytype desktop app
2. Go to Settings
3. Navigate to the `API Keys` section
4. Click "Create new" and give it a meaningful name
5. Copy the generated API key

This method is recommended if you need to supply an API key to a third-party integration or need a straightforward way to generate an API key.

### 2. Programmatic Authentication Flow

Use the challenge-based authentication flow to generate API keys programmatically:

1. **Create a Challenge:**
   This endpoint initiates an authentication challenge. You supply an app name in the request body, and the server returns a `challenge_id`. In the Anytype desktop application, it will display a 4‑digit code to the user.

   **Request**:

   ```bash
   curl -X POST "http://localhost:31009/v1/auth/challenges" \
        -H "Content-Type: application/json" \
        -H "Anytype-Version: 2025-11-08" \
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
        -H "Anytype-Version: 2025-11-08" \
        -d '{
          "challenge_id": "67647f5ecda913e9a2e11b26",
          "code": "1234"
        }'
   ```

   **Response**:

   ```json
   {
     "api_key": "zhSG/zQRmgAD..."
   }
   ```

Now you need to pass the `api_key` as a Bearer token in future requests:

```bash
Authorization: Bearer zhSG/zQRmgAD...
```

Once authenticated, you're ready to explore spaces, objects, and more.
