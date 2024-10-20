import Roulette, { IRoulette } from '@modules/models/Roulette'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const roulettes = await Roulette.find()
      .populate('winner')
      .populate('target')

    return NextResponse.json(roulettes, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: { roultette: IRoulette[] } = await request.json()

    await Roulette.insertMany(body.roultette)

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
