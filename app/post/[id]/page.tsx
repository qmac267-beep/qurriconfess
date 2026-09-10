'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { createClient } from '@/lib/supabase';
import { formatTimeAgo } from '@/lib/time-utils';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
  };
}

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchPostAndAuth = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      setIsAuthenticated(true);
      setCurrentUserId(session.user.id);

      // Lấy bài viết
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, content, created_at, user_id, profiles(username)')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        router.push('/');
      } else {
        setPost(data);
      }

      setLoading(false);
    };

    fetchPostAndAuth();
  }, [postId, router]);

  const handleDelete = async () => {
    if (!confirm('Bạn chắc chắn muốn xóa bài viết này?')) return;

    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      router.push('/');
    } catch (err: any) {
      alert(err.message || 'Có lỗi xảy ra');
    } finally {
      setDeleting(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Đang tải bài viết...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-2xl mb-4">😢</p>
            <p className="text-muted-foreground mb-6">Không tìm thấy bài viết</p>
            <Button onClick={() => router.push('/')}>Quay lại</Button>
          </div>
        </main>
      </div>
    );
  }

  const isOwner = currentUserId === post.user_id;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          ← Quay lại
        </Button>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{post.title}</CardTitle>
                <CardDescription className="text-base">
                  📝 Bởi <strong>{post.profiles.username}</strong> • {formatTimeAgo(post.created_at)}
                </CardDescription>
              </div>
              {isOwner && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="text-destructive hover:bg-destructive/10"
                  title="Xóa bài viết"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none whitespace-pre-wrap text-foreground leading-relaxed">
              {post.content}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
