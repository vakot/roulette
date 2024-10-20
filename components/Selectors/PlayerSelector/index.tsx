import type { SelectorProps } from '@components/Selectors/types'
import { useGetPlayersQuery } from '@modules/api/player'
import { useDevice } from '@modules/hooks/useDevice'
import type { IPlayer } from '@modules/models/Player'
import { IRoulette } from '@modules/models/Roulette'
import { Select } from 'antd'
import { useMemo } from 'react'

export interface PlayerSelectorProps extends SelectorProps<IPlayer['_id']> {
  roulette: IRoulette['_id']
}

export const PlayerSelector: React.FC<PlayerSelectorProps> = ({
  roulette: rouletteId,
  ...props
}) => {
  const { data: players } = useGetPlayersQuery(
    { roulette: rouletteId },
    { skip: !rouletteId }
  )

  const { isDesktop } = useDevice()

  const options = useMemo(() => {
    return players?.map(({ _id, name }) => ({ value: _id, label: name }))
  }, [players])

  return (
    <Select
      options={options}
      showSearch
      allowClear={isDesktop}
      optionFilterProp="label"
      placeholder="Select player..."
      {...props}
      status={rouletteId ? props.status : 'error'}
    />
  )
}
