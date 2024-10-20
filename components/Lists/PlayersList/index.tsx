import { TrophyFilled } from '@ant-design/icons'
import { EditPlayerButton } from '@components/Buttons/EditPlayerButton'
import { BasePlayersList } from '@components/Lists/BasePlayersList'
import { useGetPlayersQuery } from '@modules/api/player'
import { useEditRouletteMutation } from '@modules/api/roulette'
import { useAdminPathname } from '@modules/hooks/useAdminPathname'
import { IPlayer } from '@modules/models/Player'
import { IRoulette } from '@modules/models/Roulette'
import { getProbabilities } from '@utils/helpers'
import { Button, Flex, message, Modal, Spin, Typography } from 'antd'
import { useCallback } from 'react'

export interface PlayersListProps {
  roulette?: IRoulette['_id']
}

export const PlayersList: React.FC<PlayersListProps> = ({ roulette: rouletteId }) => {
  const isAdminPage = useAdminPathname()

  const { data: players, isFetching: isPlayersLoading } = useGetPlayersQuery({ roulette: rouletteId }, { skip: !rouletteId })

  const [editRoulette] = useEditRouletteMutation()

  const probabilities = getProbabilities(players?.map(({ price }) => price ?? 0) ?? [])

  const handleTargetClick = useCallback(
    (player: IPlayer) => {
      if (!isAdminPage || !rouletteId) {
        return
      }

      Modal.confirm({
        type: 'warn',
        title: 'Are you sure you want to set this player as a target?',
        content: 'Selected player will 100% win the next roulette',
        onOk: () => {
          editRoulette({ _id: rouletteId, target: player })
            .then(() =>
              message.success(
                <Typography.Text>
                  Player <Typography.Text strong>{player.name}</Typography.Text> set as a target
                </Typography.Text>
              )
            )
            .catch(() =>
              message.error(
                <Typography.Text>
                  Failed to set player <Typography.Text strong>{player.name}</Typography.Text> as a target
                </Typography.Text>
              )
            )
        }
      })
    },
    [isAdminPage]
  )

  return (
    <Spin spinning={isPlayersLoading}>
      <BasePlayersList
        players={players?.map((player, index) => ({ ...player, probability: probabilities[index] }))}
        controls={(player) => (
          <Flex gap={8}>
            <EditPlayerButton player={player._id} roulette={rouletteId} type="primary" />
            {isAdminPage && <Button icon={<TrophyFilled />} type="primary" danger onClick={() => handleTargetClick(player)} />}
          </Flex>
        )}
      />
    </Spin>
  )
}
