import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LedgerTransaction } from './ledger.types'
import {
  fetchRationStatus,
  collectRationThunk,
} from './ledger.thunk'

/* =====================
   TYPES
===================== */

interface RationStatus {
  available: boolean
  quotaKg?: number
  collectedKg?: number
}

interface LedgerState {
  transactions: LedgerTransaction[]
  lastHash: string
  ration: RationStatus | null
  loading: boolean
  error: string | null
}

/* =====================
   INITIAL STATE
===================== */

const initialState: LedgerState = {
  transactions: [],
  lastHash: 'GENESIS',
  ration: null,
  loading: false,
  error: null
}

/* =====================
   SLICE
===================== */

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
    },

    tamperTransaction(state) {
      if (state.transactions.length > 0) {
        state.transactions[0].quantity += 1
      }
    },

    resetLedger(state) {
      state.transactions = []
      state.lastHash = 'GENESIS'
      state.ration = null
      state.loading = false
      state.error = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRationStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchRationStatus.fulfilled, (state, action) => {
        state.loading = false
        state.ration = action.payload
      })

      .addCase(fetchRationStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(collectRationThunk.fulfilled, (state) => {
        if (state.ration) {
          state.ration.available = false
        }
      })
  }
})

export const {
  addTransaction,
  markTransactionSynced,
  tamperTransaction,
  resetLedger
} = ledgerSlice.actions

export default ledgerSlice.reducer
