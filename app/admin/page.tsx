'use client'

import { AdminCard } from '@components/Admin/AdminCard'
import { PlayersList } from '@components/Players/List'
import { usePlayersMutation, useTargetMutation } from '@modules/api/player/player.api'
import { Player, usePlayers } from '@modules/hooks/usePlayers'
import useSocket from '@modules/hooks/useSocket'
import { useAppDispatch, useAppSelector } from '@modules/store/hooks'
import { addPlayers } from '@modules/store/slices/players'
import { Button, Card } from 'antd'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import styles from './page.module.css'

export default function HomePage() {
  const dispatch = useAppDispatch()

  const players = useAppSelector(({ players }) => players)

  const [setSocketTarget] = useTargetMutation()
  const [setSocketPlayers] = usePlayersMutation()

  const { getPlayers, getRandomPlayers } = usePlayers()

  const [target, setTarget] = useState<Player>()

  const handleAddRandomPlayers = useCallback(
    (length: number = 10) => {
      setSocketPlayers(getRandomPlayers(length))
    },
    [setSocketPlayers, getRandomPlayers]
  )

  useSocket<{ id: Player['id'] }>('set-target', ({ id }) => {
    setTarget(players.find((player) => player.id === id))
  })
  useSocket<{ players: Player[] }>('set-players', ({ players: _players }) => {
    dispatch(addPlayers(getPlayers(_players)))
  })

  return (
    <main className={styles.main}>
      <div className={classNames(styles.block, styles['admin-block'])}>
        <AdminCard title="Admin panel" hideBadge>
          <AdminCard title="Add players" size="small">
            {/* <EditPlayerButton type="primary" block icon={<EditFilled />} onFinish={(player) => handleAddPlayer(player)}>
              Add custom player
            </EditPlayerButton> */}
            <Button type="primary" ghost block onClick={() => handleAddRandomPlayers(10)}>
              Add 10 random players
            </Button>
            <Button type="primary" ghost block onClick={() => handleAddRandomPlayers(25)}>
              Add 25 random players
            </Button>
            <Button type="primary" ghost block onClick={() => handleAddRandomPlayers(50)}>
              Add 50 random players
            </Button>
          </AdminCard>
          <AdminCard title="Next winner" size="small">
            {!!target && <PlayersList players={[{ ...target, probability: undefined }]} />}
            <Button type="primary" danger block disabled={!target} onClick={() => setSocketTarget('')}>
              Clear
            </Button>
          </AdminCard>
        </AdminCard>
      </div>
      <div className={classNames(styles.block, styles['players-block'])}>
        <Card title={`Players - ${players.length}`}>
          <PlayersList showFilters players={players} onClick={(player) => setSocketTarget(player.id)} />
        </Card>
      </div>
    </main>
  )
}
