import { QuestionCircleOutlined } from '@ant-design/icons'
import { PlayerFilters } from '@components/Players/Filters'
import { useDeletePlayersMutation } from '@modules/api/player'
import { IPlayer } from '@modules/models/Player'
import { Button, List, Popconfirm, Space } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { PlayersListItem } from './ListItem'
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
