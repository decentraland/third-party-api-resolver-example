import gql from 'graphql-tag'
import {
  tpItemFragment,
  TPItemFragment
} from './fragments'
import {
  BaseGraphAPI
} from './BaseGraphAPI'

const getTPItemsQuery = () => gql`
  query getTPItems {
    items {
      ...tpItemFragment
    }
  }
  ${tpItemFragment()}
`

const getTPItemQuery = () => gql`
  query getTPItem($blockchainItemId: String) {
    items(where: {blockchainItemId: $blockchainItemId }) {
      ...tpItemFragment
    }
  }
  ${tpItemFragment()}
`

export class SubgraphApi extends BaseGraphAPI {
  fetchTPItems = async () => {
    const {
      data: { items = [] },
    } = await this.query<{
      items: TPItemFragment[]
    }>({
      query: getTPItemsQuery()
    })

    return items.length > 0 ? items : null
  }

  fetchTPItemByBlockchainId = async (blockchainItemId: string) => {
    const {
      data: { items = [] },
    } = await this.query<{
      items: TPItemFragment[]
    }>({
      query: getTPItemQuery(),
      variables: { blockchainItemId }
    })

    return items.length > 0 ? items[0] : null
  }
}

export const subgraphApi = new SubgraphApi(process.env.TPW_GRAPH_URL || 'https://api.thegraph.com/subgraphs/name/decentraland/tpr-matic-mumbai')
