import { playerApi } from '@modules/api/player'
import dbConnect from '@modules/lib/mongoose'
import Player, { IPlayer } from '@modules/models/Player'
import { ITip } from '@modules/models/Tip'
import { invalidatesTags } from '@modules/store/utils/invalidatesTags'
import { getRandomColor } from '@utils/helpers'
import { NextRequest, NextResponse } from 'next/server'

dbConnect()

export async function POST(request: NextRequest) {
  try {
    const body: ITip = await request.json()

    const player: IPlayer = {
      _id: body.tipId,
      name: body.username,
      price: body.amount,
      color: getRandomColor(),
      message: body.message,
      avatar: body.avatar
    }

    await Player.create(player).then(() => invalidatesTags(playerApi.reducerPath, ['Player']))

    return NextResponse.json(null, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json('Player with provided ID already exists', { status: 202 })
    }

    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
