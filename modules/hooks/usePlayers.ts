import { IPlayer } from '@modules/models/Player'
import { getRandomColor, getRandomName } from '@utils/helpers'
import { useCallback } from 'react'

export const usePlayers = (): {
  getPlayers: (players?: Partial<IPlayer>[]) => Partial<IPlayer>[]
  getRandomPlayers: (length?: number) => Partial<IPlayer>[]
} => {
  const getPlayers = useCallback((players: Partial<IPlayer>[] = []) => {
    return players.map((player) => ({ color: getRandomColor(), ...player }))
  }, [])

  const getRandomPlayers = useCallback((length: number = 10) => {
    return Array.from({ length }).map(() => ({
      name: getRandomName(),
      price: Math.random() * (1000 - 100) + 100
      // image: `https://api.dicebear.com/7.x/miniavs/svg?seed=${uuidv1()}`
    }))
  }, [])

  return { getPlayers, getRandomPlayers }
}
