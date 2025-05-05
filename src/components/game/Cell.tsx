interface CellProps {
  value: 'X' | 'O' | null
  onClick: () => void
  isWinningCell?: boolean
}

export function Cell({ value, onClick, isWinningCell }: CellProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full aspect-square flex items-center justify-center text-4xl font-bold
        border-2 border-border rounded-lg
        hover:bg-accent/50 transition-colors
        ${isWinningCell ? 'bg-primary/20' : ''}
        ${value === 'X' ? 'text-primary' : value === 'O' ? 'text-destructive' : ''}
      `}
      disabled={!!value}
    >
      {value}
    </button>
  )
}
