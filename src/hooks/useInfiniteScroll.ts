import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollProps {
  mode: string
  onIntersect: () => void
  hasData: boolean
  lastIndex: number
}

export const useInfiniteScroll = ({
  mode,
  onIntersect,
  hasData,
  lastIndex,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIntersect()
          observerRef.current?.unobserve(entry.target)
        }
      })
    },
    [onIntersect]
  )

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(handleIntersection)

    const observer = observerRef.current
    if (observer && hasData && lastIndex >= 0) {
      const frameId = requestAnimationFrame(() => {
        const observeMark = document.querySelector<HTMLElement>(`[data-ref="observeMark-${mode}"]`)
        if (observeMark) {
          observer.observe(observeMark)
        }
      })

      return () => {
        cancelAnimationFrame(frameId)
        observer.disconnect()
      }
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [handleIntersection, lastIndex, mode, hasData])
}
