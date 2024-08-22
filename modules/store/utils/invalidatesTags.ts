import { TagDescription } from '@reduxjs/toolkit/query'
import axios from 'axios'

const port = parseInt(process.env.PORT ?? '3000', 10)
const hostname = process.env.HOSTNAME ?? 'localhost'

export const invalidatesTags = (reducerPath: string, tags: string[] = []): TagDescription<any>[] => {
  axios.post(`http://${hostname}:${port}/api/ws/invalidate`, JSON.stringify({ reducerPath, tags })).catch(console.error)
  return []
}
