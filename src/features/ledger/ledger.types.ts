import type { User } from './auth.slice'; // Update path to where User is defined

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
export type RationData = {
  beneficiaryId: string
  shopId: string
  quantity: number
  available: boolean
}

export type LedgerState = {
  user: User | null
  ration: RationData | null
  loading: boolean
}
