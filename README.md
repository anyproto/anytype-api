# Anytype API

> [!WARNING]
> 👷‍♂️ Work in progress here!

- Current API specification for production: https://anyproto.github.io/anytype-api/

- Developer portal: https://developers-stage.anytype.io/

- Swagger file: [swagger.yaml](https://github.com/anyproto/anytype-api/blob/main/docs/api/swagger-2025-03-17.yaml)

### Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

> [!Note]
> For local search functionality to work, you must run npm run build (and then npm run serve). The search index is generated during the build process and is not available in development mode.

### Build & Serve

```bash
npm run build
npm run serve
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
