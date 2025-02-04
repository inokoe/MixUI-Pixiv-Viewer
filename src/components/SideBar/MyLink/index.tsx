import { useSidebar } from '@/components/ui/sidebar'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

// 定义 LinkProps 类型，允许传入 href 和其他普通的 HTML 属性
interface LinkProps {
  to: string
  className: string
  children: React.ReactNode
}

const MyLink: React.FC<LinkProps> = memo(({ to, className, children }) => {
  const { setOpen } = useSidebar()
  return (
    <Link
      to={to}
      className={className}
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  )
})

export default MyLink
