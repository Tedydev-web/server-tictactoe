'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SignupSchema } from '../schema/index'
import { useSignup } from './useSignup'
import {
  AnimatedForm,
  AnimatedFormItem,
  AnimatedButton
} from '@/components/ui/animated-form'

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { loading, onSubmit } = useSignup()

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      >
        <AnimatedForm>
          {/* Tiêu đề */}
          <AnimatedFormItem>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-4xl font-bold">Đăng ký tài khoản</h1>
              <p className="text-balance text-md text-muted-foreground">
                Nhập thông tin của bạn bên dưới để đăng ký tài khoản
              </p>
            </div>
          </AnimatedFormItem>

          {/* Form */}
          <div className="grid gap-6">
            <AnimatedFormItem>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nguyễn Văn A" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedFormItem>

            <AnimatedFormItem>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="m@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedFormItem>

            <AnimatedFormItem>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedFormItem>

            <AnimatedFormItem>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedFormItem>

            <AnimatedButton
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </AnimatedButton>
          </div>

          {/* Link đến trang đăng nhập */}
          <AnimatedFormItem>
            <div className="text-center text-sm">
              Đã có tài khoản?{' '}
              <Link
                href="/sign-in"
                className="underline underline-offset-4 text-primary hover:text-primary/90"
              >
                Đăng nhập
              </Link>
            </div>
          </AnimatedFormItem>
        </AnimatedForm>
      </form>
    </Form>
  )
}
