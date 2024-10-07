import type { SelectorProps } from '@components/Selectors/types'
import { useGetRoulettesQuery } from '@modules/api/roulette'
import type { IRoulette } from '@modules/models/Roulette'
import { Select } from 'antd'
import { useMemo } from 'react'

export interface RouletteSelectorProps extends SelectorProps<IRoulette['_id']> {}

export const RouletteSelector: React.FC<RouletteSelectorProps> = ({ ...props }) => {
  const { data: roulettes } = useGetRoulettesQuery()

  const options = useMemo(() => {
    return roulettes?.map(({ _id }) => ({ value: _id, label: _id }))
  }, [roulettes])

  return <Select options={options} showSearch allowClear optionFilterProp="label" placeholder="Select roulette..." {...props} />
}
