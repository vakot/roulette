import { PlusOutlined } from '@ant-design/icons'
import { AddPlayerButton } from '@components/Buttons/AddPlayerButton'
import { PlayersList } from '@components/Lists/PlayersList'
import { useGetPlayersQuery } from '@modules/api/player'
import { IRoulette } from '@modules/models/Roulette'
import { Card, Flex, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

export interface PlayersCardProps {
  roulette?: IRoulette['_id']
}

export const PlayersCard: React.FC<PlayersCardProps> = ({
  roulette: rouletteId,
}) => {
  const { isFetching: isPlayersLoading } = useGetPlayersQuery(
    { roulette: rouletteId },
    { skip: !rouletteId }
  )

  return (
    <Spin spinning={isPlayersLoading}>
      <Card title={<Title roulette={rouletteId} />}>
        <Body roulette={rouletteId} />
      </Card>
    </Spin>
  )
}

const Title: React.FC<PlayersCardProps> = ({ roulette: rouletteId }) => {
  const { data: players } = useGetPlayersQuery(
    { roulette: rouletteId },
    { skip: !rouletteId }
  )

  const { t } = useTranslation()

  return (
    <Flex justify="space-between" align="center">
      <span>
        {t('players')} - {players?.length ?? 0}
      </span>
      <span>
        <AddPlayerButton
          icon={<PlusOutlined />}
          type="primary"
          roulette={rouletteId}
        />
      </span>
    </Flex>
  )
}

const Body: React.FC<PlayersCardProps> = ({ roulette: rouletteId }) => {
  return <PlayersList roulette={rouletteId} />
}
