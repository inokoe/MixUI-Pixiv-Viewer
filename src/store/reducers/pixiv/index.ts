import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PixivState, rankDataPayload, SearchParams } from './types'
import storage from 'redux-persist/es/storage'
import { persistReducer } from 'redux-persist'
import { Illust } from '@/api/http/base.types'

const initialState: PixivState = {
  rank: {},
  searchParams: {
    word: '',
    originWord: '',
    page: 1,
    mode: 'partial_match_for_tags',
    order: 'date_desc',
  },
  rankInitial: false,
  showHistory: {
    data: [],
    limit: 50,
  },
}

export const persistConfig = {
  key: 'pixiv',
  storage,
  whitelist: ['showHistory'],
}

const pixivSlice = createSlice({
  name: 'pixiv',
  initialState,
  reducers: {
    setRankData(state, action: PayloadAction<rankDataPayload>) {
      const { mode, ...params } = action.payload

      // 确保 key 对应的数组存在
      if (!Array.isArray(state.rank[mode])) {
        state.rank[mode] = []
      }

      state.rank[mode] = [...state.rank[mode], params]
    },
    setRankInitial(state, action: PayloadAction<boolean>) {
      state.rankInitial = action.payload
    },
    setSearchParams(state, action: PayloadAction<SearchParams>) {
      const { word, ...params } = action.payload
      // 如果传入了word参数,则添加过滤R18的tag
      const filteredWord = word?.trim() ? `${word} -R-18 -R18 -18+` : state.searchParams.word
      const originWord = word?.trim() ? `${word}` : state.searchParams.originWord
      state.searchParams = {
        ...state.searchParams,
        ...params,
        word: filteredWord,
        originWord,
      }
    },
    setClearSearchParams(state) {
      state.searchParams = {
        word: state.searchParams.word,
        page: state.searchParams.page,
        mode: initialState.searchParams.mode,
        order: initialState.searchParams.order,
      }
    },
    setShowHistory(state, action: PayloadAction<Illust>) {
      const currentData = Array.isArray(state.showHistory.data) ? state.showHistory.data : []
      const existingIndex = currentData.findIndex(item => item.id === action.payload.id)

      const newData = [...currentData]

      if (existingIndex !== -1) {
        newData.splice(existingIndex, 1)
      }

      newData.unshift(action.payload)

      if (newData.length > state.showHistory.limit) {
        newData.pop()
      }
      state.showHistory.data = newData
    },
  },
})

export const {
  setRankData,
  setRankInitial,
  setSearchParams,
  setClearSearchParams,
  setShowHistory,
} = pixivSlice.actions
export default persistReducer(persistConfig, pixivSlice.reducer)
