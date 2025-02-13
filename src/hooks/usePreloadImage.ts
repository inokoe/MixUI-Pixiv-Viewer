import { startTransition, useEffect } from 'react'

const preloadImg = new Image()

const usePreloadImage = (preload: string, isLoading: boolean) => {
  useEffect(() => {
    const preloadImage = (preload: string) => {
      preloadImg.src = preload
    }

    if (preload && isLoading) {
      startTransition(() => {
        preloadImage(preload)
      })
    }
  }, [preload, isLoading])
}

export default usePreloadImage
