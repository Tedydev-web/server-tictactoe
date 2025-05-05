import { GameStatus, Player } from '@/types/game'
import { DIRECTIONS } from './constants'
import { indexTo2D, isValidCoord } from './boardUtils'

// Kiểm tra thắng từ một điểm xuất phát
export function checkWinFromPosition(
  board: (Player | null)[],
  startIndex: number,
  size: number,
  winCondition: number
): number[] | null {
  const player = board[startIndex]
  if (!player) return null

  const [startRow, startCol] = indexTo2D(startIndex, size)

  // Kiểm tra theo từng hướng
  for (const [dr, dc] of DIRECTIONS) {
    const line = [startIndex]
    
    // Kiểm tra về phía trước
    let [r, c] = [startRow + dr, startCol + dc]
    while (
      isValidCoord(r, c, size) &&
      board[r * size + c] === player &&
      line.length < winCondition
    ) {
      line.push(r * size + c)
      r += dr
      c += dc
    }

    // Kiểm tra về phía sau
    ;[r, c] = [startRow - dr, startCol - dc]
    while (
      isValidCoord(r, c, size) &&
      board[r * size + c] === player &&
      line.length < winCondition
    ) {
      line.unshift(r * size + c)
      r -= dr
      c -= dc
    }

    if (line.length >= winCondition) {
      return line
    }
  }

  return null
}

// Kiểm tra có thể đánh vào ô này không
export function isValidMove(
  board: (Player | null)[],
  index: number
): boolean {
  return index >= 0 && index < board.length && board[index] === null
}

// Kiểm tra hòa
export function isDraw(board: (Player | null)[]): boolean {
  return !board.includes(null)
}

// Kiểm tra trạng thái game sau một nước đi
export function checkGameState(
  board: (Player | null)[],
  lastMove: number,
  size: number,
  winCondition: number
): { status: GameStatus; winningLine?: number[] } {
  const winningLine = checkWinFromPosition(board, lastMove, size, winCondition)
  if (winningLine) {
    return {
      status: 'won',
      winningLine
    }
  }

  if (isDraw(board)) {
    return {
      status: 'draw'
    }
  }

  return {
    status: 'playing'
  }
}
