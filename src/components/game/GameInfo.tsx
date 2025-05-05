import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface GameInfoProps {
  currentPlayer: 'X' | 'O'
  player1Name?: string
  player2Name?: string
  player1Score: number
  player2Score: number
}

export function GameInfo({
  currentPlayer,
  player1Name = 'Player 1',
  player2Name = 'Player 2',
  player1Score,
  player2Score
}: GameInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <Card className={currentPlayer === 'X' ? 'bg-primary/10' : ''}>
        <CardHeader>
          <CardTitle className="text-center">X - {player1Name}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-2xl font-bold">{player1Score}</div>
          <div className="text-sm text-muted-foreground">
            {currentPlayer === 'X' ? 'Your turn' : ''}
          </div>
        </CardContent>
      </Card>

      <Card className={currentPlayer === 'O' ? 'bg-primary/10' : ''}>
        <CardHeader>
          <CardTitle className="text-center">O - {player2Name}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-2xl font-bold">{player2Score}</div>
          <div className="text-sm text-muted-foreground">
            {currentPlayer === 'O' ? 'Your turn' : ''}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
