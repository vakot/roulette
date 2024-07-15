import { duplicateArray, toShuffled } from '@utils/helpers'
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import './styles.css'

export type RouletteHandler = {
  // spinning: boolean
  spin: (target: number) => void
  reset: () => void
}
export type RouletteInstance = React.RefObject<RouletteHandler>

export interface RouletteProps<T = unknown> {
  roulette?: RouletteInstance
  items: Array<T>
  render?: (item: T) => React.ReactNode
  onFinish?: (item: T) => void
  duration?: number
  fakes?: number
  className?: string
  style?: React.CSSProperties
}

const RouletteComponent = <T,>(props: RouletteProps<T>, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement => {
  const { roulette, items, render, onFinish, duration = 10000, fakes = 5, className, style } = props

  const [minFakes, setMinFakes] = useState<number>(0)
  const [spinning, setSpinning] = useState<boolean>(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const reelRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const getDimensions = () => {
      const wrapperWidth = wrapperRef.current?.offsetWidth ?? 0
      const itemsWidth = itemRefs.current.reduce((acc, item) => acc + item!.offsetWidth, 0) ?? 0
      setMinFakes(itemsWidth ? Math.ceil(wrapperWidth / itemsWidth) : 1)
    }

    getDimensions()

    window.addEventListener('resize', getDimensions)
    return () => {
      window.removeEventListener('resize', getDimensions)
    }
  }, [])

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length)
  }, [items])

  const fakeItemsEnd = useMemo(() => {
    return toShuffled(duplicateArray(items, minFakes))
  }, [minFakes, items])
  const fakeItemsStart = useMemo(() => {
    return toShuffled(duplicateArray(items, Math.max(minFakes, fakes)))
  }, [fakes, minFakes, items])

  useImperativeHandle(
    roulette,
    () => ({
      spin: (target = Math.floor(Math.random() * (items.length - 1))) => {
        if (spinning) {
          return
        }

        if (!reelRef.current || !wrapperRef.current || !itemRefs.current[target]) {
          return
        }

        setSpinning(true)

        const itemWidth = itemRefs.current[target]!.offsetWidth
        const itemOffset = itemRefs.current[target]!.offsetLeft

        const offset = itemOffset + Math.random() * itemWidth

        reelRef.current.style.transition = 'none'
        reelRef.current.style.transform = `translateX(50%)`

        setTimeout(() => {
          if (reelRef.current && wrapperRef.current) {
            reelRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
            reelRef.current.style.transform = `translateX(-${offset}px)`
          }
        })

        setTimeout(() => {
          setSpinning(false)
          onFinish?.(items[target])
        }, duration)
      },
      reset: () => {
        if (!reelRef.current) {
          return
        }

        reelRef.current.style.transition = 'none'
        reelRef.current.style.transform = `translateX(50%)`

        setSpinning(false)
      }
    }),
    [items, duration, spinning, onFinish]
  )

  return (
    <div className={['roulette-wrapper', className].join(' ')} style={style} ref={wrapperRef}>
      <div className="roulette-reel" ref={reelRef}>
        {fakeItemsStart.map((item, index) => (
          <div className="roulette-item roulette-fake-item" key={index}>
            {render ? render(item) : String(item)}
          </div>
        ))}
        {items.map((item, index) => (
          <div
            className="roulette-item"
            key={index}
            ref={(element) => {
              itemRefs.current[index] = element
            }}>
            {render ? render(item) : String(item)}
          </div>
        ))}
        {fakeItemsEnd.map((item, index) => (
          <div className="roulette-item roulette-fake-item" key={index}>
            {render ? render(item) : String(item)}
          </div>
        ))}
      </div>
      <div className="roulette-pointer" />
    </div>
  )
}

const useRoulette = () => useRef<RouletteHandler>(null)

const Roulette = React.forwardRef<HTMLDivElement, RouletteProps>(RouletteComponent) as unknown as (<T>(
  props: RouletteProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof RouletteComponent>) & { displayName: string; useRoulette: typeof useRoulette }

Roulette.displayName = 'Roulette'
Roulette.useRoulette = useRoulette

export default Roulette
