import { memo } from 'react'
import { cn } from '@/lib/utils'
import { HoverBorderGradient } from '@components/ui/hover-border-gradient'

interface HoverBorderGradientButtonProps {
  /** 按钮图标 */
  icon?: React.ReactNode
  /** 按钮文本 */
  text: string
  /** 容器自定义样式 */
  className?: string
  /** 按钮自定义样式 */
  buttonClassName?: string
  /** 点击事件处理函数 */
  onClick?: () => void
}

/**
 * 悬停边框渐变按钮组件
 * 支持图标、文本、自定义样式和点击事件
 * 自动适应暗色模式
 */
const HoverBorderGradientButton = memo<HoverBorderGradientButtonProps>(
  ({ text, icon, className, buttonClassName, onClick }) => {
    return (
      <div className={cn('flex justify-center text-center', className)}>
        <HoverBorderGradient
          containerClassName='rounded-2xl'
          as='button'
          className={cn(
            'dark:bg-black bg-white text-black dark:text-white',
            'flex items-center space-x-2 p-1',
            'transition-colors duration-200',
            'hover:bg-gray-50 dark:hover:bg-gray-900',
            buttonClassName
          )}
          onClick={onClick}
        >
          {icon && <span className='flex items-center'>{icon}</span>}
          <span className='text-sm font-medium'>{text}</span>
        </HoverBorderGradient>
      </div>
    )
  }
)

HoverBorderGradientButton.displayName = 'HoverBorderGradientButton'

export default HoverBorderGradientButton
