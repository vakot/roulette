import { PlusOutlined } from '@ant-design/icons'
import { AddPlayerModal } from '@components/Modals/AddPlayerModal'
import { IPlayer } from '@modules/models/Player'
import { IRoulette } from '@modules/models/Roulette'
import { Button, ButtonProps } from 'antd'
import { useState } from 'react'

export interface AddPlayerButtonProps extends ButtonProps {
  players?: IPlayer[]
  roulette?: IRoulette['_id']
  onFinish?: (player: IPlayer) => void
}

export const AddPlayerButton: React.FC<AddPlayerButtonProps> = ({
  roulette: rouletteId,
  icon = <PlusOutlined />,
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

      <AddPlayerModal
        open={open}
        roulette={rouletteId}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onFinish={onFinish}
      />
    </>
  )
}
