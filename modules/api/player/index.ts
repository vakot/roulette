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
    getPlayer: builder.query<IPlayer, string | undefined | void>({
      query: (id) => ({
        url: `player/${id}`,
        method: 'GET'
      }),
      providesTags: ['Player']
    }),
    addPlayer: builder.mutation<IPlayer, Partial<Omit<IPlayer, 'roulette' | 'tip'> & { roulette: IRoulette | string }>>({
      query: (body) => ({
        url: 'player',
        method: 'POST',
        body: { players: [body] }
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette'])
    }),
    editPlayer: builder.mutation<IPlayer, Partial<Omit<IPlayer, 'roulette' | 'tip'> & { roulette: IRoulette | string | null | undefined }>>(
      {
        query: (body) => ({
          url: `player/${body._id}`,
          method: 'PATCH',
          body
        }),
        invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette'])
      }
    ),
    deletePlayer: builder.mutation<IPlayer, IPlayer['_id']>({
      query: (id) => ({
        url: `player/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette'])
    }),
    getPlayers: builder.query<IPlayer[], { roulette: IRoulette['_id'] | 'none' } | undefined | void>({
      query: (query) => ({
        url: 'player',
        method: 'GET',
        ...(query && { params: toCleanObject(query) as Record<string, any> })
      }),
      providesTags: ['Player']
    }),
    addPlayers: builder.mutation<void, Partial<IPlayer>[]>({
      query: (body) => ({
        url: 'player',
        method: 'POST',
        body
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette'])
    }),
    editPlayers: builder.mutation<IPlayer[], Partial<Omit<IPlayer, 'roulette' | 'tip'> & { roulette: IRoulette | string }>[]>({
      query: (body) => ({
        url: `player`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette'])
    }),
    deletePlayers: builder.mutation<IPlayer[], IPlayer['_id'][] | undefined | void>({
      query: (playersIds) => ({
        url: `player`,
        method: 'DELETE',
        body: playersIds
      }),
      invalidatesTags: () => invalidatesTags('playerApi', ['Player', 'Roulette'])
    })
  })
})

export const {
  useGetPlayerQuery,
  useAddPlayerMutation,
  useEditPlayerMutation,
  useDeletePlayerMutation,
  useGetPlayersQuery,
  useAddPlayersMutation,
  useEditPlayersMutation,
  useDeletePlayersMutation
} = playerApi
