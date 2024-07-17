import { getSocket } from '@modules/lib/websocket'
import { NextRequest, NextResponse } from 'next/server'
import { Server } from 'socket.io'

export async function POST(request: NextRequest) {
  const socket: Server = getSocket()

  if (socket.emit('invalidate', await request.json())) {
    return NextResponse.json(null, { status: 200 })
  } else {
    return NextResponse.json(null, { status: 400 })
  }
}
