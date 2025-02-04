import { memo, useMemo } from 'react'
import { cn } from '@/lib/utils'
import SkeletonImage from '@/components/common/Image/SkeletonImage'

interface PhotoListProps {
  /** 图片列表 */
  list: string[]
  /** 自定义样式类名 */
  className?: string
}

/**
 * 照片列表组件
 * 用于展示一组带有骨架屏加载效果的图片
 * 使用 useMemo 优化列表渲染性能
 */
const PhotoList = memo<PhotoListProps>(({ list, className }) => {
  // 缓存图片列表渲染结果
  const photoItems = useMemo(() => {
    return list.map((item, index) => (
      <div
        className='w-6 h-6 overflow-hidden flex items-center justify-center'
        key={`${item}-${index}`}
      >
        <SkeletonImage
          src={item}
          className='w-full h-full object-contain'
        />
      </div>
    ))
  }, [list])

  return (
    <div
      className={cn('flex flex-wrap gap-2 sm:gap-4 pt-2 pb-2 justify-start', className)}
      role='list'
      aria-label='Technology stack icons'
    >
      {photoItems}
    </div>
  )
})

PhotoList.displayName = 'PhotoList'

export default PhotoList
