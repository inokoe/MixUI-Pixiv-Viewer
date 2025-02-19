import React, { useRef, memo } from 'react'
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
        const start = Date.now()
        const MyImage = new Image()

        // 静态判断路由是否在show页面
        const pathname = window.location.pathname
        // 等待时间
        const waitTime = pathname.startsWith('/show/') ? 0 : 0

        const cleanup = () => {
          MyImage.onload = null
          MyImage.onerror = null
          img.onload = null
          img.onerror = null
        }

        const handleError = (flag: boolean) => {
          requestIdleCallback(() => {
            target.dispatchEvent(
              new CustomEvent('imageLoaded', {
                detail: {
                  time: Date.now() - start,
                  success: flag,
                },
              })
            )
          })
          cleanup()
        }

        MyImage.onload = () => {
          new Promise(resolve => setTimeout(resolve, waitTime))
            .then(() => {
              // 如果图片已经加载完成，则不进行解码
              if (MyImage.complete && MyImage.naturalWidth > 0) {
                return Promise.resolve()
              }
              // 如果图片未加载完成，则进行解码
              return MyImage.decode()
            })
            .then(() => {
              img.src = src
              // 使用 Promise 处理图片显示
              return new Promise<void>((resolve, reject) => {
                img.onload = () => {
                  requestAnimationFrame(() => {
                    img.classList.remove('invisible')
                    img.classList.replace('opacity-0', 'opacity-1')
                    img.classList.replace('blur-sm', 'blur-0')
                    resolve()
                  })
                }
                img.onerror = () => reject('显示失败')
              })
            })
            .then(() => {
              handleError(true)
            })
            .catch(() => {
              handleError(false)
            })
            .finally(cleanup)
        }

        MyImage.onerror = () => handleError(false)
        MyImage.src = src
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
              {
                'object-contain': objectFit === 'contain',
                'object-cover': objectFit === 'cover',
                'object-fill': objectFit === 'fill',
                'object-none': objectFit === 'none',
                'object-scale-down': objectFit === 'scale-down',
              }
            )}
            decoding='async'
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
