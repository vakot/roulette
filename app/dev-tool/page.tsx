'use client'

import { QuestionCircleOutlined } from '@ant-design/icons'
import { EditPlayerButton } from '@components/Buttons/EditPlayerButton'
import { PlayersList } from '@components/Lists/PlayersList'
import { useAddPlayersMutation, useDeletePlayersMutation, useGetPlayersQuery } from '@modules/api/player'
import { usePlayers } from '@modules/hooks/usePlayers'
import { Button, Popconfirm, Space } from 'antd'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function DevToolPage() {
  const router = useRouter()

  const { data: players } = useGetPlayersQuery()
  const { getRandomPlayers } = usePlayers()

  const [createPlayers] = useAddPlayersMutation()
  const [deletePlayers] = useDeletePlayersMutation()

  const handleCreatePlayers = useCallback(
    (length = 10) => {
      if (process.env.NODE_ENV === 'development') {
        createPlayers(getRandomPlayers(length))
      }
    },
    [createPlayers, getRandomPlayers]
  )

  const handlePlayersDelete = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      deletePlayers(players?.map(({ _id }) => _id))
    }
  }, [players, deletePlayers])

  if (process.env.NODE_ENV !== 'development') {
    router.push('/')
    return null
  }

  return (
    <main>
      <Space direction="vertical" style={{ width: '100%' }}>
        <h1>Last donators</h1>
        <PlayersList players={players} />
        <Button type="primary" block onClick={() => handleCreatePlayers(1)}>
          Add 1 random player
        </Button>
        <Button type="primary" block onClick={() => handleCreatePlayers(10)}>
          Add 10 random players
        </Button>
        <EditPlayerButton block>Add custom player</EditPlayerButton>
        <Popconfirm
          title="Delete ALL players"
          description="Are you sure to delete all players?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={handlePlayersDelete}>
          <Button type="primary" danger block>
            Clear
          </Button>
        </Popconfirm>
      </Space>
    </main>
  )
}
