import { EditPlayerForm } from '@components/Forms/EditPlayerForm'
import { IPlayer } from '@modules/models/Player'
import { IRoulette } from '@modules/models/Roulette'
import { Form, Modal, ModalProps } from 'antd'
import { useCallback } from 'react'

export interface EditModalProps<T = unknown> extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  onOk?: () => void
  onCancel?: () => void
  onFinish?: (player: T) => void
}

export interface EditPlayerModalProps extends EditModalProps<IPlayer> {
  player?: IPlayer['_id']
  roulette?: IRoulette['_id']
}

export const EditPlayerModal: React.FC<EditPlayerModalProps> = ({
  player,
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
    <Modal onOk={handleOk} onCancel={handleCancel} destroyOnClose={destroyOnClose} title="Edit player modal" {...props}>
      <EditPlayerForm form={form} player={player} roulette={rouletteId} onFinish={handleFinish} />
    </Modal>
  )
}
