import { useAppSelector } from '@modules/store/hooks'
import { ConfigProvider, theme } from 'antd'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const currentTheme = useAppSelector(({ theme }) => theme)

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === 'dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        components: {
          Layout: { footerBg: currentTheme === 'dark' ? '#000000' : '#ffffff' },
        },
      }}>
      {children}
    </ConfigProvider>
  )
}
