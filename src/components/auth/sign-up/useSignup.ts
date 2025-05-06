import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { SignupSchema } from '../schema/index'
import { authService } from '@/service/authService'
import { showToast } from '@/components/ui/toastify'

export function useSignup() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    try {
      setLoading(true)
      await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      })

      showToast('Đăng ký tài khoản thành công!', 'success')
      router.push('/sign-in') // Redirect to login page after successful registration
    } catch (error: any) {
      showToast(
        error.message || 'Đăng ký thất bại. Vui lòng thử lại!',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  return { loading, onSubmit }
}
