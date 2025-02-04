import PixivCarousel from '@/components/Pixiv/Carousel'
import useShowData from '@/hooks/useShowData'
import Skeleton from '@/components/ui/skeleton'
import { DataContext } from './context'

const PixivShowBody = () => {
  return (
    <div className='flex flex-row w-full h-full rounded-lg gap-4 overflow-hidden'>
      <div className='w-2/3 h-full flex-shrink-0 rounded-lg flex justify-center items-center overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)] backdrop-blur-sm'>
        <PixivCarousel />
      </div>
      <div className='w-1/3 h-full flex-shrink-0 rounded-lg bg-slate-100'>
        <div className='w-full h-1/6 flex-shrink-0 '>111</div>
        <div className='w-full h-5/6 flex-shrink-0 '>222</div>
      </div>
    </div>
  )
}

const PixivShow = () => {
  const data = useShowData()

  return (
    <DataContext.Provider value={data}>
      {!data && <Skeleton className='w-full h-full' />}
      {data && <PixivShowBody />}
    </DataContext.Provider>
  )
}

export default PixivShow
