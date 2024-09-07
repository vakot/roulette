import { useAddRouletteMutation, useGetRoulettesQuery } from '@modules/api/roulette'
import { Button, Card, CardProps, Flex, List } from 'antd'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export interface RoulettesCardProps extends CardProps {
  editable?: boolean
}

export const RoulettesCard: React.FC<RoulettesCardProps> = ({ editable }) => {
  const router = useRouter()

  const { data: roulettes } = useGetRoulettesQuery()

  const [createRoulette] = useAddRouletteMutation()

  const handleCreateRoulette = useCallback(() => {
    createRoulette({})
  }, [createRoulette])

  return (
    <Card
      title={
        <Flex gap={8} align="center" justify="space-between">
          <span>Roulettes</span>
        </Flex>
      }>
      {/* TODO: to sidebar navigation */}
      <List
        dataSource={roulettes}
        renderItem={(roulette) => (
          <List.Item onClick={() => router.push(`/${roulette._id}`)}>
            <Button block style={{ textAlign: 'left' }}>
              {roulette._id}
            </Button>
          </List.Item>
        )}
      />
      {editable && (
        <Button type="primary" block onClick={handleCreateRoulette}>
          Start NEW roulette
        </Button>
      )}
    </Card>
  )
}
