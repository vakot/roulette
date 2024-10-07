'use client'

import { Card, CardProps, Space } from 'antd'
import { AdminOnly } from '../../Badges/AdminOnly'

export interface AdminCardProps extends CardProps {
  hideBadge?: boolean
}

export const AdminCard: React.FC<AdminCardProps> = ({ children, size, hideBadge = false, ...props }) => {
  return (
    <AdminOnly hideBadge={hideBadge}>
      <Card size={size} {...props}>
        <Space direction="vertical" style={{ width: '100%' }} size={size === 'default' ? 'middle' : size}>
          {children}
        </Space>
      </Card>
    </AdminOnly>
  )
}
