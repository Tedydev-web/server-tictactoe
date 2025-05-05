import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    if (isBotEnabled && !botEngineRef.current) {
      botEngineRef.current = new BotEngine(botDifficulty)
    }
  }, [isBotEnabled, botDifficulty])

  useEffect(() => {
    if (botEngineRef.current) {
      botEngineRef.current.setDifficulty(botDifficulty)
    }
  }, [botDifficulty])

  useEffect(() => {
    // Chỉ thực hiện nước đi của bot khi:
    // 1. Bot được bật
    // 2. Game đã bắt đầu
    // 3. Đang ở chế độ bot
    // 4. Đến lượt bot (O)
    // 5. Game đang chạy
    if (
      isBotEnabled &&
      isGameStarted &&
      isBotMode &&
      currentPlayer === 'O' &&
      gameStatus === 'playing' &&
      botEngineRef.current
    ) {
      // Thêm delay để tạo cảm giác bot đang "suy nghĩ"
      const timer = setTimeout(() => {
        const botMove = botEngineRef.current!.calculateNextMove(
          cells,
          boardSize,
          winCondition
        )
        dispatch(makeMove({ position: botMove, boardSize, winCondition }))
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [
    cells,
    currentPlayer,
    gameStatus,
    isGameStarted,
    isBotMode,
    isBotEnabled,
    boardSize,
    winCondition,
    dispatch
  ])

  return null
}
