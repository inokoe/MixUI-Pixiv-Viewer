import { useEffect, useRef, useState, memo, useCallback } from 'react'
import { useRankData, isRankMode } from '@/hooks/useRankData'
import ImageContainer from '../ImageContainer/ImageContainer'
import Skeleton from '@/components/ui/skeleton'
import { Illust, PixivRankParams } from '@/api/http/base.types'

/**
 * WaterFlowContainer 组件的属性接口
 */
interface Props {
  /** 展示模式：排行榜模式或搜索模式 */
  mode: PixivRankParams['mode'] | 'search' | 'history'
  /** 日期字符串，用于获取特定日期的排行榜数据 */
  date: string
  /** 搜索模式下的图片数据 */
  propData?: Illust[]
  /** 搜索模式下加载更多数据的回调函数 */
  observerFunc?: () => void
}

/**
 * 瀑布流容器组件
 * 用于展示 Pixiv 图片列表，支持无限滚动加载
 * 可用于展示排行榜数据或搜索结果
 */
const WaterFlowContainer = memo(({ mode, date, propData, observerFunc }: Props) => {
  // 当前页码
  const [page, setPage] = useState<number>(1)
  // 交叉观察器引用
  const observerRef = useRef<IntersectionObserver | null>(null)

  // 获取排行榜数据
  const rankData = useRankData(mode, date, page)
  // 根据模式选择数据源
  const data = !isRankMode(mode) ? propData || [] : rankData || []
  const lastIndex = data.length - 1

  /**
   * 处理交叉观察回调
   * 当最后一个元素进入视口时，加载更多数据
   */
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 增加页码
          setPage(prev => prev + 1)
          // 搜索模式下调用搜索函数
          if (observerFunc) {
            observerFunc()
          }
          // 取消观察当前元素
          observerRef.current?.unobserve(entry.target)
        }
      })
    },
    [mode, observerFunc]
  )

  // 初始化和清理交叉观察器
  useEffect(() => {
    // 清理之前的 observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // 创建新的 observer
    observerRef.current = new IntersectionObserver(handleIntersection)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [handleIntersection])

  // 观察最后一个元素
  useEffect(() => {
    const observer = observerRef.current
    if (observer && data.length > 0 && lastIndex >= 0) {
      observer.disconnect()

      // 使用 requestAnimationFrame 确保 DOM 更新后再观察
      const frameId = requestAnimationFrame(() => {
        const observeMark = document.querySelector<HTMLElement>(`[data-ref="observeMark-${mode}"]`)
        if (observeMark) {
          observer.observe(observeMark)
        }
      })

      // 清理函数中取消未执行的动画帧
      return () => cancelAnimationFrame(frameId)
    }
  }, [lastIndex, mode, data.length])

  return (
    <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
      {/* 加载状态显示骨架屏 */}
      {data.length === 0 ? (
        <div className='col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5'>
          <Skeleton className='w-full h-screen' />
        </div>
      ) : (
        // 渲染图片网格
        data.map((item, index) => (
          <div
            key={item.id}
            data-ref={index === lastIndex ? `observeMark-${mode}` : undefined}
            className='overflow-hidden rounded-lg h-96'
          >
            <ImageContainer
              ImgSrc={item.image_urls.square_medium}
              AvatarSrc={item.user.profile_image_urls.medium}
              Title={item.title}
              UserName={item.user.name}
              fullData={item}
            />
          </div>
        ))
      )}
    </div>
  )
})

WaterFlowContainer.displayName = 'WaterFlowContainer'

export default WaterFlowContainer
