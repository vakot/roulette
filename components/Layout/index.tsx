'use client'

import { ThemeSwitch } from '@components/ThemeSwitch'
import { useDevice } from '@modules/hooks/useDevice'
import { Layout } from 'antd'
import 'i18next'
import { useRouter } from 'next/navigation'
import 'react-i18next'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '../LanguageSelector'
import styles from './style.module.css'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  const router = useRouter()

  const { isMobile } = useDevice()

  const { t } = useTranslation()

  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <div>
          <ThemeSwitch />
          <LanguageSelector />
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
