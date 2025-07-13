---
sidebar_position: 1
title: "Daily Journal in Python"
description: "Learn how to create a daily journal entry in Anytype using a simple Python script and the Anytype API."
keywords: [anytype, api, python, journal, automation, script, developer, cookbook]
---

# Daily Journal in Python

## Overview

In this cookbook example, we'll write a small **Python** script that uses the **Anytype API** to create a new daily journal entry in your Anytype workspace. We assume you have already obtained an **API key** (via the auth challenge flow) and that your Anytype app is running to accept API requests. Using this key, the script will connect to Anytype's local API, find your space, and create a new page object for today's journal entry.

**What this script does:**

- **Fetches your spaces:** Uses the Anytype API to retrieve the list of available spaces (workspaces) accessible with your credentials.
- **Selects a space:** Prompts you to select a space interactively from the fetched list.
- **Creates a journal page:** Creates a new object of type `page` (Anytype's type key for a basic page object) with the title "Journal – `<Date>`".
- **Adds default content:** Prompts you interactively to specify custom content, or uses a detailed default template.
- **Sets an icon:** Optionally assigns a 📝 emoji as the page icon for easy identification.

:::warning Prerequisites
Make sure your Anytype app is running and you've the latest version installed. Without the Anytype app running locally, the API calls will fail with a connection error.
:::

:::info Source Code
You can find the complete implementation in [src/examples/journal.py](https://github.com/anyproto/anytype-api/blob/main/src/examples/journal.py)
:::

## Fetching Your Space ID

Before creating a new object, we need to know _which space_ to put it in. Every object in Anytype belongs to a space. Here, we'll use the `GET /spaces` endpoint to fetch all spaces available to our account, then pick the first one from the result.

```python
import requests
import os
from datetime import datetime
from dotenv import load_dotenv

ANYTYPE_API_BASE_URL = "http://localhost:31009"
ANYTYPE_VERSION = "2025-05-20"

# Get the api key from the environment variable
load_dotenv()

# ANSI escape codes for colored output
RESET = "\033[0m"
CYAN = "\033[36m"
YELLOW = "\033[33m"
GREEN = "\033[32m"
RED = "\033[31m"

api_key = os.getenv("ANYTYPE_API_KEY")
if not api_key:
    raise RuntimeError("Environment variable ANYTYPE_API_KEY is not set")

# Prepare HTTP headers for authentication and content type.
headers = {
    "Authorization": f"Bearer {api_key}",
    "Anytype-Version": ANYTYPE_VERSION,
    "Content-Type": "application/json"
}

def fetch_spaces():
    """Fetch and return the list of spaces from the API."""
    url = f"{ANYTYPE_API_BASE_URL}/v1/spaces"
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    data = resp.json().get("data", [])
    if not data:
        raise RuntimeError("No spaces found. Check your API key or that Anytype is running.")
    return data

def select_space(spaces):
    """Prompt the user to select a space and return its ID."""
    print(CYAN + "Available spaces:" + RESET)
    for idx, space in enumerate(spaces, start=1):
        print(f"{idx}. {space['name']} (ID: {space['id']})")
    try:
        choice = int(input(YELLOW + f"Select a space [1-{len(spaces)}]: " + RESET))
        selected = spaces[choice - 1]
    except (ValueError, IndexError):
        print(RED + "Invalid selection, defaulting to the first space.")
        selected = spaces[0]
    print(GREEN + f"Using space: {selected['name']} (ID: {selected['id']})" + RESET)
    return selected['id']
```

In the code above, we use the `requests.get` function to call `/spaces` with the required headers:

- The **Authorization header** sends our API key as a Bearer token to authenticate.
- We include **Anytype-Version** to match the API version (in this case, `"2025-05-20"`).
- On success, the response JSON contains our spaces. The script then prompts you to select which space to use interactively.

## Creating the Journal Entry Object

Now that we have a target `space_id`, we can create a new object in that space. We'll use the `POST /spaces/{space_id}/objects` endpoint to create an object. We need to provide a JSON payload with at least the object's **name** and **type_key**, and we can also include the content (body) and an icon.
In our example, we set:

- **name** to `"Journal – <Date>"` (with today's date).
- **type_key** to `"page"`, which is the type for a normal page in Anytype. (If you have a dedicated journal type or template, you could use its key or template ID here.)
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
    name = input(YELLOW + f"Enter entry title [{default_name}]: " + RESET).strip() or default_name
    print(CYAN + "Enter journal content. Press Enter on empty line to finish (leave blank to use default):" + RESET)
    lines = []
    while True:
        line = input()
        if not line:
            break
        lines.append(line)
    body = "\n".join(lines) if lines else default_body
    icon = input(YELLOW + "Enter an emoji for the icon [📝]: " + RESET).strip() or "📝"
    return name, body, icon

def create_journal_entry(space_id, name, body, icon):
    """Create the journal entry in the given space and return the created object."""
    payload = {
        "name": name,
        "type_key": "page",
        "body": body,
        "icon": {"emoji": icon, "format": "emoji"}
    }
    url = f"{ANYTYPE_API_BASE_URL}/v1/spaces/{space_id}/objects"
    resp = requests.post(url, headers=headers, json=payload)
    resp.raise_for_status()
    return resp.json().get("object", {})

def main():
    spaces = fetch_spaces()
    space_id = select_space(spaces)
    name, body, icon = get_journal_details()
    new_obj = create_journal_entry(space_id, name, body, icon)
    print(GREEN + f"Created object '{new_obj['name']}' (ID: {new_obj['id']})")

if __name__ == "__main__":
    main()
```

Let's break down the creation step:

- We formatted today's date using Python's `datetime` to use in the journal title and content.
- We built the `new_object_payload` dictionary with the required fields:
  - `name`: A string for the object title.
  - `type_key`: The object type. Here we use `"page"`. (Anytype uses keys like `page`, `note`, etc., for object types.)
  - `body`: The main content of the page. We provided a Markdown string with a heading and a prompt. The Anytype API supports Markdown in the body text.
  - `icon`: An optional icon for the page. We specify an emoji by giving the emoji character and setting `"format": "emoji"`.
- We then used `requests.post` to send the payload to the create object endpoint. The URL includes the `first_space_id` we got earlier.
- After a successful creation (HTTP 200), the API returns the full object data as JSON. We print out the new object's ID and name for confirmation.

:::tip Enhancement Idea
Instead of a static template, you could enhance this script by retrieving a journal template object from your space and using its content or template ID. The Anytype API allows specifying a `template_id` in the payload to base the new object on an existing template.
:::

## Running the Script

With the code assembled above, running this script will create a new journal entry in your Anytype space. Each time you run it on a new day, it will generate a page titled with that day's date. You can customize the content template or target a specific space by adjusting the script.
When you execute the script, you should see output similar to:

```
Using space: My Workspace (ID: bafyrei...spacid)
Created object 'Journal – April 16, 2025' (ID: bafybei...)
```

You can then open Anytype to find the newly created page (it should appear in the selected space, with the 📝 icon, ready for you to fill in the details of your day).
