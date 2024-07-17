import dbConnect from '@modules/lib/mongoose'
import Player, { IPlayer } from '@modules/models/Player'
import { FilterQuery } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

dbConnect()

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const {
      nextUrl: { searchParams }
    } = request

    const rouletteId = searchParams.get('roulette')

    const filters: FilterQuery<typeof Player> = {}

    if (rouletteId) {
      filters.roulette = rouletteId
    }

    const players = await Player.find(filters).populate('roulette')

    return NextResponse.json(players, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: { players: IPlayer[] } = await request.json()

    await Player.insertMany(body.players)

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body: { players: IPlayer['_id'][] } = await request.json()

    const deletedPlayers = await Player.deleteMany({ _id: { $in: body.players } })

    if (!deletedPlayers) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
