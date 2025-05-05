import { Board } from './Board'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface GameContainerProps {
  cells: ('X' | 'O' | null)[]
  onCellClick: (index: number) => void
  currentPlayer: 'X' | 'O'
  gameStatus: 'playing' | 'won' | 'draw'
  winningLine?: number[]
  player1Name?: string
  player2Name?: string
}

export function GameContainer({
  cells,
  onCellClick,
  currentPlayer,
  gameStatus,
  winningLine,
  player1Name = 'Người chơi 1',
  player2Name = 'Người chơi 2'
}: GameContainerProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className={currentPlayer === 'X' ? 'bg-primary/10' : ''}>
          <CardHeader>
            <CardTitle className="text-center">X - {player1Name}</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-2xl font-bold">
            {cells.filter(cell => cell === 'X').length}
          </CardContent>
        </Card>
        <Card className={currentPlayer === 'O' ? 'bg-primary/10' : ''}>
          <CardHeader>
            <CardTitle className="text-center">O - {player2Name}</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-2xl font-bold">
            {cells.filter(cell => cell === 'O').length}
          </CardContent>
        </Card>
      </div>

      <Board 
        cells={cells}
        onCellClick={onCellClick}
        winningLine={winningLine}
      />

      {gameStatus === 'won' && (
        <div className="mt-8 text-center text-2xl font-bold">
          {currentPlayer === 'X' ? player1Name : player2Name} đã thắng!
        </div>
      )}
      {gameStatus === 'draw' && (
        <div className="mt-8 text-center text-2xl font-bold">
          Hòa!
        </div>
      )}
    </div>
  )
}
