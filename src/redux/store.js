import { configureStore } from '@reduxjs/toolkit'

// slice
import auth from "./slice/auth.slice"

export const store = configureStore({
  reducer: {
    auth,
  },
  devTools: process.env.NODE_ENV !== 'production'
})
