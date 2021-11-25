export type BaseResponse = {
  total?: number,
  page?: number,
  next?: string
}

export type Response = BaseResponse & {
  address: string
  assets: Asset[]
}

export type Asset = {
  id: string,
  amount: number,
  urn: Metaverse
}

export type Metaverse = {
  [metaverse: string]: string
}