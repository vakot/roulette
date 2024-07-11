import { Player } from '@modules/hooks/usePlayers'
import { Avatar, List } from 'antd'

export interface PlayersListItemProps {
  player: Player
  onClick?: (player: Player) => void
}

export const PlayersListItem: React.FC<PlayersListItemProps> = ({ player, onClick }) => {
  return (
    <List.Item onClick={() => onClick?.(player)}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${player.id}`}
            style={{ border: `3px solid ${player.color}` }}
            size={48}
          />
        }
        title={player.name ?? 'anonim'}
        description={`${player.price}$`}
      />
    </List.Item>
  )
}
