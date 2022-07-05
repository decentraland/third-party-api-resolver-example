import Bloom from '@ethereumjs/vm/dist/bloom'
import { Router } from 'express'

import * as db from '../db'
import {
  Asset,
  BloomFilterResponse,
  ListResponse,
  SingleResponse,
} from './types'
import { buildURN } from './utils'

export const useItemRouter = (router: Router) => {
  router.get(
    '/registry/:registryId/address/:address/assets',
    async function (req, res) {
      const { registryId, address } = req.params
      if (!registryId || !address) {
        return res
          .status(404)
          .json({ error: 'You need to supply a valid address and registry id' })
      }

      // First fetch all stored items using the registry provided
      const items = await db.getItemsByRegistryId(registryId)
      // An asset will represent the format for the data the standard requires
      const assets: Asset[] = []

      for (const item of items) {
        if (item.owner === address) {
          // We create the asset only if the address owns it
          const asset: Asset = {
            id: item.id,
            amount: 1, // The amount can change depending on your use case!
            urn: { decentraland: buildURN(registryId, item.id) }, // Check buildURN for more info on how to build it
          }

          assets.push(asset)
        }
      }

      // Once we have the assets, we'll create the response proper
      // Again, we follow the required format. In this case we won't bother with pagination but you must take care of the page and next properties
      const response: ListResponse = {
        address: address.toString(),
        total: assets.length,
        page: 1,
        next: '',
        assets,
      }

      return res.json(response)
    }
  )

  router.get(
    '/registry/:registryId/address/:address/assets/:id',
    async function (req, res) {
      const { registryId, address, id } = req.params

      if (!registryId || !address) {
        return res
          .status(404)
          .json({ error: 'You need to supply a valid address and registry id' })
      }

      // We fetch the item from the database first, using the registry and id provided
      const item = await db.getItemById(registryId, id)

      let amount = 0
      let urn = { decentraland: '' }

      if (item && item.owner === address) {
        // We fill the necessary values if the item was fetched correctly
        // and if the address owns it
        amount = 1
        urn.decentraland = buildURN(registryId, item.id) // Check buildURN for more info on how to build it
      }

      // We build the response according to the required standard and return it
      const response: SingleResponse = {
        id,
        amount,
        urn,
      }

      return res.json(response)
    }
  )

  router.get(
    '/registry/:registryId/owners-bloom-filter',
    async function (req, res) {
      const { registryId } = req.params

      if (!registryId) {
        return res
          .status(404)
          .json({ error: 'You need to supply a valid registry id' })
      }

      // First get all items for the supplied registry
      const items = await db.getItemsByRegistryId(registryId)
      let response: BloomFilterResponse = { data: '' }

      if (items.length > 0) {
        // Create and fill up the bloom filter with all the owners
        const filter = new Bloom()

        for (const item of items) {
          if (!item.owner) {
            // Skip unowned items
            continue
          }

          const buffer = Buffer.from(item.owner)

          // Avoid adding a value twice
          if (!filter.check(buffer)) {
            filter.add(buffer)
          }
        }

        // Replace the empty data with the hex representation of the BloomFilter
        response.data = filter.bitvector.toString('hex')
      }

      return res.json(response)
    }
  )
}
