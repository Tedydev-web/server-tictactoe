import type { Metadata } from 'next'
import Link from 'next/link'
import { GalleryVerticalEnd } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Trang xác thực người dùng',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 relative">
      <Link 
        href="/" 
        className="absolute top-4 left-4 flex items-center gap-2 font-medium"
        title="Quay về trang chủ"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        FPT Polytechnic
      </Link>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
