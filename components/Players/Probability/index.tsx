import { PlayerWithProbability } from '@components/Lists/BasePlayersList'
import { useAdminPathname } from '@modules/hooks/useAdminPathname'
import { Progress } from 'antd'

export interface PlayerProbabilityProps {
  player: PlayerWithProbability
}

export const PlayerProbability: React.FC<PlayerProbabilityProps> = ({
  player,
}) => {
  const isAdminPage = useAdminPathname()

  if (
    !isAdminPage ||
    player.probability === undefined ||
    player.probability === null
  ) {
    return null
  }

  return (
    <Progress
      type="circle"
      percent={Number((player.probability * 100).toFixed(1))}
      size={48}
    />
  )
}
