import { PlayersListItemMeta } from '@components/Lists/PlayersList'
import { useEditPlayerMutation, useGetPlayersQuery } from '@modules/api/player'
import { useDevice } from '@modules/hooks/useDevice'
import { IDonator } from '@modules/models/IDonator'
import { Button, List, Modal, Typography } from 'antd'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export interface LastDonatorsListProps {
  roulette?: string
  editable?: boolean
}

export const LastDonatorsList: React.FC<LastDonatorsListProps> = ({ roulette: rouletteId, editable }) => {
  const { data: lastDonators } = useGetPlayersQuery({ roulette: 'none' })

  return (
    <List
      itemLayout="horizontal"
      dataSource={lastDonators}
      renderItem={(donator) => <LastDonatorsListItem donator={donator} editable={editable} roulette={rouletteId} />}
    />
  )
}

export interface LastDonatorsListItemProps {
  donator: IDonator
  roulette?: string
  editable?: boolean
  onClick?: (donator: IDonator) => void
}

export const LastDonatorsListItem: React.FC<LastDonatorsListItemProps> = ({
  donator,
  roulette: rouletteId,
  editable = false,
  onClick,
}) => {
  const [editDonator] = useEditPlayerMutation()

  const { isMobile } = useDevice()

  const { t } = useTranslation()

  const handleClick = useCallback(() => {
    onClick?.(donator)
  }, [donator, onClick])

  const handleRegister = useCallback(() => {
    Modal.confirm({
      title: `${t('Register donator to current roulette?')}`,
      content: (
        <Typography.Text>
          {t('register_confirmation_part1')} <Typography.Text strong>{donator.name}</Typography.Text>{' '}
          {t('register_confirmation_part2')}
        </Typography.Text>
      ),
      onOk: () => {
        editDonator({ ...donator, roulette: rouletteId })
      },
      cancelText: t('Cancel'),
    })
  }, [donator, editDonator, rouletteId])

  return (
    <List.Item
      onClick={() => {
        handleClick()
        // handleRegister()
      }}
    >
      <PlayersListItemMeta player={donator} />
      {editable && !isMobile && (
        <Button type="primary" onClick={handleRegister}>
          {t('register')}
        </Button>
      )}
    </List.Item>
  )
}
