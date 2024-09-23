import Roulette, { RouletteProps } from '@components/Roulette'
import { IPlayer } from '@modules/models/Player'
import { Avatar } from 'antd'
import React from 'react'

export interface PlayersRouletteProps extends Omit<RouletteProps<IPlayer>, 'render' | 'duration' | 'fakes' | 'items'> {
  players: RouletteProps<IPlayer>['items']
}

export const PlayersRoulette: React.FC<PlayersRouletteProps> = ({ players = [], ...props }) => {
  return (
    <Roulette
      items={players}
      render={(player) => (
        <div
          style={{
            aspectRatio: 1,
            height: '100%',
            backgroundColor: player.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Avatar src={player?.avatar} alt="player" style={{ backgroundColor: 'black', width: '50%', height: '50%' }} />
        </div>
      )}
      duration={10000}
      fakes={10}
      {...props}
    />
  )
}
