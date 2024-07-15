import { useEffect, useState } from 'react'

export const useDevice = () => {
  const [device, setDevice] = useState({
    isDesktop: false,
    isTablet: false,
    isMobile: false
  })

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth

      setDevice({
        isDesktop: width >= 1200,
        isTablet: width >= 768 && width < 1200,
        isMobile: width < 768
      })
    }

    updateDevice()

    window.addEventListener('resize', updateDevice)

    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  return device
}
