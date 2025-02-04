import { RankTags } from '@/config/PageLayoutHeaderData'
import { cn } from '@/lib/utils'
import { Link, useParams } from 'react-router-dom'

const RankTagList = () => {
  // 获取react router当前的path的mode参数
  const { mode } = useParams()

  const isActive = (item: { en: string }) => {
    return mode ? mode === item.en : 'day' === item.en
  }

  return (
    <div className='w-full h-10'>
      <div className={'w-full h-10 flex justify-evenly items-center shrink-0'}>
        {RankTags.map((item, index) => {
          return (
            <div
              key={index}
              className={cn(
                'flex-1 flex justify-center items-center rounded-2xl transition-all duration-300',
                isActive(item) ? 'bg-gray-200 dark:bg-zinc-600 select-none' : ''
              )}
            >
              <Link
                to={item.path}
                className='w-full'
              >
                <div className='w-full text-center'>{item.zh}</div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RankTagList
