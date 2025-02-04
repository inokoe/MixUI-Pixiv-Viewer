import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SystemState } from './types'
import storage from 'redux-persist/es/storage'
import { persistReducer } from 'redux-persist'

const initialState: SystemState = {
  darkModel: true,
  ImageViewer: '',
  ImageProtect: false,
  SideBarMenuSelected: 0,
}

const uiPersistConfig = {
  key: 'ui',
  storage,
  whitelist: ['darkModel'],
}

const systemSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDarkModel(state, action: PayloadAction<boolean>) {
      if (state.darkModel !== action.payload) {
        state.darkModel = action.payload
      }
    },
    setSideBarMenuSelected(state, action: PayloadAction<number>) {
      state.SideBarMenuSelected = action.payload
    },
  },
})

export const { setDarkModel, setSideBarMenuSelected } = systemSlice.actions
export default persistReducer(uiPersistConfig, systemSlice.reducer)
