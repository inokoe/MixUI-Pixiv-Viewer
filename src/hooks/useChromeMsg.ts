import { useEffect, useCallback } from 'react'
import { toast } from 'sonner'

const useChromeMsg = () => {
  const checkBrowser = useCallback(() => {
    // 判断是否是Chrome浏览器（包括移动版）
    const userAgent = navigator.userAgent.toLowerCase()
    const isChrome = userAgent.includes('chrome') || userAgent.includes('crios')
    if (!isChrome) {
      toast('推荐Chrome浏览器', {
        description: '以获得最佳的兼容性与性能⚡️',
      })
    }
    return isChrome
  }, [])

  useEffect(() => {
    checkBrowser()
  }, [checkBrowser])

  return { checkBrowser }
}

export default useChromeMsg
