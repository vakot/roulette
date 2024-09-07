import { PlayersListItemMeta } from '@components/Lists/PlayersList'
import { useEditPlayerMutation, useEditPlayersMutation, useGetPlayersQuery } from '@modules/api/player'
import { useGetRouletteQuery } from '@modules/api/roulette'
import { IPlayer } from '@modules/models/Player'
import { IRoulette } from '@modules/models/Roulette'
import { Button, Card, CardProps, Flex, List } from 'antd'
import { useCallback } from 'react'

export interface LastDonatorsCardProps extends CardProps {
  roulette?: IRoulette['_id']
  editable?: boolean
}

export const LastDonatorsCard: React.FC<LastDonatorsCardProps> = ({ roulette: rouletteId, editable }) => {
  const { data: lastDonators } = useGetPlayersQuery({ roulette: 'none' })
  const { data: roulette } = useGetRouletteQuery(rouletteId, { skip: !rouletteId })

  const [editPlayer] = useEditPlayerMutation()
  const [editPlayers] = useEditPlayersMutation()

  const handleRegister = useCallback(
    (donator: IPlayer) => {
      editPlayer({ ...donator, roulette: roulette?._id })
    },
    [editPlayer, roulette]
  )

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
      <List
        itemLayout="horizontal"
        dataSource={lastDonators}
        renderItem={(player) => (
          <List.Item>
            <PlayersListItemMeta player={player} />
            {editable && (
              <Button type="primary" onClick={() => handleRegister(player)}>
                Register
              </Button>
            )}
          </List.Item>
        )}
      />
    </Card>
  )
}
