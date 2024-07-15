'use client'

import { EditFilled } from '@ant-design/icons'
import { AdminCard } from '@components/Admin/AdminCard'
import { EditPlayerButton } from '@components/Buttons/EditPlayerButton'
import { PlayersList } from '@components/Players/List'
import { Player } from '@modules/hooks/usePlayers'
import { Button, Input, Tooltip } from 'antd'

export interface AdminPanelProps {
  className?: string

  target?: Player
  setTarget?: React.Dispatch<React.SetStateAction<Player | undefined>>

  handleAddRandomPlayers?: (length: number) => void
  handleAddPlayers?: (players: Player[]) => void
  handleReset?: () => void

  exponent?: number
  setExponent?: React.Dispatch<React.SetStateAction<number>>
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  className,
  target,
  setTarget,
  exponent,
  setExponent,
  handleAddRandomPlayers,
  handleAddPlayers,
  handleReset
}) => {
  return (
    <AdminCard title="Admin panel" hideBadge className={className}>
      <AdminCard title="Add players" size="small" hideBadge>
        <EditPlayerButton type="primary" block icon={<EditFilled />} onFinish={(player) => handleAddPlayers?.([player])}>
          Add custom player
        </EditPlayerButton>
        <Button type="primary" ghost block onClick={() => handleAddRandomPlayers?.(10)}>
          Add 10 random players
        </Button>
        <Button type="primary" ghost block onClick={() => handleAddRandomPlayers?.(25)}>
          Add 25 random players
        </Button>
        <Button type="primary" ghost block onClick={() => handleAddRandomPlayers?.(50)}>
          Add 50 random players
        </Button>
      </AdminCard>
      <AdminCard title="Next winner" size="small" hideBadge>
        {!!target && <PlayersList players={[{ ...target, probability: undefined }]} />}
        <Button type="primary" danger block disabled={!target} onClick={() => setTarget?.(undefined)}>
          Clear
        </Button>
      </AdminCard>
      <AdminCard title="Probabilities" size="small" hideBadge>
        <Tooltip
          title={
            <ul>
              <li>{'>0 - higher chance to top'}</li>
              <li>{'0 - equal chance for all'}</li>
              <li>{'<0 - higher chance to bottom'}</li>
            </ul>
          }>
          <Input
            prefix="Exponent:"
            type="number"
            placeholder="modifier"
            value={exponent}
            onChange={(e) => setExponent?.(Number(e.target.value))}
          />
        </Tooltip>
      </AdminCard>
      <Button type="primary" block danger onClick={handleReset}>
        Reset
      </Button>
    </AdminCard>
  )
}
