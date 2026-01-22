import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LedgerTransaction } from './ledger.types'


interface LedgerState {
  transactions: LedgerTransaction[]
  lastHash: string
}

const initialState: LedgerState = {
  transactions: [],
  lastHash: 'GENESIS'
}

const ledgerSlice = createSlice({
  name: 'ledger',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<LedgerTransaction>) {
      state.transactions.push(action.payload)
      state.lastHash = action.payload.currentHash
    },
    markTransactionSynced(state, action: PayloadAction<string>) {
      const tx = state.transactions.find(t => t.id === action.payload)
      if (tx) tx.isSynced = true
    }
  }
})

export const {
  addTransaction,
  markTransactionSynced
} = ledgerSlice.actions

export default ledgerSlice.reducer
