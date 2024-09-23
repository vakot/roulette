import { QuestionCircleOutlined } from '@ant-design/icons'
import { AdminCard, AdminCardProps } from '@components/Admin/Cards'
import { useDeletePlayerMutation, useEditPlayerMutation, useGetPlayerQuery } from '@modules/api/player'
import { useEditRouletteMutation } from '@modules/api/roulette'
import { Button, Divider, Popconfirm } from 'antd'
import { useCallback } from 'react'

export interface PlayerControlsCardProps extends Omit<AdminCardProps, 'children'> {
  player?: string
  roulette?: string
}

export const PlayerControlsCard: React.FC<PlayerControlsCardProps> = ({ player: playerId, roulette: rouletteId, ...props }) => {
  const { data: player } = useGetPlayerQuery(playerId, { skip: !playerId })

  const [editPlayer] = useEditPlayerMutation()
  const [editRoulette] = useEditRouletteMutation()
  const [deletePlayer] = useDeletePlayerMutation()

  const handleUnregister = useCallback(() => {
    if (player) {
      editRoulette({ ...player.roulette, target: null })
      editPlayer({ ...player, roulette: null })
    }
  }, [player, editPlayer, editRoulette])

  const handleTargetSelect = useCallback(() => {
    if (player) {
      editRoulette({ ...player.roulette, target: player })
    }
  }, [player, editRoulette])

  const handleDelete = useCallback(() => {
    if (player) {
      deletePlayer(player._id)
    }
  }, [player, deletePlayer])

  return (
    <AdminCard title="Controls" {...props}>
      <Button block type="primary" disabled={!player?.roulette} onClick={handleTargetSelect}>
        Make Winner
      </Button>
      <Popconfirm title="Are you sure?" onConfirm={handleUnregister}>
        <Button type="primary" danger block>
          Un-Register
        </Button>
      </Popconfirm>
      <Divider type="horizontal" style={{ marginBlock: 8 }} />
      <Popconfirm
        title="Are you sure? (this action can't be undone)"
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        onConfirm={handleDelete}>
        <Button type="dashed" danger block>
          Delete
        </Button>
      </Popconfirm>
    </AdminCard>
  )
}
