interface CellProps {
  value: 'X' | 'O' | null
  onClick: () => void
  isWinningCell?: boolean
  size: number
}

export function Cell({ value, onClick, isWinningCell, size }: CellProps) {
  // Điều chỉnh font size dựa trên kích thước bàn cờ
  const getFontSize = () => {
    if (size <= 3) return 'text-4xl'
    if (size <= 5) return 'text-3xl'
    if (size <= 10) return 'text-2xl'
    if (size <= 20) return 'text-xl'
    return 'text-sm'
  }

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square flex items-center justify-center font-bold
        border border-border rounded-sm
        hover:bg-accent/50 transition-colors
        ${isWinningCell ? 'bg-primary/20' : ''}
        ${value === 'X' ? 'text-primary' : value === 'O' ? 'text-destructive' : ''}
        ${getFontSize()}
      `}
      disabled={!!value}
    >
      {value}
    </button>
  )
}
