export function buildURN(registryId: string, itemId: string): string {
  // The URN is built using the default prefix and using the registry and item id.
  // More info in how to generate a valid URN here: https://github.com/decentraland/adr/blob/main/docs/ADR-42-third-party-assets-integration.md#third-party-item-urn
  return `urn:decentraland:amoy:collections-thirdparty:${registryId}:${itemId}`
}
