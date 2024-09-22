import { QuestionCircleOutlined } from '@ant-design/icons'
import { useDeletePlayerMutation, useEditPlayerMutation, useGetPlayerQuery } from '@modules/api/player'
import { useEditRouletteMutation } from '@modules/api/roulette'
import { useAdminPathname } from '@modules/hooks/useAdminPathname'
import { IPlayer } from '@modules/models/Player'
import { Button, Popconfirm, Popover, PopoverProps, Space } from 'antd'
import { useCallback } from 'react'

export interface EditPopoverProps<T = unknown> extends Omit<PopoverProps, 'content'> {}

export interface EditPlayerPopoverProps extends EditPopoverProps<IPlayer> {
  player?: IPlayer['_id']
}

export const EditPlayerPopover: React.FC<EditPlayerPopoverProps> = ({ player: playerId, ...rest }) => {
  const { data: player } = useGetPlayerQuery(playerId, { skip: !playerId })

  const [editPlayer] = useEditPlayerMutation()
  const [editRoulette] = useEditRouletteMutation()
  const [deletePlayer] = useDeletePlayerMutation()

  const isAdminPage = useAdminPathname()

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
    <Popover
      trigger={['click']}
      content={
        isAdminPage && (
          <Space direction="vertical">
            <Button block type="primary" disabled={!player?.roulette} onClick={handleTargetSelect}>
              Make Winner
            </Button>
            <Button block type="primary" danger disabled={!player?.roulette} onClick={handleUnregister}>
              Unregister
            </Button>
            <Popconfirm
              title="Delete player?"
              description="Player will be deleted from database. This action can't be undone"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={handleDelete}>
              <Button block type="dashed" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        )
      }
      {...rest}
    />
  )
}
