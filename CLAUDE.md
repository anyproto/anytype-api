# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Anytype API documentation website built with Docusaurus v3.8.1. It provides developer documentation, API reference, and code examples for building integrations with Anytype.

## Essential Commands

### Development
```bash
bun run start          # Start development server on localhost:3000
bun run build          # Build production site
bun run serve          # Serve built site locally
bun run clear          # Clear Docusaurus cache
```

### API Documentation Generation
```bash
bun run make-reference  # Clean and regenerate all API documentation from OpenAPI specs
bun run gen-api-docs    # Generate API docs from OpenAPI specifications
bun run clean-api-docs  # Remove generated API documentation
```

### Code Quality
```bash
bun run lint           # Run ESLint on TypeScript, MDX, and Markdown files
bun run lint:fix       # Auto-fix linting issues
```

## Architecture & Key Components

### Directory Structure
- `/docs/` - Documentation content in MDX format
  - `/docs/guides/` - Step-by-step tutorials (Get Started series)
  - `/docs/examples/` - Code examples and integrations (Raycast, MCP, Journal)
  - `/docs/reference/` - Auto-generated API documentation (versioned)
- `/src/` - Custom React components for documentation
- `/static/` - Static assets (images, files)
- `/openapi/` - OpenAPI specifications for each API version

### API Versions

Two independent axes: the API **major** (v1, v2) and, within v1, the **date
version** (the `Anytype-Version` header). v2 has no date axis yet — it does not
use `Anytype-Version` on any route.

**v1** (`/v1/...`, plugin instance `anytype`)
- Current: 2025-11-08 (latest)
- Supported: 2025-11-08, 2025-05-20, 2025-04-22
- Legacy: 2025-03-17, 2025-02-12

**v2** (`/v2/...`, plugin instance `anytypeV2`) — pre-release, single dateless
entry at `/docs/reference/v2`.

Both appear in one version dropdown, grouped by major. The dropdown is built by
`getVersionGroups()` in `openapi.config.ts`; the plugin-generated
`docs/reference/versions.json` is no longer read by anything.

### Configuration Files
- `docusaurus.config.ts` - Main site configuration, plugins, themes
- `openapi.config.ts` - API documentation generation settings
- `sidebars.ts` - Navigation structure for documentation

## Development Guidelines

### Working with Documentation
- Documentation is written in MDX (Markdown + JSX)
- Code examples support multiple languages (curl, Python, JavaScript, Go, Rust, etc.)
- Use the existing component patterns in `/src/components/` for consistency

### API Documentation Updates
When updating API documentation:
1. Edit the OpenAPI spec in `/openapi/[version]/openapi.yaml`
2. Run `bun run make-reference` to regenerate documentation
3. The generated docs will appear in `/docs/reference/[version]/`

### Updating the v2 Spec

v2 is generated from a separate OpenAPI document in `anytype-heart`:

```bash
# in anytype-heart
make openapi

# in anytype-api
cp ../anytype-heart/core/api/docs/v2/openapi.yaml docs/reference/openapi-v2.yaml
bun run make-reference
```

The v2 Introduction is authored in
`core/api/v2/markdown/api.md` in `anytype-heart`. Its `doc.go` uses
`@description.markdown`, and `make openapi` includes that Markdown as
`info.description`. The upstream `scripts/fix_openapi_v2.py` injects it into
both formats because swag v2.0.0-rc4's OpenAPI 3 parser drops that attribute.
Edit the source Markdown and regenerate; do not edit
`docs/reference/v2/anytype-api.info.mdx` directly.

`make-reference` runs both plugin instances. `scripts/fix-openapi-files.js`
normalizes `info.title` from "Anytype API v2" to "Anytype API" on the way in —
lodash `kebabCase` would otherwise make the Introduction page's id
`anytype-api-v-2`. It deliberately leaves `info.version` alone: `core/api/v2/doc.go`
documents that value as the `Anytype-Version` header one gin engine sets for both
majors, so rewriting it would make the spec we serve disagree with the server.

The hand-written landing page lives at `docs/reference/v2-overview.mdx`
(`slug: /reference/v2`), deliberately outside the generated `docs/reference/v2/`
directory so `clean-api-docs` can never remove it.

### Publishing the agent skill

The authored source is `core/api/v2/SKILL.md` in anytype-heart. Run
`bun run sync-agent-skill ../anytype-heart_anyblockjson` to refresh its snapshot
and provenance in `data/agent-skill/`; commit both files together. The sync keeps
the source bytes unchanged. Edit upstream, then sync again.

`bun run build` generates `/skill.md`, both `.well-known` discovery formats,
`/llms.txt`, and `/openapi-v2.yaml`, then checks those files in the built site.
The v2 Introduction's download button uses this local OpenAPI copy. Both CI and
release workflows run the build; release publishing keeps Jekyll disabled so the
discovery files are served as static assets. See README.md for the endpoint list.

### Adding a New API Version
When adding a new API version (e.g., `2025-11-08`):

1. **Add the OpenAPI spec file**
   - Place the new YAML file in `/docs/reference/openapi-YYYY-MM-DD.yaml`
   - Example: `/docs/reference/openapi-2025-11-08.yaml`

2. **Update `openapi.config.ts`**
   - Set `latestVersion` to the new version date
   - Add the new version to `showVersions` array (typically show 3 most recent)
   - Add a new entry in the `versions` object with:
     - `specPath`: Path to the YAML file
     - `outputDir`: Output directory for generated docs
     - `label`: Version label (usually the date)
     - `baseUrl`: URL path for the docs
     - `downloadUrl`: Raw GitHub URL to the YAML file

3. **Generate the documentation**
   - Run `bun run make-reference` to generate docs for all versions
   - This creates `/docs/reference/YYYY-MM-DD/` directory with generated content
   - Note: `versions.json` is automatically updated by this command

4. **Update `sidebars.ts`**
   - Import the generated sidebar: `import referenceSidebarYYYYMMDD from "./docs/reference/YYYY-MM-DD/sidebar";`
   - Add the version to `referenceSidebarsByVersion` object mapping the date string to the imported sidebar
   - Example: `"2025-11-08": referenceSidebar20251108`
   - Note: If you forget this step, the build will fail with a helpful error message

5. **Update API Versions section in CLAUDE.md**
   - Update the "Current" version to the new latest
   - Adjust "Supported" and "Legacy" version lists as needed

6. **Verify the changes**
   - Run `bun run start` to preview the site locally
   - Check that the version selector displays all expected versions
   - Verify that the new version docs render correctly

### Content Structure
- Guides go in `/docs/guides/` - follow the existing pattern
- Examples go in `/docs/examples/` - include complete working code
- API reference is auto-generated - don't edit manually

### Key Technologies
- **Docusaurus 3.8.1** - Static site generator
- **React 19.1.0** - Component framework
- **TypeScript 5.4.5** - Type safety
- **MDX** - Enhanced markdown with React components
- **OpenAPI/Swagger** - API specification format

## Important Notes

 - The project uses bun (see `bun.lock`)
- ESLint is configured for TypeScript, MDX, and Markdown files
- No testing framework is configured - rely on linting for code quality
- The site is optimized for static hosting with SEO and performance features enabled
- Use `@docusaurus/faster` for improved development experience
