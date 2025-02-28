import React from 'react'
import MyPlaceholdersAndVanishInput from '@components/Pixiv/SearchInput'
import NavMenu from '@components/Pixiv/NavMenu'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { cn } from '@/lib/utils'

const PageLayoutHeader = React.memo(() => {
  const isHiddenSearchBar = useSelector((state: RootState) => state.ui.isHiddenSearchBar)

  return (
    <div
      className={cn(
        'flex gap-2 justify-center items-center select-none origin-top flex-shrink-0 z-20',
        'transition-all duration-300 ease-in-out',
        'mt-5 md:mt-0',
        isHiddenSearchBar ? 'max-h-0 scale-y-0 opacity-0 mt-0' : 'max-h-36 scale-y-100 opacity-100'
      )}
    >
      <div className='flex flex-col w-full md:w-2/3 h-full justify-center items-center gap-2'>
        <MyPlaceholdersAndVanishInput className='h-10 w-full lg:w-3/4' />
        <NavMenu />
      </div>
    </div>
  )
})

export default PageLayoutHeader
