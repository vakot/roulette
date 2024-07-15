'use client'

import { useEffect } from 'react'
import io from 'socket.io-client'

const socket = io()

const useSocket = <T = any>(eventName: string, callback: (data: T) => void) => {
  useEffect(() => {
    socket.on(eventName, callback)

    return () => {
      socket.off(eventName, callback)
    }
  }, [eventName, callback])
}

export default useSocket
