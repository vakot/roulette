import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import themeReducer from './slices/theme'

export const store = configureStore({
  reducer: {
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
