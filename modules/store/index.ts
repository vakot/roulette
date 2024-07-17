import { countApi } from '@modules/api/count/count.api'
import { playerApi } from '@modules/api/player'
import { rouletteApi } from '@modules/api/roulette'
import { createSocketMiddleware } from '@modules/middleware/socket'
import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './slices/players'
import themeReducer from './slices/theme'

export const makeStore = () => {
  return configureStore({
    reducer: {
      players: playersReducer,
      theme: themeReducer,
      [playerApi.reducerPath]: playerApi.reducer,
      [countApi.reducerPath]: countApi.reducer,
      [rouletteApi.reducerPath]: rouletteApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(playerApi.middleware, countApi.middleware, rouletteApi.middleware)
        .concat(createSocketMiddleware([playerApi, countApi, rouletteApi]))
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
