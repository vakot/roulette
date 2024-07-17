import Icon, { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons'
import { EditPlayerButton } from '@components/Buttons/EditPlayerButton'
import { useDeletePlayerMutation } from '@modules/api/player'
import { IPlayer } from '@modules/models/Player'
import CoinIcon from '@public/coin-thumb-up-01.svg'
import { getRandomColor } from '@utils/helpers'
import { Avatar, Button, List, Popconfirm, Progress, Space } from 'antd'
import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import { PlayerWithProbability } from '../'

export interface PlayersListItemProps {
  player: PlayerWithProbability
  editable?: boolean
  onClick?: (player: IPlayer) => void
}

export const PlayersListItem: React.FC<PlayersListItemProps> = ({ player, editable = false, onClick }) => {
  const [deletePlayer] = useDeletePlayerMutation()

  const color = useMemo(() => {
    return getRandomColor(player._id)
  }, [player._id])

  const handleDelete = useCallback(() => {
    deletePlayer(player._id)
  }, [player, deletePlayer])

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Space>
            {!!player.probability && <Progress type="circle" percent={Number((player.probability * 100).toFixed(1))} size={48} />}
            <Avatar
              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${player._id}`}
              style={{ border: `3px solid ${color}` }}
              size={48}
            />
          </Space>
        }
        title={player.name ?? 'anonim'}
        description={
          <>
            {player.price?.toFixed(2)} <Icon component={() => <Image src={CoinIcon} alt="coin" width={14} height={14} />} />
          </>
        }
      />
      <Space>
        {editable && (
          <Button type="primary" size="large" onClick={() => onClick?.(player)}>
            Make Winner
          </Button>
        )}
        {editable && <EditPlayerButton size="large" player={player._id} />}
        {editable && (
          <Popconfirm
            title="Delete player"
            description="Are you sure to delete this player?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={handleDelete}>
            <Button size="large" type="primary" danger icon={<DeleteFilled />} />
          </Popconfirm>
        )}
      </Space>
    </List.Item>
  )
}
