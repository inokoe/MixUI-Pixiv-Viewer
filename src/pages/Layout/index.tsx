import React, { useState, memo } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar, SidebarBody } from '@components/ui/sidebar'
import SideBarFooter from '@/components/SideBar/SideBarFooter'
import SideBarMenu from '@/components/SideBar/SideBarMenu'
import { Outlet } from 'react-router-dom'
import useChromeMsg from '@/hooks/useChromeMsg'

interface LayoutProps {
  /** 子元素 */
  children?: React.ReactNode
}

/**
 * 主布局组件
 * 包含侧边栏和主内容区域
 * 负责整体布局和响应式处理
 */
const Layout = memo<LayoutProps>(() => {
  // 控制侧边栏展开/收起状态
  const [open, setOpen] = useState<boolean>(false)

  // 检查浏览器兼容性
  useChromeMsg()

  return (
    <div
      className={cn(
        // 基础布局样式
        'flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800',
        'w-screen flex-1 h-full',
        // 边框和溢出控制
        'border border-neutral-200 dark:border-neutral-700',
        'overflow-hidden'
      )}
      role='main'
    >
      {/* 侧边栏区域 */}
      <Sidebar
        open={open}
        setOpen={setOpen}
      >
        <SidebarBody className='justify-between gap-10'>
          <SideBarMenu open={open} />
          <SideBarFooter />
        </SidebarBody>
      </Sidebar>

      {/* 主内容区域 */}
      <div
        className='h-[calc(100%-40px)] md:h-full flex-1 overflow-x-hidden animate-slide-up scrollbar-hide'
        role='region'
        aria-label='Main content'
      >
        <Outlet />
      </div>
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout
