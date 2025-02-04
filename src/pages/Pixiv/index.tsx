import { setSideBarMenuSelected } from '@/store/reducers/ui'
import { useEffect, useRef } from 'react'
import PageLayoutHeader from '@/components/Pixiv/HeaderLayout/index'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { initalRankData } from '@/lib/pixiv/intial'
import PageBodyFooter from '@/components/Pixiv/PageBodyFooter'
import PageLayout from '../Layout/PageLayout'
import { useNProgress } from '@/hooks/useNProgress'

const Pixiv = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  useNProgress()
  useEffect(() => {
    dispatch(setSideBarMenuSelected(1))
    initalRankData(dispatch)
  }, [dispatch])

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [location])

  return (
    <PageLayout>
      <>
        <PageLayoutHeader />
        <div
          ref={scrollContainerRef}
          className='w-full flex-1 overflow-y-scroll overflow-x-hidden flex flex-col scrollbar-hide'
        >
          <Outlet />
        </div>
      </>
    </PageLayout>
  )
}
export default Pixiv
