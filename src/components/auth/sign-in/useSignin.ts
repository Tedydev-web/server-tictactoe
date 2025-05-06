import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { SigninSchema } from '../schema/index'
import { authService } from '@/service/authService'
import { showToast } from '@/components/ui/toastify'

export function useSignin() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    try {
      setLoading(true)
      const response = await authService.login({
        email: data.email,
        password: data.password
      })

      // Store tokens in localStorage or your preferred storage method
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)

      showToast('Đăng nhập thành công!', 'success')
      router.push('/admin/dashboard')
    } catch (error: any) {
      showToast(
        error.message || 'Đăng nhập thất bại. Vui lòng thử lại!',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  return { onSubmit, loading }
}
