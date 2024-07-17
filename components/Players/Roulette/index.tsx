import Roulette, { RouletteProps } from '@components/Roulette'
import { IPlayer } from '@modules/models/Player'
import { getRandomColor } from '@utils/helpers'
import { Avatar } from 'antd'
import React, { useMemo } from 'react'

export interface PlayersRouletteProps extends Omit<RouletteProps<IPlayer>, 'render' | 'duration' | 'fakes' | 'items'> {
  players: RouletteProps<IPlayer>['items']
}

export const PlayersRoulette: React.FC<PlayersRouletteProps> = ({ players = [], ...rest }) => {
  return <Roulette items={players} render={(player) => <RouletteItem player={player} />} duration={10000} fakes={10} {...rest} />
}

export const RouletteItem: React.FC<{ player: IPlayer }> = ({ player }) => {
  const color = useMemo(() => {
    return getRandomColor(player._id)
  }, [player._id])

  return (
    <div
      style={{
        aspectRatio: 1,
        height: '100%',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Avatar
        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${player._id}`}
        alt="player"
        style={{ backgroundColor: 'black', width: '50%', height: '50%' }}
      />
    </div>
  )
}
