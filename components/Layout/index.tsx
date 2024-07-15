'use client'

import { ThemeSwitch } from '@components/ThemeSwitch'
import { Layout } from 'antd'
import styles from './style.module.css'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <div>TODO: logo</div>
        <div>
          <ThemeSwitch />
          <p>TODO: language select</p>
        </div>
      </Layout.Header>
      <Layout.Content className={styles['layout-content']}>{children}</Layout.Content>
    </Layout>
  )
}
