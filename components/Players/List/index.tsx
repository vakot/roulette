import { AdminOnly } from '@components/Admin/AdminOnly'
import { PlayerFilters } from '@components/Players/Filters'
import { Player } from '@modules/hooks/usePlayers'
import { Card, List, Space } from 'antd'
import { useEffect, useState } from 'react'
import { PlayersListItem } from './ListItem'

export type PlayerWithProbability = Player & { probability?: number }

export interface PlayersListProps {
  players: PlayerWithProbability[]
  showFilters?: boolean
  onClick?: (player: Player) => void
}

export const PlayersList: React.FC<PlayersListProps> = ({ players: _players, showFilters = false, onClick }) => {
  const [players, setPlayers] = useState<PlayerWithProbability[]>(_players)

  useEffect(() => {
    setPlayers(_players)
  }, [_players])

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {showFilters && (
        <AdminOnly>
          <Card size="small" title="Filters">
            <PlayerFilters players={_players} setPlayers={setPlayers} />
          </Card>
        </AdminOnly>
      )}
      <List itemLayout="horizontal" dataSource={players} renderItem={(item) => <PlayersListItem player={item} onClick={onClick} />} />
    </Space>
  )
}
