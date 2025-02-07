import { RootReducer } from '@/store'
import { IconLink } from '@tabler/icons-react'
import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

interface ImagePixivLinkProps {
  id: number
}

const SAFE_MODE_ID = '126073046'
const BASE_URL = 'https://pixiv.net/artworks'

const ImagePixivLink = memo(({ id }: ImagePixivLinkProps) => {
  const isDevMode = useSelector((state: RootReducer) => state.setting.developmentMode.checked)

  const pixivUrl = useMemo(() => {
    const artworkId = isDevMode ? SAFE_MODE_ID : id
    return `${BASE_URL}/${artworkId}`
  }, [isDevMode, id])

  return (
    <div className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'>
      <IconLink className='w-4 h-4' />
      <a
        href={pixivUrl}
        target='_blank'
        rel='noreferrer'
        className='hover:underline truncate'
      >
        {pixivUrl}
      </a>
    </div>
  )
})

ImagePixivLink.displayName = 'ImagePixivLink'

export default ImagePixivLink
