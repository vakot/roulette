import { EditPlayerForm } from '@components/Forms/EditPlayerForm'
import type { EditModalProps } from '@components/Modals/types'
import type { IPlayer } from '@modules/models/Player'
import type { IRoulette } from '@modules/models/Roulette'
import { Form, Modal } from 'antd'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export interface EditPlayerModalProps extends EditModalProps<IPlayer> {
  player?: IPlayer['_id']
  players?: IPlayer['_id'][]
  roulette?: IRoulette['_id']
}

export const EditPlayerModal: React.FC<EditPlayerModalProps> = ({
  player,
  players,
  roulette: rouletteId,
  onOk,
  onCancel,
  onFinish,
  destroyOnClose = true,
  title,
  okButtonProps,
  cancelText,
  ...props
}) => {
  const [form] = Form.useForm()

  const { t } = useTranslation()

  const handleOk = useCallback(() => {
    form.submit()
  }, [form])

  const handleCancel = useCallback(() => {
    form.resetFields()
    onCancel?.()
  }, [form, onCancel])

  const handleFinish = useCallback(
    (player: IPlayer) => {
      onFinish?.(player)
      onOk?.()
    },
    [onOk, onFinish]
  )

  return (
    <Modal
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText={t('Cancel')}
      destroyOnClose={destroyOnClose}
      title={t('Edit player modal')}
      {...props}>
      <EditPlayerForm
        form={form}
        player={player}
        roulette={rouletteId}
        onFinish={handleFinish}
      />
    </Modal>
  )
}
