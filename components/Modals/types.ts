import type { ModalProps } from 'antd'

export interface EditModalProps<T = unknown>
  extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  onOk?: () => void
  onCancel?: () => void
  onFinish?: (player: T) => void
}
