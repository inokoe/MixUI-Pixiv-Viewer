import request from '@/api/request'
import { SearchParams } from '@/store/reducers/pixiv/types'
import { PixivRankErrorResponse, PixivRankResponse } from '../base.types'
import {
  handleApiResponse,
  handleApiError,
  showResponseMessage,
  createRequestConfig,
} from '../api-helpers'
import store from '@/store'

const getSearch = async (
  params: SearchParams
): Promise<PixivRankResponse | PixivRankErrorResponse> => {
  let result: PixivRankResponse | PixivRankErrorResponse

  // 创建新的参数对象
  const searchParams = { ...params }
  const isSafeMode = store.getState().setting.safeMode.checked
  if (!isSafeMode && searchParams.originWord) {
    searchParams.word = searchParams.originWord
  }

  try {
    const res = await request(createRequestConfig('/api/pixiv/search', searchParams))
    result = handleApiResponse(res) as PixivRankResponse | PixivRankErrorResponse
  } catch {
    result = handleApiError() as PixivRankErrorResponse
  }
  showResponseMessage(result)
  return result
}

export default getSearch
