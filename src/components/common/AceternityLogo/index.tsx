import { memo } from 'react'
import { cn } from '@/lib/utils'

interface AceternityLogoProps {
  className?: string
  width?: number
  height?: number
}

/**
 * Acetermity Logo SVG 组件
 * 支持自定义尺寸和样式，自动适应暗色模式
 */
const AceternityLogo = memo<AceternityLogoProps>(({ className, width = 66, height = 65 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 66 65'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-3 w-3 text-black dark:text-white', className)}
      aria-label='Acetermity Logo'
    >
      <path
        d='M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696'
        stroke='currentColor'
        strokeWidth='15'
        strokeMiterlimit='3.86874'
        strokeLinecap='round'
      />
    </svg>
  )
})

AceternityLogo.displayName = 'AceternityLogo'

export default AceternityLogo
