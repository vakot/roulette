import { Player } from '@modules/hooks/usePlayers'
import { List } from 'antd'
import { PlayersListItem } from './ListItem'

export type PlayerWithProbability = Player & { probability?: number }

export interface PlayersListProps {
  players: PlayerWithProbability[]
  onClick?: (player: Player) => void
}

export const PlayersList: React.FC<PlayersListProps> = ({ players, onClick }) => {
  return <List itemLayout="horizontal" dataSource={players} renderItem={(item) => <PlayersListItem player={item} onClick={onClick} />} />
}
