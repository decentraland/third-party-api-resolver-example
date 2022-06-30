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
https://third-party-resolver-api.decentraland.io/v1/registry/jean-pier/address/0x123/assets
```

### @GET /registry/:registry-id/address/:address/assets/:id

#### Example

```
https://third-party-resolver-api.decentraland.io/v1/registry/jean-pier/address/0x123/assets/collection1:0
```

### @GET /registry/:registryId/owners-bloom-filter

#### Example

```
https://third-party-resolver-api.decentraland.io/v1/registry/jean-pier/owners-bloom-filter
```

Using the [BloomFilter](https://www.npmjs.com/package/bloom-filters#export-and-import) library you can use the response as follows:

```ts
const filter = BloomFilter.fromJSON(response)

filter2.has('0x0f5d2fb29fb7d3cfee444a200298f468908cc942') // true or false
```
