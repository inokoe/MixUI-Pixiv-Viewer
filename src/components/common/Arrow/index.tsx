import { memo } from 'react'
import { cn } from '@/lib/utils'

interface ArrowProps {
  /** 箭头方向: 'left' | 'right' | 'top' | 'bottom' */
  position?: string
  /** 自定义样式类名 */
  className?: string
  /** 子元素 */
  children: React.ReactNode
  /** 点击事件处理函数 */
  onClick?: () => void
}

/**
 * 箭头组件
 * 用于显示带有渐变遮罩效果的方向指示器
 * 支持自定义样式和点击事件
 */
const Arrow = memo<ArrowProps>(({ position = 'left', className, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'absolute h-full flex items-center z-50',
        'from-white dark:from-black to-gray-100 dark:to-gray-900',
        className
      )}
      style={{
        maskImage: `linear-gradient(to ${position}, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`,
        WebkitMaskImage: `linear-gradient(to ${position}, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`, // 添加 webkit 前缀以提高兼容性
      }}
      role='button'
      aria-label={`Scroll to ${position}`}
    >
      {children}
    </div>
  )
})

Arrow.displayName = 'Arrow'

export default Arrow
