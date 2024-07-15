import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRandomColor } from '@utils/helpers'
import { v1 as uuidv1 } from 'uuid'

export interface Player {
  id: string
  name?: string
  price: number
  color?: string
  description?: string
}

const playersSlice = createSlice({
  name: 'players',
  initialState: [] as Player[],
  reducers: {
    addPlayer: (state, action: PayloadAction<Partial<Player>>) => {
      state.push({
        id: action.payload.id ?? uuidv1(),
        name: action.payload.name ?? 'anonim',
        price: action.payload.price ?? 0,
        description: action.payload.description ?? '',
        color: action.payload.color ?? getRandomColor()
      })
    },
    addPlayers: (state, action: PayloadAction<Partial<Player>[]>) => {
      action.payload.forEach((player) => {
        state.push({
          id: player.id ?? uuidv1(),
          name: player.name ?? 'anonim',
          price: player.price ?? 0,
          description: player.description ?? '',
          color: player.color ?? getRandomColor()
        })
      })
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state = state.filter((player) => player.id !== action.payload)
    },
    removePlayers: (state, action: PayloadAction<string[]>) => {
      state = state.filter((player) => !action.payload.includes(player.id))
    }
  }
})

export const { addPlayer, addPlayers, removePlayer, removePlayers } = playersSlice.actions
export default playersSlice.reducer
