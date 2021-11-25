# Third Party Api Resolver

Exposes endpoints for the Builder.

## RUN

```bash

# Start
npm run build
npm run start
```

## API

Based on https://github.com/decentraland/adr/blob/main/docs/ADR-42-third-party-assets-integration.md#third-party-resolver.

### @GET /registry/:registry-id/address/:address/assets

#### Example

```
https://third-party-resolver-api.decentraland.io/v1/registry/pepe/address/0x123/assets
```

### @GET /registry/:registry-id/address/:address/assets/:id

#### Example

```
https://third-party-resolver-api.decentraland.io/v1/registry/pepe/address/0x123/assets/collection1:0
```
