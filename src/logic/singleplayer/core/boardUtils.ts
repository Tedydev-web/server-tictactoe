import { Player } from '@/types/game'

// Chuyển đổi từ index 1D sang tọa độ 2D
export function indexTo2D(index: number, size: number): [number, number] {
  const row = Math.floor(index / size)
  const col = index % size
  return [row, col]
}

// Chuyển đổi từ tọa độ 2D sang index 1D
export function coordsToIndex(row: number, col: number, size: number): number {
  return row * size + col
}

// Kiểm tra tọa độ có hợp lệ không
export function isValidCoord(row: number, col: number, size: number): boolean {
  return row >= 0 && row < size && col >= 0 && col < size
}

// Tạo bàn cờ mới
export function createEmptyBoard(size: number): (Player | null)[] {
  return Array(size * size).fill(null)
}

// Lấy người chơi tiếp theo
export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === 'X' ? 'O' : 'X'
}

// Tạo bản sao của bàn cờ
export function cloneBoard(board: (Player | null)[]): (Player | null)[] {
  return [...board]
}
