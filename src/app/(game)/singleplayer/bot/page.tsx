'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GameContainer } from '@/components/game/GameContainer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BotDifficulty } from '@/types/game'
import { RootState } from '@/store/store'
import { initializeGame, makeMove, undoMove, resetGame } from '@/store/features/singleplayer/gameSlide'
import { setBotDifficulty } from '@/store/features/singleplayer/settingSlide'
import { useBotGame } from '@/logic/singleplayer/bot/useBotGame'

export default function BotGamePage() {
  const dispatch = useDispatch()
  const {
    cells,
    currentPlayer,
    gameStatus,
    player1Score,
    player2Score,
    moveHistory
  } = useSelector((state: RootState) => state.singleplayer.game)
  
  const { boardSize, winCondition, allowUndo, botDifficulty } = useSelector(
    (state: RootState) => state.singleplayer.settings
  )

  // Sử dụng bot hook
  useBotGame()

  // Khởi tạo game khi component mount
  useEffect(() => {
    dispatch(initializeGame(boardSize))
  }, [dispatch, boardSize])

  const handleCellClick = (position: number) => {
    if (gameStatus === 'playing' && currentPlayer === 'X') {
      dispatch(makeMove({ position, boardSize, winCondition }))
    }
  }

  const handleUndo = () => {
    dispatch(undoMove())
  }

  const handleReset = () => {
    dispatch(resetGame())
  }

  const handleDifficultyChange = (value: string) => {
    dispatch(setBotDifficulty(value as BotDifficulty))
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-x-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Bot Game</CardTitle>
            <CardDescription>
              Play against AI bot
            </CardDescription>
          </div>
          <Select value={botDifficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={BotDifficulty.EASY}>Easy</SelectItem>
              <SelectItem value={BotDifficulty.MEDIUM}>Medium</SelectItem>
              <SelectItem value={BotDifficulty.HARD}>Hard</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <GameContainer 
            cells={cells}
            onCellClick={handleCellClick}
            currentPlayer={currentPlayer}
            gameStatus={gameStatus}
            player1Name="You"
            player2Name="Bot"
            onReset={handleReset}
            onUndo={handleUndo}
            canUndo={allowUndo && moveHistory.length > 0}
            player1Score={player1Score}
            player2Score={player2Score}
            size={boardSize}
          />
        </CardContent>
      </Card>
    </div>
  )
}
