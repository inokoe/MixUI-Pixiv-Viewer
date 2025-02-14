import { startTransition, useEffect } from 'react'

const usePreloadImage = (preload: string, isLoading: boolean) => {
  useEffect(() => {
    const preloadImg = new Image()

    const preloadImage = async (preload: string) => {
      preloadImg.src = preload
      try {
        // const start = Date.now()
        await preloadImg.decode()
        // const decodeTime = Date.now() - start
        // console.log('图片预解码耗时:', decodeTime)
      } catch (error) {
        console.warn('图片预解码失败:', error)
      }
    }

    if (preload && isLoading) {
      startTransition(() => {
        preloadImage(preload)
      })
    }

    return () => {
      preloadImg.src = ''
    }
  }, [preload, isLoading])
}

export default usePreloadImage
