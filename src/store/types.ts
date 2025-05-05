import { SinglePlayerGameState, SinglePlayerSettings } from '@/types/game'

export interface RootState {
  singleplayer: {
    game: SinglePlayerGameState
    settings: SinglePlayerSettings
  }
} 