import { CloseOutlined } from '@ant-design/icons'
import { EditPlayerForm } from '@components/Forms/EditPlayerForm'
import type { EditModalProps } from '@components/Modals/types'
import { DonatorSelector } from '@components/Selectors/DonatorSelector'
import { useEditPlayerMutation, useGetPlayersQuery } from '@modules/api/player'
import { useGetRouletteQuery } from '@modules/api/roulette'
import type { IPlayer } from '@modules/models/Player'
import type { IRoulette } from '@modules/models/Roulette'
import { Button, Divider, Flex, Form, message, Modal, Spin } from 'antd'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface AddPlayerModalProps extends EditModalProps<IPlayer> {
  roulette?: IRoulette['_id']
}

export const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
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

  const [donator, setDonator] = useState<IPlayer | null>(null)

  const { data: donators, isLoading: isDonatorsLoading } = useGetPlayersQuery({ roulette: 'none' })
  const { data: roulette, isLoading: isRouletteLoading } = useGetRouletteQuery(rouletteId, { skip: !rouletteId })

  const [editDonator, { isLoading: isEditDonatorLoading }] = useEditPlayerMutation()

  const { t } = useTranslation()

  const handleOk = useCallback(() => {
    if (donator && roulette) {
      editDonator({ ...donator, roulette: roulette._id })
        .then(({ data: donator }) => {
          setDonator(null)
          if (!donator) {
            throw new Error('Failed to donator as a player')
          }
          onFinish?.(donator)
          onOk?.()
        })
        .catch(() => message.error(t('Failed to donator as a player')))
    } else {
      form.submit()
    }
  }, [form, donator, roulette, editDonator, t])

  const handleSelect = useCallback(
    (value: IPlayer['_id']) => {
      setDonator(donators?.find(({ _id }) => _id === value) ?? null)
    },
    [donators]
  )

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
      title={t('Add player modal')}
      okButtonProps={{ disabled: isRouletteLoading || isDonatorsLoading || isEditDonatorLoading }}
      {...props}>
      <Spin spinning={isRouletteLoading || isDonatorsLoading || isEditDonatorLoading}>
        <Flex gap={8}>
          <DonatorSelector value={donator?._id} onChange={handleSelect} style={{ flex: 1 }} />
          <Button icon={<CloseOutlined />} type="primary" danger style={{ aspectRatio: 1 }} onClick={() => setDonator(null)} />
        </Flex>
        <Divider>or</Divider>
        <EditPlayerForm
          form={form}
          roulette={rouletteId}
          onFinish={handleFinish}
          disabled={!!donator || isRouletteLoading || isDonatorsLoading || isEditDonatorLoading}
        />
      </Spin>
    </Modal>
  )
}
