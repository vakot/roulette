import { IRoulette } from '@modules/models/Roulette'
import { invalidatesTags } from '@modules/store/utils/invalidatesTags'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rouletteApi = createApi({
  reducerPath: 'rouletteApi',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Roulette', 'Target'],
  baseQuery: fetchBaseQuery({ baseUrl: `/api/` }),
  endpoints: (builder) => ({
    roulette: builder.query<IRoulette, string>({
      query: (id) => ({
        url: `roulette/${id}`,
        method: 'GET'
      }),
      providesTags: ['Roulette']
    }),
    Roulette: builder.mutation<IRoulette, Partial<IRoulette>>({
      query: (body) => ({
        url: 'roulette',
        method: 'POST',
        body: { body }
      }),
      invalidatesTags: () => invalidatesTags('rouletteApi', ['Roulette', 'Target']) as any
    }),
    editRoulette: builder.mutation<IRoulette, Partial<IRoulette>>({
      query: (body) => ({
        url: `roulette/${body._id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: () => invalidatesTags('rouletteApi', ['Roulette', 'Target']) as any
    }),
    roulettes: builder.query<IRoulette[], void>({
      query: (id) => ({
        url: 'roulette',
        method: 'GET',
        params: { id }
      }),
      providesTags: ['Roulette']
    }),
    Roulettes: builder.mutation<IRoulette[], Partial<IRoulette>[]>({
      query: (body) => ({
        url: 'roulette',
        method: 'POST',
        body: { body }
      }),
      invalidatesTags: () => invalidatesTags('rouletteApi', ['Roulette', 'Target']) as any
    })
  })
})

export const { useRouletteQuery, useRouletteMutation, useEditRouletteMutation, useRoulettesQuery, useRoulettesMutation } = rouletteApi
