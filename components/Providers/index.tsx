'use client'

import { StoreProvider } from '@components/Providers/StoreProvider'
import { ThemeProvider } from '@components/Providers/ThemeProvider'
import { LanguageProvider } from '@components/Providers/LanguageProvider'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SessionProvider>{children}</SessionProvider>
        </LanguageProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}
