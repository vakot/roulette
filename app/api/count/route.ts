import { getSocket } from '@modules/lib/websocket'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const io = getSocket()

  io.emit('increment', await request.json())

  return Response.json(null)
}
