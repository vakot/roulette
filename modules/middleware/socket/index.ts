import { Action, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import io from 'socket.io-client'

const socket = io()

export interface InvalidateAction extends Action {
  reducerPath: string
  tags: string[]
}

export const createSocketMiddleware = <A extends InvalidateAction>(
  slices: any[]
): Middleware<object, any, Dispatch<A>> => {
  return ((store: MiddlewareAPI) => {
    socket.on('invalidate', ({ reducerPath, tags }: A) => {
      const api = slices.find((slice) => slice.reducerPath === reducerPath)

      if (api) {
        store.dispatch(api.util.invalidateTags(tags))
      }
    })

    return (next: Dispatch<A>) => (action: A) => next(action)
  }) as Middleware<object, any, Dispatch<A>>
}
