import { EditFilled } from '@ant-design/icons'
import { EditPlayerModal } from '@components/Modals/EditPlayerModal'
import { IPlayer } from '@modules/models/Player'
import { IRoulette } from '@modules/models/Roulette'
import { Button, ButtonProps } from 'antd'
import { useState } from 'react'

export interface EditPlayerButtonProps extends ButtonProps {
  player?: IPlayer['_id']
  roulette?: IRoulette['_id']
  onFinish?: (player: IPlayer) => void
}

export const EditPlayerButton: React.FC<EditPlayerButtonProps> = ({
  player,
  roulette: rouletteId,
  icon = <EditFilled />,
  onClick,
  onFinish,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        type="dashed"
        icon={icon}
        onClick={(e) => {
          onClick?.(e)
          setOpen(true)
        }}
        {...props}></Button>

      <EditPlayerModal
        open={open}
        player={player}
        roulette={rouletteId}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onFinish={onFinish}
      />
    </>
  )
}
