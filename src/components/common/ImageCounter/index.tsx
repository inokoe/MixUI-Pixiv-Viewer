import { IconPhotoScan } from '@tabler/icons-react'
import { memo } from 'react'
import { cn } from '@/lib/utils'
const ImageCounter = memo(
  ({ index, length, className }: { index: number; length: number; className?: string }) => {
    return (
      <div
        className={cn(
          'absolute w-auto h-auto px-3 py-1.5 gap-2 rounded-lg bg-gray-900/50 backdrop-blur-sm flex items-center justify-center',
          className
        )}
      >
        <IconPhotoScan className='w-4 h-4 text-gray-200' />
        <p className='text-sm font-medium text-gray-200'>
          {length === 1 ? '1' : `${index + 1}/${length}`}
        </p>
      </div>
    )
  }
)

ImageCounter.displayName = 'ImageCounter'

export default ImageCounter
