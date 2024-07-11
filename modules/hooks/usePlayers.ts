import { getRandomColor } from '@utils/helpers'
import { useMemo } from 'react'
import { v1 as uuidv1 } from 'uuid'

export interface Player {
  id: string
  name?: string
  price: number
  color?: string
}

const _players: Omit<Player, 'id'>[] = [
  {
    price: 1000
  },
  {
    price: 900
  },
  {
    price: 800
  },
  {
    price: 700
  },
  {
    price: 600
  },
  {
    price: 500
  },
  {
    price: 400
  },
  {
    price: 300
  },
  {
    price: 200
  },
  {
    price: 100
  }
]

export const usePlayers = (players: Player[] = _players as any): Player[] =>
  useMemo(() => {
    return players.map((player) => ({ color: getRandomColor(), ...player, id: uuidv1() }))
  }, [players])

export const useRandomPlayers = (length: number = 10): Player[] =>
  useMemo(() => {
    return Array.from({ length }).map((_, index) => ({
      id: uuidv1(),
      name: `#${index + 1}`,
      price: Math.floor(Math.random() * 900 + 100),
      color: getRandomColor()
    }))
  }, [length])
