import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export const useAdminPathname = (): boolean => {
  const pathname = usePathname()

  return useMemo(() => pathname.endsWith('/admin'), [pathname])
}
