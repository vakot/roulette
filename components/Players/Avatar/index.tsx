import { IPlayer } from '@modules/models/Player'
import { Avatar } from 'antd'

export interface PlayerAvatarProps {
  player?: IPlayer
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ player }) => {
  return (
    <Avatar
      src={player?.avatar}
      style={{ border: `3px solid ${player?.color}` }}
      size={48}
    />
  )
}
