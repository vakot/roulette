'use client'

import { useCountMutation } from '@modules/api/count/count.api'
import useSocket from '@modules/hooks/useSocket'
import { Button } from 'antd'
import { useCallback, useState } from 'react'

export default function HelloWorld() {
  const [increment] = useCountMutation()
  const [count, setCount] = useState<number>(0)

  const handleClick = useCallback(() => {
    increment({ count: count + 1 })
  }, [increment, count])

  useSocket('increment', ({ count: value }) => {
    setCount(value)
  })

  return (
    <main>
      <Button style={{ width: 100 }} type="primary" onClick={handleClick}>
        {count}
      </Button>
    </main>
  )
}
