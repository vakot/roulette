'use client'

import { Layout } from 'antd'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <Layout style={{ padding: 16 }}>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}
