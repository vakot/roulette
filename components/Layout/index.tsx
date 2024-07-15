'use client'

import { Layout } from 'antd'
import styles from './style.module.css'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <Layout className={styles.layout}>
      <Layout.Content className={styles['layout-content']}>{children}</Layout.Content>
    </Layout>
  )
}
