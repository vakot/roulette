'use client'

import { AdminPanel } from '@components/Admin/AdminPanel'
import { PlayersList } from '@components/Players/List'
import { PlayersRoulette } from '@components/Players/Roulette'
import Roulette from '@components/Roulette'
import { Player, usePlayers } from '@modules/hooks/usePlayers'
import { useProbabilities } from '@modules/hooks/useProbabilities'
import { getRandomIndexWithProbabilities } from '@utils/helpers'
import { Button, Card } from 'antd'
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

  const bank = useMemo(() => {
    return players.reduce((acc, { price }) => {
      return (acc += price)
    }, 0)
  }, [players])

  const handleReset = useCallback(() => {
    setTarget(undefined)
    setWinner(undefined)
    setPlayers([])
    roulette.current?.reset()
  }, [roulette])

  const handleSpin = useCallback(() => {
    setWinner(undefined)

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

  return (
    <main className={styles.main}>
      <div className={styles.column}>
        {!!winner && (
          <Card title="Congratulations!" className={styles.winner}>
            <PlayersList players={[{ ...winner, probability: undefined }]} />
          </Card>
        )}
        <Card title="Total bank" className={styles.bank}>
          {(bank * 0.9).toFixed(2)}$
        </Card>
        <Card className={styles.roulette}>
          <PlayersRoulette className={styles.roulette} roulette={roulette} items={players} onFinish={(player) => setWinner(player)} />
        </Card>
        <Button type="primary" block className={styles.button} onClick={handleSpin}>
          Spin
        </Button>
        {/* <Button type="primary" block ghost className={styles.button} onClick={() => roulette.current?.reset()}>
          Reset
        </Button> */}
      </div>
      <div className={styles.column}>
        <div className={styles.admin}>
          <AdminPanel
            target={target}
            setTarget={setTarget}
            exponent={exponent}
            setExponent={setExponent}
            handleAddRandomPlayers={handleAddRandomPlayers}
            handleReset={handleReset}
          />
        </div>
        <Card title={`Players - ${players.length}`} className={styles.players}>
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
