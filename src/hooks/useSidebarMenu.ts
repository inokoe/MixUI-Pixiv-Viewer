import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSideBarMenuSelected } from '@/store/reducers/ui'

export const useSidebarMenu = (menuIndex: number) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSideBarMenuSelected(menuIndex))
  }, [dispatch, menuIndex])
}
