'use client'

import { GameContainer } from '@/components/game/GameContainer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LocalGamePage() {
  const BOARD_SIZE = 30 // Kích thước mặc định cho singleplayer
  
  const dummyState = {
    cells: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
    currentPlayer: 'X' as const,
    gameStatus: 'playing' as const,
    player1Score: 0,
    player2Score: 0,
  }

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
            cells={dummyState.cells}
            onCellClick={() => {}}
            currentPlayer={dummyState.currentPlayer}
            gameStatus={dummyState.gameStatus}
            player1Name="Player 1"
            player2Name="Player 2"
            onReset={() => {}}
            onUndo={() => {}}
            canUndo={false}
            player1Score={dummyState.player1Score}
            player2Score={dummyState.player2Score}
            size={BOARD_SIZE}
          />
        </CardContent>
      </Card>
    </div>
  )
}
