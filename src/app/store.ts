import { configureStore } from "@reduxjs/toolkit"
import ledgerReducer from "../features/ledger/ledger.slice"
import authReducer from "../features/ledger/auth.slice"

export const store = configureStore({
  reducer: {
    ledger: ledgerReducer,
    user: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
