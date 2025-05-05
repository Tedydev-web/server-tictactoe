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

  constructor(difficulty: BotDifficulty) {
    this.maxDepth = difficulty === BotDifficulty.HARD ? 4 : 2
  }

  getNextMove(board: (Player | null)[], boardSize: number, winCondition: number): number {
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
    const availableMoves = this.getAvailableMoves(board)
    
    // Base cases
    const gameState = checkGameState(board, -1, boardSize, winCondition)
    if (gameState.status === 'won') {
      return {
        score: isMaximizing ? SCORES.LOSE : SCORES.WIN,
        move: -1
      }
    }
    if (gameState.status === 'draw' || depth === 0) {
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
