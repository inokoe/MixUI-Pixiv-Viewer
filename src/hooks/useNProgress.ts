import { MyNProgress } from '@/lib/utils'
import { useEffect, useState } from 'react'

const MiddleNProgress = (isLoading: boolean) => {
  useEffect(() => {
    if (isLoading) {
      MyNProgress.start()
    } else {
      MyNProgress.done()
    }

    return () => {
      MyNProgress.done()
    }
  }, [isLoading])
}

export const useNProgress = () => {
  const [isLoading, setIsLoading] = useState(true)

  // 自动处理进度条
  MiddleNProgress(isLoading)

  useEffect(() => {
    setIsLoading(false)
  }, [])
}
