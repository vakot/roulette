import { useEditPlayerMutation, usePlayerMutation, usePlayerQuery } from '@modules/api/player'
import { IPlayer } from '@modules/models/Player'
import { IRoulette } from '@modules/models/Roulette'
import { Flex, Form, FormProps, Input } from 'antd'
import { useCallback, useEffect } from 'react'

export interface EditFormProps<T>
  extends Omit<FormProps, 'children' | 'layout' | 'onFinish' | 'onFinishFailed' | 'initialValues' | 'requiredMark'> {
  onFinishFailed?: (error: any) => void
  onFinish?: (item: T) => void
}

export interface EditPlayerFormProps extends EditFormProps<IPlayer> {
  player?: IPlayer['_id']
  roulette?: IRoulette['_id']
}

export const EditPlayerForm: React.FC<EditPlayerFormProps> = ({
  form: _form,
  onFinish,
  onFinishFailed,
  player: playerId,
  roulette: rouletteId,
  ...props
}) => {
  const [form] = Form.useForm(_form)

  const { data: player } = usePlayerQuery(playerId, { skip: !playerId })
  const [editPlayer] = useEditPlayerMutation()
  const [addPlayer] = usePlayerMutation()

  const handleFinish = useCallback(
    async (fields: Omit<IPlayer, '_id'>) => {
      try {
        const response = player ? await editPlayer({ ...player, ...fields }) : await addPlayer({ ...fields, roulette: rouletteId })

        if (response.data) {
          onFinish?.(response.data)
        } else if (response.error) {
          onFinishFailed?.(response.error)
        } else {
          onFinishFailed?.('unexpected result')
        }
      } catch (error: any) {
        onFinishFailed?.(error)
      }
    },
    [onFinish, onFinishFailed, editPlayer, addPlayer, player, rouletteId]
  )

  useEffect(() => {
    if (player) {
      form.setFieldsValue(player)
    } else {
      form.resetFields()
    }
  }, [form, player])

  return (
    <Form onFinish={handleFinish} form={form} layout="vertical" {...props}>
      <Form.Item label="Name" style={{ margin: 0 }}>
        <Flex gap={8}>
          <Form.Item name="name" style={{ flex: 1 }}>
            <Input placeholder="Name" />
          </Form.Item>
          {/* <Form.Item name="color">
            <ColorPicker />
          </Form.Item> */}
        </Flex>
      </Form.Item>
      <Form.Item label="Price" name="price" required>
        <Input type="number" placeholder="Price..." />
      </Form.Item>
      {/* <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} placeholder="Description (optional)..." />
      </Form.Item> */}
    </Form>
  )
}
