import { RefObject, useEffect, useState } from 'react'

/**
 * Custom hook to observe changes in dimensions (width and height) of a component based on its ref.
 * Returns an object containing the current width and height of the observed component.
 *
 * @param {RefObject<HTMLElement>} ref Reference to the component whose dimensions are observed.
 * @returns {{ width: number; height: number }} Object containing the current width and height of the observed component.
 */
export function useDimensions(ref: RefObject<HTMLElement>): {
  width: number
  height: number
} {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    /**
     * Handles the resize event to update the component dimensions.
     */
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth)
        setHeight(ref.current.offsetHeight)
      }
    }

    // Initialize the dimensions on component mount
    handleResize()

    // Listen for window resize events to update the dimensions
    window.addEventListener('resize', handleResize)

    // Clean up the resize event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])

  return { width, height }
}
