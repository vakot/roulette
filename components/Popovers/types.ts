import type { PopoverProps } from 'antd'

export interface EditPopoverProps<T = unknown> extends Omit<PopoverProps, 'content'> {}
