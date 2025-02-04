import { memo } from 'react'

const PageBodyFooter = memo(() => {
  return (
    <footer className='w-full text-center py-2 pb-14 md:pb-0 pt-3'>
      <p className='text-sm text-gray-500 dark:text-gray-400'>&copy; 2025 Mui Pixiv Viewer.</p>
    </footer>
  )
})

export default PageBodyFooter
