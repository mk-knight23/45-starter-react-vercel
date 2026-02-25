/**
 * Infinite Scroll Component
 * Load more data as user scrolls
 */

import { useEffect, useRef, useState, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface InfiniteScrollProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  onLoadMore: () => void | Promise<void>
  hasMore: boolean
  loading?: boolean
  threshold?: number
  className?: string
  endMessage?: ReactNode
  loader?: ReactNode
}

export function InfiniteScroll<T>({
  items,
  renderItem,
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 200,
  className = '',
  endMessage,
  loader
}: InfiniteScrollProps<T>) {
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerTargetRef = observerTarget.current
    if (!observerTargetRef) return

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !loading) {
          setIsLoading(true)
          try {
            await onLoadMore()
          } finally {
            setIsLoading(false)
          }
        }
      },
      { rootMargin: `${threshold}px` }
    )

    observer.observe(observerTargetRef)

    return () => {
      if (observerTargetRef) {
        observer.unobserve(observerTargetRef)
      }
    }
  }, [hasMore, isLoading, loading, onLoadMore, threshold])

  return (
    <div className={className}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>{renderItem(item, index)}</div>
        ))}
      </div>

      {/* Loading indicator */}
      {(isLoading || loading) && (
        <div className="flex justify-center py-8">
          {loader || (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading more...</span>
            </div>
          )}
        </div>
      )}

      {/* End message */}
      {!hasMore && items.length > 0 && endMessage && (
        <div className="py-8 text-center text-gray-500">{endMessage}</div>
      )}

      {/* Observer target */}
      <div ref={observerTarget} className="h-1" />
    </div>
  )
}

/**
 * Hook for infinite scroll with state management
 */
export function useInfiniteScroll<T>(
  fetchFn: (page: number) => Promise<{ data: T[]; hasMore: boolean }>
) {
  const [items, setItems] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const result = await fetchFn(page)
      setItems((prev) => [...prev, ...result.data])
      setHasMore(result.hasMore)
      setPage((prev) => prev + 1)
    } catch (error) {
      console.error('Error loading more items:', error)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setItems([])
    setPage(1)
    setHasMore(true)
    setLoading(false)
  }

  return {
    items,
    loadMore,
    hasMore,
    loading,
    reset
  }
}

export default InfiniteScroll
