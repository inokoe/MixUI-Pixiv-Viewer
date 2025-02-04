import { PixivRankResponse, PixivRankErrorResponse, PixivRankParams } from '../base.types'
import request from '@/api/request'
import { setRankData } from '@/store/reducers/pixiv'
import store from '@/store'
import {
  handleApiResponse,
  handleApiError,
  showResponseMessage,
  createRequestConfig,
} from '../api-helpers'

async function getRank(
  params: PixivRankParams
): Promise<PixivRankResponse | PixivRankErrorResponse> {
  let result: PixivRankResponse | PixivRankErrorResponse
  try {
    const { type, ...restParams } = params
    const res = await request(createRequestConfig(`/api/pixiv/${type}`, restParams))
    result = handleApiResponse(res) as PixivRankResponse | PixivRankErrorResponse
  } catch {
    result = handleApiError() as PixivRankErrorResponse
  }

  showResponseMessage(result)

  if ('illusts' in result.api) {
    store.dispatch(
      setRankData({
        ...params,
        illusts: result.api.illusts,
      })
    )
  }

  return result
}

export default getRank
