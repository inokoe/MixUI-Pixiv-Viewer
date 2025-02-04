import { memo, useCallback, useState } from 'react'
import SkeletonImage from '@components/common/Image/SkeletonImage'
import { Illust } from '@/api/http/base.types'
import { useDispatch } from 'react-redux'
import { setShowHistory } from '@/store/reducers/pixiv'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface ImageContainerProps {
  ImgSrc: string
  AvatarSrc: string
  Title: string
  UserName: string
  fullData?: Illust
  className?: string
}

const ImageContainer = memo(
  ({ ImgSrc, AvatarSrc, Title, UserName, fullData, className }: ImageContainerProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [mouseDownPos, setMouseDownPos] = useState<{ x: number; y: number } | null>(null)
    const CLICK_THRESHOLD = 5 // 点击判定阈值（像素）

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      setMouseDownPos({ x: e.clientX, y: e.clientY })
    }, [])

    const handleMouseUp = useCallback(
      (e: React.MouseEvent) => {
        if (!mouseDownPos) return

        const deltaX = Math.abs(e.clientX - mouseDownPos.x)
        const deltaY = Math.abs(e.clientY - mouseDownPos.y)

        // 如果移动距离小于阈值，则认为是点击
        if (deltaX < CLICK_THRESHOLD && deltaY < CLICK_THRESHOLD) {
          async function navigateToShow() {
            if (fullData) {
              await dispatch(setShowHistory(fullData))
              navigate(`/show/${fullData.id}`)
            }
          }
          navigateToShow()
        }

        setMouseDownPos(null)
      },
      [dispatch, fullData, mouseDownPos]
    )

    return (
      <div className='rounded-xl flex-1 flex flex-col h-[100%] cursor-pointer'>
        <div
          className={cn('flex-1 rounded-xl overflow-hidden relative', className)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div className='h-[100%] w-[100%] absolute left-0 top-0 z-40 bg-transparent hover:bg-gray-50/30 transition-all duration-300'></div>
          <SkeletonImage src={ImgSrc} />
        </div>
        <div className='pt-1 pl-1 flex flex-col gap-1 justify-center'>
          <div className='text truncate w-full'>{Title || '无题'}</div>
          <div className='text-sm flex gap-1'>
            <div className='h-5 w-5 rounded-xl overflow-hidden'>
              <SkeletonImage src={AvatarSrc} />
            </div>
            <div className='flex-1 truncate'>
              <i>{UserName || '无名'}</i>
            </div>
          </div>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.ImgSrc === nextProps.ImgSrc &&
      prevProps.AvatarSrc === nextProps.AvatarSrc &&
      prevProps.Title === nextProps.Title &&
      prevProps.UserName === nextProps.UserName
    )
  }
)

ImageContainer.displayName = 'ImageContainer'

export default ImageContainer
