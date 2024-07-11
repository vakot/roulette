'use client'

import { ConfigProvider, theme } from 'antd'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <Provider store={store}>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}>
      <SessionProvider>{children}</SessionProvider>
    </ConfigProvider>
    // </Provider>
  )
}
