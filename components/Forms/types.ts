import { FormProps } from 'antd'

export interface EditFormProps<T>
  extends Omit<
    FormProps,
    | 'children'
    | 'layout'
    | 'onFinish'
    | 'onFinishFailed'
    | 'initialValues'
    | 'requiredMark'
  > {
  onFinishFailed?: (error: any) => void
  onFinish?: (item: T) => void
}
