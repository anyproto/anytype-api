---
sidebar_position: 1
title: "Daily Journal in Python"
description: "Learn how to create a daily journal entry in Anytype using a simple Python script and the Anytype API."
keywords: [anytype, api, python, journal, automation, script, developer, cookbook]
---

# Daily Journal in Python

## Overview

In this cookbook example, we'll write a small **Python** script that uses the **Anytype API** to create a new daily journal entry in your Anytype workspace. We assume you have already obtained an **app key** (via the pairing flow) and that your Anytype app is running to accept API requests. Using this key, the script will connect to Anytype's local API, find your space, and create a new page object for today's journal entry.

**What this script does:**

- **Fetches your spaces:** Uses the Anytype API to retrieve the list of available spaces (workspaces) accessible with your credentials.
- **Selects a space:** Takes the first space from the list (for simplicity) as the target space for the new object.
- **Creates a journal page:** Creates a new object of type `ot-page` (Anytype's type key for a basic page object) with the title "Journal – _Today´s Date_".
- **Adds default content:** Populates the page's body with a simple template: a top-level heading and a prompt "What happened today:" for your entry.
- **Sets an icon:** Optionally assigns a 📝 emoji as the page icon for easy identification.

> Note: Make sure your Anytype app is running and you've the latest version installed. Without the Anytype app running locally, the API calls will fail with a connection error.

## Fetching Your Space ID

Before creating a new object, we need to know _which space_ to put it in. Every object in Anytype belongs to a space. Here, we'll use the `GET /spaces` endpoint to fetch all spaces available to our account, then pick the first one from the result.

```python
import requests
from datetime import datetime

# Anytype API base URL (assuming default local port and API version)
BASE_URL = "http://localhost:31009/v1"
API_VERSION = "2025-04-22"  # API version date (ensure this matches your Anytype app version)

# Your app key (replace these with your actual one)
app_key = "YOUR_APP_KEY"

# Prepare HTTP headers for authentication and content type.
# The Anytype API expects the session token as a Bearer token.
headers = {
    "Authorization": f"Bearer {app_key}",
    "Anytype-Version": API_VERSION,
    "Content-Type": "application/json"
}

# 1. Fetch the list of spaces accessible to the user
spaces_url = f"{BASE_URL}/spaces"
response = requests.get(spaces_url, headers=headers)
response.raise_for_status()  # raise an error if the request failed (e.g., unauthorized)

spaces_data = response.json()
# The response is paginated. The list of spaces is under a 'data' field.
spaces_list = spaces_data.get("data", [])
if not spaces_list:
    raise RuntimeError("No spaces found. Check your token or that Anytype is running.")

# Use the first space from the list for creating the journal entry
first_space = spaces_list[0]
first_space_id = first_space["id"]
print(f"Using space: {first_space['name']} (ID: {first_space_id})")

```

In the code above, we use the `requests.get` function to call `/spaces` with the required headers:

- The **Authorization header** sends our app key as a Bearer token to authenticate.
- We include **Anytype-Version** to match the API version (in this case, `"2025-04-22"`).
- On success, the response JSON contains our spaces. We take the first space's `id` (and printed its name for confirmation).

For real-world scripts, you might choose a specific space by filtering `spaces_list` or by name, but here we use the first one for simplicity.

## Creating the Journal Entry Object

Now that we have a target `space_id`, we can create a new object in that space. We'll use the `POST /spaces/{space_id}/objects` endpoint to create an object. We need to provide a JSON payload with at least the object's **name** and **type_key**, and we can also include the content (body) and an icon.
In our example, we set:

- **name** to `"Journal – <Date>"` (with today's date).
- **type_key** to `"ot-page"`, which is the type for a normal page in Anytype. (If you have a dedicated journal type or template, you could use its key or template ID here.)
- **body** to a Markdown string that starts with a level-1 heading and a prompt.
- **icon** to an emoji with format "emoji".

```python
# 2. Prepare the new journal entry object data
today_str = datetime.now().strftime("%B %d, %Y")  # e.g., "April 16, 2025"
object_name = f"Journal – {today_str}"

# Define a simple markdown content for the page body
object_body = f"""# Journal Entry for {today_str}

What happened today:"""

# Create the JSON payload for the new object
new_object_payload = {
    "name": object_name,
    "type_key": "ot-page",        # using a basic page type; adjust if a specific journal type exists
    "body": object_body,
    "icon": {
        "emoji": "📝",
        "format": "emoji"
    }
}

# 3. Send the create object request to Anytype
create_url = f"{BASE_URL}/spaces/{first_space_id}/objects"
create_response = requests.post(create_url, headers=headers, json=new_object_payload)
create_response.raise_for_status()  # ensure the request succeeded

new_object = create_response.json()
print(f"Created object '{new_object['name']}' (ID: {new_object['id']})")
```

Let's break down the creation step:

- We formatted today's date using Python's `datetime` to use in the journal title and content.
- We built the `new_object_payload` dictionary with the required fields:
  - `name`: A string for the object title.
  - `type_key`: The object type. Here we use `"ot-page"`. (Anytype uses keys like `ot-page`, `ot-note`, etc., for object types.)
  - `body`: The main content of the page. We provided a Markdown string with a heading and a prompt. The Anytype API supports Markdown in the body text.
  - `icon`: An optional icon for the page. We specify an emoji by giving the emoji character and setting `"format": "emoji"`.
- We then used `requests.post` to send the payload to the create object endpoint. The URL includes the `first_space_id` we got earlier.
- After a successful creation (HTTP 200), the API returns the full object data as JSON. We print out the new object's ID and name for confirmation.

> Tip: Instead of a static template, you could enhance this script by retrieving a journal template object from your space and using its content or template ID. The Anytype API allows specifying a `template_id` in the payload to base the new object on an existing template.

## Running the Script

With the code assembled above, running this script will create a new journal entry in your Anytype space. Each time you run it on a new day, it will generate a page titled with that day's date. You can customize the content template or target a specific space by adjusting the script.
When you execute the script, you should see output similar to:

```
Using space: My Workspace (ID: bafyrei...spacid)
Created object 'Journal – April 16, 2025' (ID: bafybei...)
```

You can then open Anytype to find the newly created page (it should appear in the selected space, with the 📝 icon, ready for you to fill in the details of your day).
