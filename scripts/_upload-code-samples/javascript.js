// `file` is a File or Blob — e.g. from an <input type="file"> in the
// browser, or `new Blob([buf])` in Node 18+.
const form = new FormData();
form.append("file", file);

const response = await fetch(
  "http://localhost:31009/v1/spaces/<space-id>/files",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer <api-key>",
      "Anytype-Version": "2025-11-08",
      // Do NOT set Content-Type: the runtime adds the multipart boundary.
    },
    body: form,
  },
);

const result = await response.json();
console.log(result);
