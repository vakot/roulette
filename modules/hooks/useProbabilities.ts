import { Player } from '@modules/hooks/usePlayers'
import { getProbabilities } from '@utils/helpers'
import { useMemo } from 'react'

export const useProbabilities = (players: Player[]) =>
  useMemo(() => {
    const probabilities = getProbabilities(players.map(({ price }) => price))
    return players.map(({ id }, index) => ({ id, value: probabilities[index] }))
  }, [players])
