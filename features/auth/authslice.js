import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  passwordChangeRequired: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    loginSuccess(state, action) {
      state.isLoggedIn = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.passwordChangeRequired =
        action.payload.passwordChangeRequired
    },

    passwordChanged(state) {
      state.passwordChangeRequired = false
    },

    logout() {
      return initialState
    }
  }
})

export const {
  loginSuccess,
  passwordChanged,
  logout
} = authSlice.actions

export default authSlice.reducer
