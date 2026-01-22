export interface LedgerTransaction {
  id: string
  beneficiaryId: string
  shopId: string
  quantity: number
  period: string
  transactionTime: string
  previousHash: string
  currentHash: string
  deviceId: string
  isSynced: boolean
}
