import getRank from '@/api/http/rank'
import { PixivRankParams } from '@/api/http/base.types'
import { getRankDate } from '@/utils/pixiv/Tools'
import { concurrentRun } from '@/lib/utils'
import { Dispatch } from 'redux'
import { setRankInitial } from '@/store/reducers/pixiv'
import { toast } from 'sonner'

const initialList = [
  {
    type: 'rank',
    modeList: ['day', 'week', 'month'] as const,
    page: 1,
    dateList: [1, 1, 1],
  },
]

let concurrentRunMark = true

export const initalRankData = async (dispatch: Dispatch) => {
  if (concurrentRunMark) {
    concurrentRunMark = false
    const tasks = initialList.flatMap(item =>
      item.modeList.map((value, key) => async () => {
        const params: PixivRankParams = {
          type: item.type,
          mode: value,
          page: item.page,
          date: getRankDate(item.dateList[key]),
        }
        const response = await getRank(params)
        return response
      })
    )

    await concurrentRun(tasks)
    dispatch(setRankInitial(true))
  }
}

export const requestNewData = async (mode: PixivRankParams['mode'], date: string, page: number) => {
  const params: PixivRankParams = {
    type: 'rank',
    mode,
    page,
    date,
  }
  let maxRetry = 3
  while (true) {
    const result = await getRank(params)
    if ('illusts' in result.api && result.api.illusts.length > 0) {
      break
    }
    toast('请求失败', {
      description: '⚠️将在1秒后重试',
    })
    maxRetry--
    if (maxRetry <= 0) {
      toast('请求次数限制', {
        description: '⚠️无法获取更多数据，可能已经全部加载了喔',
      })
      break
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}
