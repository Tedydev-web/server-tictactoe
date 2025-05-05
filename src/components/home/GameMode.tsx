'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SinglePlayerModal } from './SinglePlayerModal'

interface ModeSelectCardProps {
  mode: 'online' | 'offline'
}

export default function ModeSelectCard({ mode }: ModeSelectCardProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (mode === 'online') {
      router.push('/sign-in')
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <Button
        onClick={handleClick}
        className="w-full py-6 text-lg font-semibold capitalize"
        variant={mode === 'online' ? 'default' : 'outline'}
      >
        {mode === 'online' ? '🎮 Chơi Online' : '🤖 Chơi Offline'}
      </Button>
      <SinglePlayerModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  )
}
