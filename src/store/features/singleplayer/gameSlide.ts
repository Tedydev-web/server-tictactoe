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
  turnStartTime: Date.now(),
  timeRemaining: TURN_TIME_LIMIT,
  isGameStarted: false,
  isBotMode: false
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
      state.isGameStarted = false
      state.isBotMode = true // Set to true for bot game
    },
    
    makeMove: (state, action: PayloadAction<{ position: number; boardSize: number; winCondition: number }>) => {
      const { position, boardSize, winCondition } = action.payload
      
      // Set game as started when first move is made
      if (!state.isGameStarted) {
        state.isGameStarted = true
      }

      // Add move to history
      state.moveHistory.push({
        player: state.currentPlayer,
        position
      })

      // Update board
      state.cells[position] = state.currentPlayer

      // Check game state
      const gameState = checkGameState(state.cells, position, boardSize, winCondition)
      state.gameStatus = gameState.status
      state.winningLine = gameState.winningLine

      // Update scores if game is won
      if (gameState.status === 'won') {
        if (state.currentPlayer === 'X') {
          state.player1Score++
        } else {
          state.player2Score++
        }
      }

      // Switch player if game continues
      if (gameState.status === 'playing') {
        state.currentPlayer = getNextPlayer(state.currentPlayer)
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
        
        // If undoing first move, reset game started state
        if (state.moveHistory.length === 0) {
          state.isGameStarted = false
        }
      }
    },

    resetGame: (state) => {
      state.cells = createEmptyBoard(Math.sqrt(state.cells.length))
      state.currentPlayer = FIRST_PLAYER
      state.gameStatus = 'playing'
      state.moveHistory = []
      state.winningLine = undefined
      state.isGameStarted = false // Reset game started state
    },

    resetScores: (state) => {
      state.player1Score = 0
      state.player2Score = 0
    },

    updateTimeRemaining: (state, action: PayloadAction<number>) => {
      if (state.isGameStarted) { // Only update time if game has started
        state.timeRemaining = action.payload
      }
    },

    handleTimeExpired: (state) => {
      if (state.gameStatus === 'playing' && state.isGameStarted) { // Only handle expiry if game has started
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
