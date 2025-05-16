import { configureStore } from '@reduxjs/toolkit'
import { mainApi } from './services/main'

export const makeStore = () =>
  configureStore({
    reducer: {
      [mainApi.reducerPath]: mainApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mainApi.middleware),
  })

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
