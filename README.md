# Anytype API

Start building with Anytype's API. The [developer portal](https://developers.anytype.io/) for extending Anytype through powerful integrations.

- 📖 [Guides](https://developers.anytype.io/docs/guides)
- 📚 [API Reference](https://developers.anytype.io/docs/reference)
- 💡 [Cookbooks & Examples](https://developers.anytype.io/docs/examples)

## Features

The Anytype API gives you the tools to make more out of Anytype. Here's what you can do:

- **Global & Space Search**: Find anything across all spaces or within specific ones
- **Spaces & Members**: Manage workspaces and their participants
- **Objects & Lists**: Create and organize pages, tasks, bookmarks and collections
- **Properties & Tags**: Add metadata to enrich and organize your content
- **Types & Templates**: Define types and templates for your objects

## Projects

Explore practical applications of Anytype's API:

- [anytype-raycast](https://github.com/anyproto/anytype-raycast): A Raycast Extension based on the Anytype API that allows you to create, browse, search and edit within Anytype - right at your fingertips, anywhere on your Mac.
- [anytype-mcp](https://github.com/anyproto/anytype-mcp): A Model Context Protocol (MCP) server enabling AI assistants to seamlessly interact with Anytype's API through natural language.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

> [!Note]
> For local search functionality to work, you must run `npm run build` (and then `npm run serve`). The search index is generated during the build process and is not available in development mode.

## Build & Serve

```bash
npm run build
npm run serve
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Contribution

Thank you for your desire to develop Anytype together!

❤️ This project and everyone involved in it is governed by the [Code of Conduct](https://github.com/anyproto/.github/blob/main/docs/CODE_OF_CONDUCT.md).

🧑‍💻 Check out our [contributing guide](https://github.com/anyproto/.github/blob/main/docs/CONTRIBUTING.md) to learn about asking questions, creating issues, or submitting pull requests.

🫢 For security findings, please email [security@anytype.io](mailto:security@anytype.io) and refer to our [security guide](https://github.com/anyproto/.github/blob/main/docs/SECURITY.md) for more information.

🤝 Follow us on [Github](https://github.com/anyproto) and join the [Contributors Community](https://github.com/orgs/anyproto/discussions).

---

Made by Any — a Swiss association 🇨🇭

Licensed under [Any Source Available License 1.0](./LICENSE.md).
