'use client'

import { usePlayersQuery } from '@modules/api/player'
import { useRouletteMutation, useRoulettesQuery } from '@modules/api/roulette'
import { Button, List, Space } from 'antd'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function RoulettesPage() {
  const router = useRouter()

  const { data: players } = usePlayersQuery()
  const { data: roulettes } = useRoulettesQuery()

  const [createRoulette] = useRouletteMutation()

  const handleCreateRoulette = useCallback(() => {
    createRoulette({})
  }, [createRoulette])

  return (
    <main>
      <Space direction="vertical">
        <h1>Roulette</h1>
        <List
          dataSource={roulettes}
          renderItem={(roulette) => <List.Item onClick={() => router.push(`/roulette/${roulette._id}`)}>{roulette._id}</List.Item>}
        />
        <Button type="primary" block onClick={handleCreateRoulette}>
          Start NEW roulette
        </Button>
      </Space>
    </main>
  )
}
