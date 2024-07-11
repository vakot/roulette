import { PlayersListItem } from '@components/PlayersList/PlayersListItem'
import { Player } from '@modules/hooks/usePlayers'
import { List } from 'antd'

export interface PlayersListProps {
  players: Player[]
  onClick?: (player: Player) => void
}

export const PlayersList: React.FC<PlayersListProps> = ({ players, onClick }) => {
  return <List itemLayout="horizontal" dataSource={players} renderItem={(item) => <PlayersListItem player={item} onClick={onClick} />} />
}
