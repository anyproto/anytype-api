---
sidebar_position: 2
title: "Authentication"
---

# Authentication

Before you begin, make sure you have:

- The Anytype desktop app installed (v0.45.0 or later) and running with a logged-in account. 
- Basic knowledge of JSON and HTTP methods.

The authentication flow is a two‑step process:

1. **Start a New Challenge:**  
   Call the `/auth/display_code` endpoint with your app’s name to receive a unique challenge ID.

2. **Retrieve a Token:**  
   Use the challenge ID along with a 4‑digit code from the Anytype Desktop app by calling the `/auth/token` endpoint. On success, you’ll receive an ephemeral session token and a permanent app key.

Once authenticated, you’re ready to explore spaces, objects, and more.
