import { Player } from '@modules/hooks/usePlayers'
import { getProbabilities } from '@utils/helpers'
import { useMemo } from 'react'

export const useProbabilities = (players: Player[], exponent?: number) =>
  useMemo(() => {
    const probabilities = getProbabilities(
      players.map(({ price }) => price),
      exponent
    )
    return players.map(({ id }, index) => ({ id, value: probabilities[index] }))
  }, [players, exponent])
