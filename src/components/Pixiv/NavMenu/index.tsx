import PageLayoutHeaderData from '@/config/PageLayoutHeaderData'
import { cn } from '@/lib/utils'
import { useState, useCallback, useMemo, memo, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import RankTagList from './RankTagList'
import { buildFullPath } from '@/utils/pixiv/Tools'
import SearchTagList from './SearchTagList'

const NavMenu = memo(() => {
  const [ImageViewer, setImageViewer] = useState<boolean>(false)
  const location = useLocation()
  const params = useParams()

  const ShowImageViewer = useCallback(() => {
    if (params.id) {
      setImageViewer(true)
    } else {
      setImageViewer(false)
    }
  }, [params.id, location.pathname])

  const isActiveRoute = useCallback(
    (path: string) => {
      return location.pathname === path || location.pathname === buildFullPath(path, params)
    },
    [location.pathname, params]
  )

  useEffect(() => {
    ShowImageViewer()
  }, [location.pathname, params.id])

  const renderNavItems = useMemo(() => {
    return PageLayoutHeaderData.map((item, index) => {
      if (item.show) {
        return (
          <div
            key={index}
            className={cn(
              'flex-1 flex justify-center items-center rounded-2xl transition-all duration-300',
              isActiveRoute(item.path) ? 'bg-gray-200 dark:bg-zinc-600 select-none' : ''
            )}
          >
            <Link
              to={item.path}
              className='w-full'
            >
              <div className='w-full text-center'>{item.label}</div>
            </Link>
          </div>
        )
      }
      return null
    })
  }, [isActiveRoute])

  const renderImageViewerItems = useMemo(() => {
    return PageLayoutHeaderData.map((item, index) => {
      if (!item.show) {
        return (
          <div
            key={index}
            className={cn(
              'flex-1 flex justify-center items-center rounded-2xl transition-all duration-300',
              isActiveRoute(item.path) ? 'bg-gray-200 dark:bg-zinc-600 select-none' : ''
            )}
          >
            <Link
              to={`${item.path}/${params.id}`}
              className='w-full'
            >
              <div className='w-full text-center'>{item.label}</div>
            </Link>
          </div>
        )
      }
      return null
    })
  }, [isActiveRoute])

  return (
    <div className='h-auto w-full lg:w-3/4 flex flex-col gap-1 justify-evenly'>
      <div className='w-full flex h-10 overflow-hidden'>
        <div
          className={cn(
            'w-full h-10 flex justify-evenly items-center shrink-0 transition-all duration-300',
            ImageViewer ? 'w-3/4' : ''
          )}
        >
          {renderNavItems}
        </div>
        <div
          className={cn(
            'w-1/4 h-10 flex justify-evenly items-center shrink-0 transition-all duration-300'
          )}
        >
          {renderImageViewerItems}
        </div>
      </div>
      {location.pathname.includes('/rank') && <RankTagList />}
      {location.pathname.includes('/search') && (
        <div className='w-full flex justify-center items-center'>
          <SearchTagList />
        </div>
      )}
    </div>
  )
})

NavMenu.displayName = 'NavMenu'

export default NavMenu
