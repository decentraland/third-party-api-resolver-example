export type Metaverse = {
  [metaverse: string]: string
}

export type Asset = {
  id: string
  amount: number
  urn: Metaverse
}

export type BaseListResponse = {
  total?: number
  page?: number
  next?: string
}

export type ListResponse = BaseListResponse & {
  address: string
  assets: Asset[]
}

export type SingleResponse = Asset

export type BloomFilterResponse = {
  data: string
}
