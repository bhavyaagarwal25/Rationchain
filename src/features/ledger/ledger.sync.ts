import { getUnsynced, markSynced } from './ledger.db'

export async function syncLedger(deviceId: string) {
  if (!navigator.onLine) return

  const unsynced = await getUnsynced()
  if (unsynced.length === 0) return

  const response = await fetch('http://localhost:3333/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      deviceId,
      batchId: crypto.randomUUID(),
      transactions: unsynced
    })
  })

  const result = await response.json()

  for (const id of result.accepted) {
    await markSynced(id)
  }
}
