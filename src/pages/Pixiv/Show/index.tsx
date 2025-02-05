import PixivCarousel from '@/components/Pixiv/Carousel'
import useShowData from '@/hooks/useShowData'
import Skeleton from '@/components/ui/skeleton'
import { DataContext } from './context'
import PixivShowDetail from '@/components/Pixiv/ShowDetail'
import { memo } from 'react'

const PixivShowBody = memo(() => {
  return (
    <div className='flex flex-col xl:flex-row w-full h-full rounded-lg gap-4 overflow-auto scrollbar-hide p-4'>
      <div className='w-full h-4/5 xl:h-full xl:w-2/3 flex-shrink-0 rounded-lg flex  justify-center items-center overflow-hidden bg-slate-100 dark:bg-zinc-800 backdrop-blur-sm'>
        <PixivCarousel />
      </div>
      <div className='w-full h-auto xl:w-1/3 xl:h-full flex-shrink-0 rounded-lg bg-slate-100 dark:bg-zinc-800 backdrop-blur-sm'>
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
