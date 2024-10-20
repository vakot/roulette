'use client'

import { Badge, BadgeProps } from 'antd'
import { useTranslation } from 'react-i18next'

export interface AdminOnlyProps extends Omit<BadgeProps, 'text'> {
  hideBadge?: boolean
}

export const AdminOnly: React.FC<AdminOnlyProps> = ({
  hideBadge = false,
  children,
  ...props
}) => {
  const { t } = useTranslation()
  // TODO: is admin check

  // if (!isAdmin) {
  //   return null
  // }

  if (hideBadge) {
    return children
  } else {
    return (
      <Badge.Ribbon text={t('Admin only')} {...props}>
        {children}
      </Badge.Ribbon>
    )
  }
}
