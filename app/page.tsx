'use client'

import { PlayersRoulette } from '@components/Players'
import { PlayersList } from '@components/Players/List'
import Roulette from '@components/Roulette'
import { Player, usePlayers } from '@modules/hooks/usePlayers'
import { useProbabilities } from '@modules/hooks/useProbabilities'
import { getRandomIndexWithProbabilities } from '@utils/helpers'
import { Badge, Button, Card, Input, Space, Tooltip } from 'antd'
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
            <Badge.Ribbon text="Winner">
              <PlayersList players={[{ ...winner, probability: undefined }]} />
            </Badge.Ribbon>
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
        <Button type="primary" block ghost className={styles.button} onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className={styles.column}>
        <Card title="Admin panel" className={styles.admin}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="primary" block onClick={() => handleAddRandomPlayers(10)}>
              Add 10 random players
            </Button>
            <Button type="primary" block onClick={() => handleAddRandomPlayers(25)}>
              Add 25 random players
            </Button>
            <Button type="primary" block onClick={() => handleAddRandomPlayers(50)}>
              Add 50 random players
            </Button>
            {!!target && (
              <Badge.Ribbon text="Next winner">
                <PlayersList players={[{ ...target, probability: undefined }]} />
                <Button type="primary" danger block onClick={() => setTarget(undefined)}>
                  Clear
                </Button>
              </Badge.Ribbon>
            )}
            <Tooltip
              title={
                <ul>
                  <li>{'>0 - higher chance to top'}</li>
                  <li>{'0 - equal chance for all'}</li>
                  <li>{'<0 - higher chance to bottom'}</li>
                </ul>
              }>
              <Input
                prefix="Exponent:"
                type="number"
                placeholder="modifier"
                value={exponent}
                onChange={(e) => setExponent(Number(e.target.value))}
              />
            </Tooltip>
          </Space>
        </Card>
        <Card title={`Players - ${players.length}`} className={styles.players}>
          <p>*TODO: search by name*</p>
          <p>*TODO: filter by price*</p>
          <p>*TODO: sort by price acs or desc*</p>
          <PlayersList
            players={[...players]
              .sort(({ price: a }, { price: b }) => b - a)
              .map((player) => ({
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
