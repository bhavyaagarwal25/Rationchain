import { SHA256 } from 'crypto-js'
import type { LedgerTransaction } from './ledger.types'


export function calculateHash(
  tx: Omit<LedgerTransaction, 'currentHash' | 'isSynced' | 'id'>
): string {
  const payload =
    tx.beneficiaryId +
    tx.shopId +
    tx.quantity +
    tx.period +
    tx.transactionTime +
    tx.previousHash

  return SHA256(payload).toString()
}
