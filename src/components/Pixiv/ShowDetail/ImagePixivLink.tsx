import { IconLink } from '@tabler/icons-react'
import { memo } from 'react'

interface ImagePixivLinkProps {
  id: number
}

const ImagePixivLink = memo(({ id }: ImagePixivLinkProps) => {
  return (
    <div className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'>
      <IconLink className='w-4 h-4' />
      <a
        href={`https://pixiv.net/artworks/${id}`}
        target='_blank'
        rel='noreferrer'
        className='hover:underline truncate'
      >
        {`https://pixiv.net/artworks/${id}`}
      </a>
    </div>
  )
})

ImagePixivLink.displayName = 'ImagePixivLink'

export default ImagePixivLink
