import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SinglePlayerSettings, BotDifficulty } from '@/types/game'

export const DEFAULT_SETTINGS: SinglePlayerSettings = {
  boardSize: 30,
  winCondition: 5,
  allowUndo: true,
  botDifficulty: BotDifficulty.HARD,
  isBotEnabled: false
}

const settingSlice = createSlice({
  name: 'singleplayer/settings',
  initialState: DEFAULT_SETTINGS,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SinglePlayerSettings>>) => {
      return { ...state, ...action.payload }
    },
    resetSettings: () => DEFAULT_SETTINGS,
    toggleBot: (state) => {
      state.isBotEnabled = !state.isBotEnabled
      state.botDifficulty = BotDifficulty.HARD
    }
  }
})

export const { updateSettings, resetSettings, toggleBot } = settingSlice.actions

export default settingSlice.reducer
