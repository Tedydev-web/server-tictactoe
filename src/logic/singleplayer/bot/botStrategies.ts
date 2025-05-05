import { Player, BotDifficulty } from '@/types/game'
import { checkGameState } from '../core/gameRules'
import { getNextPlayer } from '../core/boardUtils'

const SCORES = {
  WIN: 1000,
  FIVE: 900,          // Năm quân liên tiếp
  OPEN_FOUR: 800,     // Bốn quân không bị chặn
  FOUR: 600,          // Bốn quân bị chặn một đầu
  OPEN_THREE: 400,    // Ba quân không bị chặn
  THREE: 300,         // Ba quân bị chặn một đầu
  OPEN_TWO: 200,      // Hai quân không bị chặn
  TWO: 100,           // Hai quân bị chặn một đầu
  CENTER: 50,         // Điểm trung tâm
  DRAW: 0,
  LOSE: -1000
}

interface Pattern {
  count: number      // Số quân liên tiếp
  openEnds: number   // Số đầu không bị chặn (0-2)
  threats: number    // Số điểm đe dọa
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

  private evaluatePattern(pattern: Pattern): number {
    if (pattern.count >= 5) return SCORES.FIVE
    
    switch (pattern.count) {
      case 4:
        return pattern.openEnds === 2 ? SCORES.OPEN_FOUR :
               pattern.openEnds === 1 ? SCORES.FOUR : 0
      case 3:
        return pattern.openEnds === 2 ? SCORES.OPEN_THREE :
               pattern.openEnds === 1 ? SCORES.THREE : 0
      case 2:
        return pattern.openEnds === 2 ? SCORES.OPEN_TWO :
               pattern.openEnds === 1 ? SCORES.TWO : 0
      default:
        return 0
    }
  }

  private getPattern(board: (Player | null)[], pos: number, dx: number, dy: number, player: Player, boardSize: number): Pattern {
    let count = 1
    let openEnds = 0
    let threats = 0
    let x = pos % boardSize
    let y = Math.floor(pos / boardSize)

    // Kiểm tra một hướng
    const checkDirection = (stepX: number, stepY: number): number => {
      let open = 0
      let consecutive = 0
      let threat = 0
      let newX = x + stepX
      let newY = y + stepY
      
      while (
        newX >= 0 && newX < boardSize &&
        newY >= 0 && newY < boardSize
      ) {
        const newPos = newY * boardSize + newX
        if (board[newPos] === player) {
          consecutive++
          if (consecutive >= 3) threat++
        } else if (board[newPos] === null) {
          open = 1
          break
        } else {
          break
        }
        newX += stepX
        newY += stepY
      }
      
      count += consecutive
      threats += threat
      return open
    }

    // Kiểm tra cả hai hướng
    openEnds += checkDirection(dx, dy)
    openEnds += checkDirection(-dx, -dy)

    return { count, openEnds, threats }
  }

  private evaluatePosition(board: (Player | null)[], position: number, player: Player, boardSize: number): number {
    let score = 0
    const directions = [
      [1, 0],    // Ngang
      [0, 1],    // Dọc
      [1, 1],    // Chéo xuống
      [1, -1]    // Chéo lên
    ]

    // Đánh giá theo pattern cho mỗi hướng
    for (const [dx, dy] of directions) {
      const pattern = this.getPattern(board, position, dx, dy, player, boardSize)
      score += this.evaluatePattern(pattern)
      
      // Thêm điểm cho các đe dọa
      score += pattern.threats * 50
    }

    // Thêm điểm cho vị trí chiến lược
    const center = Math.floor(board.length / 2)
    const distanceToCenter = Math.abs(position % boardSize - center % boardSize) +
                            Math.abs(Math.floor(position / boardSize) - Math.floor(center / boardSize))
    
    // Điểm cho vị trí gần trung tâm
    score += Math.max(0, SCORES.CENTER - distanceToCenter * 10)

    return score
  }

  private evaluateBoard(board: (Player | null)[], boardSize: number): number {
    let score = 0
    let botThreats = 0
    let humanThreats = 0

    // Đánh giá toàn bộ bàn cờ
    for (let i = 0; i < board.length; i++) {
      if (board[i] === this.botPlayer) {
        const posScore = this.evaluatePosition(board, i, this.botPlayer, boardSize)
        score += posScore
        if (posScore >= SCORES.THREE) botThreats++
      } else if (board[i] === this.humanPlayer) {
        const posScore = this.evaluatePosition(board, i, this.humanPlayer, boardSize)
        score -= posScore
        if (posScore >= SCORES.THREE) humanThreats++
      }
    }

    // Điều chỉnh chiến thuật dựa trên số lượng đe dọa
    if (humanThreats > botThreats) {
      score -= (humanThreats - botThreats) * 100 // Ưu tiên phòng thủ khi bị đe dọa nhiều
    }

    return score
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
      // Check for immediate winning move or blocking opponent's winning move
      for (const move of availableMoves) {
        // Check for winning move
        const testBoard = [...board]
        testBoard[move] = this.botPlayer
        if (checkGameState(testBoard, move, boardSize, winCondition).status === 'won') {
          return move
        }

        // Check for blocking move
        testBoard[move] = this.humanPlayer
        if (checkGameState(testBoard, move, boardSize, winCondition).status === 'won') {
          return move
        }
      }

      // Sort moves by initial evaluation for better alpha-beta pruning
      const sortedMoves = availableMoves.map(move => {
        const testBoard = [...board]
        testBoard[move] = this.botPlayer
        return {
          move,
          score: this.evaluateBoard(testBoard, boardSize)
        }
      }).sort((a, b) => b.score - a.score)

      // Dynamic depth based on number of available moves
      const dynamicDepth = this.calculateDynamicDepth(availableMoves.length)

      // Use iterative deepening
      let bestMove = sortedMoves[0].move
      for (let depth = 1; depth <= dynamicDepth; depth++) {
        if (Date.now() - this.startTime > this.timeLimit * 0.8) break // Leave 20% time for safety

        const result = this.minimaxAlphaBeta(
          board,
          depth,
          -Infinity,
          Infinity,
          true,
          boardSize,
          winCondition,
          sortedMoves.map(m => m.move)
        )

        if (result.move !== -1) {
          bestMove = result.move
        }
      }

      return bestMove

    } catch (error) {
      // If timeout occurred, use the best move found so far
      console.log('Search timeout, using best move found')
      return this.findBestImmediateMove(board, availableMoves, boardSize)
    }
  }

  private calculateDynamicDepth(moveCount: number): number {
    // Adjust depth based on number of available moves
    if (moveCount > 40) return 2
    if (moveCount > 20) return 3
    return 4
  }

  private findBestImmediateMove(
    board: (Player | null)[],
    moves: number[],
    boardSize: number
  ): number {
    let bestScore = -Infinity
    let bestMove = moves[0]

    for (const move of moves) {
      const testBoard = [...board]
      testBoard[move] = this.botPlayer
      const score = this.evaluateBoard(testBoard, boardSize)
      if (score > bestScore) {
        bestScore = score
        bestMove = move
      }
    }

    return bestMove
  }

  private minimaxAlphaBeta(
    board: (Player | null)[],
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    boardSize: number,
    winCondition: number,
    orderedMoves?: number[]
  ): { score: number; move: number } {
    // Check for timeout
    if (Date.now() - this.startTime > this.timeLimit) {
      throw new Error('Calculation timeout')
    }

    const availableMoves = orderedMoves || this.getAvailableMoves(board)
    
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
        score: this.evaluateBoard(board, boardSize),
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
          winCondition,
          orderedMoves
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
          winCondition,
          orderedMoves
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

  private getAvailableMoves(board: (Player | null)[]): number[] {
    return board
      .map((cell, index) => cell === null ? index : -1)
      .filter(index => index !== -1)
  }
}
