import dbConnect from '@modules/lib/mongoose'
import Player, { IPlayer } from '@modules/models/Player'
import { FilterQuery } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

dbConnect()

export async function GET(request: NextRequest) {
  try {
    const {
      nextUrl: { searchParams },
    } = request

    const rouletteId = searchParams.get('roulette')

    const filters: FilterQuery<typeof Player> = {}

    if (rouletteId === 'none') {
      filters.roulette = { $exists: false }
    } else if (rouletteId) {
      filters.roulette = rouletteId
    }

    const players = await Player.find(filters)
      .sort({ createdAt: -1 })
      .populate('roulette')

    return NextResponse.json(players, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: IPlayer[] = await request.json()

    await Player.insertMany(body)

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body: IPlayer[] = await request.json()

    await Player.bulkWrite(
      body.map((player) => ({
        updateOne: {
          filter: { _id: player._id },
          update: { $set: player },
        },
      }))
    )

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body: IPlayer['_id'][] = await request.json()

    const deletedPlayers = await Player.deleteMany({ _id: { $in: body } })

    if (!deletedPlayers) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
