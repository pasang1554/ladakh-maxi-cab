"use client"

import RegisterForm from '@/components/auth/RegisterForm'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <RegisterForm
          onSuccess={() => router.push("/login")}
          onSwitchToLogin={() => router.push("/login")}
        />
      </div>
    </div>
  );
} 