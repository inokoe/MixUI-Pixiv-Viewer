import { toastMsg } from '@/utils/pixiv/Tools'
import { useEffect } from 'react'

const useChromeMsg = () => {
  useEffect(() => {
    // 判断是否是Chrome浏览器（包括移动版）
    const userAgent = navigator.userAgent.toLowerCase()
    const isChrome = userAgent.includes('chrome') || userAgent.includes('crios')
    if (!isChrome) {
      toastMsg('推荐Chrome浏览器', '以获得最佳的兼容性与性能⚡️')
    }
  }, []) // 空依赖数组，确保只在组件挂载时执行一次

  return {}
}

export default useChromeMsg
