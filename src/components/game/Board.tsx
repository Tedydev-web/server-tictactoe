import { Cell } from './Cell'

interface BoardProps {
  cells: ('X' | 'O' | null)[]
  onCellClick: (index: number) => void
  winningLine?: number[]
  size: number // kích thước một cạnh của bàn cờ
}

export function Board({ cells, onCellClick, winningLine, size }: BoardProps) {
  return (
    <div 
      className="grid gap-1 w-full max-w-[90vh] mx-auto"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
      }}
    >
      {cells.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinningCell={winningLine?.includes(index)}
          size={size}
        />
      ))}
    </div>
  )
}
