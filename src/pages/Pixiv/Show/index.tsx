import PixivCarousel from '@/components/Pixiv/Carousel'
import useShowData from '@/hooks/useShowData'
import Skeleton from '@/components/ui/skeleton'
import { DataContext } from './context'
import PixivShowDetail from '@/components/Pixiv/ShowDetail'
import { memo, useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

const PixivShowBody = memo(() => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev)
  }, [])

  return (
    <div
      className={cn(
        'flex flex-col xl:flex-row w-full h-full rounded-lg gap-4 overflow-y-scroll overflow-x-hidden scrollbar-hide p-4',
        isFullscreen && 'overflow-y-hidden flex-1 h-auto gap-0 pb-10 xl:pb-0'
      )}
    >
      <div
        className={cn(
          'w-full h-4/5 xl:h-full xl:w-2/3 flex-shrink-0 rounded-lg flex  justify-center items-center overflow-hidden bg-slate-100 dark:bg-zinc-800 backdrop-blur-sm transition-all duration-300 ease-in-out',
          isFullscreen && 'h-full w-full xl:w-full xl:h-full'
        )}
      >
        <PixivCarousel toggleFullscreen={toggleFullscreen} />
      </div>
      <div
        className={cn(
          'w-full h-auto xl:w-1/3 xl:h-full flex-shrink-0 rounded-lg bg-slate-100 dark:bg-zinc-800 backdrop-blur-sm will-change-transform transition-all duration-300 ease-in-out',
          isFullscreen && 'translate-x-full ml-56'
        )}
      >
        <PixivShowDetail />
      </div>
    </div>
  )
})

PixivShowBody.displayName = 'PixivShowBody'

const PixivShow = memo(() => {
  const data = useShowData()

  return (
    <DataContext.Provider value={data}>
      {!data && <Skeleton className='w-full h-full' />}
      {data && <PixivShowBody />}
    </DataContext.Provider>
  )
})

PixivShow.displayName = 'PixivShow'

export default PixivShow
