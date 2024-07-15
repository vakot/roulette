const { Server } = require('socket.io')

const initializeSocket = (server) => {
  global.io = new Server(server)

  // io = new Server(server, {
  //   cors: {
  //     origin: '*',
  //     methods: ['GET', 'POST']
  //   }
  // })

  global.io.on('connection', (socket) => {
    console.log('🚀 User connected', socket.id)

    socket.on('disconnect', () => {
      console.log('🔴 User disconnected', socket.id)
    })
  })

  return global.io
}

const getSocket = () => global.io

exports.initializeSocket = initializeSocket
exports.getSocket = getSocket
