import { useEffect, useState } from 'react'

function useDebounce<T = unknown>(value: T, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(t)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
