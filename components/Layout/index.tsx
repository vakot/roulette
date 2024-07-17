'use client'

import { ThemeSwitch } from '@components/ThemeSwitch'
import { useDevice } from '@modules/hooks/useDevice'
import { Layout } from 'antd'
import { useRouter } from 'next/navigation'
import styles from './style.module.css'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  const router = useRouter()

  const { isMobile } = useDevice()

  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <div>
          <ThemeSwitch />
          <p>TODO: language select</p>
        </div>
      </Layout.Header>
      <Layout.Content className={styles['layout-content']}>{children}</Layout.Content>
      {/* {isMobile && (
        <AdminOnly hideBadge>
          <Layout.Footer className={styles.footer}>
            <Button className={styles.button} type="primary" onClick={() => router.push('/')} icon={<HomeFilled />} />
            <Button className={styles.button} type="primary" onClick={() => router.push('admin')} icon={<BugFilled />} />
          </Layout.Footer>
        </AdminOnly>
      )} */}
    </Layout>
  )
}
