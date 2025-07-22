'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  captcha: z.string().min(1, 'Please solve the captcha').refine((val) => {
    return true
  }, 'Please enter the correct captcha code'),
})

export default function ForgotPasswordForm({ onSwitchToLogin }) {
  const [isLoading, setIsLoading] = useState(false)
  const [captchaText, setCaptchaText] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const captchaValue = watch('captcha')

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)
    setValue('captcha', '')
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const onSubmit = async (data) => {
    if (data.captcha.toUpperCase() !== captchaText) {
      toast.error('Captcha verification failed')
      setValue('captcha', '')
      generateCaptcha()
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Password reset link sent to your email!')
      } else {
        toast.error(result.error || 'Failed to send reset link')
      }
    } catch (error) {
      toast.error('An error occurred while sending reset link')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your email to receive a password reset link</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Captcha */}
          <div className="space-y-2">
            <Label>Captcha Verification</Label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center font-mono text-xl tracking-wider border-2 border-gray-300 dark:border-gray-600 select-none">
                <span className="inline-block transform rotate-1 text-gray-900 dark:text-gray-100">{captchaText}</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateCaptcha}
                className="px-3"
              >
                &#8635;
              </Button>
            </div>
            <Input
              placeholder="Enter the code above"
              {...register('captcha')}
              className={captchaValue && captchaValue.toUpperCase() === captchaText ? 'border-green-500' : ''}
            />
            {captchaValue && captchaValue.toUpperCase() === captchaText && (
              <p className="text-sm text-green-600 dark:text-green-400">&#10003; Captcha verified</p>
            )}
            {errors.captcha && (
              <p className="text-sm text-red-500 dark:text-red-400">{errors.captcha.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-sm text-blue-600 hover:underline"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 