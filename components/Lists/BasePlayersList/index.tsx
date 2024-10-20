import Icon, { EditFilled } from '@ant-design/icons'
import { EditPlayerButton } from '@components/Buttons/EditPlayerButton'
import { PlayerAvatar } from '@components/Players/Avatar'
import { IPlayer } from '@modules/models/Player'
import CoinIcon from '@public/coin-thumb-up-01.svg'
import { Empty, List, Space, Typography } from 'antd'
import Image from 'next/image'
import styles from './styles.module.css'

export type PlayerWithProbability = IPlayer & { probability?: number }

export interface BasePlayersListProps {
  players?: PlayerWithProbability[]
  editable?: boolean
  onClick?: (player: IPlayer) => void
}

export const BasePlayersList: React.FC<BasePlayersListProps> = ({ players, editable }) => {
  if (!players?.length) {
    return <Empty />
  }
  return (
    <List itemLayout="horizontal" dataSource={players} renderItem={(item) => <BasePlayersListItem player={item} editable={editable} />} />
  )
}

export interface BasePlayersListItemProps {
  player: PlayerWithProbability
  editable?: boolean
  onClick?: (player: IPlayer) => void
}

export const BasePlayersListItem: React.FC<BasePlayersListItemProps> = ({ player, editable }) => {
  return (
    <List.Item className={styles.hover}>
      <BasePlayersListItemMeta player={player} />
      {editable && <EditPlayerButton type="primary" icon={<EditFilled />} player={player?._id} />}
    </List.Item>
  )
}

export interface BasePlayersListItemMetaProps {
  player: PlayerWithProbability
}

export const BasePlayersListItemMeta: React.FC<BasePlayersListItemMetaProps> = ({ player }) => {
  return (
    <List.Item.Meta
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
