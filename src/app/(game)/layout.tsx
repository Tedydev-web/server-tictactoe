import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/layout/Header'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted">
    <Header/>
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay về trang chủ
          </Link>
        </Button>
        {children}
      </div>
    </div>
  )
}
