import { cn } from '@/lib/utils'
import { memo } from 'react'

interface H2TitleProps {
  children: React.ReactNode
  className?: string
}

/**
 * H2 标题组件
 * 用于显示二级标题，带有动画效果和暗色模式支持
 */
const H2Title = memo<H2TitleProps>(({ children, className }) => {
  return (
    <h2
      className={cn(
        'text-lg font-bold bg-white dark:bg-slate-600',
        'animate-pulse p-1 rounded-lg',
        className
      )}
    >
      {children}
    </h2>
  )
})

H2Title.displayName = 'H2Title'

export default H2Title
