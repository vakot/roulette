import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const countApi = createApi({
  reducerPath: 'countApi',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: `/api/` }),
  endpoints: (builder) => ({
    count: builder.mutation<void, { count: number }>({
      query: (body) => ({
        url: 'count',
        method: 'POST',
        body
      })
    })
  })
})

export const { useCountMutation } = countApi
