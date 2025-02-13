import React, { useRef, memo, startTransition } from 'react'
import { cn } from '@/lib/utils'
import ImageCounter from '../ImageCounter'
import ImageNavBar from '../ImageNavBar'
import SkeletonLoading from '../Loading/SkeletonLoading'
import usePreloadImage from '@/hooks/usePreloadImage'
import useSkeletonImageLoad from '@/hooks/useSkeletonImageLoad'

/**
 * 创建全局共享的 IntersectionObserver
 * 用于监听图片元素是否进入视口，实现懒加载
 */
const imageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLElement
      const img = target.querySelector('img')
      const src = img?.dataset.src

      if (img && src) {
        startTransition(() => {
          const start = Date.now()
          img.src = src

          // 图片加载成功时的处理
          img.onload = () => {
            img.classList.remove('invisible')
            img.classList.replace('opacity-0', 'opacity-1')
            img.classList.replace('blur-sm', 'blur-0')
            target.dispatchEvent(
              new CustomEvent('imageLoaded', {
                detail: { time: Date.now() - start, success: true },
              })
            )
          }

          // 图片加载失败时的处理
          img.onerror = () => {
            target.dispatchEvent(
              new CustomEvent('imageLoaded', {
                detail: { time: Date.now() - start, success: false },
              })
            )
          }
        })
      }
      imageObserver.unobserve(entry.target)
    }
  })
})

interface ImageProps {
  src: string
  width?: number
  height?: number
  className?: string
  alt?: string
  style?: React.CSSProperties
  onClick?: () => void
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  isObserver?: boolean
  countLength?: number
  countIndex?: number
  countClassName?: string
  imgDownloadInfo?: {
    original: string
    large: string
    medium: string
  }
  preload?: string
}

/**
 * 带有骨架屏和懒加载功能的图片组件
 * @param props ImageProps - 图片属性
 * @returns React组件
 */
const SkeletonImage = memo<ImageProps>(
  ({
    src,
    className,
    alt = 'image',
    style,
    onClick,
    objectFit = 'cover',
    isObserver = true,
    countLength,
    countIndex,
    countClassName,
    imgDownloadInfo,
    preload,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { isLoading } = useSkeletonImageLoad({
      src,
      isObserver,
      containerRef,
      imageObserver,
    })

    // 预加载图片
    usePreloadImage(preload || '', isLoading)

    return (
      <div
        ref={containerRef}
        className={cn(
          'h-full w-full overflow-hidden hover:cursor-pointer relative will-change-transform',
          className
        )}
        style={style}
      >
        {/* 加载时显示骨架屏 */}
        {!isLoading && (
          <SkeletonLoading
            className='h-full w-full'
            showMsg={imgDownloadInfo ? true : false}
          />
        )}
        {/* 图片容器 */}
        <div className='h-full w-full flex flex-col overflow-hidden select-none'>
          <img
            data-src={src}
            src={!isObserver ? src : ''}
            alt={alt}
            onClick={onClick}
            className={cn(
              'h-full w-full transition-all duration-700 ease-in-out',
              !isObserver ? 'opacity-1 blur-0 visible' : 'opacity-0 invisible blur-sm',
              `object-${objectFit}`
            )}
          />
        </div>
        {countLength && countIndex !== undefined && (
          <ImageCounter
            index={countIndex || 0}
            length={countLength}
            className={countClassName || 'top-3 right-3'}
          />
        )}
        {imgDownloadInfo && <ImageNavBar imgDownloadInfo={imgDownloadInfo} />}
      </div>
    )
  }
)

SkeletonImage.displayName = 'SkeletonImage'

export default SkeletonImage
