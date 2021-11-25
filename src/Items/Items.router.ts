import { Router } from 'express'

import { Response } from './types'
import { subgraphApi } from '../subgraphs/tpSubgraph'

export const useItemRouter = (router: Router) => {
  router.get('/registry/:registryId/address/:address/assets', async function (req, res) {
    if (!req.params.address) {
      return res.status(404).json({ error: 'address is missing' })
    }

    const items = await subgraphApi.fetchTPItems()

    const response: Response = {
      address: req.params.address.toString(),
      total: items ? items.length : 0,
      page: 1,
      assets: []
    }

    if (items) {
      for (let item of items) {
        response.assets.push({
          id: item.blockchainItemId,
          amount: 1,
          urn: {
            decentraland: item.urn
          }
        })
      }
    }

    return res.json(response)
  })

  router.get('/registry/:registryId/address/:address/assets/:id', async function (req, res) {
    if (!req.params.address) {
      return res.status(404).json({ error: 'address is missing' })
    }

    const item = await subgraphApi.fetchTPItemByBlockchainId(req.params.id)

    return res.json({
      id: req.params.id,
      amount: item ? 1 : 0,
      urn: item ? {
        decentraland: item.urn
      } : null
    })
  })
}