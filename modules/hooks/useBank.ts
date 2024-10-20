import { useGetPlayersQuery } from '@modules/api/player'
import { IRoulette } from '@modules/models/Roulette'
import { useMemo } from 'react'

export const useBank = (rouletteId?: IRoulette['_id']): [number, { isLoading: boolean }] => {
  const { data: players, isLoading: isPlayersLoading } = useGetPlayersQuery({ roulette: rouletteId }, { skip: !rouletteId })

  const bank = useMemo<number>(() => {
    return (
      players?.reduce((acc, player) => {
        return acc + Number(player.price)
      }, 0) ?? 0
    )
  }, [players])

  return [bank, { isLoading: isPlayersLoading }]
}
