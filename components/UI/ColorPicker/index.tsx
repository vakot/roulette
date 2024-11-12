import { ColorPicker as AntdColorPicker, Form } from 'antd'

export interface ColorPickerProps {}

export const ColorPicker: React.FC<ColorPickerProps> = () => {
  return (
    <AntdColorPicker
      format="hex"
      showText={true} // Display the color hex code
      allowClear={false} // Remove the clear button
      disabledAlpha // Disable transparency
    />
  )
}

export interface ColorPickerFormItemProps {
  name?: string | string[]
  label?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export const ColorPickerFormItem: React.FC<ColorPickerFormItemProps> = (
  props
) => {
  return (
    <Form.Item {...props} getValueFromEvent={(color) => '#' + color.toHex()}>
      <AntdColorPicker />
    </Form.Item>
  )
}
