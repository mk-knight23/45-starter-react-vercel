/**
 * Virtual List Component
 * Efficiently render large datasets
 */

import { useRef, useEffect, useState, ReactNode, useMemo } from 'react'

interface VirtualListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  itemHeight: number | ((index: number) => number)
  containerHeight: number
  overscan?: number
  className?: string
}

export function VirtualList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 3,
  className = ''
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate item heights
  const getItemHeight = useMemo(() => {
    return typeof itemHeight === 'function' ? itemHeight : () => itemHeight
  }, [itemHeight])

  // Calculate total height and item offsets
  const { totalHeight, offsetMap } = useMemo(() => {
    const map = new Map<number, number>()
    let total = 0

    for (let i = 0; i < items.length; i++) {
      map.set(i, total)
      total += getItemHeight(i)
    }

    return { totalHeight: total, offsetMap: map }
  }, [items.length, getItemHeight])

  // Calculate visible range
  const { startIndex, endIndex } = useMemo(() => {
    let start = 0
    let end = items.length - 1

    // Binary search for start index
    let left = 0
    let right = items.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const offset = offsetMap.get(mid) || 0

      if (offset < scrollTop) {
        start = mid
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    // Find end index based on container height
    let accumulatedHeight = 0
    for (let i = start; i < items.length; i++) {
      accumulatedHeight += getItemHeight(i)
      if (accumulatedHeight > containerHeight + scrollTop) {
        end = i
        break
      }
    }

    return {
      startIndex: Math.max(0, start - overscan),
      endIndex: Math.min(items.length - 1, end + overscan)
    }
  }, [scrollTop, items.length, offsetMap, getItemHeight, containerHeight, overscan])

  // Handle scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      setScrollTop(container.scrollTop)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Render visible items
  const visibleItems = []
  for (let i = startIndex; i <= endIndex; i++) {
    const offset = offsetMap.get(i) || 0
    visibleItems.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          top: offset,
          left: 0,
          right: 0,
          height: getItemHeight(i)
        }}
      >
        {renderItem(items[i], i)}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
    >
      <div
        className="relative"
        style={{ height: totalHeight }}
      >
        {visibleItems}
      </div>
    </div>
  )
}

/**
 * Hook for virtual list with dynamic sizing
 */
export function useVirtualList(options: {
  itemCount: number
  getItemHeight: (index: number) => number
  containerHeight: number
  overscan?: number
}) {
  const { itemCount, getItemHeight, containerHeight, overscan = 3 } = options

  const [scrollTop, setScrollTop] = useState(0)

  const { totalHeight, offsetMap } = useMemo(() => {
    const map = new Map<number, number>()
    let total = 0

    for (let i = 0; i < itemCount; i++) {
      map.set(i, total)
      total += getItemHeight(i)
    }

    return { totalHeight: total, offsetMap: map }
  }, [itemCount, getItemHeight])

  const { startIndex, endIndex } = useMemo(() => {
    let start = 0
    let end = itemCount - 1

    // Binary search for start index
    let left = 0
    let right = itemCount - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const offset = offsetMap.get(mid) || 0

      if ( offset < scrollTop) {
        start = mid
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    // Find end index
    let accumulatedHeight = 0
    for (let i = start; i < itemCount; i++) {
      accumulatedHeight += getItemHeight(i)
      if (accumulatedHeight > containerHeight + scrollTop) {
        end = i
        break
      }
    }

    return {
      startIndex: Math.max(0, start - overscan),
      endIndex: Math.min(itemCount - 1, end + overscan)
    }
  }, [scrollTop, itemCount, offsetMap, getItemHeight, containerHeight, overscan])

  return {
    startIndex,
    endIndex,
    totalHeight,
    offsetMap,
    setScrollTop
  }
}

export default VirtualList
