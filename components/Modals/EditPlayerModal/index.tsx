import { EditPlayerForm } from '@components/Forms/EditPlayerForm'
import { Player } from '@modules/hooks/usePlayers'
import { Form, Modal, ModalProps } from 'antd'
import { useCallback, useState } from 'react'

export interface EditModalProps<T = unknown> extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  onOk?: () => void
  onCancel?: () => void
  onFinish?: (player: T) => void
}

export interface EditPlayerModalProps extends EditModalProps<Player> {
  player?: Player
}

export const EditPlayerModal: React.FC<EditPlayerModalProps> = ({
  player,
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
  const [changed, setChanged] = useState<boolean>(false)

  const handleOkSubmit = useCallback(() => {
    form.submit()
  }, [form])

  const handleCancelSubmit = useCallback(() => {
    if (onCancel) onCancel()
    setChanged(false)
    form.resetFields()
  }, [form, onCancel])

  const handleOk = handleOkSubmit

  const handleCancel = handleCancelSubmit

  const handleFinish = useCallback(
    (player: Player) => {
      onFinish?.(player)
      setChanged(false)
      if (onOk) onOk()
    },
    [onOk, onFinish]
  )

  const handleChange = useCallback(() => {
    setChanged(true)
  }, [])

  return (
    <Modal onOk={handleOk} onCancel={handleCancel} destroyOnClose={destroyOnClose} title="Edit player modal" {...props}>
      <EditPlayerForm form={form} player={player} onChange={handleChange} onFinish={handleFinish} />
    </Modal>
  )
}
