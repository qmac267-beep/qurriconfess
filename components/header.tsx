'use client';

import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { LogOut } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);

        // Lấy username từ profiles
        const { data } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single();

        if (data) {
          setUsername(data.username);
        }
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">🎤</div>
          <div>
            <h1 className="text-2xl font-bold">QurriConfess</h1>
            <p className="text-sm text-muted-foreground">Viết cho đỡ tức, đăng cho đỡ bực</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <Button
                onClick={() => router.push('/create')}
                className="gap-2"
              >
                ✏️ Đăng bài
              </Button>
              <div className="text-sm text-muted-foreground">
                {username && <span>Xin chào, <strong>{username}</strong></span>}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Đăng xuất"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
