# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Anytype API documentation website built with Docusaurus v3.8.1. It provides developer documentation, API reference, and code examples for building integrations with Anytype.

## Essential Commands

### Development
```bash
npm run start          # Start development server on localhost:3000
npm run build          # Build production site
npm run serve          # Serve built site locally
npm run clear          # Clear Docusaurus cache
```

### API Documentation Generation
```bash
npm run make-reference  # Clean and regenerate all API documentation from OpenAPI specs
npm run gen-api-docs    # Generate API docs from OpenAPI specifications
npm run clean-api-docs  # Remove generated API documentation
```

### Code Quality
```bash
npm run lint           # Run ESLint on TypeScript, MDX, and Markdown files
npm run lint:fix       # Auto-fix linting issues
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
- Current: 2025-05-20 (latest)
- Supported: 2025-05-20, 2025-04-22
- Legacy: 2025-03-17, 2025-02-12

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
2. Run `npm run make-reference` to regenerate documentation
3. The generated docs will appear in `/docs/reference/[version]/`

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

 - The project uses npm (see `package.json`'s `packageManager`)
- ESLint is configured for TypeScript, MDX, and Markdown files
- No testing framework is configured - rely on linting for code quality
- The site is optimized for static hosting with SEO and performance features enabled
- Use `@docusaurus/faster` for improved development experience
