import type { SelectorProps } from '@components/Selectors/types'
import { useGetPlayersQuery } from '@modules/api/player'
import { useDevice } from '@modules/hooks/useDevice'
import type { IPlayer } from '@modules/models/Player'
import { Select } from 'antd'
import { useMemo } from 'react'

export interface DonatorSelectorProps extends SelectorProps<IPlayer['_id']> {}

export const DonatorSelector: React.FC<DonatorSelectorProps> = ({
  ...props
}) => {
  const { data: donators } = useGetPlayersQuery({ roulette: 'none' })

  const { isDesktop } = useDevice()

  const options = useMemo(() => {
    return donators?.map(({ _id, name, price }) => ({
      value: _id,
      label: `${name} - ${price}`,
    }))
  }, [donators])

  return (
    <Select
      options={options}
      showSearch
      allowClear={isDesktop}
      optionFilterProp="label"
      placeholder="Select player..."
      {...props}
    />
  )
}
