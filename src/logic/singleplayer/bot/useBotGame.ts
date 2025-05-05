import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { makeMove } from '@/store/features/singleplayer/gameSlide'
import { BotEngine } from './botEngine'

export function useBotGame() {
  const dispatch = useDispatch()
  const {
    cells,
    currentPlayer,
    gameStatus,
    isGameStarted,
    isBotMode
  } = useSelector((state: RootState) => state.singleplayer.game)
  
  const { boardSize, winCondition, botDifficulty, isBotEnabled } = useSelector(
    (state: RootState) => state.singleplayer.settings
  )

  const botEngineRef = useRef<BotEngine | null>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  // Memoize bot move calculation
  const calculateBotMove = useCallback(() => {
    if (!botEngineRef.current) return

    try {
      const botMove = botEngineRef.current.calculateNextMove(
        cells,
        boardSize,
        winCondition
      )
      dispatch(makeMove({ position: botMove, boardSize, winCondition }))
    } catch (error) {
      console.error('Error calculating bot move:', error)
    }
  }, [cells, boardSize, winCondition, dispatch])

  // Initialize bot engine
  useEffect(() => {
    if (isBotEnabled && !botEngineRef.current) {
      botEngineRef.current = new BotEngine(botDifficulty)
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isBotEnabled, botDifficulty])

  // Update bot difficulty
  useEffect(() => {
    if (botEngineRef.current) {
      botEngineRef.current.setDifficulty(botDifficulty)
    }
  }, [botDifficulty])

  // Handle bot moves
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    // Check conditions for bot move
    if (
      isBotEnabled &&
      isGameStarted &&
      isBotMode &&
      currentPlayer === 'O' &&
      gameStatus === 'playing' &&
      botEngineRef.current
    ) {
      // Add delay for "thinking" animation
      timerRef.current = setTimeout(calculateBotMove, 500)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [
    isBotEnabled,
    isGameStarted,
    isBotMode,
    currentPlayer,
    gameStatus,
    calculateBotMove
  ])

  return null
}
