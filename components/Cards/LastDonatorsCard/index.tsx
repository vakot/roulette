import { LastDonatorsList } from '@components/Lists/LastDonatorsList'
import { useEditPlayersMutation, useGetPlayersQuery } from '@modules/api/player'
import { useGetRouletteQuery } from '@modules/api/roulette'
import { IRoulette } from '@modules/models/Roulette'
import { Button, Card, CardProps, Flex } from 'antd'
import { useCallback } from 'react'

export interface LastDonatorsCardProps extends CardProps {
  roulette?: IRoulette['_id']
  editable?: boolean
}

export const LastDonatorsCard: React.FC<LastDonatorsCardProps> = ({ roulette: rouletteId, editable }) => {
  const { data: lastDonators } = useGetPlayersQuery({ roulette: 'none' })
  const { data: roulette } = useGetRouletteQuery(rouletteId, { skip: !rouletteId })

  const [editPlayers] = useEditPlayersMutation()

  const handleRegisterAll = useCallback(() => {
    if (lastDonators?.length) {
      editPlayers(lastDonators.map((player) => ({ ...player, roulette: roulette?._id })))
    }
  }, [lastDonators, editPlayers, roulette])

  return (
    <Card
      title={
        <Flex gap={8} align="center" justify="space-between">
          <span>Last donators</span>
          {editable && (
            <Button type="primary" onClick={handleRegisterAll}>
              Register all
            </Button>
          )}
        </Flex>
      }>
      <LastDonatorsList roulette={rouletteId} editable={editable} />
    </Card>
  )
}
