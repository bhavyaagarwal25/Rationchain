import { createSlice } from '@reduxjs/toolkit'
import { loginThunk, registerThunk } from './ledger.thunk'
export interface History{
    item:string,
    date:string,
    quantity:string,
    type : string
}


export interface User {
    rationCardId: string
    passwordSet: boolean
    name: string
    address: string
    history : History[]
}
interface AuthState {
  user:User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      /* ===== LOGIN ===== */

      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      /* ===== REGISTER ===== */

      .addCase(registerThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false
      })

      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
