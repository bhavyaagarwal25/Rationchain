import type { LedgerTransaction } from './ledger.types'
import { calculateHash } from './hashLedger'

export function verifyLedgerChain(
  transactions: LedgerTransaction[]
): {
  valid: boolean
  breakIndex: number | null
} {
  for (let i = 1; i < transactions.length; i++) {
    const expectedHash = calculateHash({
      beneficiaryId: transactions[i].beneficiaryId,
      shopId: transactions[i].shopId,
      quantity: transactions[i].quantity,
      period: transactions[i].period,
      transactionTime: transactions[i].transactionTime,
      previousHash: transactions[i - 1].currentHash,
      deviceId: transactions[i].deviceId
    })

    if (expectedHash !== transactions[i].currentHash) {
      return { valid: false, breakIndex: i }
    }
  }

  return { valid: true, breakIndex: null }
}
