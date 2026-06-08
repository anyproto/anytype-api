curl -X POST "http://localhost:31009/v1/spaces/<space-id>/files" \
  -H "Authorization: Bearer <api-key>" \
  -H "Anytype-Version: 2025-11-08" \
  -F "file=@/path/to/photo.png"
