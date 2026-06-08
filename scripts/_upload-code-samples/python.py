import requests

# Open the file in binary mode; requests builds the multipart/form-data
# body (with the boundary) for you. Do not set Content-Type yourself.
with open("/path/to/photo.png", "rb") as file:
    response = requests.post(
        "http://localhost:31009/v1/spaces/<space-id>/files",
        headers={
            "Authorization": "Bearer <api-key>",
            "Anytype-Version": "2025-11-08",
        },
        files={"file": file},
    )

print(response.json())
