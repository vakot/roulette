'use client'

import { PlayersList } from '@components/PlayersList'
import Roulette from '@components/Roulette'
import { Player, usePlayers } from '@modules/hooks/usePlayers'
import { getRandomIndexWithProbabilities } from '@utils/helpers'
import { Badge, Button, Card } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import styles from './page.module.css'

export default function HomePage() {
  const roulette = Roulette.useRoulette()

  const [winner, setWinner] = useState<Player>()
  const [target, setTarget] = useState<Player>()

  // const players = useRandomPlayers(25)
  const players = usePlayers()
  // const probabilities = useProbabilities(players)

  const bank = useMemo(() => {
    return players.reduce((acc, { price }) => {
      return (acc += price)
    }, 0)
  }, [players])

  const handleSpin = useCallback(() => {
    setWinner(undefined)

    const index = target
      ? players.findIndex(({ id }) => id === target.id)
      : getRandomIndexWithProbabilities(players.map(({ price }) => price))

    if (index < 0) {
      return
    }

    roulette.current?.spin(index)
  }, [roulette, target, players])

  return (
    <main className={styles.main}>
      <div className={styles.column}>
        {!!winner && (
          <Card title="Congratulations!" className={styles.winner}>
            <Badge.Ribbon text="Winner">
              <PlayersList players={[winner]} />
            </Badge.Ribbon>
          </Card>
        )}
        <Card title="Total bank" className={styles.bank}>
          {(bank * 0.9).toFixed(2)}$
        </Card>
        <Card className={styles.roulette}>
          <Roulette
            className={styles.roulette}
            roulette={roulette}
            items={players}
            render={(player) => (
              <div
                style={{
                  width: Math.min(Math.max(player.price / 5, 50), 250),
                  height: '100%',
                  backgroundColor: player.color
                }}
              />
            )}
            duration={players.length * 500}
            fakes={Math.max(players.length / 2, 5)}
            onFinish={(player) => setWinner(player)}
          />
        </Card>
        <Button type="primary" block className={styles.button} onClick={handleSpin}>
          Spin
        </Button>
      </div>
      <div className={styles.column}>
        <Card title="Admin panel" className={styles.admin}>
          {!!target && (
            <Badge.Ribbon text="Next winner">
              <PlayersList players={[target]} />
              <Button type="primary" danger block onClick={() => setTarget(undefined)}>
                Clear
              </Button>
            </Badge.Ribbon>
          )}
        </Card>
        <Card title="Players" className={styles.players}>
          <p>*TODO: search by name*</p>
          <p>*TODO: filter by price*</p>
          <p>*TODO: sort by price acs or desc*</p>
          <PlayersList players={players.sort(({ price: a }, { price: b }) => b - a)} onClick={(player) => setTarget(player)} />
        </Card>
      </div>
    </main>
  )
}
