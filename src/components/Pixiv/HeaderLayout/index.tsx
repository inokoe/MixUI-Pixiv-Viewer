import React from 'react'
import MyPlaceholdersAndVanishInput from '@components/Pixiv/SearchInput'
import NavMenu from '@components/Pixiv/NavMenu'

const PageLayoutHeader = React.memo(() => {
  return (
    <div className='flex gap-2 h-auto max-h-30 justify-center items-center select-none'>
      <div className='flex flex-col w-full md:w-2/3 h-full justify-center items-center gap-2'>
        <MyPlaceholdersAndVanishInput className='h-10 w-full lg:w-3/4' />
        <NavMenu />
      </div>
    </div>
  )
})

export default PageLayoutHeader
