import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SinglePlayerSettings } from '@/types/game'
import { DEFAULT_SETTINGS } from '@/logic/singleplayer/core/constants'

const initialState: SinglePlayerSettings = DEFAULT_SETTINGS

const settingSlice = createSlice({
  name: 'singleplayer/settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SinglePlayerSettings>>) => {
      return { ...state, ...action.payload }
    },
    resetSettings: () => DEFAULT_SETTINGS
  }
})

export const { updateSettings, resetSettings } = settingSlice.actions

export default settingSlice.reducer
