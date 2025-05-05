import { Card, CardContent } from '@/components/ui/card'

interface GameResultProps {
  status: 'playing' | 'won' | 'draw'
  winner?: string
}

export function GameResult({ status, winner }: GameResultProps) {
  if (status === 'playing') return null

  return (
    <Card className="mb-8 bg-primary/5">
      <CardContent className="pt-6">
        <div className="text-center">
          {status === 'won' ? (
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">
                🎉 Winner!
              </div>
              <div className="text-xl">
                {winner}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-2xl font-bold text-muted-foreground">
                🤝 Draw Game
              </div>
              <div className="text-muted-foreground">
                No one wins this time
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
