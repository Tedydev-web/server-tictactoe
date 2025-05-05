'use client'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SinglePlayerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SinglePlayerModal({ open, onOpenChange }: SinglePlayerModalProps) {
  const router = useRouter()

  const handleLocalPlay = () => {
    router.push('/singleplayer?mode=local')
  }

  const handleBotPlay = () => {
    router.push('/singleplayer?mode=bot')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chọn chế độ chơi</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button 
            onClick={handleLocalPlay}
            className="w-full py-6 text-lg font-semibold"
          >
            🎮 Chơi cùng thiết bị
          </Button>
          <Button 
            onClick={handleBotPlay}
            className="w-full py-6 text-lg font-semibold"
            variant="outline"
          >
            🤖 Chơi với Bot
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 