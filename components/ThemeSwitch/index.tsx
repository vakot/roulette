import { MoonFilled, SunFilled } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@modules/store/hooks'
import { setTheme } from '@modules/store/slices/theme'
import { Switch } from 'antd'
import React from 'react'

export const ThemeSwitch: React.FC = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(({ theme }) => theme)

  const handleChange = (checked: boolean) => {
    dispatch(setTheme(checked ? 'dark' : 'light'))
  }

  return (
    <Switch checked={currentTheme === 'dark'} unCheckedChildren={<SunFilled />} checkedChildren={<MoonFilled />} onChange={handleChange} />
  )
}
