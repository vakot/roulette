import MainLayout from '@components/Layout'
import { Providers } from '@components/Providers'
import type { Metadata } from 'next'

import '@styles/global.css'
import '@styles/reset.css'
import '@styles/variables.css'

export const metadata: Metadata = {
  title: 'Roulette'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <MainLayout>{children}</MainLayout>
        </body>
      </html>
    </Providers>
  )
}
