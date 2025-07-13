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
