import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MultipartBody
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.asRequestBody
import java.io.File

val client = OkHttpClient()

// MultipartBody.FORM sets multipart/form-data and generates the boundary.
val body = MultipartBody.Builder()
    .setType(MultipartBody.FORM)
    .addFormDataPart(
        "file",
        "photo.png",
        File("/path/to/photo.png").asRequestBody("application/octet-stream".toMediaType()),
    )
    .build()

val request = Request.Builder()
    .url("http://localhost:31009/v1/spaces/<space-id>/files")
    .header("Authorization", "Bearer <api-key>")
    .header("Anytype-Version", "2025-11-08")
    .post(body)
    .build()

client.newCall(request).execute().use { response ->
    println(response.body?.string())
}
