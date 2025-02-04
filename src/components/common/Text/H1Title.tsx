import { memo } from 'react'
import { cn } from '@/lib/utils'

interface H1TitleProps {
  title: string
  className?: string
}

/**
 * H1 标题组件
 * 用于显示一级标题，支持自定义样式
 */
const H1Title = memo<H1TitleProps>(({ title, className }) => {
  return <h1 className={cn('text-2xl font-bold text-center pt-2 mb-3', className)}>{title}</h1>
})

H1Title.displayName = 'H1Title'

export default H1Title
