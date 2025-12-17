import requests

API_BASE_URL = "http://localhost:31009"
API_VERSION = "2025-11-08"

def start_challenge(app_name):
    url = f"{API_BASE_URL}/v1/auth/challenges"
    headers = {
        "Anytype-Version": API_VERSION,
        "Content-Type": "application/json"
    }
    data = {
        "app_name": app_name
    }
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    data = response.json()
    return data["challenge_id"]

def solve_challenge(challenge_id, code):
    url = f"{API_BASE_URL}/v1/auth/api_keys"
    headers = {
        "Anytype-Version": API_VERSION,
        "Content-Type": "application/json"
    }
    data = {
        "challenge_id": challenge_id,
        "code": code
    }
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    data = response.json()
    return data["api_key"]

def main():
    app_name = input("Enter your app name: ")
    try:
        challenge_id = start_challenge(app_name)
        print(f"Challenge started. Please enter the 4-digit code displayed in the Anytype Desktop app.")
        code = input("Code: ")
        api_key = solve_challenge(challenge_id, code)
        print(f"API key: {api_key}")
    except requests.HTTPError as e:
        print(f"HTTP error: {e.response.status_code} - {e.response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
