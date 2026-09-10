'use client';

import { AuthForm } from '@/components/auth-form';
import { Button } from '@/components/button';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎤</div>
          <h1 className="text-3xl font-bold mb-2">QurriConfess</h1>
          <p className="text-muted-foreground">Viết cho đỡ tức, đăng cho đỡ bực</p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Đăng Nhập</h2>
          <AuthForm isLogin={true} />

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <span>Chưa có tài khoản? </span>
            <button
              onClick={() => router.push('/register')}
              className="text-primary hover:underline font-medium"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
