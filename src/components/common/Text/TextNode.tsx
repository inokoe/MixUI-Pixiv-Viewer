import { memo } from 'react'
import { cn } from '@/lib/utils'

interface TextNodeProps {
  label: string
  value: string
  className?: string
}

/**
 * 文本节点组件
 * 用于显示带标签的文本值，支持溢出省略
 */
const TextNode = memo<TextNodeProps>(({ label, value, className }) => {
  return (
    <div
      data-label={label}
      className={cn(
        'w-full text-ellipsis overflow-hidden whitespace-nowrap text-center',
        className
      )}
      title={value} // 添加 title 属性以支持鼠标悬停显示完整内容
    >
      <span className='font-bold'>{value}</span>
    </div>
  )
})

TextNode.displayName = 'TextNode'

export default TextNode
