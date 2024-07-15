import { Player } from '@modules/hooks/usePlayers'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playerApi = createApi({
  reducerPath: 'playerApi',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: `/api/` }),
  endpoints: (builder) => ({
    target: builder.mutation<void, string>({
      query: (id) => ({
        url: 'player/target',
        method: 'POST',
        body: { id }
      })
    }),
    players: builder.mutation<void, Player[]>({
      query: (players) => ({
        url: 'player',
        method: 'POST',
        body: { players }
      })
    })
  })
})

export const { useTargetMutation, usePlayersMutation } = playerApi
