import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import MyArrow from '@/components/common/Arrow'
import ImageContainer from '../ImageContainer/ImageContainer'
import Skeleton from '@/components/ui/skeleton'
import { memo } from 'react'
import { useRankData } from '@/hooks/useRankData'
import { PixivRankParams } from '@/api/http/base.types'

/**
 * ScrollContainer 组件的属性接口
 * 继承自 PixivRankParams 的 mode 属性
 */
interface ScrollContainerProps extends Pick<PixivRankParams, 'mode'> {
  /** 日期字符串，用于获取特定日期的排行榜数据 */
  date: string
}

/**
 * 横向滚动容器组件
 * 用于展示 Pixiv 排行榜图片，支持拖拽滚动和箭头导航
 */
const ScrollContainer = memo(({ mode, date }: ScrollContainerProps) => {
  // 容器和拖拽相关的 ref
  const container = useRef<HTMLDivElement>(null)
  const dragStart = useRef(0)
  const scrollStart = useRef(0)

  // 组件状态
  const [init, setInit] = useState(false) // 初始化状态
  const [isDragging, setIsDragging] = useState(false) // 是否正在拖拽
  const [showArrows, setShowArrows] = useState({ left: false, right: true }) // 箭头显示状态

  // 获取排行榜数据
  const rankData = useRankData(mode, date, 1)
  const data = rankData || []

  // 处理滚动位置，控制箭头显示
  const handleScroll = useCallback(() => {
    const target = container.current
    if (!target) return

    const { scrollLeft, scrollWidth, clientWidth } = target
    setShowArrows({
      left: scrollLeft > 0, // 左侧可滚动
      right: scrollWidth - scrollLeft - clientWidth > 0, // 右侧可滚动
    })
  }, [])

  // 处理箭头点击滚动
  const scrollByArrow = (direction: 'left' | 'right') => {
    const target = container.current
    if (!target) return

    // 每次滚动容器宽度的 60%
    const moveDistance = target.clientWidth * 0.6
    const newPosition = target.scrollLeft + (direction === 'left' ? -moveDistance : moveDistance)

    target.scrollTo({ left: Math.max(0, newPosition), behavior: 'smooth' })
  }

  // 拖动开始处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!container.current) return
    setIsDragging(true)
    dragStart.current = e.clientX
    scrollStart.current = container.current.scrollLeft
  }

  // 拖动过程处理
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !container.current) return
    e.preventDefault()
    container.current.scrollLeft = scrollStart.current + (dragStart.current - e.clientX)
  }

  // 初始化数据加载完成后设置状态
  useEffect(() => {
    if (!init && data.length > 0) setInit(true)
  }, [data, init])

  // 监听滚动事件
  useEffect(() => {
    const target = container.current
    if (!target) return

    target.addEventListener('scroll', handleScroll)
    return () => target.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // 渲染导航箭头
  const renderArrow = (direction: 'left' | 'right') => (
    <MyArrow
      className={cn(
        'absolute top-0',
        direction === 'left' ? 'left-0 pl-2' : 'right-0 pl-8',
        direction === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l',
        'from-white/80 to-transparent dark:from-neutral-900/80',
        'w-16 h-full invisible opacity-0 transition-all duration-300',
        showArrows[direction] && 'visible opacity-100'
      )}
      position={direction === 'left' ? 'right' : 'left'}
      onClick={() => scrollByArrow(direction)}
    >
      {direction === 'left' ? (
        <IconArrowLeft className='rounded-2xl bg-gray-400 dark:bg-zinc-100/20' />
      ) : (
        <IconArrowRight className='rounded-2xl bg-gray-400 dark:bg-zinc-100/20' />
      )}
    </MyArrow>
  )

  return (
    <div className='relative flex gap-2 h-auto w-full overflow-x-scroll scrollbar-hide rounded-lg flex-shrink-0 pb-3'>
      {/* 初始化完成后显示导航箭头 */}
      {init && (
        <>
          {renderArrow('left')}
          {renderArrow('right')}
        </>
      )}

      {/* 图片滚动容器 */}
      <div
        ref={container}
        className={cn(
          'flex gap-2 w-full h-96 overflow-x-scroll scrollbar-hide relative rounded-lg',
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* 加载状态显示骨架屏 */}
        {!init ? (
          <Skeleton className='w-full h-full' />
        ) : (
          // 渲染图片列表
          data.map(({ id, title, image_urls, user }, index) => (
            <div
              key={id}
              className='h-96 min-h-96 w-1/2 md:w-1/5 lg:w-1/6 rounded-lg flex-shrink-0'
            >
              <ImageContainer
                ImgSrc={image_urls.square_medium}
                AvatarSrc={user.profile_image_urls.medium}
                Title={title}
                UserName={user.name}
                fullData={data[index]}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
})

ScrollContainer.displayName = 'ScrollContainer'

export default ScrollContainer
