import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/types'
import { initializeGame, makeMove, undoMove, resetGame, resetScores } from '@/store/features/singleplayer/gameSlide'
import { isValidMove } from '@/logic/singleplayer/core/gameRules'

export function useLocalGame() {
  const dispatch = useDispatch()
  const gameState = useSelector((state: RootState) => state.singleplayer.game)
  const settings = useSelector((state: RootState) => state.singleplayer.settings)

  // Khởi tạo game khi component mount
  useEffect(() => {
    dispatch(initializeGame(settings.boardSize))
  }, [dispatch, settings.boardSize])

  // Xử lý click vào ô
  const handleCellClick = (position: number) => {
    if (
      gameState.gameStatus === 'playing' && 
      isValidMove(gameState.cells, position)
    ) {
      dispatch(makeMove({ 
        position,
        boardSize: settings.boardSize,
        winCondition: settings.winCondition
      }))
    }
  }

  // Xử lý undo
  const handleUndo = () => {
    if (settings.allowUndo && gameState.moveHistory.length > 0) {
      dispatch(undoMove())
    }
  }

  // Reset game
  const handleReset = () => {
    dispatch(resetGame())
  }

  // Reset điểm số
  const handleResetScores = () => {
    dispatch(resetScores())
  }

  return {
    ...gameState,
    settings,
    onCellClick: handleCellClick,
    onUndo: settings.allowUndo ? handleUndo : undefined,
    canUndo: settings.allowUndo && gameState.moveHistory.length > 0,
    onReset: handleReset,
    onResetScores: handleResetScores,
  }
}
