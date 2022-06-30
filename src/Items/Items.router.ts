import { Router } from 'express'
import { BloomFilter } from 'bloom-filters'

import { Response } from './types'
import { CatalystAPI } from '../catalyst/CatalystAPI'
import { getIdFromPointer } from './utils'

export const useItemRouter = (router: Router) => {
  router.get(
    '/registry/:registryId/owners-bloom-filter',
    async function (_req, res) {
      const filter = new BloomFilter(15, 3)

      filter.add('0x0f5d2fb29fb7d3cfee444a200298f468908cc942')
      filter.add('0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd')
      filter.add('0x1d9aa2025b67f0f21d1603ce521bda7869098f8a')
      filter.add('0xc6d2000a7a1ddca92941f4e2b41360fe4ee2abd9')

      return res.json(filter.saveAsJSON())
    }
  )

  router.get(
    '/registry/:registryId/address/:address/assets',
    async function (req, res) {
      if (!req.params.address) {
        return res.status(404).json({ error: 'address is missing' })
      }

      const items = await CatalystAPI.getRegistry(req.params.registryId)

      const response: Response = {
        address: req.params.address.toString(),
        total: items.length,
        page: 1,
        assets: [],
      }

      for (let item of items) {
        response.assets.push({
          id: getIdFromPointer(item.pointer),
          amount: 1,
          urn: {
            decentraland: item.pointer,
          },
        })
      }

      return res.json(response)
    }
  )

  router.get(
    '/registry/:registryId/address/:address/assets/:id',
    async function (req, res) {
      if (!req.params.address) {
        return res.status(404).json({ error: 'address is missing' })
      }

      const [item] = await CatalystAPI.getAsset(
        req.params.registryId,
        req.params.id
      )

      return res.json({
        id: req.params.id,
        amount: item ? 1 : 0,
        urn: item ? { decentraland: item.pointer } : null,
      })
    }
  )
}
