import gql from 'graphql-tag'

export const tpItemFragment = () => gql`
fragment tpItemFragment on Item {
  urn
  blockchainItemId
}
`

export type TPItemFragment = {
  urn: string
  blockchainItemId: string
}
