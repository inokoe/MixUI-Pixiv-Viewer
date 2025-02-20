import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons-react'
import { memo, useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

const FullScreenButton = memo(
  ({ className, toggleFullscreen }: { className?: string; toggleFullscreen: () => void }) => {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const handleToggleFullscreen = useCallback(() => {
      setIsFullscreen(prev => !prev)
      toggleFullscreen()
    }, [toggleFullscreen])

    return (
      <div
        className={cn(
          'absolute w-auto h-auto px-3 py-1.5 gap-2 rounded-lg bg-gray-900/50 backdrop-blur-sm flex items-center justify-center',
          className
        )}
        onClick={handleToggleFullscreen}
      >
        {isFullscreen ? (
          <IconArrowsMinimize className='w-4 h-4 text-gray-200' />
        ) : (
          <IconArrowsMaximize className='w-4 h-4 text-gray-200' />
        )}
      </div>
    )
  }
)

FullScreenButton.displayName = 'ImageCounter'

export default FullScreenButton
