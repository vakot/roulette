import { PlayersListItemMeta } from '@components/Lists/PlayersList'
import { useEditPlayerMutation, useGetPlayersQuery } from '@modules/api/player'
import { useDevice } from '@modules/hooks/useDevice'
import { IDonator } from '@modules/models/IDonator'
import { Button, List, Modal, Typography } from 'antd'
import { useCallback } from 'react'

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

export const LastDonatorsListItem: React.FC<LastDonatorsListItemProps> = ({ donator, roulette: rouletteId, editable = false, onClick }) => {
  const [editDonator] = useEditPlayerMutation()

  const { isMobile } = useDevice()

  const handleClick = useCallback(() => {
    onClick?.(donator)
  }, [donator, onClick])

  const handleRegister = useCallback(() => {
    Modal.confirm({
      title: 'Register donator to current roulette?',
      content: (
        <Typography.Text>
          Are you sure you want to register <Typography.Text strong>{donator.name}</Typography.Text> to the current roulette?
        </Typography.Text>
      ),
      onOk: () => {
        editDonator({ ...donator, roulette: rouletteId })
      }
    })
  }, [donator, editDonator, rouletteId])

  return (
    <List.Item
      onClick={() => {
        handleClick()
        handleRegister()
      }}>
      <PlayersListItemMeta player={donator} />
      {editable && !isMobile && (
        <Button type="primary" onClick={handleRegister}>
          Register
        </Button>
      )}
    </List.Item>
  )
}
