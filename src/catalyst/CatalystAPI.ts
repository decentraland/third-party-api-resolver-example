import fetch from 'isomorphic-fetch'

const BASE_URL =
  'https://peer.decentraland.zone/content/entities/active/collections/urn:decentraland:mumbai:collections-thirdparty'

type RegistryEntry = {
  entityId: string
  pointer: string
}

export class CatalystAPI {
  static async getRegistry(registryId: string): Promise<RegistryEntry[]> {
    const url = `${BASE_URL}:${registryId}`

    const res = await fetch(url)
    return await res.json()
  }

  static async getAsset(
    registryId: string,
    id: string
  ): Promise<RegistryEntry[]> {
    const url = `${BASE_URL}:${registryId}:${id}`

    const res = await fetch(url)
    return await res.json()
  }
}
