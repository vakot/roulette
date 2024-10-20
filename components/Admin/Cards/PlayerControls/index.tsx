import { QuestionCircleOutlined } from '@ant-design/icons'
import { AdminCard, AdminCardProps } from '@components/Admin/Cards'
import {
  useDeletePlayerMutation,
  useEditPlayerMutation,
  useGetPlayerQuery,
} from '@modules/api/player'
import { useEditRouletteMutation } from '@modules/api/roulette'
import { Button, Divider, Popconfirm } from 'antd'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export interface PlayerControlsCardProps
  extends Omit<AdminCardProps, 'children'> {
  player?: string
  roulette?: string
}

export const PlayerControlsCard: React.FC<PlayerControlsCardProps> = ({
  player: playerId,
  roulette: rouletteId,
  ...props
}) => {
  const { data: player } = useGetPlayerQuery(playerId, { skip: !playerId })

  const { t } = useTranslation()

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
    <AdminCard title={t('controls')} {...props}>
      <Button
        block
        type="primary"
        disabled={!player?.roulette}
        onClick={handleTargetSelect}>
        {t('make-winner')}
      </Button>
      <Popconfirm
        title={t('Are you sure?')}
        onConfirm={handleUnregister}
        cancelText={t('Cancel')}>
        <Button type="primary" danger block>
          {t('Un-Register')}
        </Button>
      </Popconfirm>
      <Divider type="horizontal" style={{ marginBlock: 8 }} />
      <Popconfirm
        title={t('confirm')}
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        onConfirm={handleDelete}
        cancelText={t('Cancel')}>
        <Button type="dashed" danger block>
          {t('Delete')}
        </Button>
      </Popconfirm>
    </AdminCard>
  )
}
