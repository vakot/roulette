import { IPlayer } from '@modules/models/Player'
import { getProbabilities } from '@utils/helpers'
import { useMemo } from 'react'

export const useProbabilities = (players: IPlayer[] = [], exponent?: number) =>
  useMemo(() => {
    const probabilities = getProbabilities(
      players.map(({ price }) => price ?? 0),
      exponent
    )
    return players.map(({ _id }, index) => ({ _id, value: probabilities[index] }))
  }, [players, exponent])
