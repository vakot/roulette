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
  // const [changed, setChanged] = useState<boolean>(false)

  const handleOk = useCallback(() => {
    form.submit()
  }, [form])

  const handleCancel = useCallback(() => {
    console.log('handleCancel')

    form.resetFields()
    // setChanged(false)
    onCancel?.()
  }, [form, onCancel])

  const handleFinish = useCallback(
    (player: IPlayer) => {
      console.log('handleFinish')

      onFinish?.(player)
      // setChanged(false)
      onOk?.()
    },
    [onOk, onFinish]
  )

  // const handleChange = useCallback(() => {
  //   setChanged(true)
  // }, [])

  return (
    <Modal onOk={handleOk} onCancel={handleCancel} destroyOnClose={destroyOnClose} title="Edit player modal" {...props}>
      <EditPlayerForm
        form={form}
        player={player}
        roulette={rouletteId}
        // onChange={handleChange}
        onFinish={handleFinish}
      />
    </Modal>
  )
}
