import type { SelectorProps } from '@components/Selectors/types'
import { useGetRoulettesQuery } from '@modules/api/roulette'
import { useDevice } from '@modules/hooks/useDevice'
import type { IRoulette } from '@modules/models/Roulette'
import { Select } from 'antd'
import { useMemo } from 'react'

export interface RouletteSelectorProps extends SelectorProps<IRoulette['_id']> {}

export const RouletteSelector: React.FC<RouletteSelectorProps> = ({ ...props }) => {
  const { data: roulettes } = useGetRoulettesQuery()

  const { isDesktop } = useDevice()

  const options = useMemo(() => {
    return roulettes?.map(({ _id }) => ({ value: _id, label: _id }))
  }, [roulettes])

  return <Select options={options} showSearch allowClear={isDesktop} optionFilterProp="label" placeholder="Select roulette..." {...props} />
}
