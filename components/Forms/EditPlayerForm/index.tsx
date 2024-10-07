import { PlayerControlsCard } from '@components/Admin/Cards/PlayerControls'
import type { EditFormProps } from '@components/Forms/types'
import { RouletteSelector } from '@components/Selectors/RouletteSelector'
import { useAddPlayerMutation, useEditPlayerMutation, useGetPlayerQuery } from '@modules/api/player'
import { useAdminPathname } from '@modules/hooks/useAdminPathname'
import type { IPlayer } from '@modules/models/Player'
import type { IRoulette } from '@modules/models/Roulette'
import { Flex, Form, Input } from 'antd'
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

  const { data: player } = useGetPlayerQuery(playerId, { skip: !playerId })
  const [editPlayer] = useEditPlayerMutation()
  const [addPlayer] = useAddPlayerMutation()

  const { t } = useTranslation()

  const isAdminPage = useAdminPathname()

  const handleFinish = useCallback(
    async (fields: Omit<IPlayer, '_id'>) => {
      console.log(fields)

      try {
        const response = player ? await editPlayer({ ...player, ...fields }) : await addPlayer(fields)

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
    <Form
      onFinish={handleFinish}
      form={form}
      layout="vertical"
      initialValues={{
        roulette: rouletteId,
      }}
      {...props}
    >
      <Form.Item label={t('Name')}>
        <Flex gap={8}>
          <Form.Item name="name" style={{ flex: 1, margin: 0 }}>
            <Input placeholder={t('Name')} />
          </Form.Item>
          {/* <Form.Item name="color" style={{ margin: 0 }}>
            <ColorPicker />
          </Form.Item> */}
        </Flex>
      </Form.Item>
      <Form.Item label={t('Price')} name="price" required>
        <Input type="number" placeholder={t('Price')} />
      </Form.Item>
      <Form.Item label={t('Message')} name="message">
        <Input.TextArea rows={3} placeholder={t('Message-Optional')} />
      </Form.Item>
      <Form.Item label={t('Roulette')} name="roulette">
        <RouletteSelector disabled={!!rouletteId} />
      </Form.Item>
      {isAdminPage && <EditPlayerFormControlsItem form={form} player={playerId} />}
    </Form>
  )
}

const EditPlayerFormControlsItem: React.FC<EditPlayerFormProps> = ({ form: _form, player: playerId }) => {
  const [form] = Form.useForm(_form)

  const rouletteId = Form.useWatch('roulette', form)

  return (
    <Form.Item>
      <PlayerControlsCard size="small" player={playerId} roulette={rouletteId} />
    </Form.Item>
  )
}
