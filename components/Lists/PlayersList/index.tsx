import { BasePlayersList } from '@components/Lists/BasePlayersList'
import { useGetPlayersQuery } from '@modules/api/player'
import { IRoulette } from '@modules/models/Roulette'
import { Spin } from 'antd'

export interface PlayersListProps {
  roulette?: IRoulette['_id']
}

export const PlayersList: React.FC<PlayersListProps> = ({ roulette: rouletteId }) => {
  const { data: players, isFetching: isPlayersLoading } = useGetPlayersQuery({ roulette: rouletteId }, { skip: !rouletteId })

  return (
    <Spin spinning={isPlayersLoading}>
      <BasePlayersList players={players} editable />
    </Spin>
  )
}
