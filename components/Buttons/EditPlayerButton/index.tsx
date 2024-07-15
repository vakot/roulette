import { EditFilled } from '@ant-design/icons'
import { EditPlayerModal } from '@components/Modals/EditPlayerModal'
import { Player } from '@modules/hooks/usePlayers'
import { Button, ButtonProps } from 'antd'
import { useState } from 'react'

export interface EditPlayerButtonProps extends Omit<ButtonProps, 'onClick'> {
  player?: Player
  onFinish?: (player: Player) => void
}

export const EditPlayerButton: React.FC<EditPlayerButtonProps> = ({ player, children = <EditFilled />, onFinish, ...props }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)} {...props}>
        {children}
      </Button>

      <EditPlayerModal open={open} player={player} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} onFinish={onFinish} />
    </>
  )
}
