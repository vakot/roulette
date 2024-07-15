import { countApi } from '@modules/api/count/count.api'
import { playerApi } from '@modules/api/player/player.api'
import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './slices/players'
import themeReducer from './slices/theme'

export const makeStore = () => {
  return configureStore({
    reducer: {
      players: playersReducer,
      theme: themeReducer,
      [countApi.reducerPath]: countApi.reducer,
      [playerApi.reducerPath]: playerApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(countApi.middleware).concat(playerApi.middleware)
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
