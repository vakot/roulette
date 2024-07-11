'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

export interface RouletteProps<T = unknown> {
  items: T[]
  render?: (item: T) => React.ReactNode
  onFinish?: (item: T) => void
  duration?: number
}

const RouletteComponent = <T,>(props: RouletteProps<T>): React.ReactElement => {
  const { items, render, onFinish, duration = 10000 } = props

  const [offset, setOffset] = useState<number>(0)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const reelRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length)
  }, [items])

  useEffect(() => {
    if (reelRef.current) {
      reelRef.current.style.transform = `translateX(-${offset}px)`
    }
  }, [offset])

  return (
    <div className={styles.Wrapper} ref={wrapperRef}>
      <div className={styles.Reel} ref={reelRef}>
        {items.map((item, index) => (
          <div
            className={styles.Item}
            key={index}
            ref={(element) => {
              itemRefs.current[index] = element
            }}>
            {render ? render(item) : String(item)}
          </div>
        ))}
      </div>
      <div className={styles.Pointer} />
    </div>
  )
}
