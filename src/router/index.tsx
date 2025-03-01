import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { Suspense } from 'react'
import Layout from '@/pages/Layout'
import { Performance, LoadingComponent, About, Setting, History } from './LazyLoad'
import Pixiv from '@/pages/Pixiv'
import PixivHome from '@/pages/Pixiv/Home'
import PixivRank from '@/pages/Pixiv/Rank'
import PixivSearch from '@/pages/Pixiv/Search'
import PixivShow from '@/pages/Pixiv/Show'
import { checkSearchBarLoader } from './Loader/CheckSearchBarLoader'

/**
 * 路由配置
 * 使用嵌套路由结构，支持懒加载
 */
const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    errorElement: <LoadingComponent msg='页面加载失败' />,
    children: [
      {
        path: '/',
        element: <Pixiv />,
        errorElement: <LoadingComponent msg='页面加载失败' />,
        loader: checkSearchBarLoader,
        shouldRevalidate: () => true,
        children: [
          {
            path: '/',
            element: <PixivHome />,
          },
          {
            path: '/search/:word?',
            element: <PixivSearch />,
          },
          {
            path: '/rank/:mode?',
            element: <PixivRank />,
          },
          {
            path: '/show/:id',
            element: <PixivShow />,
          },
        ],
      },
      {
        path: '/performance/:tab?',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <Performance />
          </Suspense>
        ),
        errorElement: <LoadingComponent msg='页面加载失败' />,
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <About />
          </Suspense>
        ),
        errorElement: <LoadingComponent msg='页面加载失败' />,
      },
      {
        path: '/setting',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <Setting />
          </Suspense>
        ),
        errorElement: <LoadingComponent msg='页面加载失败' />,
      },
      {
        path: '/history',
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <History />
          </Suspense>
        ),
        errorElement: <LoadingComponent msg='页面加载失败' />,
      },
    ],
  },
]

/**
 * 创建路由实例
 * 启用 React Router v7 的新特性
 */
const router = createBrowserRouter(routes, {
  future: {
    // 持久化 fetcher 数据
    v7_fetcherPersist: true,
    // 规范化表单方法
    v7_normalizeFormMethod: true,
    // 启用部分水合
    v7_partialHydration: true,
    // 相对路径拼接
    v7_relativeSplatPath: true,
    // 跳过动作错误重新验证
    v7_skipActionErrorRevalidation: true,
  },
})

export default router
