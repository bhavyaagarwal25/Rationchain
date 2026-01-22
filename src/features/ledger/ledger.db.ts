import { openDB } from 'idb'
import type { LedgerTransaction } from './ledger.types'

const DB_NAME = 'smart_ration'
const STORE = 'ledger'

export const db = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE, { keyPath: 'id' })
  }
})

export async function saveTx(tx: LedgerTransaction) {
  (await db).put(STORE, tx)
}

export async function getUnsynced(): Promise<LedgerTransaction[]> {
  const all = await (await db).getAll(STORE)
  return all.filter(t => !t.isSynced)
}

export async function markSynced(id: string) {
  const database = await db
  const tx = await database.get(STORE, id)
  if (!tx) return
  tx.isSynced = true
  await database.put(STORE, tx)
}
