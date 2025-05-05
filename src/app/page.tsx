import GameTitle from '@/components/home/Title'
import ModeSelectCard from '@/components/home/GameMode'
import Header from '@/components/layout/Header'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-muted relative">
      <Header />
      <GameTitle />
      <div className="mt-10 w-full max-w-sm space-y-4">
        <ModeSelectCard mode="online" />
        <ModeSelectCard mode="offline" />
      </div>
    </main>
  )
}
