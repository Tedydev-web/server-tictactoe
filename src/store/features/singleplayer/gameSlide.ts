import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SinglePlayerGameState, Move } from '@/types/game'
import { FIRST_PLAYER } from '@/logic/singleplayer/core/constants'
import { createEmptyBoard, getNextPlayer } from '@/logic/singleplayer/core/boardUtils'
import { checkGameState } from '@/logic/singleplayer/core/gameRules'

const TURN_TIME_LIMIT = 60 // 60 seconds per turn

const initialState: SinglePlayerGameState = {
  cells: [],
  currentPlayer: FIRST_PLAYER,
  gameStatus: 'playing',
  moveHistory: [],
  player1Score: 0,
  player2Score: 0,
  turnStartTime: Date.now(), // Add turn start time
  timeRemaining: TURN_TIME_LIMIT, // Add time remaining
}

const gameSlice = createSlice({
  name: 'singleplayer/game',
  initialState,
  reducers: {
    initializeGame: (state, action: PayloadAction<number>) => {
      state.cells = createEmptyBoard(action.payload)
      state.currentPlayer = FIRST_PLAYER
      state.gameStatus = 'playing'
      state.moveHistory = []
      state.winningLine = undefined
      state.turnStartTime = Date.now()
      state.timeRemaining = TURN_TIME_LIMIT
    },
    
    makeMove: (state, action: PayloadAction<{ position: number; boardSize: number; winCondition: number }>) => {
      const { position, boardSize, winCondition } = action.payload
      
      // Thực hiện nước đi
      state.cells[position] = state.currentPlayer
      state.moveHistory.push({ player: state.currentPlayer, position })

      // Kiểm tra trạng thái game
      const { status, winningLine } = checkGameState(state.cells, position, boardSize, winCondition)
      state.gameStatus = status
      state.winningLine = winningLine

      // Cập nhật điểm nếu thắng
      if (status === 'won') {
        if (state.currentPlayer === 'X') {
          state.player1Score += 1
        } else {
          state.player2Score += 1
        }
      }

      // Đổi lượt nếu game chưa kết thúc
      if (status === 'playing') {
        state.currentPlayer = getNextPlayer(state.currentPlayer)
        // Reset timer for next turn
        state.turnStartTime = Date.now()
        state.timeRemaining = TURN_TIME_LIMIT
      }
    },

    undoMove: (state) => {
      const lastMove = state.moveHistory.pop()
      if (lastMove) {
        state.cells[lastMove.position] = null
        state.currentPlayer = lastMove.player
        state.gameStatus = 'playing'
        state.winningLine = undefined
      }
    },

    resetGame: (state) => {
      state.cells = createEmptyBoard(Math.sqrt(state.cells.length))
      state.currentPlayer = FIRST_PLAYER
      state.gameStatus = 'playing'
      state.moveHistory = []
      state.winningLine = undefined
    },

    resetScores: (state) => {
      state.player1Score = 0
      state.player2Score = 0
    },

    updateTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = action.payload
    },

    handleTimeExpired: (state) => {
      if (state.gameStatus === 'playing') {
        state.currentPlayer = getNextPlayer(state.currentPlayer)
        state.turnStartTime = Date.now()
        state.timeRemaining = TURN_TIME_LIMIT
      }
    }
  }
})

export const { 
  initializeGame,
  makeMove,
  undoMove,
  resetGame,
  resetScores,
  updateTimeRemaining,
  handleTimeExpired
} = gameSlice.actions

export default gameSlice.reducer
