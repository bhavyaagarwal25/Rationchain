import type { LedgerTransaction } from './ledger.types'
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

/* 👇👇 ADD THIS FUNCTION BELOW 👇👇 */
export function verifyLedgerChain(
  transactions: LedgerTransaction[]
) {
  for (let i = 1; i < transactions.length; i++) {
    const prev = transactions[i - 1]
    const curr = transactions[i]

    if (curr.previousHash !== prev.currentHash) {
      return {
        valid: false,
        breakIndex: i
      }
    }
  }

  return {
    valid: true,
    breakIndex: -1
  }
}
