import { Player } from '@modules/hooks/usePlayers'
import { Avatar, List, Progress, Space } from 'antd'
import { PlayerWithProbability } from '../'

export interface PlayersListItemProps {
  player: PlayerWithProbability
  onClick?: (player: Player) => void
}

export const PlayersListItem: React.FC<PlayersListItemProps> = ({ player, onClick }) => {
  return (
    <List.Item onClick={() => onClick?.(player)}>
      <List.Item.Meta
        avatar={
          <Space>
            {!!player.probability && <Progress type="circle" percent={Number((player.probability * 100).toFixed(1))} size={48} />}
            <Avatar
              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${player.id}`}
              style={{ border: `3px solid ${player.color}` }}
              size={48}
            />
          </Space>
        }
        title={player.name ?? 'anonim'}
        description={`${player.price}$`}
      />
    </List.Item>
  )
}
