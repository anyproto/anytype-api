package main

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

func main() {
	file, err := os.Open("/path/to/photo.png")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var body bytes.Buffer
	writer := multipart.NewWriter(&body)
	part, _ := writer.CreateFormFile("file", "photo.png")
	io.Copy(part, file)
	writer.Close()

	req, _ := http.NewRequest(
		"POST",
		"http://localhost:31009/v1/spaces/<space-id>/files",
		&body,
	)
	req.Header.Set("Authorization", "Bearer <api-key>")
	req.Header.Set("Anytype-Version", "2025-11-08")
	// FormDataContentType() includes the generated multipart boundary.
	req.Header.Set("Content-Type", writer.FormDataContentType())

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	out, _ := io.ReadAll(resp.Body)
	fmt.Println(string(out))
}
