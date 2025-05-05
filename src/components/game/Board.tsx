import { Cell } from './Cell'

interface BoardProps {
  cells: ('X' | 'O' | null)[]
  onCellClick: (index: number) => void
  winningLine?: number[]
}

export function Board({ cells, onCellClick, winningLine }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
      {cells.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinningCell={winningLine?.includes(index)}
        />
      ))}
    </div>
  )
}
