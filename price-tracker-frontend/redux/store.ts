import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cryptoDataApi } from './services'
import cryptoNameReducer from '../utils/cryptoDataSlice'
import { useDispatch } from 'react-redux'



export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [cryptoDataApi.reducerPath]: cryptoDataApi.reducer,
    cryptoName: cryptoNameReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoDataApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;