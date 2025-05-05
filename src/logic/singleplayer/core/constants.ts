import { Player } from '@/types/game'

// Kích thước mặc định của bàn cờ
export const DEFAULT_BOARD_SIZE = 30

// Số quân cờ liên tiếp để thắng
export const DEFAULT_WIN_CONDITION = 5

// Các hướng để kiểm tra thắng (ngang, dọc, chéo xuống, chéo lên)
export const DIRECTIONS = [
  [0, 1],   // Ngang
  [1, 0],   // Dọc
  [1, 1],   // Chéo xuống
  [1, -1],  // Chéo lên
] as const

// Người chơi mặc định bắt đầu
export const FIRST_PLAYER: Player = 'X'

// Settings mặc định
export const DEFAULT_SETTINGS = {
  boardSize: DEFAULT_BOARD_SIZE,
  winCondition: DEFAULT_WIN_CONDITION,
  allowUndo: true,
}
