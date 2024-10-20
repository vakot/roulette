import { CloseOutlined } from '@ant-design/icons'
import type { EditFormProps } from '@components/Forms/types'
import { RouletteSelector } from '@components/Selectors/RouletteSelector'
import { ColorPickerFormItem } from '@components/UI/ColorPicker'
import {
  useAddPlayerMutation,
  useEditPlayerMutation,
  useGetPlayerQuery,
} from '@modules/api/player'
import type { IPlayer } from '@modules/models/Player'
import type { IRoulette } from '@modules/models/Roulette'
import { Button, Flex, Form, Input, Spin } from 'antd'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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

  const { data: player, isLoading: isPlayerLoading } = useGetPlayerQuery(
    playerId,
    { skip: !playerId }
  )
  const [editPlayer] = useEditPlayerMutation()
  const [addPlayer] = useAddPlayerMutation()

  const handleFinish = useCallback(
    async (fields: Omit<IPlayer, '_id'>) => {
      try {
        const response = player
          ? await editPlayer({ ...player, ...fields })
          : await addPlayer(fields)

        if (response.error) {
          onFinishFailed?.(response.error)
        } else {
          onFinish?.(response.data)
        }
      } catch (error: any) {
        onFinishFailed?.(error)
      }
    },
    [onFinish, onFinishFailed, editPlayer, addPlayer, player]
  )

  useEffect(() => {
    if (player) {
      form.setFieldsValue({ ...player, roulette: player.roulette?._id })
    } else {
      form.resetFields()
    }
  }, [form, player, rouletteId])

  return (
    <Spin spinning={isPlayerLoading}>
      <Form
        onFinish={handleFinish}
        form={form}
        layout="vertical"
        initialValues={{
          roulette: rouletteId,
        }}
        {...props}>
        <FormNameColorItem form={form} player={playerId} />
        <FormPriceItem form={form} player={playerId} />
        <FormMessageItem form={form} player={playerId} />
        <FormRouletteItem form={form} player={playerId} />
      </Form>
    </Spin>
  )
}

const FormNameColorItem: React.FC<EditPlayerFormProps> = ({
  form: _form,
  player: playerId,
  disabled = false,
}) => {
  const { t } = useTranslation()

  return (
    <Form.Item label={t('Name')}>
      <Flex gap={8}>
        <Form.Item name="name" style={{ flex: 1, margin: 0 }}>
          <Input placeholder={t('Name')} />
        </Form.Item>
        <ColorPickerFormItem name="color" />
      </Flex>
    </Form.Item>
  )
}

const FormPriceItem: React.FC<EditPlayerFormProps> = ({
  form: _form,
  player: playerId,
  disabled = false,
}) => {
  const { t } = useTranslation()

  return (
    <Form.Item label={t('Price')} name="price" required>
      <Input type="number" placeholder={t('Price')} />
    </Form.Item>
  )
}

const FormMessageItem: React.FC<EditPlayerFormProps> = ({
  form: _form,
  player: playerId,
  disabled = false,
}) => {
  const { t } = useTranslation()

  return (
    <Form.Item label={t('Message')} name="message">
      <Input.TextArea rows={3} placeholder={t('Message-Optional')} />
    </Form.Item>
  )
}

const FormRouletteItem: React.FC<EditPlayerFormProps> = ({
  form: _form,
  player: playerId,
  disabled = false,
}) => {
  const [form] = Form.useForm(_form)

  const { t } = useTranslation()

  const rouletteId = Form.useWatch('roulette', form)

  const handleClear = useCallback(() => {
    if (rouletteId) {
      form.setFieldValue('roulette', null)
    }
  }, [form, rouletteId])

  return (
    <Form.Item label={t('Roulette')}>
      <Flex gap={8}>
        <Form.Item name="roulette" noStyle>
          <RouletteSelector disabled={disabled} />
        </Form.Item>
        <Button
          icon={<CloseOutlined />}
          type="primary"
          danger
          style={{ aspectRatio: 1 }}
          onClick={handleClear}
          disabled={disabled || !rouletteId}
        />
      </Flex>
    </Form.Item>
  )
}
