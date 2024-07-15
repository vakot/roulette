'use client'

import { ThemeProvider } from '@components/Providers/ThemeProvider'
import { store } from '@modules/store'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </Provider>
  )
}
