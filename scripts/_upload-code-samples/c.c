// Requires libcurl >= 7.56 (curl_mime API). Link with -lcurl.
#include <curl/curl.h>

int main(void) {
  CURL *curl = curl_easy_init();
  if (!curl) return 1;

  // curl_mime builds the multipart/form-data body, including the boundary.
  curl_mime *mime = curl_mime_init(curl);
  curl_mimepart *part = curl_mime_addpart(mime);
  curl_mime_name(part, "file");
  curl_mime_filedata(part, "/path/to/photo.png");

  struct curl_slist *headers = NULL;
  headers = curl_slist_append(headers, "Authorization: Bearer <api-key>");
  headers = curl_slist_append(headers, "Anytype-Version: 2025-11-08");

  curl_easy_setopt(curl, CURLOPT_URL,
                   "http://localhost:31009/v1/spaces/<space-id>/files");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  curl_easy_setopt(curl, CURLOPT_MIMEPOST, mime);

  curl_easy_perform(curl);

  curl_mime_free(mime);
  curl_slist_free_all(headers);
  curl_easy_cleanup(curl);
  return 0;
}
