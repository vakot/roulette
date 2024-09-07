import { PlayerWithProbability } from '@components/Players/List'
import { Avatar, Progress, Space } from 'antd'

export interface PlayerAvatarProps {
  player?: PlayerWithProbability
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ player }) => {
  return (
    <Space>
      {!!player?.probability && <Progress type="circle" percent={Number((player?.probability * 100).toFixed(1))} size={48} />}
      <Avatar src={player?.avatar} style={{ border: `3px solid ${player?.color}` }} size={48} />
    </Space>
  )
}
