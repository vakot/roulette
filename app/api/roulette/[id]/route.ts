import dbConnect from '@modules/lib/mongoose'
import Roulette from '@modules/models/Roulette'
import { toUpdateQuery } from '@utils/helpers'
import { NextRequest, NextResponse } from 'next/server'

dbConnect()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const roulette = await Roulette.findById(params.id).populate('winner').populate('target')

    if (!roulette) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(roulette, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    if (!params.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const newRoulette = await Roulette.findByIdAndUpdate(params.id, toUpdateQuery(body), { new: true, runValidators: true })
      .populate('winner')
      .populate('target')

    if (!newRoulette) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(newRoulette, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
