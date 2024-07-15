import { getRandomColor, getRandomName } from '@utils/helpers'
import { useCallback } from 'react'
import { v1 as uuidv1 } from 'uuid'

export interface Player {
  id: string
  name?: string
  price: number
  color?: string
  description?: string
}

const _players: Player[] = [
  { id: uuidv1(), price: 1000 },
  { id: uuidv1(), price: 900 },
  { id: uuidv1(), price: 800 },
  { id: uuidv1(), price: 700 },
  { id: uuidv1(), price: 600 },
  { id: uuidv1(), price: 500 },
  { id: uuidv1(), price: 400 },
  { id: uuidv1(), price: 300 },
  { id: uuidv1(), price: 200 },
  { id: uuidv1(), price: 100 }
]

export const usePlayers = (): {
  getPlayers: (players?: Player[]) => Player[]
  getRandomPlayers: (length?: number) => Player[]
} => {
  const getPlayers = useCallback((players: Player[] = _players as any) => {
    return players.map((player) => ({ color: getRandomColor(), ...player }))
  }, [])

  const getRandomPlayers = useCallback((length: number = 10) => {
    return Array.from({ length }).map((_, index) => ({
      id: uuidv1(),
      name: getRandomName(),
      price: Math.floor(Math.random() * 900 + 100),
      color: getRandomColor()
    }))
  }, [])

  return { getPlayers, getRandomPlayers }
}
