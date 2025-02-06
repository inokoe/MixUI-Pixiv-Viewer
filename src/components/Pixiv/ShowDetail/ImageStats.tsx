import { IconEye, IconHeart, IconClockHour1 } from '@tabler/icons-react'
import { memo } from 'react'
import dayjs from 'dayjs'

interface ImageStatsProps {
  totalView: number
  totalBookmarks: number
  createDate: string
}

const ImageStats = memo(({ totalView, totalBookmarks, createDate }: ImageStatsProps) => {
  return (
    <div className='flex gap-2 w-full'>
      <div className='flex-1 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-3'>
        <div className='flex items-center gap-1'>
          <IconEye className='w-4 h-4' />
          {totalView}
        </div>
        <div className='flex items-center gap-1'>
          <IconHeart className='w-4 h-4' />
          {totalBookmarks}
        </div>
        <div className='flex items-center gap-1'>
          <IconClockHour1 className='w-4 h-4' />
          {dayjs(createDate).format('YYYY-MM-DD')}
        </div>
      </div>
    </div>
  )
})

ImageStats.displayName = 'ImageStats'

export default ImageStats
