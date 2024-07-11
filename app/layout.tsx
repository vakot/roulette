import MainLayout from '@components/Layout'
import { Providers } from '@components/Providers'
import type { Metadata } from 'next'
import './globals.css'

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
