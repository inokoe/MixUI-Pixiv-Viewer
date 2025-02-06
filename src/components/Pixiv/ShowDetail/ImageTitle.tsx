import { memo } from 'react'

interface ImageTitleProps {
  title: string
}

const ImageTitle = memo(({ title }: ImageTitleProps) => {
  return (
    <div className='text-xl font-semibold flex items-center gap-1 text-gray-900 dark:text-gray-100'>
      <div className='flex-1 line-clamp-2'>{title}</div>
    </div>
  )
})

ImageTitle.displayName = 'ImageTitle'

export default ImageTitle
