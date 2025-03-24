# Anytype API

> [!WARNING]
> 👷‍♂️ Work in progress here! This is an early draft made for collaboration.

- Current state preview: https://anyproto.github.io/anytype-api/

- Swagger file: [swagger.yaml](https://github.com/anyproto/anytype-heart/blob/main/core/api/docs/swagger.yaml)

### Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

> [!Note] For local search functionality to work, you must run npm run build (and then npm run serve). The search index is generated during the build process and is not available in development mode.

### Build & Serve

```bash
npm run build
npm run serve
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
