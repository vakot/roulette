import { IPlayer } from '@modules/models/Player'
import { IRoulette } from '@modules/models/Roulette'
import { Button, List } from 'antd'
import { useRouter } from 'next/router'

export interface RoulettesListProps {
  roulettes?: IRoulette[]
  showFilters?: boolean
  editable?: boolean
  onClick?: (player: IPlayer) => void
}

export const RoulettesList: React.FC<RoulettesListProps> = ({
  roulettes: items = [],
  editable = false,
}) => {
  const router = useRouter()

  return (
    <List
      dataSource={items}
      renderItem={(roulette) => (
        <List.Item onClick={() => router.push(`/${roulette._id}`)}>
          <Button block style={{ textAlign: 'left' }}>
            {roulette._id}
          </Button>
        </List.Item>
      )}
    />
  )
}
