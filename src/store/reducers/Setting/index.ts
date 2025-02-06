import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

interface SettingItem {
  label: string
  description: string
  checked: boolean
}

export type SettingKey = 'safeMode' | 'developmentMode' | 'imageQualityAdaptation'

interface SettingState {
  safeMode: SettingItem
  developmentMode: SettingItem
  imageQualityAdaptation: SettingItem
  imageViewerCDN: SettingItem
  _persist?: { version: number; rehydrated: boolean }
}

const initialState: SettingState = {
  developmentMode: {
    label: '开发模式',
    description: '开发模式下，会取消显示一些信息。',
    checked: false,
  },
  safeMode: {
    label: '安全模式',
    description: '安全模式下，会过滤敏感信息。',
    checked: true,
  },
  imageQualityAdaptation: {
    label: '图片质量自适应',
    description: '图片质量自适应，根据网络情况自动选择图片质量。',
    checked: true,
  },
  imageViewerCDN: {
    label: 'CDN分流',
    description: '默认使用CloudFlare多域名分流，开启则使用Vercel部署代理。',
    checked: false,
  },
}

export const persistConfig = {
  key: 'setting',
  storage,
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSetting(state, action: PayloadAction<{ [K in SettingKey]?: Partial<SettingItem> }>) {
      const key = Object.keys(action.payload)[0] as SettingKey
      if (key in initialState && action.payload[key]) {
        state[key] = { ...state[key], ...action.payload[key] }
      }
    },
  },
})

export const { setSetting } = settingSlice.actions
export default persistReducer(persistConfig, settingSlice.reducer)
