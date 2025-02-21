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
          className,
          'animate-slide-up animate-duration-300 ease-in-out'
        )}
        onClick={handleToggleFullscreen}
      >
        <div className=''>
          {isFullscreen ? (
            <IconArrowsMinimize className='w-5 h-5 text-gray-200 animate-opacity-up animate-duration-300 ease-in-out' />
          ) : (
            <IconArrowsMaximize className='w-5 h-5 text-gray-200 animate-opacity-up animate-duration-300 ease-in-out' />
          )}
        </div>
      </div>
    )
  }
)

FullScreenButton.displayName = 'ImageCounter'

export default FullScreenButton
