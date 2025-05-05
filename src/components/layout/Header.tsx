import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <Button variant="outline" asChild>
        <Link href="/sign-in">Đăng nhập</Link>
      </Button>
      <Button asChild>
        <Link href="/sign-up">Đăng ký</Link>
      </Button>
    </div>
  )
} 