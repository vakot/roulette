import { Server } from 'socket.io'
import { initializeSocket as initializeStreamElementSocket } from './stream-element'

let _global = global as typeof globalThis & { io: Server }

export const initializeSocket = (server: any) => {
  _global.io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  initializeStreamElementSocket()

  _global.io.on('connection', (socket) => {
    console.log('🚀 User connected', socket.id)

    socket.on('disconnect', () => {
      console.log('🔴 User disconnected', socket.id)
    })
  })

  return _global.io
}

export function getSocket() {
  if (!_global.io) {
    throw new Error('Socket.io not initialized')
  }
  return _global.io
}
