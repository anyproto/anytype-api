---
sidebar_position: 1
title: "Authentication"
---

# Authentication

Before you begin, make sure you have:

- The Anytype desktop app installed (v0.45.0 or later) and running with a logged-in account.
- Basic knowledge of JSON and HTTP methods.

The authentication flow is a two‑step process:

1. **Start a New Challenge:**
   This endpoint initiates an authentication challenge. You supply an app name (via query parameter), and the server returns a `challenge_id`. In the Anytype desktop application, it will display a 4‑digit code to the user.

   **Request**:

   ```bash
   curl -X POST "http://localhost:31009/v1/auth/display_code?app_name=MyAwesomeApp" \
        -H "Content-Type: application/json" \
        -d "{}"
   ```

   **Response**:

   ```json
   {
     "challenge_id": "67647f5ecda913e9a2e11b26"
   }
   ```

2. **Retrieve a Token (Solve Challenge):**
   Once you have a `challenge_id` from the previous step, and the user has retrieved a **4‑digit** code from the Anytype desktop app, call this to exchange them for authentication tokens.

   **Request**:

   ```bash
   curl -X POST \
     "http://localhost:31009/v1/auth/token?challenge_id=67647f5ecda913e9a2e11b26&code=1234" \
     -H "Content-Type: application/json" \
     -d "{}"
   ```

   **Response**:

   ```json
   {
     "app_key": "zhSG/zQRmgADyilWPtgdnfo1qD60oK02/SVgi1GaFt6=",
     "session_token": "eyJhbGciOeJIRzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWVkIjoiY0dmVndlUnAifQ..."
   }
   ```

   > Tip: For now, you'll pass the non-ephemeral `app_key` as a Bearer token in future requests:
   > `Authorization: Bearer eyJhbGciOi...`

Once authenticated, you’re ready to explore spaces, objects, and more.
