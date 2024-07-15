'use client'

import Icon from '@ant-design/icons/lib/components/Icon'
import { AdminPanel } from '@components/Admin/AdminPanel'
import { PlayersList } from '@components/Players/List'
import { PlayersRoulette } from '@components/Players/Roulette'
import Roulette from '@components/Roulette'
import { Player, usePlayers } from '@modules/hooks/usePlayers'
import { useProbabilities } from '@modules/hooks/useProbabilities'
import CoinIcon from '@public/coin-thumb-up-01.svg'
import { getRandomIndexWithProbabilities } from '@utils/helpers'
import { Button, Card } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import styles from './page.module.css'

export default function HomePage() {
  const roulette = Roulette.useRoulette()

  const [winner, setWinner] = useState<Player>()
  const [target, setTarget] = useState<Player>()

  const [players, setPlayers] = useState<Player[]>([])
  const [exponent, setExponent] = useState<number>(1.5)

  const { getPlayers, getRandomPlayers } = usePlayers()

  const probabilities = useProbabilities(players, exponent)

  const { bank, _bank } = useMemo(() => {
    const bank = players.reduce((acc, { price }) => {
      return (acc += Number(price))
    }, 0)

    return {
      bank,
      _bank: Number((bank * 0.9).toFixed(2))
    }
  }, [players])

  const handleReset = useCallback(() => {
    setTarget(undefined)
    setWinner(undefined)
    setPlayers([])
    roulette.current?.reset()
  }, [roulette])

  const handleSpin = useCallback(() => {
    const index = target
      ? players.findIndex(({ id }) => id === target.id)
      : getRandomIndexWithProbabilities(
          players.map(({ price }) => price),
          exponent
        )

    if (index < 0) {
      return
    }

    roulette.current?.spin(index)
  }, [roulette, target, players, exponent])

  const handleAddRandomPlayers = useCallback(
    (length: number = 10) => {
      roulette.current?.reset()
      setPlayers([...players, ...getRandomPlayers(length)])
    },
    [roulette, players, getRandomPlayers]
  )

  const handleAddPlayers = useCallback(
    (p: Player[]) => {
      roulette.current?.reset()
      setPlayers([...players, ...p])
    },
    [roulette, players]
  )

  return (
    <main className={styles.main}>
      <div className={classNames(styles.block, styles['roulette-block'])}>
        <Card title="Last winner" className={styles.winner}>
          {!!winner && <PlayersList players={[{ ...winner, price: _bank, probability: undefined }]} />}
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
      <div className={classNames(styles.block, styles['admin-block'])}>
        <AdminPanel
          className={styles.admin}
          target={target}
          setTarget={setTarget}
          exponent={exponent}
          setExponent={setExponent}
          handleAddRandomPlayers={handleAddRandomPlayers}
          handleAddPlayers={handleAddPlayers}
          handleReset={handleReset}
        />
      </div>
      <div className={classNames(styles.block, styles['players-block'])}>
        <Card title={`Players - ${players.length}`}>
          <PlayersList
            showFilters
            players={players.map((player) => ({
              ...player,
              probability: probabilities.find(({ id }) => id === player.id)?.value
            }))}
            onClick={(player) => setTarget(player)}
          />
        </Card>
      </div>
    </main>
  )
}
