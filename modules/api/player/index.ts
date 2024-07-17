import { IPlayer } from '@modules/models/Player'
import { IRoulette } from '@modules/models/Roulette'
import { invalidatesTags } from '@modules/store/utils/invalidatesTags'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toCleanObject } from '@utils/helpers'

export const playerApi = createApi({
  reducerPath: 'playerApi',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Player', 'Roulette'],
  baseQuery: fetchBaseQuery({ baseUrl: `/api/` }),
  endpoints: (builder) => ({
    player: builder.query<IPlayer[], string | undefined | void>({
      query: (id) => ({
        url: `player/${id}`,
        method: 'GET'
      }),
      providesTags: ['Player']
    }),
    Player: builder.mutation<IPlayer, Partial<Omit<IPlayer, 'roulette'> & { roulette: IRoulette | string }>>({
      query: (body) => ({
        url: 'player',
        method: 'POST',
        body: { players: [body] }
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette']) as any
    }),
    editPlayer: builder.mutation<IPlayer, Partial<Omit<IPlayer, 'roulette'> & { roulette: IRoulette | string }>>({
      query: (body) => ({
        url: `player/${body._id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette']) as any
    }),
    deletePlayer: builder.mutation<IPlayer, IPlayer['_id']>({
      query: (id) => ({
        url: `player/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette']) as any
    }),
    players: builder.query<IPlayer[], { roulette: IRoulette['_id'] } | undefined | void>({
      query: (query) => ({
        url: 'player',
        method: 'GET',
        ...(query && { params: toCleanObject(query) as Record<string, any> })
      }),
      providesTags: ['Player']
    }),
    Players: builder.mutation<void, Partial<IPlayer>[]>({
      query: (players) => ({
        url: 'player',
        method: 'POST',
        body: { players }
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette']) as any
    }),
    deletePlayers: builder.mutation<IPlayer[], IPlayer['_id'][] | undefined | void>({
      query: (playersIds) => ({
        url: `player`,
        method: 'DELETE',
        body: { players: playersIds }
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette']) as any
    })
  })
})

export const {
  usePlayerQuery,
  usePlayerMutation,
  useEditPlayerMutation,
  useDeletePlayerMutation,
  usePlayersQuery,
  usePlayersMutation,
  useDeletePlayersMutation
} = playerApi
