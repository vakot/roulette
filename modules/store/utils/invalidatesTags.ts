import { TagDescription } from '@reduxjs/toolkit/query'
import { getBaseUrl } from '@utils/helpers'
import axios from 'axios'

export const invalidatesTags = (
  reducerPath: string,
  tags: string[] = []
): TagDescription<any>[] => {
  axios
    .post(
      `${getBaseUrl()}/api/ws/invalidate`,
      JSON.stringify({ reducerPath, tags })
    )
    .catch(console.error)
  return []
}
