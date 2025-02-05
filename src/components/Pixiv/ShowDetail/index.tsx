import SkeletonImage from '@/components/common/Image/SkeletonImage'
import Skeleton from '@/components/ui/skeleton'
import { DataContext } from '@/pages/Pixiv/Show/context'
import { useContext } from 'react'
import { IconId, IconUser, IconEye, IconHeart, IconClockHour1, IconLink } from '@tabler/icons-react'
import dayjs from 'dayjs'

const PixivShowDetail = () => {
  const data = useContext(DataContext)
  return data ? (
    <div className='w-full h-full flex flex-col gap-2 p-4'>
      <div className='w-full flex gap-4 items-center'>
        <div className='h-8 w-8 rounded-full overflow-hidden'>
          <SkeletonImage src={data.user.profile_image_urls.medium} />
        </div>
        <div className='flex-1 flex flex-col'>
          <div className='text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1'>
            <IconUser className='w-4 h-4' />
            {data.user.name}
            <IconId className='w-4 h-4' />
            {data.user.id}
          </div>
        </div>
      </div>
      <div className='text-xl font-semibold flex items-center gap-1 text-gray-900 dark:text-gray-100'>
        <div className='flex-1 line-clamp-2'>{data.title}</div>
      </div>
      <div className='flex gap-2 w-full'>
        <div className='flex-1 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-3'>
          <div className='flex items-center gap-1'>
            <IconEye className='w-4 h-4' />
            {data.total_view}
          </div>
          <div className='flex items-center gap-1'>
            <IconHeart className='w-4 h-4' />
            {data.total_bookmarks}
          </div>
          <div className='flex items-center gap-1'>
            <IconClockHour1 className='w-4 h-4' />
            {dayjs(data.create_date).format('YYYY-MM-DD')}
          </div>
        </div>
      </div>
      <div className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'>
        <IconLink className='w-4 h-4' />
        <a
          href={`https://pixiv.net/artworks/${data.id}`}
          target='_blank'
          rel='noreferrer'
          className='hover:underline truncate'
        >
          {`https://pixiv.net/artworks/${data.id}`}
        </a>
      </div>
    </div>
  ) : (
    <Skeleton className='w-full h-full' />
  )
}

export default PixivShowDetail
