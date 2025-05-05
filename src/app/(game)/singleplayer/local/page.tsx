'use client'

import { GameContainer } from '@/components/game/GameContainer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLocalGame } from '@/logic/singleplayer/local/useLocalGame'

export default function LocalGamePage() {
  const {
    cells,
    currentPlayer,
    gameStatus,
    winningLine,
    player1Score,
    player2Score,
    settings,
    onCellClick,
    onUndo,
    canUndo,
    onReset,
  } = useLocalGame()

  return (
    <div className="space-y-8">
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Local Game</CardTitle>
          <CardDescription>
            Chơi với bạn trên cùng một thiết bị
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GameContainer 
            cells={cells}
            onCellClick={onCellClick}
            currentPlayer={currentPlayer}
            gameStatus={gameStatus}
            player1Name="Player 1"
            player2Name="Player 2"
            onReset={onReset}
            onUndo={onUndo}
            canUndo={canUndo}
            player1Score={player1Score}
            player2Score={player2Score}
            size={settings.boardSize}
          />
        </CardContent>
      </Card>
    </div>
  )
}
