import type { SelectProps } from 'antd'

export interface SelectorProps<T> extends Omit<SelectProps<T>, 'options' | 'mode'> {
  mode?: 'multiple'
}
