import fetch from 'isomorphic-fetch'


export class CatalystAPI {
  static async get(registryId: string, id?: string) {
    let url = `https://peer-uw-1.decentraland.zone/content/entities/currently-pointed/urn:decentraland:mumbai:collections-thirdparty:${registryId}`

    if (id) {
      url += `:${id}`
    }

    const res = await fetch(url)
    const data = await res.json()

    return data
  }
}