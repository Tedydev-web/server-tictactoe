import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { updateTimeRemaining, handleTimeExpired } from '@/store/features/singleplayer/gameSlide'

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
  const dispatch = useDispatch()
  const { timeRemaining, gameStatus } = useSelector((state: RootState) => state.singleplayer.game)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameStatus === 'playing') {
      timer = setInterval(() => {
        if (timeRemaining <= 0) {
          dispatch(handleTimeExpired())
        } else {
          dispatch(updateTimeRemaining(timeRemaining - 1))
        }
      }, 1000)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [timeRemaining, gameStatus, dispatch])

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <Card className={currentPlayer === 'X' ? 'bg-primary/10' : ''}>
        <CardHeader>
          <CardTitle className="text-center">X - {player1Name}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-2xl font-bold">{player1Score}</div>
          <div className="text-sm text-muted-foreground">
            {currentPlayer === 'X' && (
              <>
                Your turn
                <div className="text-lg font-semibold text-primary">
                  {formatTime(timeRemaining)}
                </div>
              </>
            )}
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
            {currentPlayer === 'O' && (
              <>
                Your turn
                <div className="text-lg font-semibold text-primary">
                  {formatTime(timeRemaining)}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
