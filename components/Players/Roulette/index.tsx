import Roulette, { RouletteProps } from '@components/Roulette'
import { Player } from '@modules/hooks/usePlayers'
import classNames from 'classnames'
import styles from './styles.module.css'

export type PlayersRouletteProps = Omit<RouletteProps<Player>, 'render' | 'duration' | 'fakes'>

export const PlayersRoulette: React.FC<PlayersRouletteProps> = ({ items, className, ...rest }) => {
  return (
    <Roulette
      className={classNames(styles.roulette, className)}
      items={items}
      render={(player) => (
        <div
          style={{
            width: Math.min(Math.max(player.price / 5, 50), 250),
            height: '100%',
            backgroundColor: player.color
          }}
        />
      )}
      duration={10_000}
      fakes={10}
      {...rest}
    />
  )
}
