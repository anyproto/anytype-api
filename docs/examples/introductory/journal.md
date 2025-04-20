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
- **Selects a space:** Prompts you to select a space interactively from the fetched list.
- **Creates a journal page:** Creates a new object of type `ot-page` (Anytype's type key for a basic page object) with the title "Journal – `<Date>`".
- **Adds default content:** Prompts you interactively to specify custom content, or uses a detailed default template.
- **Sets an icon:** Optionally assigns a 📝 emoji as the page icon for easy identification.

> Note: Make sure your Anytype app is running and you've the latest version installed. Without the Anytype app running locally, the API calls will fail with a connection error.

## Fetching Your Space ID

Before creating a new object, we need to know _which space_ to put it in. Every object in Anytype belongs to a space. Here, we'll use the `GET /spaces` endpoint to fetch all spaces available to our account, then pick the first one from the result.

```python
import requests
import os
from datetime import datetime
from dotenv import load_dotenv

ANYTYPE_API_BASE_URL = "http://localhost:31009/v1"
ANYTYPE_VERSION = "2025-04-22"

load_dotenv()

app_key = os.getenv("ANYTYPE_APP_KEY")
if not app_key:
    raise RuntimeError("Environment variable ANYTYPE_APP_KEY is not set")

headers = {
    "Authorization": f"Bearer {app_key}",
    "Anytype-Version": ANYTYPE_VERSION,
    "Content-Type": "application/json"
}

def fetch_spaces():
    """Fetch and return the list of spaces from the API."""
    url = f"{ANYTYPE_API_BASE_URL}/spaces"
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    data = resp.json().get("data", [])
    if not data:
        raise RuntimeError("No spaces found. Check your token or that Anytype is running.")
    return data

def select_space(spaces):
    """Prompt the user to select a space and return its ID."""
    print("Available spaces:")
    for idx, space in enumerate(spaces, start=1):
        print(f"{idx}. {space['name']} (ID: {space['id']})")
    try:
        choice = int(input(f"Select a space [1-{len(spaces)}]: "))
        selected = spaces[choice - 1]
    except (ValueError, IndexError):
        print("Invalid selection, defaulting to the first space.")
        selected = spaces[0]
    print(f"Using space: {selected['name']} (ID: {selected['id']})")
    return selected['id']
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
- **body** to a markdown string that starts with a level-2 heading and a prompt.
- **icon** to an emoji with format `emoji`.

```python
def get_journal_details():
    """Prompt the user for journal entry title, body, and icon."""
    today = datetime.now().strftime("%B %d, %Y")
    default_name = f"Journal – {today}"
    default_body = f"""## Highlights
- **Accomplishments**:
    1. ...
    2. ...
- *Challenges*:
    - ...

## Reflection
> "Take a moment to reflect on your day."

### What Went Well
- ...

### What Could Be Improved
- [ ] ...

---

## Quick Notes
- **People I interacted with**: ...
- **Resources/Links**: [Example](https://example.com)
"""
    name = input(f"Enter entry title [{default_name}]: ").strip() or default_name
    print("Enter journal content. Press Enter on empty line to finish (leave blank to use default):")
    lines = []
    while True:
        line = input()
        if not line:
            break
        lines.append(line)
    body = "\n".join(lines) if lines else default_body
    icon = input("Enter an emoji for the icon [📝]: ").strip() or "📝"
    return name, body, icon

# Prompt for journal details and create the entry
name, body, icon = get_journal_details()

payload = {
    "name": name,
    "type_key": "ot-page",
    "body": body,
    "icon": {"emoji": icon, "format": "emoji"}
}

create_url = f"{ANYTYPE_API_BASE_URL}/spaces/{space_id}/objects"
create_response = requests.post(create_url, headers=headers, json=payload)
create_response.raise_for_status()

new_object = create_response.json().get("object", {})
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
