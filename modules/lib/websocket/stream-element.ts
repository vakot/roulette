import axios from 'axios'
import WebSocket from 'ws'

const port = parseInt(process.env.PORT ?? '3000', 10)
const hostname = process.env.HOSTNAME ?? 'localhost'

export const initializeSocket = () => {
  if (!process.env.STREAM_ELEMENTS_URL) {
    throw new Error('Invalid/Missing environment variable: "STREAM_ELEMENTS_URL"')
  }
  if (!process.env.STREAM_ELEMENTS_AUTH_TOKEN) {
    throw new Error('Invalid/Missing environment variable: "STREAM_ELEMENTS_AUTH_TOKEN"')
  }

  const ws = new WebSocket(process.env.STREAM_ELEMENTS_URL as string)

  ws.on('open', () => {
    console.log('🚀 Connected to StreamElements')
    auth(ws)
    subscribe(ws, 'channel.activities')
  })

  ws.on('message', async (data: WebSocket.MessageEvent) => {
    const message = JSON.parse(data.toString())
    console.log('💬 Message from StreamElements:', message)

    if (message.data.type === 'tip') {
      try {
        await axios.post(`http://${hostname}:${port}/api/tip`, message.data.data)
      } catch (error) {
        console.error(error)
      }
    }
  })

  ws.on('error', (error) => {
    console.error(error)
  })

  ws.on('close', () => {
    console.log('🔴 Disconnected from StreamElements')
  })
}

const auth = (ws: WebSocket): void => {
  const data = {
    type: 'auth',
    data: {
      token: process.env.STREAM_ELEMENTS_AUTH_TOKEN,
      token_type: 'jwt'
    }
  }
  ws.send(JSON.stringify(data))
  console.log('🙋‍♂️ Authenticated on StreamElements')
}

const subscribe = (ws: WebSocket, channel: string): void => {
  const data = {
    type: 'subscribe',
    data: {
      topic: channel,
      token: process.env.STREAM_ELEMENTS_AUTH_TOKEN,
      token_type: 'jwt'
    }
  }
  ws.send(JSON.stringify(data))
  console.log('🔊 Subscribed to StreamElements.' + channel)
}
