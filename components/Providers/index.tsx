'use client'

import { StoreProvider } from '@components/Providers/StoreProvider'
import { ThemeProvider } from '@components/Providers/ThemeProvider'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}
