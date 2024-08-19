import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'
import { initializeSocket } from './modules/lib/websocket'

// const port = parseInt(process.env.PORT ?? '3000', 10)
// const hostname = process.env.HOSTNAME ?? 'localhost'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname: 'localhost', port: 3000 })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  initializeSocket(server)

  server
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(3000, () => {
      // console.log(`> Ready on http://${hostname}:${port}`)
      console.log(`> Ready on http://localhost:${3000}`)
    })
})
