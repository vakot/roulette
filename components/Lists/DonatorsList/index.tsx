import { PlusOutlined } from '@ant-design/icons'
import {
  BasePlayersList,
  BasePlayersListItemMeta,
} from '@components/Lists/BasePlayersList'
import { useEditPlayerMutation, useGetPlayersQuery } from '@modules/api/player'
import { IDonator } from '@modules/models/IDonator'
import { IPlayer } from '@modules/models/Player'
import { Button, List, message, Modal, Spin, Typography } from 'antd'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export interface DonatorsListProps {
  roulette?: string
}

export const DontatorsList: React.FC<DonatorsListProps> = ({
  roulette: rouletteId,
}) => {
  const { data: donators, isFetching: isDonatorsLoading } = useGetPlayersQuery({
    roulette: 'none',
  })
  const [editDonator, { isLoading: isEditDonatorLoading }] =
    useEditPlayerMutation()

  const handleRegister = useCallback(
    (donator: IPlayer) => {
      editDonator({ ...donator, roulette: rouletteId })
        .then(() =>
          message.success(
            <Typography.Text>
              Donator <Typography.Text strong>{donator.name}</Typography.Text>{' '}
              registered as new player
            </Typography.Text>
          )
        )
        .catch(() =>
          message.error(
            <Typography.Text>
              Failed to register{' '}
              <Typography.Text strong>{donator.name}</Typography.Text> as a
              player
            </Typography.Text>
          )
        )
    },
    [rouletteId, editDonator]
  )

  return (
    <Spin spinning={isDonatorsLoading || isEditDonatorLoading}>
      <BasePlayersList
        players={donators}
        controls={(donator) =>
          !!rouletteId && (
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => handleRegister(donator)}
            />
          )
        }
      />
    </Spin>
  )
}

export interface DonatorsListItemProps {
  donator: IDonator
  roulette?: string
  editable?: boolean
}

export const DonatorsListItem: React.FC<DonatorsListItemProps> = ({
  donator,
  roulette: rouletteId,
}) => {
  const [editDonator] = useEditPlayerMutation()

  const { t } = useTranslation()

  const handleRegister = useCallback(() => {
    Modal.confirm({
      title: `${t('Register donator to current roulette?')}`,
      content: (
        <Typography.Text>
          {t('register_confirmation_part1')}{' '}
          <Typography.Text strong>{donator.name}</Typography.Text>{' '}
          {t('register_confirmation_part2')}
        </Typography.Text>
      ),
      onOk: () => {
        editDonator({ ...donator, roulette: rouletteId })
      },
      cancelText: t('Cancel'),
    })
  }, [t, donator, editDonator, rouletteId])

  return (
    <List.Item>
      <BasePlayersListItemMeta player={donator} />
      {!!rouletteId && (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleRegister}
        />
      )}
    </List.Item>
  )
}
