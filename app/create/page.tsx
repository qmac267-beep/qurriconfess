'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/button';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      setIsAuthenticated(true);
      setUserId(session.user.id);
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!userId) {
      setError('Lỗi xác thực');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: insertError } = await supabase.from('posts').insert([
        {
          user_id: userId,
          title,
          content,
        },
      ]);

      if (insertError) throw insertError;

      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Đang kiểm tra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">✍️ Xả Tức Ngay</h1>
          <p className="text-muted-foreground">Chia sẻ những điều trong lòng với nhóm bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg border p-8 shadow-lg">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Tiêu đề bài viết
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề bài viết"
              required
              maxLength={200}
              className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {title.length}/200 ký tự
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Nội dung xả tức
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết những gì trong lòng bạn..."
              required
              rows={10}
              className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {error && <p className="text-sm text-destructive mb-6">{error}</p>}

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading || !title || !content}
              className="flex-1"
            >
              {loading ? 'Đang đăng...' : '🚀 Xả Tức Ngay'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Hủy
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
