import axios from 'axios'
import axiosRetry from 'axios-retry'
import {
  AXIOS_DEFAULT_HEADERS,
  AXIOS_DEFAULT_RETRIES,
  AXIOS_DEFAULT_RETRY_DELAY,
  AXIOS_DEFAULT_TIMEOUT,
  MY_PROXY_API,
  PIXIV_HTTP_API_DOMAIN,
} from './config'
import store from '@/store'
import { setApiLoadInfo } from '@/store/reducers/performance'

// 扩展 Axios 类型
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    metadata: {
      startTime: number
    }
  }
}

const request = axios.create({
  baseURL: PIXIV_HTTP_API_DOMAIN,
  timeout: AXIOS_DEFAULT_TIMEOUT,
})

axiosRetry(request, {
  retries: AXIOS_DEFAULT_RETRIES,
  retryDelay: retryCount => {
    return retryCount * AXIOS_DEFAULT_RETRY_DELAY
  },
  retryCondition: error => {
    return error.message === 'TimeOut'
  },
})

let currentProxyIndex = 0

// 请求拦截器
request.interceptors.request.use(config => {
  if (config.headers) {
    Object.entries(AXIOS_DEFAULT_HEADERS).forEach(([key, value]) => {
      config.headers?.set(key, value)
    })
  }
  // 记录开始时间
  config.metadata = { startTime: Date.now() }
  return config
})

// 超时处理
request.interceptors.response.use(
  response => {
    // 记录API请求的耗时性能数据到Redux
    const getLoadTime = async () => {
      // 更新Redux
      await store.dispatch(
        setApiLoadInfo({
          apiProxyLoadTimeList: response.data.apiTime,
          apiProxyStatusCodeList: response.data.api.status,
          serverStatusCodeList: response.status,
          serverLoadTimeList: Date.now() - response.config.metadata.startTime,
        })
      )
    }
    if (!response.data.vercel) {
      getLoadTime()
    }
    // 替换图片CDN地址
    const replaceImageCDN = () => {
      let responseData = JSON.stringify(response.data)
      // 替换图片CDN地址
      // 创建一个全局匹配的正则表达式
      const regex = /https:\/\/i\.pximg\.net/g
      responseData = responseData.replace(regex, () => {
        const proxy = MY_PROXY_API[currentProxyIndex]
        currentProxyIndex = currentProxyIndex + 1
        if (currentProxyIndex >= MY_PROXY_API.length) {
          currentProxyIndex = 0
        }
        return `https://${proxy}`
      })
      responseData = JSON.parse(responseData)
      response.data = responseData
    }
    replaceImageCDN()

    return response
  },
  error => {
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      // 超时处理
      return Promise.reject(new Error('TimeOut'))
    }
    return Promise.reject(error)
  }
)

export default request
