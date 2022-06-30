export function getIdFromPointer(pointer: string) {
  // getIdFromPointer('urn:decentraland:matic:collections-thirdparty:cryptohats:0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd:0')
  // -> 0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd:0
  return pointer.split(':').slice(-2).join(':')
}
