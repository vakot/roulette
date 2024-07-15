'use client'

import Icon from '@ant-design/icons/lib/components/Icon'
import { PlayersList } from '@components/Players/List'
import { PlayersRoulette } from '@components/Players/Roulette'
import Roulette from '@components/Roulette'
import { usePlayersMutation, useTargetMutation } from '@modules/api/player/player.api'
import { Player, usePlayers } from '@modules/hooks/usePlayers'
import useSocket from '@modules/hooks/useSocket'
import { useAppDispatch, useAppSelector } from '@modules/store/hooks'
import { addPlayers } from '@modules/store/slices/players'
import CoinIcon from '@public/coin-thumb-up-01.svg'
import { getRandomIndexWithProbabilities } from '@utils/helpers'
import { Button, Card, Empty } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import styles from './page.module.css'

export default function HomePage() {
  const dispatch = useAppDispatch()

  const players = useAppSelector(({ players }) => players)

  const roulette = Roulette.useRoulette()

  const [_setTarget] = useTargetMutation()
  const [_setPlayers] = usePlayersMutation()

  const [winner, setWinner] = useState<Player>()
  const [target, setTarget] = useState<Player>()

  const { bank, _bank } = useMemo(() => {
    const bank = players.reduce((acc, { price }) => {
      return (acc += Number(price))
    }, 0)

    return {
      bank,
      _bank: Number((bank * 0.9).toFixed(2))
    }
  }, [players])

  const handleSpin = useCallback(() => {
    const index = target
      ? players.findIndex(({ id }) => id === target.id)
      : getRandomIndexWithProbabilities(players.map(({ price }) => price))

    if (index < 0) {
      return
    }

    roulette.current?.spin(index)
  }, [roulette, target, players])

  useSocket<{ id: Player['id'] }>('set-target', ({ id }) => {
    setTarget(players.find((player) => player.id === id))
  })
  useSocket<{ players: Player[] }>('set-players', ({ players: _players }) => {
    dispatch(addPlayers(getPlayers(_players)))
  })

  const { getPlayers } = usePlayers()

  return (
    <main className={styles.main}>
      <div className={classNames(styles.block, styles['roulette-block'])}>
        <Card title="Last winner" className={styles.winner}>
          {!!winner ? (
            <PlayersList players={[{ ...winner, price: _bank, probability: undefined }]} />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Card>
        <Card title="Total bank" className={styles.bank}>
          {bank.toFixed(2)} <Icon component={() => <Image src={CoinIcon} alt="coin" width={32} height={32} />} />
        </Card>
        <Card className={styles.roulette}>
          <PlayersRoulette className={styles.roulette} roulette={roulette} items={players} onFinish={(player) => setWinner(player)} />
        </Card>
        <Button type="primary" block className={styles.button} onClick={handleSpin}>
          Spin
        </Button>
      </div>
      <div className={classNames(styles.block, styles['players-block'])}>
        <Card title={`Players - ${players.length}`}>
          <PlayersList players={players} onClick={(player) => _setTarget(player.id)} />
        </Card>
      </div>
    </main>
  )
}
