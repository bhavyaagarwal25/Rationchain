import { createAsyncThunk } from '@reduxjs/toolkit'
import type { RationData } from './ledger.types'

/* =========================
   LOGIN THUNK
========================= */

export const loginThunk = createAsyncThunk<
  { rationCardId: string; passwordSet: boolean; name: string; address: string; history : {item:string, date:string, quantity:string, type : string}[] },
  { rationCardId: string },
  { rejectValue: string }
>(
  'ledger/login',
  async ({ rationCardId }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        'http://localhost:3333/api/client/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rationCardId })
        }
      )

      if (!res.ok) {
        throw new Error()
      }

      return await res.json()
    } catch {
      return rejectWithValue('Login failed')
    }
  }
)

/* =========================
   REGISTER THUNK
========================= */

export const registerThunk = createAsyncThunk<
  { success: boolean },
  { rationCardId: string; password: string },
  { rejectValue: string }
>(
  'ledger/register',
  async ({ rationCardId, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        'http://localhost:3333/api/client/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rationCardId, password })
        }
      )

      if (!res.ok) {
        throw new Error()
      }

      return await res.json()
    } catch {
      return rejectWithValue('Registration failed')
    }
  }
)


export const fetchRationStatus = createAsyncThunk<
  RationData,
  string,
  { rejectValue: string }
>(
  'ledger/fetchRationStatus',
  async (beneficiaryId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:3333/api/ration/${beneficiaryId}`
      )

      if (!res.ok) {
        throw new Error()
      }

      return await res.json()
    } catch {
      return rejectWithValue('Backend not reachable')
    }
  }
)

/* =========================
   COLLECT RATION
========================= */

export const collectRationThunk = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>(
  'ledger/collectRation',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        'http://localhost:3333/api/collect',
        { method: 'POST' }
      )

      if (!res.ok) {
        throw new Error()
      }

      return true
    } catch {
      return rejectWithValue('Unable to collect ration')
    }
  }
)
