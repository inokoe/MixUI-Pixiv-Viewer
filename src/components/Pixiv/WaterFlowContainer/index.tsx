import { memo } from 'react'
import ImageContainer from '../ImageContainer/ImageContainer'
import Skeleton from '@/components/ui/skeleton'
import { Illust, PixivRankParams } from '@/api/http/base.types'
import { useWaterFlowData } from '@/hooks/useWaterFlowData'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

interface Props {
  mode: PixivRankParams['mode'] | 'search' | 'history'
  date: string
  propData?: Illust[]
  observerFunc?: () => void
}

const WaterFlowContainer = memo(({ mode, date, propData, observerFunc }: Props) => {
  // 获取瀑布流数据
  const { data, lastIndex, loadMoreData } = useWaterFlowData({
    mode,
    date,
    propData,
    observerFunc,
  })

  // 使用无限滚动钩子
  useInfiniteScroll({
    mode,
    onIntersect: loadMoreData,
    hasData: data.length > 0,
    lastIndex,
  })

  return (
    <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
      {data.length === 0 ? (
        <div className='col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-4 xl:col-span-5'>
          <Skeleton className='w-full h-screen' />
        </div>
      ) : (
        data.map((item, index) => (
          <div
            key={item.id}
            data-ref={index === lastIndex ? `observeMark-${mode}` : undefined}
            className='overflow-hidden rounded-lg h-72 sm:h-72 md:h-80 lg:h-80 xl:h-80'
          >
            <ImageContainer
              ImgSrc={item.image_urls.square_medium}
              AvatarSrc={item.user.profile_image_urls.medium}
              Title={item.title}
              UserName={item.user.name}
              fullData={item}
            />
          </div>
        ))
      )}
    </div>
  )
})

WaterFlowContainer.displayName = 'WaterFlowContainer'

export default WaterFlowContainer
