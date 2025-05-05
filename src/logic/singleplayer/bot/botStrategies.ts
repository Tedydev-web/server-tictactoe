import { Player, BotDifficulty } from '@/types/game'
import { checkGameState } from '../core/gameRules'
import { getNextPlayer } from '../core/boardUtils'

const SCORES = {
  WIN: 100,
  DRAW: 0,
  LOSE: -100
}

export interface BotStrategy {
  getNextMove: (board: (Player | null)[], boardSize: number, winCondition: number) => number
}

// Easy mode: Random moves
export class RandomStrategy implements BotStrategy {
  getNextMove(board: (Player | null)[]): number {
    const availableMoves = board
      .map((cell, index) => cell === null ? index : -1)
      .filter(index => index !== -1)
    
    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }
}

// Medium/Hard mode: Minimax with Alpha-Beta pruning
export class MinimaxStrategy implements BotStrategy {
  private maxDepth: number
  private botPlayer: Player = 'O'
  private humanPlayer: Player = 'X'
  private startTime: number = 0
  private timeLimit: number = 2000 // 2 seconds time limit

  constructor(difficulty: BotDifficulty) {
    this.maxDepth = 4
  }

  getNextMove(board: (Player | null)[], boardSize: number, winCondition: number): number {
    this.startTime = Date.now()

    // For first move, choose center or near center position
    if (this.isFirstMove(board)) {
      return this.getFirstMove(board, boardSize)
    }

    // Get available moves
    const availableMoves = this.getAvailableMoves(board)
    
    // If only one move available, return it immediately
    if (availableMoves.length === 1) {
      return availableMoves[0]
    }

    try {
      const { move } = this.minimaxAlphaBeta(
        board,
        this.maxDepth,
        -Infinity,
        Infinity,
        true,
        boardSize,
        winCondition
      )
      return move
    } catch (error) {
      // If timeout occurred, return first available move
      console.log('Minimax timeout, using fallback move')
      return availableMoves[0]
    }
  }

  private isFirstMove(board: (Player | null)[]): boolean {
    return board.every(cell => cell === null)
  }

  private getFirstMove(board: (Player | null)[], boardSize: number): number {
    const center = Math.floor(board.length / 2)
    if (board[center] === null) {
      return center
    }
    
    // If center is taken, choose a position near the center
    const nearCenter = [
      center - boardSize - 1, center - boardSize, center - boardSize + 1,
      center - 1, center + 1,
      center + boardSize - 1, center + boardSize, center + boardSize + 1
    ].filter(pos => pos >= 0 && pos < board.length && board[pos] === null)
    
    return nearCenter[Math.floor(Math.random() * nearCenter.length)]
  }

  private minimaxAlphaBeta(
    board: (Player | null)[],
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    boardSize: number,
    winCondition: number
  ): { score: number; move: number } {
    // Check for timeout
    if (Date.now() - this.startTime > this.timeLimit) {
      throw new Error('Calculation timeout')
    }

    const availableMoves = this.getAvailableMoves(board)
    
    // Base cases
    const gameState = checkGameState(board, -1, boardSize, winCondition)
    if (gameState.status === 'won') {
      return {
        score: isMaximizing ? SCORES.LOSE : SCORES.WIN,
        move: -1
      }
    }
    if (gameState.status === 'draw' || depth === 0 || availableMoves.length === 0) {
      return {
        score: SCORES.DRAW,
        move: -1
      }
    }

    if (isMaximizing) {
      let bestScore = -Infinity
      let bestMove = availableMoves[0]

      for (const move of availableMoves) {
        const newBoard = [...board]
        newBoard[move] = this.botPlayer
        const { score } = this.minimaxAlphaBeta(
          newBoard,
          depth - 1,
          alpha,
          beta,
          false,
          boardSize,
          winCondition
        )

        if (score > bestScore) {
          bestScore = score
          bestMove = move
        }

        alpha = Math.max(alpha, bestScore)
        if (beta <= alpha) break
      }

      return { score: bestScore, move: bestMove }
    } else {
      let bestScore = Infinity
      let bestMove = availableMoves[0]

      for (const move of availableMoves) {
        const newBoard = [...board]
        newBoard[move] = this.humanPlayer
        const { score } = this.minimaxAlphaBeta(
          newBoard,
          depth - 1,
          alpha,
          beta,
          true,
          boardSize,
          winCondition
        )

        if (score < bestScore) {
          bestScore = score
          bestMove = move
        }

        beta = Math.min(beta, bestScore)
        if (beta <= alpha) break
      }

      return { score: bestScore, move: bestMove }
    }
  }

  private getAvailableMoves(board: (Player | null)[]): number[] {
    return board
      .map((cell, index) => cell === null ? index : -1)
      .filter(index => index !== -1)
  }
}
