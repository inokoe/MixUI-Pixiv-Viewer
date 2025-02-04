import { configureStore } from '@reduxjs/toolkit'
import UIReducer from '@/store/reducers/ui'
import PerformanceReducer from '@/store/reducers/performance'
import PixivReducer from '@/store/reducers/pixiv'
import SettingReducer from '@/store/reducers/Setting'
import { persistStore } from 'redux-persist'

/**
 * Redux Store 的根 Reducer 类型
 */
export type RootReducer = {
  ui: ReturnType<typeof UIReducer>
  performance: ReturnType<typeof PerformanceReducer>
  pixiv: ReturnType<typeof PixivReducer>
  setting: ReturnType<typeof SettingReducer>
}

/**
 * 创建 Redux Store
 * 配置 reducer、middleware 和持久化
 */
const createStore = () => {
  // 配置 store
  const store = configureStore({
    // 合并所有 reducer
    reducer: {
      ui: UIReducer,
      performance: PerformanceReducer,
      pixiv: PixivReducer,
      setting: SettingReducer,
    },
    // 配置 middleware
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        // 忽略 redux-persist 的序列化检查
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
    // 开发工具配置
    devTools: process.env.NODE_ENV !== 'production' && {
      name: 'MixUI',
      trace: true,
      traceLimit: 25,
    },
  })

  return store
}

// 创建 store 实例
const store = createStore()

// 创建持久化 store
export const persistor = persistStore(store)

// 导出 RootState 类型
export type RootState = ReturnType<typeof store.getState>
// 导出 AppDispatch 类型
export type AppDispatch = typeof store.dispatch

export default store
