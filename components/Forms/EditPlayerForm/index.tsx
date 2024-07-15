import { Player } from '@modules/hooks/usePlayers'
import { getRandomColor } from '@utils/helpers'
import { ColorPicker, Flex, Form, FormProps, Input } from 'antd'
import { useCallback, useEffect } from 'react'
import { v1 as uuidv1 } from 'uuid'

export interface EditFormProps<T>
  extends Omit<FormProps, 'children' | 'layout' | 'onFinish' | 'onFinishFailed' | 'initialValues' | 'requiredMark'> {
  onFinishFailed?: (error: any) => void
  onFinish?: (item: T) => void
}

export interface EditPlayerFormProps extends EditFormProps<Player> {
  player?: Player
}

export const EditPlayerForm: React.FC<EditPlayerFormProps> = ({ form: _form, onFinish, onFinishFailed, player, ...props }) => {
  const [form] = Form.useForm(_form)

  const handleFinish = useCallback(
    async (fields: Omit<Player, 'id'>) => {
      try {
        onFinish?.({ ...fields, id: uuidv1(), color: fields.color || getRandomColor(), name: fields.name || 'anonim' })
      } catch (error: any) {
        onFinishFailed?.(error)
      }
    },
    [onFinish, onFinishFailed]
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
          <Form.Item name="color">
            <ColorPicker />
          </Form.Item>
        </Flex>
      </Form.Item>
      <Form.Item label="Price" name="price" required>
        <Input type="number" placeholder="Price..." />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} placeholder="Description (optional)..." />
      </Form.Item>
    </Form>
  )
}
