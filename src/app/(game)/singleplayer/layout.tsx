import { ReactNode } from 'react'

interface SinglePlayerLayoutProps {
  children: ReactNode
}

export default function SinglePlayerLayout({ children }: SinglePlayerLayoutProps) {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Tic Tac Toe</h1>
        <p className="text-muted-foreground">Single Player Mode</p>
      </div>
      
      <main>
        {children}
      </main>
    </div>
  )
}
