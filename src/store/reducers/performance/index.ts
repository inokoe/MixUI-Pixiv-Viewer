import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QualityLevel, PerformanceState, ImageLoadPayload, ApiLoadPayload } from './types'
import { IpResponse } from '@/api/http/ip/types'
import storage from 'redux-persist/es/storage'
import { persistReducer } from 'redux-persist'

/**
 * 性能监控的初始状态
 */
const initialState: PerformanceState = {
  imageLoadInfo: {
    successCount: 0,
    errorCount: 0,
    imageLoadTimeList: [],
    imageLoadTimeAvg: 0,
    listLimit: 100,
    lastUpdateTime: Date.now(),
  },
  apiLoadInfo: {
    apiProxyLoadTimeList: [],
    apiProxyLoadTimeAvg: 0,
    apiProxyStatusCodeList: [],
    serverStatusCodeList: [],
    serverLoadTimeList: [],
    listLimit: 100,
    serverLoadTimeAvg: 0,
  },
  imageLoadQuality: {
    quality: 'high' as QualityLevel,
  },
  ipInfo: {
    vercel: {},
  },
}

/**
 * Redux Persist 配置
 * 用于持久化存储性能数据
 */
const performancePersistConfig = {
  key: 'performance',
  storage,
  whitelist: ['imageLoadInfo', 'apiLoadInfo', 'imageLoadQuality'],
}

/**
 * 根据平均加载时间更新图片质量等级
 * @param avgTime 平均加载时间(毫秒)
 * @returns 质量等级
 */
const updateQualityByAvgTime = (avgTime: number): QualityLevel => {
  if (avgTime > 1500) return 'low'
  if (avgTime > 1000) return 'mid'
  return 'high'
}

/**
 * 性能监控的 Redux Slice
 */
const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    /**
     * 更新图片加载信息
     * 包括加载时间、成功/失败次数统计
     * 并根据平均加载时间自动调整图片质量
     */
    setImageLoadInfo(state, action: PayloadAction<ImageLoadPayload>) {
      const { imageLoadTime, success, error } = action.payload
      const currentTime = Date.now()
      const { imageLoadTimeList, listLimit } = state.imageLoadInfo

      // 更新图片加载时间列表
      imageLoadTimeList.push(imageLoadTime)
      if (imageLoadTimeList.length > listLimit) {
        imageLoadTimeList.shift()
      }

      // 计算平均加载时间
      const imageLoadTimeAvg = Math.ceil(
        imageLoadTimeList.reduce((sum, time) => sum + time, 0) / imageLoadTimeList.length
      )

      // 节流控制：每1秒最多执行一次quality更新，且需要至少10条数据
      if (
        currentTime - state.imageLoadInfo.lastUpdateTime >= 1000 &&
        imageLoadTimeList.length >= 10
      ) {
        state.imageLoadQuality.quality = updateQualityByAvgTime(imageLoadTimeAvg)
        state.imageLoadInfo.lastUpdateTime = currentTime
      }

      // 更新状态
      state.imageLoadInfo = {
        ...state.imageLoadInfo,
        successCount: state.imageLoadInfo.successCount + success,
        errorCount: state.imageLoadInfo.errorCount + error,
        imageLoadTimeAvg,
        imageLoadTimeList,
      }
    },

    /**
     * 重置性能监控数据
     * 保留最后更新时间
     */
    resetPerformanceData(state) {
      state.imageLoadInfo = {
        ...initialState.imageLoadInfo,
        lastUpdateTime: state.imageLoadInfo.lastUpdateTime,
      }
      state.apiLoadInfo = initialState.apiLoadInfo
      state.imageLoadQuality.quality = 'high'
    },

    /**
     * 手动设置图片质量等级
     */
    setImageQuality(state, action: PayloadAction<QualityLevel>) {
      state.imageLoadQuality.quality = action.payload
    },

    /**
     * 更新API加载信息
     * 包括代理和服务器的加载时间、状态码统计
     */
    setApiLoadInfo(state, action: PayloadAction<ApiLoadPayload>) {
      const {
        apiProxyLoadTimeList: newProxyTime,
        apiProxyStatusCodeList: newProxyStatus,
        serverStatusCodeList: newServerStatus,
        serverLoadTimeList: newServerTime,
      } = action.payload
      const { listLimit } = state.imageLoadInfo

      // 更新API代理加载时间
      const apiProxyLoadTimeList = [
        ...state.apiLoadInfo.apiProxyLoadTimeList.slice(-(listLimit - 1)),
        newProxyTime,
      ]
      const apiProxyLoadTimeAvg = Math.ceil(
        apiProxyLoadTimeList.reduce((sum, time) => sum + time, 0) / apiProxyLoadTimeList.length
      )

      // 更新API代理状态码
      const apiProxyStatusCodeList = [
        ...state.apiLoadInfo.apiProxyStatusCodeList.slice(-(listLimit - 1)),
        newProxyStatus,
      ]

      // 更新服务器加载时间
      const serverLoadTimeList = [
        ...state.apiLoadInfo.serverLoadTimeList.slice(-(listLimit - 1)),
        newServerTime,
      ]
      const serverLoadTimeAvg = Math.ceil(
        serverLoadTimeList.reduce((sum, time) => sum + time, 0) / serverLoadTimeList.length
      )

      // 更新服务器状态码
      const serverStatusCodeList = [
        ...state.apiLoadInfo.serverStatusCodeList.slice(-(listLimit - 1)),
        newServerStatus,
      ]

      // 更新状态
      state.apiLoadInfo = {
        ...state.apiLoadInfo,
        apiProxyLoadTimeList,
        apiProxyLoadTimeAvg,
        apiProxyStatusCodeList,
        serverStatusCodeList,
        serverLoadTimeList,
        serverLoadTimeAvg,
      }
    },

    /**
     * 更新IP信息
     */
    setIpInfo(state, action: PayloadAction<IpResponse>) {
      state.ipInfo = action.payload
    },
  },
})

export const {
  setImageLoadInfo,
  resetPerformanceData,
  setImageQuality,
  setApiLoadInfo,
  setIpInfo,
} = performanceSlice.actions

export default persistReducer(performancePersistConfig, performanceSlice.reducer)
