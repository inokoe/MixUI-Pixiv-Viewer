import { IconSquareArrowUp, IconCategory } from '@tabler/icons-react'
import { memo } from 'react'

interface PageBodyTitleProps {
  title: string
}

const PageBodyTitle: React.FC<PageBodyTitleProps> = memo(({ title }) => {
  return (
    <div className='flex items-center justify-between hover:bg-gray-200 dark:hover:bg-zinc-600 rounded-xl p-2 transition-all duration-300 hover:cursor-pointer mb-2'>
      <div className='flex items-center gap-2'>
        <IconSquareArrowUp className='animate-pulse' />
        <h2 className='text-2xl bg-gray-200 dark:bg-zinc-600 rounded-xl p-1'>{title}</h2>
      </div>
      <div className='pr-3'>
        <IconCategory className='h-6 w-6' />
      </div>
    </div>
  )
})

export default PageBodyTitle
