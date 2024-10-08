import Icon, { QuestionCircleOutlined } from '@ant-design/icons'
import { EditPlayerButton } from '@components/Buttons/EditPlayerButton'
import { EditPlayerModal } from '@components/Modals/EditPlayerModal'
import { PlayerAvatar } from '@components/Players/Avatar'
import { PlayerFilters } from '@components/Players/Filters'
import { useDeletePlayersMutation } from '@modules/api/player'
import { useDevice } from '@modules/hooks/useDevice'
import { IPlayer } from '@modules/models/Player'
import CoinIcon from '@public/coin-thumb-up-01.svg'
import { Button, List, Popconfirm, Space, Typography } from 'antd'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'

export type PlayerWithProbability = IPlayer & { probability?: number }

export interface PlayersListProps {
  players?: PlayerWithProbability[]
  showFilters?: boolean
  editable?: boolean
  onClick?: (player: IPlayer) => void
}

export const PlayersList: React.FC<PlayersListProps> = ({ players: items = [], showFilters = false, editable = false, onClick }) => {
  const [players, setPlayers] = useState<PlayerWithProbability[]>([])

  const [deletePlayers] = useDeletePlayersMutation()

  useEffect(() => {
    setPlayers(items)
  }, [items])

  const handlePlayersDelete = useCallback(() => {
    deletePlayers(players?.map(({ _id }) => _id))
  }, [players, deletePlayers])

  return (
    <Space direction="vertical" style={{ width: '100%' }} className={styles.list}>
      {showFilters && <PlayerFilters players={items} setPlayers={setPlayers} />}
      <List
        itemLayout="horizontal"
        dataSource={players}
        renderItem={(item) => <PlayersListItem player={item} onClick={onClick} editable={editable} />}
      />
      {editable && (
        <Popconfirm
          title="Delete ALL players"
          description="Are you sure to delete all players?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={handlePlayersDelete}>
          <Button type="primary" danger block>
            Clear
          </Button>
        </Popconfirm>
      )}
    </Space>
  )
}

export interface PlayersListItemProps {
  player: PlayerWithProbability
  editable?: boolean
  onClick?: (player: IPlayer) => void
}

export const PlayersListItem: React.FC<PlayersListItemProps> = ({ player, editable = false, onClick }) => {
  const [open, setOpen] = useState<boolean>(false)

  const { isMobile } = useDevice()

  const handleClick = useCallback(() => {
    onClick?.(player)
    if (isMobile) {
      setOpen(true)
    }
  }, [player, isMobile, onClick])

  return (
    <>
      <List.Item onClick={handleClick}>
        <PlayersListItemMeta player={player} />
        {editable && !isMobile && (
          <EditPlayerButton player={player?._id} type="primary">
            Edit
          </EditPlayerButton>
        )}
      </List.Item>

      <EditPlayerModal open={open} player={player?._id} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} />
    </>
  )
}

export interface PlayersListItemMetaProps {
  player: PlayerWithProbability
}

export const PlayersListItemMeta: React.FC<PlayersListItemMetaProps> = ({ player }) => {
  return (
    <List.Item.Meta
      style={{ minWidth: 300 }}
      avatar={<PlayerAvatar player={player} />}
      title={
        <Space>
          <Typography.Text>{player.name ?? 'anonim'}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontWeight: 'normal' }}>
            {player.price?.toFixed(2)} <Icon component={() => <Image src={CoinIcon} alt="coin" width={14} height={14} />} />
          </Typography.Text>
        </Space>
      }
      description={player.message}
    />
  )
}
