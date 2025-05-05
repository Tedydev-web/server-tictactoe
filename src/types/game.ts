// Kiểu dữ liệu cho người chơi
export type Player = 'X' | 'O'

// Trạng thái của game
export type GameStatus = 'playing' | 'won' | 'draw'

// Lịch sử nước đi
export interface Move {
  player: Player
  position: number
}

// State của game singleplayer
export interface SinglePlayerGameState {
  cells: (Player | null)[]
  currentPlayer: Player
  gameStatus: GameStatus
  winningLine?: number[]
  moveHistory: Move[]
  player1Score: number
  player2Score: number
  turnStartTime: number
  timeRemaining: number
  isGameStarted: boolean
}

// Settings cho game singleplayer
export interface SinglePlayerSettings {
  boardSize: number
  winCondition: number
  allowUndo: boolean
}
