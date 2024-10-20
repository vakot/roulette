import { playerApi } from '@modules/api/player'
import Player from '@modules/models/Player'
import { ITip } from '@modules/models/Tip'
import { invalidatesTags } from '@modules/store/utils/invalidatesTags'
import { getRandomColor } from '@utils/helpers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('X-Key')
    const body: ITip = await request.json()

    if (body.source !== 'donatello') {
      return NextResponse.json('Access restricted', { status: 401 })
    }

    if (apiKey !== process.env.DONATELLO_API_KEY) {
      return NextResponse.json('Invalid API key', { status: 401 })
    }

    if (await Player.findOne({ tipId: body.pubId })) {
      return NextResponse.json('Duplicated key', { status: 202 })
    }

    await Player.create({
      tipId: body.pubId,
      name: body.clientName,
      price: body.amount,
      color: getRandomColor(),
      message: body.message,
    }).then(() => invalidatesTags(playerApi.reducerPath, ['Player']))

    return NextResponse.json(null, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json('Player with provided ID already exists', {
        status: 202,
      })
    }

    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
