import { memo } from 'react'
import { cn } from '@/lib/utils'

type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'double'
type DividerThickness = 'thin' | 'medium' | 'thick'

interface DividerProps {
  variant?: DividerVariant
  thickness?: DividerThickness
  className?: string
  children?: React.ReactNode
}

const variantStyles: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
  double: 'border-double',
}

const thicknessStyles: Record<DividerThickness, string> = {
  thin: 'border-t',
  medium: 'border-t-2',
  thick: 'border-t-4',
}

const Divider = memo(({ variant = 'solid', thickness = 'thin', className }: DividerProps) => {
  return (
    <hr
      className={cn(
        'w-full border-gray-200 dark:border-gray-700',
        variantStyles[variant],
        thicknessStyles[thickness],
        className
      )}
    />
  )
})

Divider.displayName = 'Divider'

export default Divider
