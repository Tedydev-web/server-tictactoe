'use client'
import { GameContainer } from '@/components/game/GameContainer'
import { useSearchParams } from 'next/navigation'

export default function SinglePlayerPage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  // Dữ liệu tĩnh để test UI
  const cells: ('X' | 'O' | null)[] = [
    'X', 'O', 'X',
    null, 'O', null,
    'X', null, 'O'
  ]

  const handleCellClick = (index: number) => {
    console.log('Cell clicked:', index)
  }

  return (
    <GameContainer
      cells={cells}
      onCellClick={handleCellClick}
      currentPlayer="X"
      gameStatus="playing"
      player1Name={mode === 'local' ? 'Người chơi 1' : 'Bạn'}
      player2Name={mode === 'local' ? 'Người chơi 2' : 'Bot'}
    />
  )
}
