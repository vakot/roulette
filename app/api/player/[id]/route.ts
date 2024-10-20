import Player from '@modules/models/Player'
import { toUpdateQuery } from '@utils/helpers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const player = await Player.findById(params.id).populate('roulette')

    if (!player) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(player, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    if (!params.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const newPlayer = await Player.findByIdAndUpdate(
      params.id,
      toUpdateQuery(body),
      { new: true, runValidators: true }
    ).populate('roulette')

    if (!newPlayer) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(newPlayer, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const deletedPlayer = await Player.findByIdAndDelete(params.id).populate(
      'roulette'
    )

    if (!deletedPlayer) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(deletedPlayer, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
