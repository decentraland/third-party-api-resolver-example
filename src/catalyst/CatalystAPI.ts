import fetch from 'isomorphic-fetch'


export class CatalystAPI {
  static async get(registryId: string, id?: string) {
    let url = `https://peer.decentraland.zone/content/entities/active/collections/urn:decentraland:mumbai:collections-thirdparty:${registryId}`

    if (id) {
      url += `:${id}`
    }

    const res = await fetch(url)
    const data = await res.json()

    return data
  }
}