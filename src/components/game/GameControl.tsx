import { Button } from '@/components/ui/button'
import { RotateCcw, UndoIcon } from 'lucide-react'

interface GameControlProps {
  onReset: () => void
  onUndo?: () => void
  canUndo?: boolean
}

export function GameControl({ onReset, onUndo, canUndo = false }: GameControlProps) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <Button
        variant="outline"
        size="lg"
        onClick={onReset}
        className="flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Game
      </Button>

      {onUndo && (
        <Button
          variant="outline"
          size="lg"
          onClick={onUndo}
          disabled={!canUndo}
          className="flex items-center gap-2"
        >
          <UndoIcon className="w-4 h-4" />
          Undo Move
        </Button>
      )}
    </div>
  )
}
