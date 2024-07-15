import Roulette, { RouletteProps } from '@components/Roulette'
import { Player } from '@modules/hooks/usePlayers'
import { Avatar } from 'antd'

export type PlayersRouletteProps = Omit<RouletteProps<Player>, 'render' | 'duration' | 'fakes'>

export const PlayersRoulette: React.FC<PlayersRouletteProps> = ({ items, ...rest }) => {
  return (
    <Roulette
      items={items}
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
          <Avatar
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${player.id}`}
            alt="player"
            style={{ backgroundColor: 'black', width: '50%', height: '50%' }}
          />
        </div>
      )}
      duration={10000}
      fakes={10}
      {...rest}
    />
  )
}
