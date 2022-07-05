import fs from 'fs/promises'

export type Item = {
  id: string
  owner: string
}

export async function getItemsByRegistryId(id: string): Promise<Item[]> {
  const path = `${__dirname}/data/${id}.json`
  try {
    const file = await fs.readFile(path, 'utf-8')
    return JSON.parse(file)
  } catch (error) {
    console.log(
      `There was an error fetching the items for registry ${id}: ${
        (error as Error).message
      }`
    )
    return []
  }
}

export async function getItemById(
  registryId: string,
  id: string
): Promise<Item | undefined> {
  const items = await getItemsByRegistryId(registryId)
  return items.find((item) => item.id === id)
}
