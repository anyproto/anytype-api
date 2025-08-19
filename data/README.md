# Community Projects Data

This directory contains the structured data for Anytype community projects that are showcased in the documentation.

## Adding Your Project

To add your project to the community showcase:

1. Edit `community-projects.json` and add your project following the schema
2. Run `npm run gen-community-projects` to generate the documentation pages
3. Submit a PR with your changes

## Project Data Structure

Each project entry should include:

- **id**: Unique identifier in format `author/repo-name` (e.g., `myusername/my-awesome-integration`)
- **name**: Display name of your project
- **description**: Brief description of what your project does
- **author**: Your GitHub username or organization name
- **repository**: GitHub repository URL
- **tags**: Array of relevant tags (e.g., "sdk", "python", "integration")
- **category**: One of: SDK, Integration, Tool, Extension, Template, Other
- **language**: Primary programming language
- **status**: One of: active, maintained, archived, experimental

Optional fields:
- **contributors**: Array of additional contributor names
- **website**: Project website or documentation URL
- **dateAdded**: ISO format date when added

## Example Entry

```json
{
  "id": "myusername/my-awesome-integration",
  "name": "My Awesome Integration",
  "description": "Integrates Anytype with another service",
  "author": "myusername",
  "repository": "https://github.com/myusername/my-awesome-integration",
  "tags": ["integration", "automation"],
  "category": "Integration",
  "language": "TypeScript",
  "status": "active"
}
```

## Schema Validation

The `community-projects.schema.json` file defines the exact structure required for project entries. Your JSON editor should provide auto-completion and validation if it supports JSON Schema.