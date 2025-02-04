import { ipAddress, geolocation } from '@vercel/functions'
import { getResponse } from '../utils.js'
import type { responseData } from './types.js'
import { getApiData } from '../lib.js'

export async function GET(request: Request) {
  // 记录时间
  const start = Date.now()
  // 获取IP
  const ip = ipAddress(request)
  //  开发模式： {"region":"dev1"}
  const location = geolocation(request)
  const responseData: responseData = {
    vercel: { ...location },
  }

  if (location.region !== 'dev1') {
    responseData.vercel.ip = ip
    // 获取headers
    const headers = request.headers
    //  调用API
    if (ip && headers) {
      const baseUrl = 'http://ip-api.com'
      const forwardUrl = `${baseUrl}/json/${ip}`
      const result = await getApiData(forwardUrl, baseUrl, request)
      //   处理返回数据
      if (result && result.status === 200) {
        const useTime = Date.now() - start
        responseData.api = {
          ...result.result,
          useTime,
        }
      }
    }
  }
  // 返回数据
  return getResponse(responseData)
}
