import Foundation

let url = URL(string: "http://localhost:31009/v1/spaces/<space-id>/files")!
let boundary = "Boundary-\(UUID().uuidString)"
let filePath = "/path/to/photo.png"

var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("Bearer <api-key>", forHTTPHeaderField: "Authorization")
request.setValue("2025-11-08", forHTTPHeaderField: "Anytype-Version")
// The boundary MUST be part of the Content-Type header.
request.setValue("multipart/form-data; boundary=\(boundary)",
                 forHTTPHeaderField: "Content-Type")

var body = Data()
body.append("--\(boundary)\r\n".data(using: .utf8)!)
body.append("Content-Disposition: form-data; name=\"file\"; filename=\"photo.png\"\r\n".data(using: .utf8)!)
body.append("Content-Type: application/octet-stream\r\n\r\n".data(using: .utf8)!)
body.append(try! Data(contentsOf: URL(fileURLWithPath: filePath)))
body.append("\r\n--\(boundary)--\r\n".data(using: .utf8)!)

let task = URLSession.shared.uploadTask(with: request, from: body) { data, _, _ in
    if let data = data {
        print(String(data: data, encoding: .utf8) ?? "")
    }
}
task.resume()
