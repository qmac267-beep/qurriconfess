'use client';

import { AuthForm } from '@/components/auth-form';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
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
          <h2 className="text-2xl font-semibold mb-6 text-center">Đăng Ký</h2>
          <AuthForm isLogin={false} />

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <span>Đã có tài khoản? </span>
            <button
              onClick={() => router.push('/login')}
              className="text-primary hover:underline font-medium"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
