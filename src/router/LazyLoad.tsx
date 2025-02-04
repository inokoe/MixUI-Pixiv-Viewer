import { memo, lazy } from 'react'
import H2Title from '@/components/common/Text/H2Title'
import Skeleton from '@/components/ui/skeleton'
import PageLayout from '@/pages/Layout/PageLayout'

/**
 * 懒加载组件配置
 * 使用 React.lazy 实现代码分割
 */

// 性能监控页面
const Performance = lazy(() => import(/* webpackChunkName: "performance" */ '@/pages/Performance'))

// 关于页面
const About = lazy(() => import(/* webpackChunkName: "about" */ '@/pages/About'))

// 设置页面
const Setting = lazy(() => import(/* webpackChunkName: "setting" */ '@/pages/Setting'))

// 历史页面
const History = lazy(() => import(/* webpackChunkName: "history" */ '@/pages/History'))

/**
 * 加载中组件
 * 在组件加载过程中显示骨架屏和加载提示
 */
const LoadingComponent = memo(({ msg }: { msg?: string }) => (
  <PageLayout>
    <Skeleton className='h-full w-full flex justify-center items-center'>
      <H2Title className='animate-pulse'>{msg || '🍉 Loading...'}</H2Title>
    </Skeleton>
  </PageLayout>
))

LoadingComponent.displayName = 'LoadingComponent'

export { Performance, About, Setting, LoadingComponent, History }
