// reqwest = { version = "0.12", features = ["blocking", "multipart"] }
use reqwest::blocking::multipart;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // `.file(...)` reads the path and sets the filename + multipart boundary.
    let form = multipart::Form::new().file("file", "/path/to/photo.png")?;

    let response = reqwest::blocking::Client::new()
        .post("http://localhost:31009/v1/spaces/<space-id>/files")
        .header("Authorization", "Bearer <api-key>")
        .header("Anytype-Version", "2025-11-08")
        .multipart(form)
        .send()?;

    println!("{}", response.text()?);
    Ok(())
}
