'use client'

import { Badge, BadgeProps } from 'antd'

export interface AdminOnlyProps extends Omit<BadgeProps, 'text'> {
  hideBadge?: boolean
}

export const AdminOnly: React.FC<AdminOnlyProps> = ({ hideBadge = false, children, ...props }) => {
  // TODO: is admin check

  // if (!isAdmin) {
  //   return null
  // }

  if (hideBadge) {
    return children
  } else {
    return (
      <Badge.Ribbon text="Admin only" {...props}>
        {children}
      </Badge.Ribbon>
    )
  }
}
