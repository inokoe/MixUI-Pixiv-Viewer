import { memo } from 'react'
import { cn } from '@/lib/utils'
import parse, { HTMLReactParserOptions, Element, domToReact, DOMNode } from 'html-react-parser'

interface RichTextProps {
  content: string
  className?: string
}

const RichText = memo(({ content, className }: RichTextProps) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === 'a') {
        const { children, attribs } = domNode
        return (
          <a
            {...attribs}
            className='font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors'
          >
            {domToReact(children as DOMNode[])}
          </a>
        )
      }
      if (domNode instanceof Element && domNode.name === 'br') {
        return <br className='my-1.5' />
      }
    },
  }

  return (
    <div
      className={cn(
        'text-gray-600 dark:text-gray-300 leading-relaxed break-words space-y-1.5',
        className
      )}
    >
      {parse(content, options)}
    </div>
  )
})

RichText.displayName = 'RichText'

export default RichText
