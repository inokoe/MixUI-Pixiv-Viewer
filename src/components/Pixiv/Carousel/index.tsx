import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import SkeletonImage from '@/components/common/Image/SkeletonImage'
import { useCallback, useContext, useMemo } from 'react'
import { DataContext } from '@/pages/Pixiv/Show/context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { memo } from 'react'

const PixivCarousel = memo(({ className }: { className?: string }) => {
  const data = useContext(DataContext)
  const imageQuality = useSelector((state: RootState) => state.performance.imageLoadQuality.quality)
  const isQualityAutoSwitch = useSelector(
    (state: RootState) => state.setting.imageQualityAdaptation.checked
  )

  const imageSrc = useMemo(() => {
    const image_urls: Array<{ original: string; large: string; medium: string }> = []

    if (!data) return image_urls
    if (data.meta_pages && data.meta_pages.length > 0) {
      for (const item of data.meta_pages) {
        const params = {
          original: item.image_urls.original || '',
          large: item.image_urls.large || '',
          medium: item.image_urls.medium || '',
        }
        image_urls.push(params)
      }
    } else if (data.meta_single_page) {
      const params = {
        original: data.meta_single_page.original_image_url || '',
        large: data.image_urls.large || '',
        medium: data.image_urls.medium || '',
      }
      image_urls.push(params)
    }

    return image_urls
  }, [data])

  const imgSrc = useCallback(
    (item: { original: string; large: string; medium: string }) => {
      if (isQualityAutoSwitch) {
        return item.original
      }
      return imageQuality === 'high'
        ? item.original
        : imageQuality === 'mid'
        ? item.large
        : item.medium
    },
    [imageQuality, isQualityAutoSwitch]
  )

  return (
    <div className={cn('w-full h-full relative', className)}>
      <Carousel className='w-full h-full [&>div]:h-full'>
        <CarouselContent className='h-full [&>div]:h-full'>
          {imageSrc.length > 0
            ? imageSrc.map((item, index) => (
                <CarouselItem
                  key={index}
                  className='h-full basis-full'
                >
                  <div className='h-full w-full p-0'>
                    <Card className='h-full w-full rounded-none border-0'>
                      <CardContent className='flex items-center justify-center p-0 h-full w-full bg-slate-100 dark:bg-zinc-800'>
                        <SkeletonImage
                          className='w-full h-full'
                          objectFit='contain'
                          src={imgSrc(item)}
                          isObserver={true}
                          countLength={imageSrc.length}
                          countIndex={index}
                          imgDownloadInfo={item}
                          countClassName='top-3 right-3 animate-slide-down duration-500 ease-in-out'
                          preload={index === imageSrc.length - 1 ? '' : imgSrc(imageSrc[index + 1])}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : null}
        </CarouselContent>
        <div className='absolute left-2 top-1/2 -translate-y-1/2 z-10'>
          <CarouselPrevious className='relative left-0 translate-y-0' />
        </div>
        <div className='absolute right-2 top-1/2 -translate-y-1/2 z-10'>
          <CarouselNext className='relative right-0 translate-y-0' />
        </div>
      </Carousel>
    </div>
  )
})

PixivCarousel.displayName = 'PixivCarousel'

export default PixivCarousel
