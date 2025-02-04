import { PROXY_DOMAIN } from '../config.js'
import { getApiData } from '../lib.js'
import { getResponse } from '../utils.js'

export async function GET(request: Request) {
  const start = Date.now()
  // 调用API
  const data = await getApiData('', PROXY_DOMAIN, request)
  let responseDate = null
  if (data) {
    const { result, status } = data

    responseDate = {
      illusts: result.illusts || result.illust || {},
      next_url: result.next_url || '',
      status,
    }
  } else {
    responseDate = {
      illusts: {},
      next_url: '',
      status: -1,
    }
  }
  // 计算接口使用时间
  const useTime = Date.now() - start
  // 处理返回的接口数据
  return getResponse({
    api: responseDate,
    apiTime: useTime,
    status: responseDate && responseDate.status === 200 ? true : false,
  })
}
