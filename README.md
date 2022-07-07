# Third Party API Resolver

This is an example API resolver which exposes the necessary endpoints so they can in turn be consumed by the builder. It follows [the standard layed out in the docs](https://docs.decentraland.org/decentraland/linked-wearables/#building-the-api) and the accompanying [ADR](https://github.com/decentraland/adr/blob/main/docs/ADR-42-third-party-assets-integration.md#third-party-resolver), using a [very simple data source](https://github.com/decentraland/third-party-api-resolver-example/tree/master/src/db) as an example.

## How to run

You'll need to first install the dependencies with:

```bash
npm install
```

Then you can do

```bash
npm run start # it'll build the project first
```

## API

Once again we follow the [docs](https://docs.decentraland.org/decentraland/linked-wearables/#building-the-api) here for each endpoint we expose. We'll explain each one briefly, check the docs and [ADR](https://github.com/decentraland/adr/blob/main/docs/ADR-42-third-party-assets-integration.md#third-party-resolver) for more info

### @GET /registry/:registry-id/address/:address/assets

This endpoint is responsible of returning all assets an address own, for a particular registry. It has a [response format](https://github.com/decentraland/adr/blob/main/docs/ADR-42-third-party-assets-integration.md#get-registryregistry-idaddressaddressassets) it has to follow.

#### Example

```bash
# Try to find assets for an invalid registry
/v1/registry/invalidregistry/address/0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd/assets
{
  "address": "0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd",
  "total": 0,
  "page": 1,
  "next": "",
  "assets": []
}

# Try to find assets for an address that has none
/v1/registry/cryptoregistry/address/0x1bb1c46af05fed1a407d86c468a783d13a1acf7e/assets
{
  "address": "0x1bb1c46af05fed1a407d86c468a783d13a1acf7e",
  "total": 0,
  "page": 1,
  "next": "",
  "assets": []
}

# Try to find assets for a valid registry and a owner that exists
/v1/registry/cryptoregistry/address/0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd/assets

{
  "address": "0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd",
  "total": 1,
  "page": 1,
  "next": "",
  "assets": [
    {
      "id": "0xb794f5ea0ba39494ce839613fffba74279579268:2",
      "amount": 1,
      "urn": {
        "decentraland": "urn:decentraland:matic:collections-thirdparty:cryptoregistry:0xb794f5ea0ba39494ce839613fffba74279579268:2"
      }
    }
  ]
}
```

### @GET /registry/:registry-id/address/:address/assets/:id

This endpoint is responsible of returning a single asset via it's id. It must belong to the regsitry and to the address. It has a [response format](https://github.com/decentraland/adr/blob/main/docs/ADR-42-third-party-assets-integration.md#get-registryregistry-idaddressaddressassetsid) it has to follow.

#### Example

```bash
# Try to find an asset for an invalid registry
/v1/registry/invalidthings/address/0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd/assets/0xb794f5ea0ba39494ce839613fffba74279579268:2
{
  "id": "0xb794f5ea0ba39494ce839613fffba74279579268:2",
  "amount": 0,
  "urn": {
    "decentraland": ""
  }
}

# Try to find an asset for an address that does not own it
/v1/registry/cryptoregistry/address/0x1bb1c46af05fed1a407d86c468a783d13a1acf7e/assets/0xb794f5ea0ba39494ce839613fffba74279579268:2
{
  "id": "0xb794f5ea0ba39494ce839613fffba74279579268:2",
  "amount": 0,
  "urn": {
    "decentraland": ""
  }
}

# Try to find an asset with an invalid asset id
/v1/registry/cryptoregistry/address/0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd/assets/0xb794f5ea0ba39494ce839613fffba74279579268:44
{
  "id": "0xb794f5ea0ba39494ce839613fffba74279579268:44",
  "amount": 0,
  "urn": {
    "decentraland": ""
  }
}

# Try to find an asset for a valid registry and a owner that owns it
/v1/registry/cryptoregistry/address/0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd/assets/0xb794f5ea0ba39494ce839613fffba74279579268:2
{
  "id": "0xb794f5ea0ba39494ce839613fffba74279579268:",
  "amount": 1,
  "urn": {
    "decentraland": "urn:decentraland:matic:collections-thirdparty:cryptoregistry:0xb794f5ea0ba39494ce839613fffba74279579268:2"
  }
}
```

### @GET /registry/:registryId/owners-bloom-filter

This endpoint is responsible for returning a [bloom filter](https://en.wikipedia.org/wiki/Bloom_filter) comprising all the owners a registry has. For more information on why this endpoint is required you can check [this diagrams document](https://diagrams.menduz.com/#/notebook/2l3t8FEx6Yc4GyDvkdDe4EQKf2L2/-N360UU67zRNMytneR0E)

This example uses the [BloomFilter](https://github.com/ethereumjs/ethereumjs-monorepo/blob/v4.1.3/packages/vm/src/bloom/index.ts) implementation of [@ethereumjs/vm](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/vm) library to get all the available owners and return a JSON response that can later be used like this:

```ts
import Bloom from '@ethereumjs/vm/dist/bloom'

const url = '/v1/registry/cryptoregistry/owners-bloom-filter'

const response = await fetch(url).then((res) => res.json())
const filter = new Bloom(Buffer.from(response.data, 'hex'))

filter.has('0xf8af76decf64f4164f0c8c9d38f3fb4781e61c0f') // true
filter.has('0xd357f1ff39dd407b5F383806E025eFeF5ea00F9E') // false
```

#### Example

```bash
# Try to get the bloom filter for an invalid registry
/v1/registry/invalidstuff/owners-bloom-filter
{
  data: ""
}

# Try to get the bloom filter for a valid registry
/v1/registry/cryptoregistry/owners-bloom-filter
{
  "data": "00100000000000000000000000000000080010000800000000000000000000000080000000000000000000000000000000000000000000000000000000000002000000000004000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000800000000040000000000000000000000000000020000000000000280000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040040000000000000000000000000000000010000000000000000000000000000"
}
```
