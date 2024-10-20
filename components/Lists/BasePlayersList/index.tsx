import Icon from '@ant-design/icons'
import { PlayerAvatar } from '@components/Players/Avatar'
import { PlayerProbability } from '@components/Players/Probability'
import { IPlayer } from '@modules/models/Player'
import CoinIcon from '@public/coin-thumb-up-01.svg'
import { Empty, List, Space, Typography } from 'antd'
import Image from 'next/image'
import styles from './styles.module.css'

export type PlayerWithProbability = IPlayer & { probability?: number }

export interface BasePlayersListProps {
  players?: PlayerWithProbability[]
  controls?: (player: IPlayer) => React.ReactNode
}

export const BasePlayersList: React.FC<BasePlayersListProps> = ({ players, controls }) => {
  if (!players?.length) {
    return <Empty />
  }
  return (
    <List itemLayout="horizontal" dataSource={players} renderItem={(item) => <BasePlayersListItem player={item} controls={controls} />} />
  )
}

export interface BasePlayersListItemProps {
  player: PlayerWithProbability
  controls?: BasePlayersListProps['controls']
}

export const BasePlayersListItem: React.FC<BasePlayersListItemProps> = ({ player, controls }) => {
  return (
    <List.Item className={styles.hover}>
      <BasePlayersListItemMeta player={player} />
      {controls?.(player)}
    </List.Item>
  )
}

export interface BasePlayersListItemMetaProps {
  player: PlayerWithProbability
}

export const BasePlayersListItemMeta: React.FC<BasePlayersListItemMetaProps> = ({ player }) => {
  return (
    <List.Item.Meta
      avatar={
        <Space>
          <PlayerProbability player={player} />
          <PlayerAvatar player={player} />
        </Space>
      }
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
